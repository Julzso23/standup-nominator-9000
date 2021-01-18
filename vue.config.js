module.exports = {
    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          productName: 'Standup Nominator 9000'
        }
      },
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
    },

    transpileDependencies: [
      'quasar'
    ]
};
