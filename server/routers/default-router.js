const Router = require("@koa/router")
const getRawBody = require( 'raw-body')
const wepay = require("../lib/wepay")
const Order = require("../models/order-model")

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
  // const testInLocal = !!ctx.request.query.test
  // console.log('testInLocal',testInLocal);
  var rawText = await getRawBody(ctx.req, {
      encoding: 'utf-8'
  });
  
  try {
    var retobj = await wepay.notifyParse(rawText);
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
      // 商户单号
      let outTradeNo = retobj.out_trade_no
      let resultCode = retobj.result_code
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


module.exports = defaultRouter