export const address = {
  _: 'address',
  get: () => [address._],
  street: {
    get: () => [address._, 'street']
  },
  city: {
    get: () => [address._, 'city']
  },
  state: {
    get: () => [address._, 'state']
  },
  zip: {
    get: () => [address._, 'zip']
  },
}