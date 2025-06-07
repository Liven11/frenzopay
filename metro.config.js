const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure that all platforms can load .env files
config.resolver.assetExts.push('env');

// Add support for web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;