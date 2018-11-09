let index = 0
const cache = {}

export const useWorker = (key, worker) => {
  if (cache[key]) {
    const workedItem = cache[key]
    if (workedItem.error) {
      throw workedItem.error
    }

    if (workedItem.result) {
      return workedItem.result
    }
    throw workedItem.worker
  } else {
    const workedItem = {
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