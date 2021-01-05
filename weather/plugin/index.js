import wxp from './lib/wxp'
// import wxp from '../../lib/wxp'
wx.wxp = wxp

async function retrieveWeatherData() {
  let result = {}
  let res = await wx.wxp.getLocation({
    type: 'wgs84'
  })
  
  if (res && res.errMsg == 'getLocation:ok') {
    const latitude = parseFloat(res.latitude).toFixed(2)
    const longitude = parseFloat(res.longitude).toFixed(2)
    console.log('latitude',latitude,longitude);
    res = await wx.wxp.request({
      url: `https://res.abeim.cn/api-weather?lng=${longitude}&lat=${latitude}`
    })
    let weatherData = res.data
    console.log('weatherData', weatherData);
    let area = weatherData['地址']
    let areaRegMaths = area.match(/^[\u4e00-\u9fa5]+[区|市|县]{1}/g)
    if (areaRegMaths.length > 0) {
      area = areaRegMaths[0]
    }
    let now = weatherData['现在']
    let hours = weatherData['小时预报']
    let future = weatherData['预测天气']

    // 今天的数据
    let today = {
      area,
      temperature:now['温度']
    }

    result = {
      weatherData: res.data,
      area,
      now,
      hours,
      future,
      today
    }
  }
  return result
}

module.exports = {
  retrieveWeatherData,
  sayHello(){
    return 'hi'
  }
}