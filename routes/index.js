const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = {
    msg: 'string',
    data: {
    },
    code: 0,
    success: true
  }
})

router.post('/post-test', async (ctx, next) => {
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
