const app = getApp()
let viewId = 5
const createRecycleContext = require('miniprogram-recycle-view')

function rpx2px(rpx) {
  return (rpx / 750) * wx.getSystemInfoSync().windowWidth
}

Page({
  data: {
    // arr: [],
  },

  onReady: function () {
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        width: rpx2px(650),
        height: rpx2px(100)
      }
    })
    let newList = []
    for (let i = 0; i < 100; i++) {
      newList.push({
        id: i,
        name: `标题${i + 1}`
      })
    }
    ctx.append(newList)

    // 
    // const arr = []
    // for (let i = 0; i < 20; i++) arr.push(i)
    // this.setData({
    //   arr
    // })

  },

})