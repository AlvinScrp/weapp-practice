// miniprogram/pages/index/index.js
import area from "../../lib/area"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList:area,
    show:false,
    progress:1
  },

  incressProgress(e){
    let progress = this.data.progress
    progress += 20
    console.log("progress",progress)
    progress = Math.min(100, progress)
    this.setData({
      progress:progress
    })
    
  },

  onClose(e){
    this.setData({ show: false })
  },

  onTap(e){
    this.setData({
      show:true
    })
  },

  onAreaConfirm(e){
    console.log(e.detail);
    this.onClose()
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