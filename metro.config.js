const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false, // false because of hermes issue https://github.com/storybookjs/react-native/issues/152
        },
      }),
    },
  };
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
