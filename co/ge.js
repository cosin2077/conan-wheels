// 支持 yield promise，thunk，[generator]，primitive value
function runCo(gen) {
  var g = isGenerator(gen) ? gen : gen()
  var doneFn

  function next(data, err) {
    err && console.log(`err:${err}`)
    if (err) {
      try{
        g.throw(err)
      }catch(err){
        if(!doneFn) throw e
        return doneFn(e)
      }
    }
    let {
      value,
      done
    } = g.next(data)
    console.log(`data:`, data,' value:',value,' done:',done)
    if (done) {
      if(doneFn) return doneFn(null,value)
      return value
    }
    if (value && typeof value.then === 'function') 
      value.then(next).catch(err => next(null, err))
    else if (isGeneratorFunction(value)){
      next(runCo(value))
    } 
    else if (typeof value === 'function')
      next(value())
    else {
      next(value)
    }
  }
  next()
  return function(fn){
    doneFn = fn
  }
}

function isPromise(obj) {
  return obj && typeof obj.then == 'function'
}

function isGenerator(obj) {
  return obj && '[object Generator]' == Object.prototype.toString.call(obj)
}

function isGeneratorFunction(obj) {
  return obj && obj.constructor && obj.constructor.name == 'GeneratorFunction'
}
module.exports = runCo