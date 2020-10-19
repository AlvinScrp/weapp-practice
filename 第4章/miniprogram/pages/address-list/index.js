// miniprogram/pages/address-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: 0,
    selectedAddressId: 0,
    addressList:[
      {
        id:0,
        userName:'小王',
        telNumber:'021-238383388',
        region:['广东省', '广州市', '海珠区'],
        detailInfo:'详情楼房号123'
      },
      {
        id:1,
        userName:'小李',
        telNumber:'051-238383388',
        region:['广东省', '广州市', '海珠区'],
        detailInfo:'楼房号1777'
      }
    ]
  },

  getAddressFromWeixin(e){
    if (wx.canIUse('chooseAddress.success.userName')){
      wx.chooseAddress({
        success: (res) => {
          console.log(res);
          let addressList = this.data.addressList

          let addressContained = addressList.find(item=>item.telNumber == res.telNumber)
          if (addressContained){
            this.setData({
              selectedAddressId:addressContained.id
            })
            return 
          }

          let address = {
            id:addressList.length,
            userName:res.userName,
            telNumber:res.telNumber,
            region:[res.provinceName,res.cityName,res.countyName],
            detailInfo:res.detailInfo
          }
          addressList.push( address )

          this.setData({
            selectedAddressId:address.id,
            addressList
          })
        },
      })
    }
  },
  
  onChange(event) {
    this.setData({
      selectedAddressId: event.detail,
    });
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