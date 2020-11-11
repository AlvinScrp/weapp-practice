const md5Util = require('./md5.js')

// 在下面设置商户号
const mchid = '9c97b8fce69e421ca3b6a4df72754ba2'
// 在下面设置密钥
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
  let signResult = md5Util.md5(paramStr).toUpperCase() 

  return signResult
}

const getOrderParams = (trade) => {
  // 支付参数
  let nonce_str = getRandomNumber() // 随机数
  let goods_detail = ''
  let attach = ''

  let paramsObject =  {
    mchid,
    total_fee: trade.total_fee,
    out_trade_no: trade.out_trade_no,
    body:trade.body,
    goods_detail,
    attach,
    notify_url:trade.notify_url,
    nonce_str
  }
  let sign = getSign(paramsObject)
  paramsObject.sign = sign
  return paramsObject
}

module.exports = {
  getOrderParams
}