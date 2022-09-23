class Observer {
  constructor(generator, subscriptionReference) {
    this._generator = generator;
    this._subscriptionReference = subscriptionReference;
  }

  next(value) {
    var iterationResult = this._generator.next(value);
    if(typeof iterationResult !== 'undefined' && iterationResult.done) {
      this._subscriptionReference.value.dispose();
    }
    return iterationResult;
  }

  throw(err) {
    this._subscriptionReference.value.dispose();
    var _throw = this._generator.throw;
    if(_throw) {
      return _throw.call(this, err);
    }
  }

  return(value) {
    this._subscriptionReference.value.dispose();
    var ret = this._generator.ret;
    if(ret) {
      return ret.call(this, value);
    }
  }
}

class MapObserver extends Observer {
  constructor(projectionFn, generator, subscription) {
    super(generator, subscription);
    this._projectionFn = projectionFn;
  }

	next(value){
    return super.next(this._projectionFn(value));
  }
}
var gen = function*(){
  yield 1
  yield 2
  yield 3
}
var a = new MapObserver(x=>{x},gen(),{
  value:{
    dispose: () => console.log('笑嘻嘻、唧唧唧')
  }
})


