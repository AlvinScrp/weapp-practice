const Router = require("@koa/router")
const GoodsCatetory = require("../models/goods-category-model")
const Goods = require("../models/goods-model")
const GoodsInfo = require("../models/goods-info-model")
const GoodsSku = require("../models/goods-sku-model")
const GoodsAttrKey = require("../models/goods-attr-key-model")
const GoodsAttrValue = require("../models/goods-attr-value-model")
const db = require('../models/mysql-db')
const DataTypes = require('sequelize')

const router = new Router({
  prefix:"/goods"
})

router.get("/categories", async function(ctx){
  let categories = await GoodsCatetory.findAll({
    attributes:["id","category_name"]
  })
  ctx.status = 200
  ctx.body = {
    coce:200,
    msg:'ok',
    data:categories
  }
})

router.get("/goods", async function(ctx){
  let whereObj = {}
  let page_size = 20, page_index = 1;
  if (ctx.query.page_size) page_size = Number(ctx.query.page_size)
  if (ctx.query.page_index) page_index = Number(ctx.query.page_index)
  if (ctx.query.category_id) whereObj['category_id'] = Number(ctx.query.category_id)

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
    }],
    distinct:true
  })

  console.log(page_size, page_index, whereObj);

  ctx.status = 200
  ctx.body = {
    coce:200,
    msg:'ok',
    data:goods
  }
})

router.get("/goods/:id", async (ctx) => {
  let goodsId = Number(ctx.params.id)
  Goods.hasMany(GoodsInfo, {foreignKey: 'goods_id', targetKey: 'id'});

  let goods = await Goods.findOne({
    where:{
      id:goodsId
    },
    include: [{ 
      model: GoodsInfo,
      attributes: ['content', 'kind', 'goods_id']
    }],
  })
  ctx.status = 200
  ctx.body = {
      code: 200,
      msg: 'ok',
      data: goods
  }
})

router.get("/goods/:id/sku", async (ctx) => {
  let goodsId = Number(ctx.params.id)
  GoodsAttrKey.hasMany(GoodsAttrValue, {foreignKey: 'attr_key_id', targetKey: 'id'});

  let goodsSku = await GoodsSku.findAll({
    where:{
      goods_id:goodsId
    }
  })
  let goodsAttrKeys = await GoodsAttrKey.findAll({
    where:{
      goods_id:goodsId
    },
    attributes: ['id','attr_key', 'goods_id'],
    include: [{ 
      model: GoodsAttrValue,
      attributes: ['id','attr_value', 'attr_key_id', 'goods_id']
    }],
    distinct:true
  })
  ctx.status = 200
  ctx.body = {
      code: 200,
      msg: 'ok',
      data: {
        goodsSku,
        goodsAttrKeys
      }
  }
})

// get /user/my/carts
// router.get('/my/carts', async (ctx)=>{
//   // let {uid:user_id} = ctx.user 
//   // 如果不指定关联的外键，可以推断出外断为goodId
//   // {foreignKey: 'attr_key_id', targetKey: 'id'}
//   // error  goods is not associated to goods-carts!
//   // Goods.hasOne(GoodsCarts)
//   let user_id = 2

//   let res = await db.query(
//     `SELECT a.goods_sku_id,a.goods_id,a.goods_sku_desc,b.goods_attr_path,b.price,b.stock,c.goods_name,c.goods_desc 
//     FROM goods_carts as a 
//     left outer join goods_sku as b on a.goods_sku_id = b.id 
//     left outer join goods as c on a.goods_id = c.id 
//     where a.user_id = :user_id`, { replacements: { user_id:user_id }, type: db.QueryTypes.SELECT})

//     if (res){
//       for (let j=0;j<res.length;j++){
//         let item = res[j]
//         let goods_attr_path = item.goods_attr_path
//         let attr_values = await db.query("select id,attr_value from goods_attr_value where find_in_set(id,:attr_value_ids)", { replacements: { attr_value_ids:goods_attr_path.join(',') }, type: db.QueryTypes.SELECT})
//         item.attr_values = attr_values
//         item.sku_desc = goods_attr_path.map(attr_value_id =>{
//           return attr_values.find(item => item.id == attr_value_id).attr_value
//         }).join(' ')
//       }
//     }
  
//   ctx.status = 200
//   ctx.body = {
//     code: 200,
//     msg: 'ok',
//     data: res
//   }

// })

module.exports = router