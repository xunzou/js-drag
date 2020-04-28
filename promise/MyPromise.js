class MyPromise {
  constructor(executor){
    this._resolveQueue = []    // then收集的执行成功的回调队列
    this._rejectQueue = []     // then收集的执行失败的回调队列
    this._status = 'pending';
    this._value = undefined    // 储存then回调return的值
    let resolve = result => {
      const run = () => {
        if(this._status!== 'pending') return
        this._status = 'fulfilled'
        this._value = result
        // 从成功队列里取出回调依次执行
        while(this._resolveQueue.length) {
          const callback = this._resolveQueue.shift()
          callback(result)
        }
      }
      setTimeout(run)
    }
    let reject = reason => {
      const run = () => {
        if(this._status!== 'pending') return
        this._status = 'rejected'
        this._value = reason
        while(this._rejectQueue.length) {
          const callback = this._rejectQueue.shift()
          callback(reason)
        }
      }
      setTimeout(run)
    }
    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }

  }
  // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  then(resolveFn, rejectFn) {
    typeof resolveFn !== 'function' ? resolveFn = v => v : null
    typeof rejectFn !== 'function' ? rejectFn = r => {
      throw new Error(r instanceof Error? r.message:r);
    } : null
    // this._resolveQueue.push(resolveFn)
    // this._rejectQueue.push(rejectFn)
    return new MyPromise((resolve,reject) => {
      const fulfilledFn = v => {
        try {
          let x = resolveFn(v)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        }
        catch(e){
          reject(e)
        }
      }
      // this._resolveQueue.push(fulfilledFn)
      const rejectedFn = error => {
        try {
          let x = rejectFn(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      // this._rejectQueue.push(rejectedFn)
      switch (this._status) {
        // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
        case 'pending':
          this._resolveQueue.push(fulfilledFn)
          this._rejectQueue.push(rejectedFn)
          break;
        // 当状态已经变为resolve/reject时,直接执行then回调
        case 'fulfilled':
          fulfilledFn(this._value)    // this._value是上一个then回调return的值(见完整版代码)
          break;
        case 'rejected':
          rejectedFn(this._value)
          break;
      }
    })
  }
  // catch
  catch(rejectFn){
    return this.then(undefined,rejectFn)
  }
  // finally
  finally(cb){
    return this.then(
      v => MyPromise.resolve(cb()).then( () => v),
      e => MyPromise.reject(cb()).then( () => {throw reason})
    )
  }
  // 静态 resolve 方法
  static resolve(v){
    if(v instanceof MyPromise) return v;
    return new MyPromise(r => r(v))
  }
  // 静态 reject 方法
  static reject(err){
    return new MyPromise((resolve,reject) => reject(err) )
  }
  // 静态 all 方法
  static all(arr){
    let index = 0
    let result = []
    return new MyPromise((resolve,reject)=> {
      arr.forEach((ele,i) => {
        MyPromise.resolve(ele).then(
          v => {
            index++
            result[i] = v
            if(index == arr.length){
              resolve(result)
            }
          },
          err => {
            reject(err)
          }
        )
      });
    })
  }
  // 静态 race 方法
  static race(arr){
    return new MyPromise( (resolve,reject) => {
      for (const iterator of arr) {
        MyPromise.resolve(iterator).then(
          v => resolve(v),
          err => reject(err)
        )
      }
    })
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(11)
  }, 500);
})

p1
  .then(res => {
    console.log(res)
    return 22
  })
  .then(res => {
    console.log(res)
    return 33
  })
  .then(res => {
    console.log(res)
  })

  const p2 = new MyPromise((resolve, reject) => {
      resolve(1111)
  })
  
  p2
    .then(res => {
      console.log(res)
      return 2222
    })
    .then()
    .then(res => {
      console.log(res)
      return 3333
    })
    .then(res => {
      console.log(res)
      现在
    })
    .then(res => {},(e)=> {
      console.log(e.message)
      c
    })
    .catch(e => {
      console.log(e.message)
    })
