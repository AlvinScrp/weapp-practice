Page({
  data: {
    // 示例 1 代码
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 20px;padding:20px;'
      },
      children: [{
        type: 'text',
        text: '第一种原生rich-text'
      }, {
        name: 'img',
        attrs: {
          src: 'https://cdn.nlark.com/yuque/0/2020/png/1252071/1590050577182-04e7bc86-3d54-457d-8991-b9f6d40b6e94.png',
          style: 'width:100%'
        }
      }, {
        name: 'img',
        attrs: {
          src: 'https://cdn.nlark.com/yuque/0/2020/png/1252071/1590050624644-dd5948db-22fe-48d9-af37-8a2a9f099715.png',
          style: 'width:100%'
            // ,style:'width:100%;font-size:0;display:block;'//修改样式
            ,
          class: 'img'
        }
      }, {
        name: 'img',
        attrs: {
          src: 'https://cdn.nlark.com/yuque/0/2020/png/1252071/1590050624644-dd5948db-22fe-48d9-af37-8a2a9f099715.png',
          style: 'width:100%'
        }
      }]
    }],
    urls: [],
    tagStyle: {
      img: 'font-size:0;display:block;',
    },
    html: "<div>第二种方法parser<span>message</span><img src='https://cdn.nlark.com/yuque/0/2020/png/1252071/1590050624644-dd5948db-22fe-48d9-af37-8a2a9f099715.png' /><img src='https://cdn.nlark.com/yuque/0/2020/png/1252071/1590050624644-dd5948db-22fe-48d9-af37-8a2a9f099715.png' /></div>"
  },
  tap(e) {
    let urls = this.data.urls
    wx.previewImage({
      current: urls[0],
      urls: urls
    })
  },
  onReady() {
    // 取出 urls
    function findUrl(nodes) {
      let urls = []
      nodes.forEach(item => {
        if (item.name == 'img' && item.attrs) {
          for (const key in item.attrs) {
            if (key == 'src') {
              urls.push(item.attrs[key])
            }
          }
        }
        if (item.children) {
          urls = urls.concat(findUrl(item.children))
        }
      })
      return urls
    }
    this.data.urls = findUrl(this.data.nodes)
  },
  onTapImage(e) {
    console.log('iamge url', e.detail.src)
  }
})