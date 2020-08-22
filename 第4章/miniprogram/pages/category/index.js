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
      if (j<3) this.getGoodsListByCategory(item.id,j)
      // this.getGoodsListByCategory(item.id)
      vtabs.push({title: item.category_name, id: item.id})
    }
  //   const vtabs = categories.map(item => {
  //     this.getGoodsListByCategory(item.id)
  //     return ({title: item.category_name,id:item.id})
  // })
    this.setData({vtabs})

    // const categoryVtabsComponent = this.selectComponent("#category-vtabs")
    // console.log( categoryVtabsComponent.hello(1) );
    
  },

  // calcChildHeight
  reClacHeight(index){
    const categoryVtabsComponent = this.selectComponent("#category-vtabs")
    const vtabContnet = this.selectComponent(`#category-vtabs-content${index}`)
    categoryVtabsComponent.calcChildHeight(vtabContnet)
  },

  async getGoodsListByCategory(categoryId, index){
    let goodsList = await wx.wxp.request({
      url: `http://localhost:3000/goods/goods?page_size=10&page_index=1&category_id=${categoryId}`,
    })
    console.log("goodsList",goodsList);
    
    if (goodsList) goodsList = goodsList.data.data.rows
    this.setData({
      [`goodsListMap[${categoryId}]`]:goodsList
    })
    this.reClacHeight(index)
  },

  onCategoryChanged(index){
    let cate = this.data.vtabs[index]
    let category_id = cate.id 
    if (!this.data.goodsListMap[category_id]){
      this.getGoodsListByCategory(category_id, index)
    }
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
    this.onCategoryChanged(index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
    this.onCategoryChanged(index)
  }

})
