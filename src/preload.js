import { ipcRenderer, contextBridge } from 'electron'
contextBridge.exposeInMainWorld('urlData', {
  receive: (callback) => ipcRenderer.on('url-data', callback)
})
