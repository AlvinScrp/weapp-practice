const Router = require("@koa/router")
const GoodsCategory = require("../models/goods-category-model")

const router = new Router({
  prefix: '/goods'
});

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

module.exports = router