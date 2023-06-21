module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-flow'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
          '@assets': './assets'
        },
      },
    ],
  ],
}