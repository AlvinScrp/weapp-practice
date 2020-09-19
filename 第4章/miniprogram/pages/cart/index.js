// miniprogram/pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartIdSelectedResult: [],
    carts:[],
    allIsSelected:false,
    editMode: false
  },

  changeEditMode(){
    let editMode = !this.data.editMode
    this.setData({
      editMode
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // let res = await getApp().wxp.request4({
    //   url: 'http://localhost:3000/user/my/carts'
    // })
    // if (res) this.setData({
    //   carts:res.data.data
    // })
  },

  onShow: async function (options) {
    let res = await getApp().wxp.request4({
      url: 'http://localhost:3000/user/my/carts'
    })
    console.log(res);
    
    if (res) this.setData({
      carts:res.data.data
    })
  },

  onSelectGoodsItem(event) {
    let cartIdSelectedResult = event.detail

    this.setData({
      cartIdSelectedResult,
    });
  },
  onSelectAll(event) {
    let allIsSelected = event.detail
    let cartIdSelectedResult = this.data.cartIdSelectedResult
    cartIdSelectedResult.length = 0
    if (allIsSelected){
      for(let j=0;j<this.data.carts.length;j++){
        let cart = this.data.carts[j]
        cartIdSelectedResult.push(''+cart.id)
      }
    }

    this.setData({
      allIsSelected,
      cartIdSelectedResult
    });
  },

  async onCartGoodsNumChange(e){
    let goodsCartId = e.currentTarget.dataset.id 
    let oldNum = e.currentTarget.dataset.num 
    // detail就是stepper新值
    let num = parseInt( e.detail)
    let data = {num}
    console.log(goodsCartId,num);
    let res = await getApp().wxp.request4({
      url:`http://localhost:3000/user/my/carts/${goodsCartId}`,
      method:'put',
      data
    })
    // console.log('res',res);
    
    if (res.data.msg == 'ok' ){
      wx.showToast({
        title: num > oldNum ? '新增成功':'减少成功',
      })
    }
  },

  async removeCartGoods(){
    let ids = this.data.cartIdSelectedResult
    let data = {ids}
    let res = await getApp().wxp.request4({
      url:'http://localhost:3000/user/my/carts',
      method:'delete',
      data
    })
    console.log('res',res);
    if (res.data.msg == 'ok'){
      let carts = this.data.carts
      for (let j=0;j<ids.length;j++){
        let id = ids[j]
        carts.some((item,index)=>{
          if (item.id == id){
            carts.splice(index,1)
            return true 
          }
          return false 
        })
      }
      this.setData({
        carts
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
  // onShow: function () {

  // },

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