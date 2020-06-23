var koa = require('koa')
const { connect } = require('cookies')

var app = new koa()


app.use((ctx,next)=>{
  console.log(ctx.app)
  next
})
.app
