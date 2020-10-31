const short = require('short-uuid');
const wepay = require('../lib/wepay')
const Order = require("../models/order-model")

function init(router){
  // post /user/my/order
  // 下新定单，准备支付
  router.post('/my/order', async ctx=>{
    let {uid:userId,openId} = ctx.user
    let { totalFee,addressId,addressDesc,goodsCartsIds,goodsNameDesc } = ctx.request.body
    totalFee = 1 // 为测试方便，所有金额支付为1分
    let payState = 0
    let outTradeNo = `${new Date().getFullYear()}${short().new()}`
    // 获取订单的预支付信息
    var trade = {
      body: '描述信息', //最长127字节
      attach: '附加信息', //最长127字节
      out_trade_no: outTradeNo, //
      total_fee: totalFee, //以分为单位，货币的最小金额
      trade_type: 'JSAPI',
      spbill_create_ip: ctx.request.ip, //ctx.request.ip
      openid:openId
    };
    var params = await wepay.getBrandWCPayRequestParams(trade);
    let err = '', res
    if (params && params.package && params.paySign) {
      res = await Order.create({
        userId,
        outTradeNo,
        payState,
        totalFee,
        addressId,
        addressDesc,
        goodsCartsIds,
        goodsNameDesc
      })
      if (!res) err = 'db create error'
    }else{
      err = 'error! getBrandWCPayRequestParams() return null!'
      console.log(err);
    }
    ctx.status = 200
    ctx.body = {
      code: 200,
      msg: !err ? 'ok' : '',
      data: {
        res,
        params
      }
    }
  })
  
}

module.exports = {
  init
}
 
