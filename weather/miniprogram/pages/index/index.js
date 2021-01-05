var plugin = requirePlugin("weather");
Page({
  data: {},
  async onLoad() {
    let {
      today
    } = await plugin.retrieveWeatherData()

    this.setData({
      today
    })
  },
  // 控制分享
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      console.log(res.target.dataset)
      // 支持页面内多种分享
      if (res.target.dataset.kind == 'weather') {
        return {
          title: '每日天气',
          path: '/plugin://weather/index',
          imageUrl: './example.jpeg'
        }
      }
    }
    return {
      title: '插件测试',
      path: '/pages/index/index'
    }
  }
});