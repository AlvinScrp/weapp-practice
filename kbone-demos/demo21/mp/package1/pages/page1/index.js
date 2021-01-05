const mp = require('miniprogram-render')
const getBaseConfig = require('../base.js')
const config = require('../../config')

function init(window, document) {require('../../common/vendors~page1~page2.js')(window, document);require('../../common/default~page1~page2.js')(window, document);require('../../common/page1.js')(window, document)}

Page({
    ...getBaseConfig(mp, config, init),
    
    
    
})
