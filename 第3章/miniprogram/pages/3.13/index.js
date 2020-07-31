// miniprogram/pages/3.13/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async extendPageTest(){
    // 使用request3
    let res4 = await wx.wxp.request4({
      url: 'http://localhost:3000/user/home',
    })
    if (res4) console.log('res4', res4)

    // res4 = await wx.wxp.request4({
    //   url: 'http://localhost:3000/',
    // })
    // if (res4) console.log('res4', res4)

    wx.requestWithCookie({
        url: 'http://localhost:3000/',
        success: function (res) {
            console.log(res)
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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