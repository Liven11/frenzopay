const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure that all platforms can load .env files
config.resolver.assetExts.push('env');

// Add support for web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Web-specific configurations
config.resolver.alias = {
  'react-native$': 'react-native-web',
};

// Transformer configuration for web compatibility
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

// Add support for TypeScript
config.resolver.sourceExts.push('ts', 'tsx');

module.exports = config;