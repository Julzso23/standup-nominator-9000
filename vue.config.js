module.exports = {
  pluginOptions: {
    electronBuilder: {
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
  }
}
