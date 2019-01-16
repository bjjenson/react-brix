let index = 0
const cache = {}
const BRIX_WORKER_RESULT = '___WORKER_RESULT__!'

export const useWorker = (key, worker) => {
  if (cache[key]) {
    const workedItem = cache[key]
    if (workedItem.error) {
      throw workedItem.error
    }

    if (workedItem.result !== BRIX_WORKER_RESULT) {
      return workedItem.result
    }
    throw workedItem.worker
  } else {
    const workedItem = {
      result: BRIX_WORKER_RESULT,
      worker: worker()
        .then(response => {
          workedItem.result = response
          return response
        }, rejection => {
          console.log('rejected', rejection)
          workedItem.error = rejection
        }).catch(err => {
          workedItem.error = err
          console.log('caught', err)
        }),
    }
    cache[key] = workedItem
    throw workedItem.worker
  }
}

export const getKey = () => {
  return `_key${index++}`
}
