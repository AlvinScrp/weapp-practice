//index.js
const utils = require('../../utils/util.js')

Page({
  data: {
    orderParams: {}, // 支付发起参数
    orderResults: {}, // 支付结果
    preparePay: false, // 用户点击了支付按钮
    paying: false, // 标记用户是否已经点击了
    needRefreshOrderParams: false // 需要刷新订单信息，在此示例中，为了测试方便，允许支付一个订单号再进行一次新的支付行为；在生产环境下判断支付成功后直接跳转到订单页面即可
  },
  onTapPay: function() {
    // 事件处理函数 - 点击支付按钮
    this.setData({ preparePay: true })
  },
  onTapRefresh: function() {
    let orderParams = utils.getOrderParams()
    this.setData({
      orderParams,
      needRefreshOrderParams: false
    })
  },
  //正式环境使用
  bindPay: function() {
    var that = this
    // 待传入的
    wx.request({
        url: '商户侧后端请求支付参数的网址',
        success: response => {
            let extraData = {
              'mchid': response['mchid'], // 商户号
              'out_trade_no': response['out_trade_no'],
              'total_fee': response['total_fee'],
              'body': response['body'],
              'notify_url': response['notify_url'],
              'attach': response['attach'],
              'nonce': response['nonce'],
              'sign': response['sign']
            }
            that.setData({orderParams:extraData})
        }
    })
  },

  onTapRefresh: function() {
    let orderParams = utils.getOrderParams()
    this.setData({
      orderParams,
      needRefreshOrderParams: false
    })
  },
  onLoad: function () {
  },
  onShow: function () {
    if (this.data.paying) return;
    // 尚未支付
    // 获取、设置支付参数
    let orderParams = utils.getOrderParams()
    this.setData({ orderParams })
  },
  /**
   * 支付成功的事件处理函数
   * 
   * res.detail 为 xunhupay 小程序返回的订单信息
   * 
   * 可通过 res.detail.orderId 拿到 xunhupay 支付单号
   */
  bindPaySuccess (res) {
    console.log('success', res)
    this.setData({
      orderResults: res.detail.info,
      needRefreshOrderParams: true
    })
    wx.showModal({
      title: '支付成功',
      content: '支付单号：' + res.detail.info.orderId,
      showCancel: false
    })
  },
  /**
   * 支付失败的事件处理函数
   * 
   * res.detail.error 为 true 代表传入小组件的参数存在问题
   * res.detail.navigateSuccess 代表了是否成功跳转到 xunhupay 小程序
   * res.detail.info 可能存有失败的原因
   * 
   * 如果下单成功但是用户取消支付则可在 res.detail.info.orderId 拿到 xunhupay 订单号
   */
  bindPayFail (res) {
    console.log('fail', res)
    this.setData({
      orderResults: res.detail.info,
      needRefreshOrderParams: true
    })
    if (res.detail.error) {
      console.error('发起支付失败', res.detail.info)
    } else if (res.detail.navigateSuccess) {
      console.log('[取消支付] 支付单号：', res.detail.info.orderId)
    }
  },
  /**
   * 支付完毕的事件处理函数
   * 
   * 无论支付成功或失败均会执行
   * 应当在此销毁 xunhupay 组件
   */
  bindPayComplete () {
    console.log('complete')
    this.setData({
      preparePay: false, // 销毁 xunhupay 组件
    })
  },
  /**
   * 组件内部数据被修改时的事件
   * 
   * 当前仅用于监听 paying 数据
   * 当用户跳转到 xunhupay 小程序并等待返回的过程中 paying 值为 true
   */
  bindDataChange (res) {
    if (res.detail.paying) {
      this.setData({
        paying: res.detail.paying
      })
    }
  }
})
