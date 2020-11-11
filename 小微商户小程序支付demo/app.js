App({
  onShow: function (options) {
    if (options.referrerInfo && options.referrerInfo.appId === 'wx2574b5c5ee8da56b') { 
      // 还应判断请求路径
      let extraData = options.referrerInfo.extraData
      this.globalData.paySuccess = extraData.paySuccess
      this.globalData.msg = extraData.msg
      this.globalData.orderId = extraData.orderId
    }
  },
  globalData: {
    msg: '',
    paySuccess: false,
    orderId: ''
  }
})