const Router = require("@koa/router")
const getRawBody = require( 'raw-body')
const wepay = require('../lib/wepay')
const Order = require("../models/order-model")
const wepay2 = require('../lib/wepay2')
const short = require('short-uuid');
var debug = require('debug')('app');

// 开放一个路由
const defaultRouter = new Router()
// 这是一个路由中间件
defaultRouter.use(async (ctx,next) => {
    let n = ~~ctx.session.views +1;
    ctx.session.views = n;
    console.log('views'+n)
    await next()
});
defaultRouter.get('/', function (ctx) {
    let n = ~~ctx.session.views;
    ctx.session.views = n;
    ctx.body = 'views' + n;
});
defaultRouter.get('/hi', function (ctx) {
  ctx.body = `hi,Request Body: ${JSON.stringify(ctx.request.body)}`;
  console.log('hi输出完毕');
});

// all /apis/pay_notify
// 本地测试：http://localhost:3000/apis/pay_notify?test=true
// 微信支付成功通知接口
defaultRouter.all('/apis/pay_notify', async ctx=>{
  const testInLocal = !!ctx.request.query.test
  console.log('testInLocal',testInLocal);
  var rawText = await getRawBody(ctx.req, {
      encoding: 'utf-8'
  });
  if (testInLocal){
    // 原始数据示例
    rawText = `<xml><appid><![CDATA[wxc3db312ddf9bcb01]]></appid>
    <attach><![CDATA[附加信息]]></attach>
    <bank_type><![CDATA[OTHERS]]></bank_type>
    <cash_fee><![CDATA[1]]></cash_fee>
    <fee_type><![CDATA[CNY]]></fee_type>
    <is_subscribe><![CDATA[Y]]></is_subscribe>
    <mch_id><![CDATA[1410138302]]></mch_id>
    <nonce_str><![CDATA[9dKXYVyHgC8pTUrR0EhkAR4rBZNzyCWn]]></nonce_str>
    <openid><![CDATA[o-hrq0EVYOTJHX9MWqk-LF-_KL0o]]></openid>
    <out_trade_no><![CDATA[20207e27xdLBnSxN7obCfLAKTE]]></out_trade_no>
    <result_code><![CDATA[SUCCESS]]></result_code>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <sign><![CDATA[69F6040C7AE9D4ADA897DC83DD9748BB]]></sign>
    <time_end><![CDATA[20201105143506]]></time_end>
    <total_fee>1</total_fee>
    <trade_type><![CDATA[JSAPI]]></trade_type>
    <transaction_id><![CDATA[4200000738202011052586418301]]></transaction_id>
    </xml>`
  }
  try {
    var retobj = await wepay.notifyParse (rawText);
    console.log ("payNotify parsed:", retobj);
    /* retobj示例
    {
      appid: 'wxc3db312ddf9bcb01',
      attach: '附加信息',
      bank_type: 'OTHERS',
      cash_fee: '1',
      fee_type: 'CNY',
      is_subscribe: 'Y',
      mch_id: '1410138302',
      nonce_str: '6ma2Wk08YBGkvAaFAtSYP4el6wDBB4hd',
      openid: 'o-hrq0EVYOTJHX9MWqk-LF-_KL0o',
      out_trade_no: '20201aB6PprMLnwu7ev6aBgSZzw',
      result_code: 'SUCCESS',
      return_code: 'SUCCESS',
      sign: 'BDCFDAD06CCF5254C88F29D69B871FAE',
      time_end: '20201031173616',
      total_fee: '1',
      trade_type: 'JSAPI',
      transaction_id: '4200000727202010317871404188'
    }
    // return_code SUCCESS/FAIL此字段是通信标识，非交易标识
    // 业务结果	result_code SUCCESS/FAIL
    */
    // emitter.wechatSendOut({cmd:'payNotify', payload: retobj});
    if (retobj){
      // 商户订单号
      let outTradeNo = retobj.out_trade_no
      let resultCode = retobj.result_code
      /*
      state,表示当前单据状态. 
      CREATED:商户下单已受理 
      USER_ACCEPTED:用户成功使用服务
      FINISHED:商户完结订单
      USER_PAID:用户订单支付成功 
      REVOKED:商户撤销订单 
      EXPIRED:订单已失效. “商户下单已受理”状态超过1小时未变动，则订单失效
      */
      let payState = 0
      if (resultCode === 'SUCCESS'){
        // 支付成功，设置订单状态
        console.log("SUCCESS",resultCode, outTradeNo);
        payState = 1
      }else{
        payState = 2
      }
      // 存储交易单号备用
      let transactionId = retobj.transaction_id
      //  成功与失败都要同步订单状态
      let res = await Order.update({
        payState,
        transactionId
      },{
        where:{
          outTradeNo
        }
      })
      console.log(`支付状态更新${res[0] > 0?'成功':'失败'}`)
    }
    var xml = wepay.notifyResult({return_code: 'SUCCESS', return_msg: 'OK'});
    console.log("payNotify process ok: ", xml);
    ctx.body = xml;
  } catch (e) {
    console.log ("payNotify error: ", e);
    var xml = wepay.notifyResult({return_code: 'FAILURE', return_msg: 'FAIL'});
    ctx.body = xml;
  }
})

// 这个接口不好使,使用koa3-weixin
// http://localhost:3000/apis/pay_refund?no=20203cBT1HE7YfxFgLvTVqtohf
defaultRouter.get("/apis/pay_refund",async ctx=>{
  let {no:out_trade_no} = ctx.request.query
  debug('pay_refund....')
  // 尝试退款
  var retobj = await wepay.refund({ 
    out_trade_no,
    out_refund_no: short().new(),
    total_fee: 1,
    refund_fee: 1
   });

  ctx.status = 200
  ctx.body = retobj;
})

// 这个可以，使用weixin-pay
defaultRouter.get("/apis/pay_refund2",async ctx=>{
  let {no:out_trade_no} = ctx.request.query
  var data = {
      out_trade_no,
      out_refund_no: short().new(),
      total_fee: 1,
      refund_fee: 1
  };
  // 尝试退款，封装原方法
  let res = await (()=>{
    return new Promise((resolve, reject)=>{
      wepay2.refund(data,(err, result) => {
        if (err) reject(err)
        else resolve(result)
      });
    })
  })()
  console.log('res',res);
  ctx.status = 200
  ctx.body = res;
})

module.exports = defaultRouter