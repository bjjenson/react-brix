export const name = {
  _: 'name',
  first: {
    get: () => [name._, 'first'],
  },
  last: {
    get: () => [name._, 'last'],
  }
}