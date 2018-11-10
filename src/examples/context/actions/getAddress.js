export function getAddress() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        street: '15662 S Broken Arrow',
        city: 'Bluffdale',
        state: 'Utah',
        zip: '84065',
      })
    }, 2000)
  })
}
