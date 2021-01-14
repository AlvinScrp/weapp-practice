// plugin/pages/hello-page.js
Page({
  data: {
    args: {
      withCredentials: true,
      lang: 'zh_CN'
    }
  },
  loginSuccess: function (res) {
    console.log(res.detail);
  },
  loginFail: function (res) {
    console.log(res);
  },
  async onLoad() {
    await wx.cloud.init({
      env: 'weapp-ebfl5',
      traceUser: true,
    })

    const db = wx.cloud.database()
    let res = await db.collection('article')
      .limit(1)
      .orderBy('created_time', 'desc')
      .get()

    // return res 

    // console.log('This is a plugin page!');
    // let res = await wx.wxp.cloud.callFunction({
    //   name: 'get_weibao',
    // })
    console.log('res', res);
  }
});