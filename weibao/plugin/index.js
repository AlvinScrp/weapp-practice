import wxp from './lib/wxp'
// import wxp from '../../lib/wxp'
wx.wxp = wxp

module.exports = {
  sayHello: function () {
    console.log('Hello plugin!')
  },
  answer: 42
}