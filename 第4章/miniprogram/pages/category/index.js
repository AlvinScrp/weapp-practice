Page({
  data: {
    vtabs: [],
    activeTab: 0,
    goodsListMap:{}
  },

  async onLoad() {
    let categories = await wx.wxp.request({
      url: 'http://localhost:3000/goods/categories',
    })
    // console.log(categories);
    
    if (categories) categories = categories.data.data
    // const titles = ['热搜推荐', '手机数码', '家用电器',
    //   '生鲜果蔬', '酒水饮料', '生活美食', 
    //   '美妆护肤', '个护清洁', '女装内衣', 
    //   '男装内衣', '鞋靴箱包', '运动户外', 
    //   '生活充值', '母婴童装', '玩具乐器', 
    //   '家居建材', '计生情趣', '医药保健', 
    //   '时尚钟表', '珠宝饰品', '礼品鲜花', 
    //   '图书音像', '房产', '电脑办公']
    let vtabs = []
    for(let j=0;j<categories.length;j++){
      let item = categories[j]
      // this.getGoodsListByCategory(item.id,j)
      await this.getGoodsListByCategory(item.id)
      vtabs.push({title: item.category_name, id: item.id})
    }
  //   const vtabs = categories.map(item => {
  //     this.getGoodsListByCategory(item.id)
  //     return ({title: item.category_name,id:item.id})
  // })
    this.setData({vtabs})
  },

  async getGoodsListByCategory(categoryId){
    let goodsList = await wx.wxp.request({
      url: `http://localhost:3000/goods/goods?page_size=10&page_index=1&category_id=${categoryId}`,
    })
    console.log("goodsList",goodsList);
    
    if (goodsList) goodsList = goodsList.data.data.rows
    this.setData({
      [`goodsListMap[${categoryId}]`]:goodsList
    })
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  }

})
