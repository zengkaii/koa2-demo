const {getRelust, postMethods, getByLimit, deleteMethod, updateMethod} = require('../../utlis/methods.js')
const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string/all', async (ctx, next) => {
  try {
    console.log('请求进来了')
    let url = ctx.url;
    let request = ctx.request;
    let reqQuery = request.query;
    let req_queryString  = request.querystring;
    console.log(url, 'url')
    console.log(reqQuery, 'req_query')
    console.log(req_queryString , 'req_queryString ')
    let result = await getByLimit('test', 'mycol2', reqQuery)
    ctx.body = {
      msg: 'success',
      data: {
        array: result
      },
      code: 0,
      success: true
    }
  } catch (error) {
    console.log(error)
    ctx.status = err && err.status || 500
    ctx.body = {
      msg: JSON.stringify(error),
      code: 99999,
      success: false
    }
  }
})

router.post('/post-test', async (ctx, next) => {
  console.log(ctx, 'post-test')
  // await postMethod('test', 'mycol2')
  ctx.status = 200
  ctx.body = {
    msg: 'post-test',
    data: {
      
    },
    code: 0,
    success: true
  }
})
router.post('/delete-test', async (ctx, next) => {
  console.log(ctx, 'post-test')
  await deleteMethod('test', 'mycol2', {"_id": "5ed752125fbc9902c4e5cf93"})
  ctx.status = 200
  ctx.body = {
    msg: 'post-test',
    data: {
      
    },
    code: 0,
    success: true
  }
})

router.post('/update-test', async (ctx, next) => {
  console.log(ctx, 'post-test')
  await updateMethod('test', 'mycol2', {"name": "zzzz"}, {"url": "xxx"})
  ctx.status = 200
  ctx.body = {
    msg: 'post-test',
    data: {
      
    },
    code: 0,
    success: true
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
