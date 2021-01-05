// plugin/pages/hello-page.js
import index from '../../index'

Page({
  data: {},
  async onShow() {
    let data = await index.retrieveWeatherData()
    this.setData(data)
  },
});