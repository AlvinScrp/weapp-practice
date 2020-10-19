const app = getApp()
var timer = null
Page({
  data: {
    number: 0,
    tips: '下载中，当前进度0%'
  },
  onUnload() {
    clearInterval(timer)
  },
  onLoad() {
    timer = setInterval(() => {
      if (this.data.number === 100) {
        clearInterval(timer)
        this.setData({
          tips: '下载已完成'
        })
      } else {
        this.setData({
          number: this.data.number += 5,
          tips: `下载中，当前进度${this.data.number+=5}%`
        })
      }
    }, 200)
  },
  reloadProgress(e) {
    this.setData({
      number: 0
    });
    if (wx.canIUse('nextTick')) {
      wx.nextTick(() => {
        this.setData({
          number: 100
        });
      });
    } else {
      setTimeout(() => {
        this.setData({
          number: 100
        });
      }, 17);
    }
  },
  reloadProgress2(e) {
    // 去掉这行代码是不行的
    console.log(new Date().getTime());
    this.setData({
      number: 0
    });
    console.log(new Date().getTime());
    this.setData({
      number: 100
    });
  }
})