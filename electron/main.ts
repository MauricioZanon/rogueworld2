import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
  })
app.allowRendererProcessReuse = true

declare global {
  interface Array<T> {
      forEach2D(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void;
      forEachBorde(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void;
      includes2D(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => boolean): boolean;
  }
}

Array.prototype.forEach2D = function<T>(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void {
  for(let i = 0; i < this.length; i++) {
    for(let j = 0; j < this[0].length; j++) {
      callback(this[i][j]);
    }
  }
}

Array.prototype.forEachBorde = function<T>(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => void): void {
  const anchoMax = this.length - 1;
  const altoMax = this[0].length - 1;
  
  for(let i = 0; i < this.length; i++) {
    callback(this[i][0]);
    callback(this[i][altoMax]);
  }
  for(let i = 0; i < this[0].length; i++) {
    callback(this[0][i]);
    callback(this[anchoMax][i]);
  }
}

Array.prototype.includes2D = function<T>(callback: (i: T extends readonly (infer ElementType)[] ? ElementType : never) => boolean): boolean {
  for(let i = 0; i < this.length; i++) {
    for(let j = 0; j < this[0].length; j++) {
      if(callback(this[i][j])) {
        return true;
      }
    }
  }
  return false;
}