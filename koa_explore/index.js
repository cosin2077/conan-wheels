const Koa = require('koa')
const PORT = process.env.PORT || 6666
const qs = require('querystring')

const app = new Koa()
const cookieMap = {}
const cookieName = 'awesome-server-sig'
const userDatabase = [{
  name: 'conan',
  pass: '201010'
}]
const loginCookieList = [

]
const loginSuccess = (query) => {
  let {
    name,
    pass
  } = query
  if (!name || !pass) return false
  if (userDatabase.some(data => data.name === name && data.pass === pass)) {
    return true
  }
  return false
}

app.use((ctx,next)=>{
  console.log(ctx.request.URL)
  console.log(ctx.request.inspect())
  console.log(ctx.request.headers === ctx.response.req.headers)
  console.log(ctx.request.response === ctx.response)
  console.log(ctx.req === ctx.request.req &&ctx.request.req  === ctx.response.req)
  console.log('----------')
  console.log(ctx.req.path)
  console.log(ctx.req.url)
  console.log(ctx.req.query)
  console.log(ctx.req.method)
  console.log(ctx.req.header)
  console.log('----------')
  console.log(ctx.request.path)
  console.log(ctx.request.url)
  console.log(ctx.request.query)
  console.log(ctx.request.method)
  console.log(ctx.headerSent)
  console.log('----------')
  console.log(ctx.res.headers)
  console.log(ctx.inspect())
  ctx.set({
    'conan':666,
    'bbb':'xxx'
  })
  next()
})
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  // ctx.body = '7777'
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(async (ctx, next) => {
  console.log(loginCookieList)
  console.log(ctx.request.path)
  let query = ctx.request.query
  let cookie = ctx.cookies.get(cookieName)
  if (ctx.request.path.indexOf('logout') !== -1){
    console.log(cookie)
    if (cookie) {
      ctx.cookies.set(cookieName, cookie, {
        maxAge: -1
      })
    }
    return ctx.body = '退出成功！'
  }

  if (loginCookieList.indexOf(cookie) !== -1) {
    console.log('已经登录了哟！')
    return ctx.body = '已登录666！'
  }
  if (query && loginSuccess(query)) {
    let value = JSON.stringify(query) + Math.random()
    ctx.cookies.set(cookieName, value, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 一周,
      domain: 'localhost',
      httpOnly: true,
      sameSite: 'lax'
    })
    loginCookieList.push(value)
    ctx.body = '登录成功！'
  } else {
    // return ctx.body = '未登录哦！'
  }
  await next()
})
app.use(async (ctx, next) => {
  ctx.body = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.random())
    }, 100)
  })
  // await next()
})

const listen = (PORT) => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`)
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`PORT:${PORT} in use, use another port: ${+PORT + 1}`)
      setTimeout(() => {
        listen(+PORT + 1)
      }, 100)
    }
  })
}
listen(PORT)