// miniprogram/pages/goods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSkuPanel: false,
    goodsId:0,
    goodsData:{},
    goodsImages: [],
    goodsContentInfo:{},
    goodsSkuData:{},
    selectedGoodsSku:{},
    selectedAttrValue:{},
    selectedGoodsSkuObject:{}
  },

    // 显示规格面板
    showSkuPanelPopup() {
      this.setData({ showSkuPanel: true });
    },

      // 关闭规格面板
  onCloseSkuPanel(){
    this.setData({ showSkuPanel: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let goodsId = options.goodsId
    this.data.goodsId = goodsId
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('goodsData', (res)=> {
      console.log(res)
      let goodsImages = res.data.goods_infos.filter(item=>(item.kind == 0))
      let goodsContentInfo = res.data.goods_infos.filter(item=>(item.kind == 1))[0]

      this.setData({
        goodsData:res.data,
        goodsImages,
        goodsContentInfo
      })
    })
    // 拉取sku规格数据
    let goodsSkuDataRes = await wx.wxp.request({
      url: `http://localhost:3000/goods/goods/${goodsId}/sku`,
    })
    if (goodsSkuDataRes){
      let goodsSkuData = goodsSkuDataRes.data.data 
      this.setData({
        goodsSkuData
      })
    }
  },

  onTapSkuTag(e){
    // 获取及设置选择的规格
    let attrvalue = e.currentTarget.dataset.attrvalue
    let attrKey = e.currentTarget.dataset.attrkey

    console.log('attrvalueid',attrvalue,attrKey);
    let selectedAttrValue = this.data.selectedAttrValue
    selectedAttrValue[attrKey] = attrvalue
    this.setData({
      selectedAttrValue
    })
    // 计算价格及库存
    let totalIdValue = 0
    let goodsAttrKeys = this.data.goodsSkuData.goodsAttrKeys
    for (let j=0;j<goodsAttrKeys.length;j++){
      let attrKey = goodsAttrKeys[j].attr_key
      if (selectedAttrValue[attrKey]){
        totalIdValue+=selectedAttrValue[attrKey].id
      }
    }
    console.log("totalIdValue", totalIdValue);
    
    let goodsSku = this.data.goodsSkuData.goodsSku
    let tempTotalIdValue = 0

    for(let j=0;j<goodsSku.length;j++){
      let goodsAttrPath = goodsSku[j].goods_attr_path 
      if (goodsAttrPath.length != goodsAttrKeys.length){
        break
      }
      tempTotalIdValue = 0
      goodsAttrPath.forEach(item=>tempTotalIdValue += item)
      console.log("tempTotalIdValue",tempTotalIdValue);

      if (tempTotalIdValue == totalIdValue){
        let selectedGoodsSku = goodsSku[j]
        this.setData({
          selectedGoodsSku
        })
        break;
      }
    }
  },

  // 确定选择当前规格
  onConfirmGoodsSku(){
    let goodsSkuData = this.data.goodsSkuData
    let selectedGoodsSkuObject = this.data.selectedGoodsSkuObject
    selectedGoodsSkuObject.sku = Object.assign({}, this.data.selectedGoodsSku)
    selectedGoodsSkuObject.text = ''
    for (let j=0;j<goodsSkuData.goodsAttrKeys.length;j++){
      let item = goodsSkuData.goodsAttrKeys[j]
      selectedGoodsSkuObject.text += this.data.selectedAttrValue[item.attr_key].attr_value + ' '
    }
    this.setData({
      selectedGoodsSkuObject,
      showSkuPanel: false
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