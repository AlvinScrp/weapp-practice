// miniprogram/pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartIdSelectedResult:[],
    allIsSelected:false,
    editMode:false,
    carts:[]
  },

  changeEditMode(){
    let editMode = !this.data.editMode
    this.setData({
      editMode
    })
  },

  onSelectGoodsItem(e){
    let cartIdSelectedResult = e.detail
    this.setData({
      cartIdSelectedResult,
    });
  },
  onSelectAll(event) {
    let allIsSelected = event.detail
    let cartIdSelectedResult = this.data.cartIdSelectedResult
    cartIdSelectedResult.length = 0

    if (allIsSelected){
      cartIdSelectedResult.push("1")
      cartIdSelectedResult.push("2")
    }

    this.setData({
      allIsSelected,
      cartIdSelectedResult
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res = await getApp().wxp.request4({
      url:'http://localhost:3000/user/my/carts',
      method:'get'
    })
    if (res.data.msg == "ok"){
      let carts = res.data.data 
      this.setData({
        carts
      })
    }
  },

  async onCartGoodsNumChanged(e){
    let cartGoodsId = e.currentTarget.dataset.id 
    let oldNum = parseInt( e.currentTarget.dataset.num )
    // console.log('e.detail', typeof e.detail, cartGoodsId, oldNum)
    let num = e.detail
    let data = {num}

    let res = await getApp().wxp.request4({
      url:`http://localhost:3000/user/my/carts/${cartGoodsId}`,
      method:'put',
      data 
    })
    if (res.data.msg == 'ok'){
      wx.showToast({
        title: num > oldNum ? '增加成功' : '减少成功',
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