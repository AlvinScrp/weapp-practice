// miniprogram/pages/address-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAddressId: 0,
    addressList:[
      {
        id:0,
        user_name:'张三',
        tel_number:'13800000000',
        address_info:'新港中路397号'
      },
      {
        id:1,
        user_name:'李四',
        tel_number:'13800000000',
        address_info:'新港中路123号'
      }
    ]
  },

  // 跳转到新增地址页
  navigateToNewAddressPage(){
    wx.navigateTo({
      url: '/pages/new-address/index'
    })
  },

  // 从微信获取收货地址
  getAddressFromWeixin() {
    if (wx.canIUse('chooseAddress.success.userName')) {
      wx.chooseAddress({
        success: (res) => {
          console.log(res);

          let addressList = this.data.addressList
          let addressContained = addressList.find(item=>item.tel_number == res.telNumber)
          console.log(addressContained);
          
          if (addressContained){
            this.setData({
              selectedAddressId:addressContained.id
            })
            return 
          }

          let item = {
            id:addressList.length,
            user_name:res.userName,
            tel_number:res.telNumber,
            address_info:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
          addressList.push(item)
          this.setData({
            addressList,
            selectedAddressId:item.id
          })
        }
      })
    } else {
      wx.showModal({
        title: '可以手动编辑地址',
      })
    }

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