// components/login2/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    'show': function (value) {
      this.setData({
        visible: value
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    close(e){
      this.setData({
        visible: false
      })
    },
async login(e){
  let {
    userInfo,
    encryptedData,
    iv
  } = e.detail

  let token = null
  let tokenIsValid = false
  try {
    await getApp().wxp.checkSession()
    token = wx.getStorageSync('token')
    if (token) {
      tokenIsValid = true
    }
  } catch (error) {}

  if (!tokenIsValid) {
    let res1 = await getApp().wxp.login()
    let code = res1.code
    let res = await getApp().wxp.request({
      url: 'http://localhost:3000/user/wexin-login2',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        code,
        userInfo,
        encryptedData,
        iv
      }
    })
    console.log('登录接口请求成功', res.data)
    token = res.data.data.authorizationToken
    wx.setStorageSync('token', token)
    console.log('authorization', token)
  }

  getApp().globalData.token = token
  wx.showToast({
    title: '登陆成功了',
  })
  this.close()
  this.triggerEvent('loginSuccess')
  getApp().globalEvent.emit('loginSuccess')
},
  }
})
