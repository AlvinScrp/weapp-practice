/**
 * 此文件仅用于测试支付，正式环境请从后台获取支付参数。
 */
// 在下面设置商户号
const mchid = '9c97b8fce69e421ca3b6a4df72754ba2'

// 在下面设置密钥
// 特别注意：此项设置应该仅供测试，生产环境下请在后端完成签名，切忌在小程序内暴露商户密钥
const secret = 'ff28f46c445243aea7c5438febc7a3a9'

const getRandomNumber = (minNum = 1000000000, maxNum = 99999999999999) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

const getSign = obj => {
  /*
   * 签名算法
   * 
   * 由于密钥不应该在小程序内出现，因此生产环境下的小程序不应该包含此参数
   */

  let keys = Object.keys(obj)
  keys.sort()

  let params = []

  keys.forEach(e => {
    if (obj[e] != '') {
      params.push(e + '=' + obj[e])
    }
  })

  params.push('key=' + secret)

  let paramStr = params.join('&')
  const md5Util = require('/md5.js')
  let signResult = md5Util.md5(paramStr).toUpperCase() 

  return signResult
}


const getOrderParams = () => {
  /*
   * 用于获取小程序支付的参数
   * 
   * 本函数仅用于【模拟后端】，在生产环境下订单号的生成、签名等过程应当在后端完成，
   * 由后端直接包装好 orderParams 返回并传递给小程序
   * 
   */

  // 支付参数
  const totalFee = 1 // 支付金额，单位为分
  const body = '小程序支付测试' // 订单标题
  let nonce_str = getRandomNumber() // 随机数
  let timestamp = Date.now()
  let outTradeNo = timestamp // 商户端订单号
  let goods_detail = ''
  let attach = ''
  let notify_url = 'https://pay.xunhuweb.com/notify.php' // 异步通知地址

  let paramsObject =  {
    mchid,
    total_fee: totalFee,
    out_trade_no: outTradeNo,
    body,
    goods_detail,
    attach,
    notify_url,
    nonce_str
  }
  let sign = getSign(paramsObject)
  paramsObject.sign = sign
  return paramsObject
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}
module.exports = {getOrderParams, getSign, showBusy, showSuccess, showModel }