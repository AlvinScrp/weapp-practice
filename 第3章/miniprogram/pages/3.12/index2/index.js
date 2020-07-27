// miniprogram/pages/3.12/index2/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initData:{}
  },
  async onPageNavigating(e){
    console.log("targetPageUrl",e.detail.targetPageUrl)
    let res = await wx.wxp.request({
      url: 'http://localhost:3000/hi?name=index2',
    })
    e.detail.eventCallback({
      openType:"initData",
      openData:{
        a:res.data
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel.on){
      eventChannel.on('initData', (data)=> {
        console.log("data",data)
        this.setData({
          initData:data
        })
      })
    }
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