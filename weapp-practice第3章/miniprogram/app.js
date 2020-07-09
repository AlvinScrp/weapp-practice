//app.js
// import Event from './lib/event'
// import wxp from './lib/wxp'
import { promisifyAll } from 'miniprogram-api-promise'
const wxp = {}
promisifyAll(wx, wxp)

wxp.request2 = function(args){
  let token = wx.getStorageSync('token')
  if (token){
    if (!args.header) args.header = {}
    args.header['Authorization'] = `Bearer ${token}`
  }
  return wxp.request(args).catch(function(err) {
    console.log('err',err)
 })
}

App({
  wxp:wxp,
  globalData:{},
  // globalEvent:new Event(),
  onLaunch: async function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'default-98491d',
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
