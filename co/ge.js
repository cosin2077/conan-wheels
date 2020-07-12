// 支持 yield promise，thunk，[generator]，primitive value
function runCo(gen) {
  var g = isGenerator(gen) ? gen : gen()
  var doneFn

  function next(data, err) {
    console.log(`err:${err}`)
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
    console.log(`getting:`, value)
    if (done) {
      if(doneFn) return doneFn(null,value)
    }
    if (value.then) 
      value.then(next).catch(err => next(null, err))
    if (typeof value === 'function')
      next(value())
    if (isGeneratorFunction(value))
      next(runCo(value))
    else {
      next(value)
    }
  }
  next()
  return function(doneFn){
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
  return obj && obj.constructor && Generator == 'GeneratorFunction'
}
module.exports = runCo