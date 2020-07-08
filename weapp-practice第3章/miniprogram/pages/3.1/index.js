// miniprogram/pages/3.1/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoginPanel:false
  },

  async requestHomeApi(e){
    const app = getApp()
    // 三个异步操作
    // const app = getApp()

    let res1 = await app.wxp.getSystemInfo()
    if (res1) console.log(res1)

    // Uncaught (in promise) thirdScriptError
    let res2 = await app.wxp.request2({
      url: 'http://localhost:3000/hi',
    })
    if (res2) console.log(res2)

    let res3 = await app.wxp.request2({
      url: 'http://localhost:3000/user/home',
    })
    if (res3) console.log('res3',res3)

    let res4 = await app.wxp.request3({
      url: 'http://localhost:3000/user/home',
    })
    if (res4) console.log('res4',res4)
  },

  showLoginPanel(e){
    this.setData({
      showLoginPanel:true
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