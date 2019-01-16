export function getAddress() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // resolve(null) // testing return of null
      resolve({
        street: '15 S Main',
        city: 'Reactable',
        state: 'Utah',
        zip: '84001',
      })
    }, 1000)
  })
}
