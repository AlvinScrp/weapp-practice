const Router = require("@koa/router")
const GoodsCategory = require("../models/goods-category-model")
const Goods = require("../models/goods-model")
const GoodsInfo = require("../models/goods-info-model")

const router = new Router({
  prefix: '/goods'
});

// 返回所有分类
router.get("/categories", async (ctx) => {
    const categories = await GoodsCategory.findAll({
      attributes: ['category_name', 'id']
    })
    console.log('categories',categories);
    ctx.status = 200
    ctx.body = {
        code: 200,
        msg: 'ok',
        data: categories
    }
})

// 分页按类别返回商品列表
router.get("/goods", async (ctx) => {
  let whereObj = {}
  let page_size = 20, page_index = 1;
  if (ctx.query.page_size) page_size = Number(ctx.query.page_size)
  if (ctx.query.page_index) page_index = Number(ctx.query.page_index)
  if (ctx.query.category_id) whereObj['category_id'] = Number(ctx.query.category_id)

  console.log(page_size, page_index, whereObj);

  // 定制外键关系
  Goods.hasMany(GoodsInfo, {foreignKey: 'goods_id', targetKey: 'id'});

  let goods = await Goods.findAndCountAll({
    where: whereObj,
    order: [
      ['id', 'desc']
    ],
    limit: page_size,
    offset: (page_index-1)*page_size,
    include: [{ 
      model: GoodsInfo,
      attributes: ['content', 'kind', 'goods_id'], 
      where: {'kind':0}
    }]
  })
  ctx.status = 200
  ctx.body = {
      code: 200,
      msg: 'ok',
      data: goods
  }
})

module.exports = router