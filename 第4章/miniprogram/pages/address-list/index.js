// miniprogram/pages/address-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAddressId: 0,
    addressList:[]
  },

  edit(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    let addressList = this.data.addressList
    let address = addressList.find(item=>item.id == id)
    wx.navigateTo({
      url: '/pages/new-address/index',
      success:(res)=>{
        res.eventChannel.emit('editAddress', address)
        res.eventChannel.on('savedNewAddress', this.onSavedAddress)
      }
    })
  },

  // 跳转到新增地址页
  navigateToNewAddressPage(){
    wx.navigateTo({
      url: '/pages/new-address/index',
      success:(res)=>{
        res.eventChannel.on('savedNewAddress', this.onSavedAddress)
      }
    })
  },

  // 编辑回来回调这个方法
  onSavedAddress(address){
    console.log(address);
          
    let addressList = this.data.addressList
    if (address.id){
      addressList.some((item,index)=>{
        if (item.id == address.id){
          addressList[index] = address
          return true 
        }
      })
    }else{
      addressList.push(address)
    }
    
    this.setData({
      addressList,
      selectedAddressId:address.id
    })
  },

  // 从微信获取收货地址
  getAddressFromWeixin() {
    if (wx.canIUse('chooseAddress.success.userName')) {
      wx.chooseAddress({
        success: async (res) => {
          console.log(res);

          let addressList = this.data.addressList
          let addressContained = addressList.find(item=>item.telNumber == res.telNumber)
          console.log(addressContained);
          
          if (addressContained){
            this.setData({
              selectedAddressId:addressContained.id
            })
            return 
          }

          let data = {
            userName:res.userName,
            telNumber:res.telNumber,
            detailInfo:res.detailInfo,
            region: [res.provinceName,res.cityName,res.countyName]
          }
          let res1 = await wx.wxp.request4({
            url: 'http://localhost:3000/user/my/address',
            method:'post',
            data
          })
          console.log(res1);
          if (res1.data.msg == 'ok'){
            let item = res1.data.data 
            addressList.push(item)
            this.setData({
              addressList,
              selectedAddressId:item.id
            })
          }else{
            wx.showToast({
              title: '添加不成功，是不是添加过了？',
            })
          }
          
        }
      })
    } else {
      wx.showModal({
        title: '可以手动编辑地址',
      })
    }

  },

  confirm(e){
    let selectedAddressId = this.data.selectedAddressId
    let addressList = this.data.addressList
    let item = addressList.find(item=>item.id == selectedAddressId)
    let opener = this.getOpenerEventChannel()
    opener.emit('selectAddress', item)
    wx.navigateBack({
      delta: 1,
    })
  },

  onAddressIdChange(e) {
    let id = e.detail
    this.setData({
      selectedAddressId: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res = await wx.wxp.request4({
      url: 'http://localhost:3000/user/my/address',
      method:'get'
    })
    let addressList = res.data.data 
    let selectedAddressId = addressList[0].id
    this.setData({
      addressList,
      selectedAddressId
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