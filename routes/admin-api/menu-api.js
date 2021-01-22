const {getRelust, postMethod, getByLimit, deleteMethod, updateMethod} = require('../../utlis/methods.js')
const router = require('koa-router')()


router.get('/menuApi/menu/list', async (ctx, next) => {
    try {
        console.log('请求进来了')
        let url = ctx.url;
        let request = ctx.request;
        let reqQuery = request.query;
        let req_queryString  = request.querystring;
        let result = await getRelust('tsAdmin', 'menuData', reqQuery)
        result = result.map(item => {
            return {
                id: item._id,
                label: item.label,
                path: item.path,
                type: item.type,
                name: item.name,
                parentId: item.parentId
            }
        })
        ctx.body = {
            msg: 'success',
            data: {
            array: result
            },
            code: 0,
            success: true
        }
        } catch (error) {
        console.log('error', error)
        ctx.status = err && err.status || 500
        ctx.body = {
            msg: JSON.stringify(error),
            code: 99999,
            success: false
        }
    }
})



router.post('/menuApi/menu/save', async (ctx, next) => {
    console.log('12312312312312313',ctx.request.body, '12312312312312313')
    try {
        await postMethod('tsAdmin', 'menuData', ctx.request.body)
        ctx.body = {
            code: 99999,
            success: true
        }
    } catch (error) {
        ctx.body = {
            msg: JSON.stringify(error),
            code: 000000,
            success: false
        }
        console.log(error,123)
    }
})

module.exports = router