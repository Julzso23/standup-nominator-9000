module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        appId: 'website.julians.standup-nominator-9000',
        productName: 'Standup Nominator 9000',
        nsis: {
          createDesktopShortcut: false,
          uninstallDisplayName: '${productName}'
        },
        win: {
          publish: ['github']
        }
      }
    }
  },
  runtimeCompiler: true
}
