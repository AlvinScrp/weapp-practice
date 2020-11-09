const {wepay:WechatPay} = require('koa3-wechat');
const short = require('short-uuid');
const fs = require('fs');

// 普通商户的参数
let config = {
  appId: 'wx7...................', //服务商APPID，邮件中
  mchId: '14........',
  notifyUrl: 'http://<你的域名>/apis/pay_notify', // 设置到微信支付后台
  partnerKey: '1234567890abcdefghijklmnopqrstuv', // 设置成你自己的key，在pay.weixin.qq.com设置
  pfx: fs.readFileSync(__dirname + '/apiclient_cert.p12'),
  passphrase: '14........'
}

// 初始化
let wepay = new WechatPay(config);

function init(router) {
  // post /user/my/order
  router.post('/my/order', async ctx => {
    let {openId,uid:userId} = ctx.user
    // 获取订单的预支付信息
    var trade = {
      body: '描述信息', //最长127字节
      attach: '附加信息', //最长127字节
      out_trade_no: '<订单ID，一般用订单表的唯一ID或UUID>', //
      total_fee: '<订单总价>', //以分为单位，货币的最小金额
      trade_type: 'JSAPI',
      spbill_create_ip: '<发起支付的IP>', //ctx.request.ip
      openid:openId
    };
    var params = await wepay.getBrandWCPayRequestParams(trade);
    if (!params || !(params.package && params.paySign)) {
      console.log('error! getBrandWCPayRequestParams() return null!');
    }
  })
}

module.exports = {
  init
}