export function getAddress() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        street: '15 S Main',
        city: 'Reactable',
        state: 'Utah',
        zip: '84001',
      })
    }, 2000)
  })
}
