// miniprogram/pages/confirm-order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    userMessage:'',
    totalPrice:0,
    address:{
      userName:'选择'
    }
  },

  async onSubmit(e) {
    if (!this.data.address.id) {
      wx.showModal({
        title: '没有选择收货地址',
        showCancel: false
      })
      return
    }
    let address = this.data.address
    let addressDesc = `${address.userName},${address.telNumber},${address.region.join('')}${address.detailInfo}`
    let carts = this.data.carts
    let goodsCartsIds = carts.map(item => item.id)
    let goodsNameDesc = carts.map(item => `${item.goods_name}（${item.sku_desc}）x${item.num}`).join(',')
    if (goodsNameDesc.length > 200) goodsNameDesc = goodsNameDesc.substr(0, 200) + ".."
    let data = {
      totalFee: this.data.totalPrice,
      addressId: address.id,
      addressDesc,
      goodsCartsIds,
      goodsNameDesc
    }
    let res = await wx.wxp.request4({
      url: 'http://localhost:3000/user/my/order2',
      method: 'post',
      data
    })
    console.log(res);
    let payArgs = res.data.data.params
    wx.requestPayment({
      timeStamp: payArgs.timeStamp,
      nonceStr: payArgs.nonceStr,
      package: payArgs.package,
      signType: 'MD5',
      paySign: payArgs.paySign,
      success:async res1=> {
        console.log('success', res1);
        // requestPayment:ok
        if (res1.errMsg == 'requestPayment:ok') {
          // 微信支付成功
          await wx.wxp.showModal({
            title: '支持成功',
            showCancel: false
          })
          this.removeCartsGoods(goodsCartsIds)
        } else {
          // {errMsg: "requestPayment:fail cancel"}
          wx.showModal({
            title: '支持取消或失败了，请稍后得试',
            showCancel: false,
          })
        }
      },
      fail:(err1)=> {
        console.log('fail', err1);
      }
    })

  },

  // 将已经下单的商品从购物车中移除
  async removeCartsGoods(goodsCartsIds) {
    let data = {
      ids: goodsCartsIds
    }
    let res2 = await wx.wxp.request4({
      url: 'http://localhost:3000/user/my/carts',
      method: 'delete',
      data
    })
    console.log('res2', res2);

    if (res2.data.msg == 'ok') {
      wx.switchTab({
        url: '/pages/cart/index',
      })
    } else {
      wx.showModal({
        title: '更新购物车数据失败',
        showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('cartData', (res)=> {
      // console.log(res)
      this.setData({
        carts:res.data
      })
      this.calcTotalPrice()
    })
  },

  // 准备跳转地址列表表，选取地址
  toSelectAddress(){
    wx.navigateTo({
      url: '/pages/address-list/index',
      success:res=>{
        res.eventChannel.on('selectAddress', address=>{
          address.addressInfo = address.region.join('')+address.detailInfo 
          this.setData({
            address
          })
        })
      }
    })
  },
    // 重新计算总价
    calcTotalPrice(){
      let totalPrice = 0
      let carts = this.data.carts
      carts.forEach(item=>{
        totalPrice += item.price * item.num 
      })
      this.setData({
        totalPrice
      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})