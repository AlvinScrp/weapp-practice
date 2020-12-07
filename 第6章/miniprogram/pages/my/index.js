// miniprogram/pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    currentUserDocId:''
  },
  // 测试文件拉取
  async testForFileRetrieve(e){
    const fileID = 'cloud://weapp-ebfl5.7765-weapp-ebfl5-1301675402/img.png'
    let res = await wx.wxp.cloud.getTempFileURL({
      fileList: [{
        fileID,
        maxAge: 60 * 60, // one hour
      }]
    })
    let url = res.fileList[0].tempFileURL
    // 可以浏览器打开这个地址，或直接在页面中展示
    console.log('url',url);
    
  },

  // 测试文件上传
  async testForFileUpload(e){
    let res1 = await wx.wxp.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    })
    const tempFilePath = res1.tempFilePaths[0]
    let res = await wx.wxp.cloud.uploadFile({
      cloudPath: 'img.png',
      filePath: tempFilePath, // 本地临时文件路径
    })
    // {errMsg: "cloud.uploadFile:ok", fileID: "cloud://weapp-ebfl5.7765-weapp-ebfl5-1301675402/img.png", statusCode: 204}
    // cloud://weapp-ebfl5.7765-weapp-ebfl5-1301675402/img.png
    console.log('res',res);
  },

  // 测试聊天，实时数据推送
  async testForChat(e){
    const db = wx.cloud.database()
    const watcher = db.collection('message')
      .orderBy('_id', 'desc')
      .limit(10)
      .where({
        room: '100000'
      })
      .watch({
        onChange: function(snapshot) {
          if (snapshot.docs.length){
            let doc = snapshot.docs[0]
            console.log('doc', doc);
          }
          // console.log('docs\'s changed events', snapshot.docChanges)
          // console.log('query result snapshot after the event', snapshot.docs)
          // console.log('is init data', snapshot.type === 'init')
        },
        onError: function(err) {
          console.error('the watch closed because of error', err)
        }
      })
  },
  testForSend(e){
    const db = wx.cloud.database()
    db.collection('message').add({
      data:{
        room:'100000',
        user:'weapp',
        text:'message'+Math.random()*1000
      }
    })
  },
  async testForSend2(e){
    await wx.wxp.cloud.callFunction({
      name: 'add_message',
    })
  },

  // 测试小程序内拉取用户
  async testForGetUser(e){
    const db = wx.cloud.database()
    const res = await db.collection('user').doc(this.data.currentUserDocId).get()
    // {data: {…}, errMsg: "document.get:ok"}
    
    if (res.errMsg == 'document.get:ok'){
      console.log('user',res.data);
    }
  },

  // 测试调用云函数add_user
  async testForAddUser(e){
    let data = Object.assign({}, this.data.userInfo)
    // data.openid = getApp().globalData.openid
    console.log('data',data);
    let res = await wx.wxp.cloud.callFunction({
      name: 'add_user',
      data,
    })
    console.log('add_user', res);
    if (res.result.msg == 'ok'){
      this.setData({
        currentUserDocId:res.result._id
      })
      console.log(`新增或更新用户成功，_id为${res.result._id}`);
    }
  },


  // 测试云支付
  async testForWexinPay(e) {
    const getRandomNumber = (minNum = 1000000000, maxNum = 99999999999999) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    let ipQueryDataRes = await wx.wxp.request({
      url: 'http://ip-api.com/json'
    })
    console.log('ipQueryDataRes',ipQueryDataRes);
    let ip = ipQueryDataRes ? ipQueryDataRes.data.query : '127.0.0.1'
    let data = {
      body: '云支付测试商品',
      outTradeNo: '' + getRandomNumber(),
      totalFee: 1,
      ip
    }
    console.log('data', data);

    wx.cloud.callFunction({
      name: 'pay',
      data,
      success: res => {
        const payment = res.result.payment
        console.log('payment', res);
        wx.requestPayment({
          ...payment,
          success(res) {
            console.log('pay success', res)
          },
          fail(res) {
            console.error('pay fail', res)
          }
        })
      },
      fail: console.error,
    })
  },

  // 以下关于云登录

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // data:传递给云函数的参数，在云函数中可通过 event 参数获取
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('user openid: ', res.result.openid)
        // 全局globalData已有
        getApp().globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
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