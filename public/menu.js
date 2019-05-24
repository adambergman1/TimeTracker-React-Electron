module.exports = function applicationMenu (appName, mainWindow) {
  const appMenu = [
    {
      label: 'Projects',
      submenu: [
        {
          label: 'New project',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow.webContents.send('add-project')
        },
        {
          label: 'All projects',
          accelerator: 'CmdOrCtrl+A',
          click: () => mainWindow.webContents.send('show-all-projects')
        },
        {
          label: 'Set currency',
          click: () => mainWindow.webContents.send('set-currency')
        }
      ]
    },
    {
      label: 'Reports',
      submenu: [
        {
          label: 'View reports',
          // accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.send('view-reports')
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Zoom',
          role: 'zoom'
        },
        {
          label: 'Enter Full screen',
          role: 'togglefullscreen'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All To Front',
          role: 'front'
        },
        {
          label: 'Dev Tools',
          click: () => mainWindow.webContents.openDevTools()
        },
        {
          label: 'Reload',
          role: 'reload'
        }
      ]
    }
  ]
  if (process.platform === 'darwin') {
    appMenu.unshift({
      label: appName,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }
  return appMenu
}
