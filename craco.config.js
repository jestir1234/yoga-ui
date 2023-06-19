/* craco.config.js */

module.exports = {
  webpack: {
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
      },
    },
  },
};
