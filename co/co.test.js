const runCo = require('./co')

var fs = require('fs')
const { resolve } = require('path')

var readFile = function (fileName) {
	return new Promise((resolve,reject)=>{
		fs.readFile(fileName,(err,data)=>{
			if(err)reject(err)
			resolve(data)
		})
	})
}
var generator = function * () {
	var f1 = yield readFile('/etc/networks')
	var f2 = yield readFile('/etc/shells')
  var f3 = yield '6666'
  // var fun2 = yield new Promise((resolve,reject)=>reject(111111))
  var err = yield new Error('error').message
	var fun1 = yield () => 9527
	var gen1 = yield function*(){
    yield 1
    yield 2
    yield 3
  }
	yield function*(){
    yield 0
  }
	// console.log('f1',f1.toString())
	// console.log('f2',f2.toString())
	// console.log('f3',f3.toString())
	// console.log('r',r)
	// console.log(err)
}

// var generator = gen()

// generator.next().value.then((data)=>{
// 	generator.next(data).value.then(data2=>{
// 		generator.next(data2)
// 	})
// })

runCo(generator)







