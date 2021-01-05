// plugin/components/hello-component.js
Component({
  properties: {},

  data: {
    showLogin:false,
    args: {
      withCredentials: true,
      lang: 'zh_CN'
    },
    weibao: {},
  },

  lifetimes: {
    attached: async function () {
      await wx.cloud.init({
        env: 'weapp-ebfl5'
      })
      let res = await wx.wxp.getSetting()
      console.log('res.authSetting',res.authSetting);

      if (res.authSetting['scope.userInfo']){
        this.getWeibao()
      }else{
        wx.showModal({
          title: '需登录后查看微报',
          showCancel: false
        })
        this.setData({
          showLogin:true
        })
      }
    }
  },

  methods: {
    async getWeibao(){
      
      // const db = wx.cloud.database()
      // let res = await db.collection('article')
      //   .limit(1)
      //   .orderBy("created_time", "desc")
      //   .get()

      // // return res 

      console.log('This is a plugin page!');
      let res = await wx.cloud.callFunction({
        name: 'get_weibao',
      })
      console.log('res', res);

      if (res.result.data.length > 0) {
        let weibao = res.result.data[0]
        this.setData({
          weibao
        })
      }
    },
    loginResult: function (res) {
      if (res.type == 'success'){
        this.getWeibao()
      }else{
        wx.showModal({
          title: 'login fail',
          showCancel: false
        })
      }
    },
  }
})