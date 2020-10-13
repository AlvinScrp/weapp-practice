// miniprogram/pages/confirm-order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    totalPrice:0,
    address:{
      userName:'选择'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('cartData', res=>{
      this.setData({
        carts:res.data,
        totalPrice:res.totalPrice
      })
      // this.calcTotalPrice()
    })
  },

  toSelectAddress(){
    wx.navigateTo({
      url: '/pages/address-list/index',
      success:res=>{
        res.eventChannel.on('selectAddress', address=>{
          this.setData({
            address
          })
        })
      }
    })
  },

   // 计算总价
  //  calcTotalPrice(){
  //   let totalPrice = 0
  //   let carts = this.data.carts
  //   carts.forEach(item=>{
  //     totalPrice += item.price * item.num
  //   })
  //   this.setData({
  //     totalPrice
  //   })
  // },

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