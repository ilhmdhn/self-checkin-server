const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const { cekKoneksi } = require('./src/util/connection')
const preferences = require('./src/util/preferences');
const setPrefenrences = require('./src/util/set_preferences');
const axios = require('axios')

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
            win.webContents.send('CONNECTION-STATE', true)
            app.server = require('./index.js', (err)=>{
                if(err){
                    console.log('Error start server ',err)
                }
            })
            const serverState = await isRunning()
            win.webContents.send('SERVER-STATE', serverState)
        }else{
            win.webContents.send('CONNECTION-STATE', connectionState)
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

const isRunning = () =>{
    return new Promise(async(resolve)=>{
        try {
            const urlServer = `http://${preferences().serverIp}:${preferences().port}`;            
            const response = await axios.get(urlServer);
            const responseData = response.data.state;
            resolve(responseData)
        } catch (error) {
            resolve(error)
        }
})
}

app.whenReady().then(() => {
    createWindow();
});