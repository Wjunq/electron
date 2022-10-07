使用yarn创建electron程序

```shell
yarn create electron-app demo
```

> 配置使用nodeAPI

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 控制浏览器可以使用node
      nodeIntegration:true,
      // 新版本要添加这个
      contextIsolation:false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
```

```js
let fs = require('fs')
console.log(fs)

// 点击创建文件的回调
let createFile = document.getElementById('createFile');
let i = 1;
createFile.onclick = function(){
    i++;
    fs.writeFile(`input${i}.txt`,'将hello world写入到input文件中',(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('写入完毕')
        }
    })
}
```

## 拖动文件

```js
let holder = document.getElementById('holder');
let fs = require('fs');
let context = document.getElementById('context')

holder.addEventListener('drop', (e) => {
    e.preventDefault();// 取消默认
    e.stopPropagation(); // 阻止冒泡
    console.log(e)
    for (const file of e.dataTransfer.files) {
        console.log('文件路径为：', file.path);
        fs.readFile(file.path, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newDiv = document.createElement('div');
                newDiv.className = 'readFile'
                newDiv.innerHTML = `
                <h2>${file.name}</h2>
                <pre>${data}<pre/>
                `;
                context.appendChild(newDiv);
            }
        })
    }
})
holder.addEventListener('dragover', (e) => {
    e.preventDefault();// 取消默认
    e.stopPropagation(); // 阻止冒泡
})
```

