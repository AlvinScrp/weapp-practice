const Router = require("@koa/router")
const getRawBody = require( 'raw-body')
const wepay = require('../lib/wepay')

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
      <nonce_str><![CDATA[6ma2Wk08YBGkvAaFAtSYP4el6wDBB4hd]]></nonce_str>
      <openid><![CDATA[o-hrq0EVYOTJHX9MWqk-LF-_KL0o]]></openid>
      <out_trade_no><![CDATA[20201aB6PprMLnwu7ev6aBgSZzw]]></out_trade_no>
      <result_code><![CDATA[SUCCESS]]></result_code>
      <return_code><![CDATA[SUCCESS]]></return_code>
      <sign><![CDATA[BDCFDAD06CCF5254C88F29D69B871FAE]]></sign>
      <time_end><![CDATA[20201031173616]]></time_end>
      <total_fee>1</total_fee>
      <trade_type><![CDATA[JSAPI]]></trade_type>
      <transaction_id><![CDATA[4200000727202010317871404188]]></transaction_id>
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
      if (resultCode === 'SUCCESS'){
        // 支付成功，设置订单状态
        console.log(resultCode, outTradeNo);
      }else{

      }
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