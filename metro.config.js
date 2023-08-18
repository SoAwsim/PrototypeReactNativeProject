// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push(
  // add mjs file extensions support because make-plural library used by i18n requires it
  "mjs"
);

module.exports = config;
