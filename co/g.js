var fs = require('fs')

var readFile = function (fileName) {
	return new Promise((resolve,reject)=>{
		fs.readFile(fileName,(err,data)=>{
			if(err)reject(err)
			resolve(data)
		})
	})
}

var gen = function * () {
	var f1 = yield readFile('/etc/networks')
	var f2 = yield readFile('/etc/shells')
	var f3 = yield '6666'
	console.log('f1',f1.toString())
	console.log('f2',f2.toString())
	console.log('f3',f3.toString())
}

// var generator = gen()

// generator.next().value.then((data)=>{
// 	generator.next(data).value.then(data2=>{
// 		generator.next(data2)
// 	})
// })

function runCo(gen){
  var g = gen()
  function next(data){
    let { value, done } = g.next(data)
    if(done) return value
    if(value.then){
      value.then(data=>next(data))
    } else {
      next(value)
    }
  }
  next()
}
runCo(gen)







