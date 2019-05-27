const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const applicationMenu = require('./menu')

const appIcon = path.join(__dirname, 'appIcon.png')
const appName = 'Time Tracker'

const notifier = require('node-notifier')
const desktopIdle = require('desktop-idle')
let timer
let idleTimeStamp

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800, // 400
    height: 600, // 520
    title: appName,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  isDev ? mainWindow.loadURL('http://localhost:3000') : mainWindow.loadFile('build/index.html')
  mainWindow.webContents.toggleDevTools()

  mainWindow.on('close', (e) => {
    if (app.quitting) {
      mainWindow = null
    } else {
      e.preventDefault()
      mainWindow.hide()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
    tray = null
  })
}

app.on('ready', async () => {
  createWindow()
  tray = new Tray(appIcon)
  tray.setToolTip(appName)

  const menu = Menu.buildFromTemplate(applicationMenu(appName, mainWindow))
  Menu.setApplicationMenu(menu)
})

app.on('before-quit', () => {
  app.quitting = true
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  } else {
    mainWindow.show()
  }
})

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (e, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function checkForIdleTime () {
  const idle = desktopIdle.getIdleTime()
  console.log('checkForIdle', idle)
  if (idle >= 5) {
    clearInterval(timer)
    idleTimeStamp = new Date(new Date().setMinutes(new Date().getMinutes() - 10))
    timer = setInterval(checkIfUserIsActiveAgain, 1000)
  }
}

function checkIfUserIsActiveAgain () {
  const idle = desktopIdle.getIdleTime()
  console.log('checkIfUserIsActive', idle)
  if (idle <= 1) {
    clearInterval(timer)
    notifier.notify(
      {
        title: 'Idle time detected',
        // message: 'Do you want to keep or discard the idle time?',
        message: `You were inactive since ${idleTimeStamp.toString().substring(16, 21)}. Discard?`,
        sound: 'Funk',
        wait: true,
        icon: appIcon,
        closeLabel: 'Keep it',
        actions: 'Discard'
      }, (err, res, meta) => {
        if (err) throw err
        if (meta.activationValue !== 'Discard') return

        console.log('Discarding idle time...')
        mainWindow.webContents.send('idle', idleTimeStamp)
      }
    )
    timer = setInterval(checkForIdleTime, 1000)
  }
}

ipcMain.on('timer-running', () => {
  timer = setInterval(checkForIdleTime, 1000)
})

ipcMain.on('timer-stopped', () => {
  clearInterval(timer)
})
