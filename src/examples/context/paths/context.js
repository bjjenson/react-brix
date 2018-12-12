export const context = {
  _: 'context',
  notification: {
    get: () => [context._, 'notification'],
  },
}
