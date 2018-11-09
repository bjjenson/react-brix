const webpackMerge = require('webpack-merge')

const applyPresets = (env = { presets: [] }) => {
  const presets = env.presets || []
  /** @type {string[]} */
  const mergedPresets = [].concat(...[presets])
  const mergedConfigs = mergedPresets.map(presetName => require(`./presets/webpack.${presetName}`)(env)) // eslint-disable-line

  return webpackMerge({}, ...mergedConfigs)
}

module.exports = applyPresets
