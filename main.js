const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const { cekKoneksi } = require('./src/util/connection')
const preferences = require('./src/util/preferences');
const setPrefenrences = require('./src/util/set_preferences');

const createWindow = async () => {
    const additionalData = { myKey: 'self checkin server' }
    const gotTheLock = app.requestSingleInstanceLock(additionalData);

    if (!gotTheLock) {
        win == null;
        app.isQuiting = true;
        app.quit();
        win.close();
        app.exit();
        return;
    }
    
    const win = new BrowserWindow({
        width: 544,
        height: 540,
        // show: true,
        icon: './icon.png',
        title: "Self Checkin Server",
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        enableRemoteModule: true
    });

    win.loadFile('./src/page/index_page.html')
    
    const startServer = async() => {
        const connectionState = await cekKoneksi();
        console.log('connection state ',connectionState)

        if(connectionState === true){
            app.server = require('./index.js', (err)=>{
                if(err){
                    console.log('Error start server ',err)
                }
            })
        }
    }

    win.webContents.on('did-finish-load', async () => {
        win.webContents.send('LOAD-PREFERENCE', preferences())

        ipcMain.on('SUBMIT-SETTING', (event, data) => {
            submitPreferences(data)
        });

        startServer();
        
        ipcMain.on('OPEN-SETTING', () =>{
            win.webContents.send('LOAD-SETTING', preferences())
        })
    });

    const submitPreferences = (data) => {
        setPrefenrences(data);
        startServer();
        win.webContents.send('LOAD-PREFERENCE', preferences());
    }
}

app.whenReady().then(() => {
    createWindow();
});