/* Main Progress of Kanban Desktop */

const { app, BrowserWindow , Menu , Tray, shell, ipcMain} = require('electron')
const dialog = require('electron').dialog;
const path = require('path');
const fs = require('fs');
const internal = require('stream');
let tray = null;/*Global Tray Object*/
let settings = null;/*Global Settings Object*/
let settings_ontop =false;/*Always-On-Top Global Flag*/
let calcrater = 0; var PoinThrough = 'Enable click-through';
var packageGet = require("./package.json");
const schedule = require('node-schedule'); //引入定时任务模块


function createWindow () {
  //Get screen resolution
  var screenElectron = require('electron').screen;
  // Create Main Application Browser Window
  const win = new BrowserWindow({
    width:  330,
    height: 490,
    x: screenElectron.getPrimaryDisplay().workAreaSize.width-360,
    y: screenElectron.getPrimaryDisplay().workAreaSize.height-500,
    skipTaskbar: true,//Do not show in taskbar
    alwaysOnTop: true,//Always on top
    transparent: true,//Transparent background
    frame: false,
    resizable: false,//Non-resizable
    icon: './assets/applogo.png',
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      zoomFactor: 1,
    }
  })

  require("@electron/remote/main").enable(win.webContents);
  require('@electron/remote/main').initialize();
  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  //win.webContents.openDevTools();

  win.webContents.on("before-input-event", (event, input) => { //Disable alt+f4
    if(input.key === "F4" && input.alt){
          event.preventDefault();
    }
    win.webContents.setIgnoreMenuShortcuts(input.key === "F4" && input.alt);
  })


  function settingsShow () {
    // let settings = null;
    //Settings window open listener
    var setwidth = screenElectron.getPrimaryDisplay().workAreaSize.width;
    var setheight = screenElectron.getPrimaryDisplay().workAreaSize.height;
    //Create new settings window
    /*let*/ settings = new BrowserWindow({
      width:  parseInt(setheight*5/8),//parseInt(setwidth/3),
      height: parseInt(setheight*3/4),//parseInt((setwidth/3)*(20/16)),
      minWidth: 470,
      minHeight: 320,
      skipTaskbar: false,//Show in taskbar
      alwaysOnTop: settings_ontop,//Always on top
      transparent: false,//Transparent background
      frame: true,
        titleBarStyle: "hidden",
        titleBarOverlay: {
          color: "#202020",
          symbolColor: "white", },
      resizable: true,
      icon: path.join(__dirname, './assets/applogo.png'),
      show: true,
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      }
    });
    // 并且为你的应用加载index.html
    settings.loadFile('Settings.html');
    //settings.webContents.openDevTools();
  
    settings.webContents.on("before-input-event", (event, input) => { //Disable alt+f4
      if(input.key === "F4" && input.alt){
            event.preventDefault();
      }
      settings.webContents.setIgnoreMenuShortcuts(input.key === "F4" && input.alt);
    })
  }


  //System tray right-click menu
  var trayMenuTemplate = [
    {
      label: 'Kanban Desktop',
      enabled: false,
      icon: path.join(__dirname, './assets/Taskbar.png')
    },
    {
      type: 'separator'
    }, //Separator
    {
      label: 'Kanban-Desktop Settings',
      click: function () {
        if(settings==null||settings.isDestroyed()){settingsShow ();}
        else {
          settings.show();
            // //Settings window open listener
            // var setwidth = screenElectron.getPrimaryDisplay().workAreaSize.width;
            // var setheight = screenElectron.getPrimaryDisplay().workAreaSize.height;
            // //Create new settings window
            // let settings = new BrowserWindow({
            //   width: parseInt(setwidth/3),
            //   height: parseInt((setwidth/3)*(9.5/16)),
            //   minWidth: 400,
            //   minHeight: 200,
            //   skipTaskbar: false,//Show in taskbar
            //   alwaysOnTop: false,//Always on top
            //   transparent: true,//Transparent background
            //   frame: false,
            //   resizable: true,
            //   icon: './assets/applogo.png',
            //   show: false,
            //   webPreferences: {
            //     devTools: true,
            //     nodeIntegration: true,
            //     enableRemoteModule: true,
            //     contextIsolation: false,
            //   }
            // });
            // // 并且为你的应用加载index.html
            // settings.loadFile('Settings.html');
            // //settings.webContents.openDevTools();
  
            // settings.webContents.on("before-input-event", (event, input) => { //Disable alt+f4
            //   if(input.key === "F4" && input.alt){
            //         event.preventDefault();
            //   }
            //   settings.webContents.setIgnoreMenuShortcuts(input.key === "F4" && input.alt);
            // })
        }  
      } //Open Settings
    },
    {
      label: 'Check for Updates',
      click: function () {shell.openExternal("http://studio.zerolite.cn")} //Open corresponding page
    },
    {
      label: 'About',
      click: function () {
        dialog.showMessageBox({
          title  : 'About', 
          type  : 'info', 
          message : packageGet.name+" v"+packageGet.version+' Stable Powered By Electron™.'
        })
      } //Open corresponding page
    },
    {
      type: 'separator'
    }, //Separator
    {
        label: PoinThrough,
        submenu: [
          {
            label: 'Disable click-through',
            click: function () {win.setIgnoreMouseEvents(false);}, //设置点击穿透
            type: 'radio'
          },
          {
            label: 'Enable click-through',
            click: function () {win.setIgnoreMouseEvents(true);}, //设置点击穿透
            type: 'radio'
          },
        ],
    },
    {
      label: 'Always on top',
      submenu: [
        {
          label: 'Enable always on top',
          click: function () {win.setAlwaysOnTop(true);settings_ontop=true;}, //设置总在最上
          type: 'radio'
        },
        {
          label: 'Disable always on top',
          click: function () {win.setAlwaysOnTop(false);settings_ontop=false;}, //取消设置总在最上
          type: 'radio'
        },
      ],
  },
  {
    type: 'separator'
  }, //Separator
    {
        label: 'Exit',
        click: function () {
          dialog.showMessageBox({
            type:"info",
            buttons:["I misclicked","告辞！"],
            title:"Exit",
            message:`真的要退出嘛？`
          }).then((result)=>{
              if(result.response==1){
                  console.log("Confirm");app.quit();
              }else if(result.response==0){
                  console.log("Cancel")
              }
          }).catch((error)=>{
              console.log(error);
          });
        }
    }
];

  //图标的上下文菜单
  trayIcon = path.join(__dirname, 'assets');//选取目录
  tray = new Tray(path.join(trayIcon, 'applogo256.png'));
  let contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  tray.setToolTip('Kanban-Desktop');

  app.setAppUserModelId('com.Zerolite.Kanban-Desktop');
  Menu.setApplicationMenu(null); //Remove Linux menu bar
  //设置此图标的上下文菜单
  tray.setContextMenu(contextMenu);

  /*监听线程*/

  //Main page hide/refresh process listener
  ipcMain.on("Mainpage",(event,data) => {
    console.log(data);
    if(data == 'Hide') {event.preventDefault(); win.hide();}
    else if(data == 'Show') {win.show();}
    else if(data == 'Refresh') {win.reload();}
  });

  //External link open process listener
  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url);
  });

  //Settings window open listener
  ipcMain.on("Settings",(event,data) => {
    console.log(data);
    if(data == 'Open') {
      if(settings==null||settings.isDestroyed()){settingsShow ();}
      else {settings.show();}
      // if(settings)settings.show();
      // else {
      //     //Settings window open listener
      //     var setwidth = screenElectron.getPrimaryDisplay().workAreaSize.width;
      //     var setheight = screenElectron.getPrimaryDisplay().workAreaSize.height;
      //     //Create new settings window
      //     let settings = new BrowserWindow({
      //       width: parseInt(setwidth/3),
      //       height: parseInt((setwidth/3)*(9.5/16)),
      //       minWidth: 400,
      //       minHeight: 200,
      //       skipTaskbar: false,//Show in taskbar
      //       alwaysOnTop: false,//Always on top
      //       transparent: true,//Transparent background
      //       frame: false,
      //       resizable: true,
      //       icon: './assets/applogo.png',
      //       show: false,
      //       webPreferences: {
      //         devTools: true,
      //         nodeIntegration: true,
      //         enableRemoteModule: true,
      //         contextIsolation: false,
      //       }
      //     });
      //     // 并且为你的应用加载index.html
      //     settings.loadFile('Settings.html');
      //     //settings.webContents.openDevTools();

      //     settings.webContents.on("before-input-event", (event, input) => { //Disable alt+f4
      //       if(input.key === "F4" && input.alt){
      //             event.preventDefault();
      //       }
      //       settings.webContents.setIgnoreMenuShortcuts(input.key === "F4" && input.alt);
      //     })
      // }
    }
    if(data == 'Close') {event.preventDefault(); settings.hide();}
  });

  //Developer tools open listener
  ipcMain.on("dev",(event,data) => {
    console.log(data); 
    if(data == 'Open') {settings.webContents.openDevTools();win.webContents.openDevTools();}
  });

  //Return whether packaged
  ipcMain.handle('get-is-packaged', async (event) => {
    return app.isPackaged;
  });

  // Schedule reminder listener
  var job = null;
  var isTimeSet = false;
  var ScheduleTime = null;
  var ScheduleName = null;
  var ScheduleDate = null;
  const rule = new schedule.RecurrenceRule();
  ipcMain.on("Schedule",(event,data) => {
    if(data == "Clear"){
      if (job !== null) {
        isTimeSet = false;
        ScheduleTime = null;
        ScheduleName = null;
        ScheduleDate = null;
        // job.cancel(); // Stop task
        job = clearInterval(job);
        job = null; // 将job重置为null，避免重复取消已经取消的任务
        console.log("Cancelled Job");
      }
    }
    else{
      isTimeSet = true;
      // 每隔X分钟执行一次
      // rule.second = new schedule.Range(0, 59, parseInt(parseInt(data[0])/1000));
      ScheduleTime = data[0];
      ScheduleName = data[1];
      ScheduleDate = data[2];
      console.log("generated job"+parseInt(parseInt(data[0])/1000));
      if (job !== null) {
        job = clearInterval(job);
        job = null; // 将job重置为null，避免重复取消已经取消的任务
      }
      job = setInterval(function(){
        win.webContents.send('ScheduleAlarm', data[1]);
        ScheduleDate = new Date();
        console.log("Task Time");
      },data[0]);
      // job = schedule.scheduleJob(rule, function(){
      //   win.webContents.send('ScheduleAlarm', data[1]);
      //   ScheduleDate = new Date();
      //   console.log("Task Time");
      // });
    }
  });
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Floating ball listener thread
ipcMain.on("PTBox",(event,data) => {
  console.log(data);
  if(data == 'Open') {
      //Get screen resolution
  var screenElectron = require('electron').screen;
  //Create floating ball window
  const ptbox = new BrowserWindow({
    width: 70,
    height: 70,
    x: screenElectron.getPrimaryDisplay().workAreaSize.width-100,
    y: screenElectron.getPrimaryDisplay().workAreaSize.height-80,
    skipTaskbar: true,//Do not show in taskbar
    alwaysOnTop: true,//Always on top
    transparent: true,//Transparent background
    frame: false,
    resizable: false,//Non-resizable
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      zoomFactor: 0.9,
    }
  });
  // 并且为你的应用加载index.html
  ptbox.loadFile('PTBox.html');
  //ptbox.webContents.openDevTools();
  ipcMain.on("PTBox",(event,data) => {
    console.log(data);
    if(data == 'Close') {event.preventDefault(); ptbox.hide();}
    });
  }
});

if (process.platform == 'win32') {
  // Depends on SnoreToast version https://github.com/KDE/snoretoast/blob/master/CMakeLists.txt#L5
  const toastActivatorClsid = "eb1fdd5b-8f70-4b5a-b230-998a2dc19303"; // v0.7.0
  // const toastActivatorClsid = "849c2549-fe1e-4aa6-bb93-4690993ccb89"; // v0.9.0

  const appID = "com.Zerolite.Kanban-Desktop";
  const appLocation = process.execPath;
  const appData = app.getPath("appData");

  // continue if not in dev mode / running portable app
  if (!appLocation.startsWith(path.join(appData, "..", "Local", "Temp"))) {
    // shortcutPath can be anywhere inside AppData\Roaming\Microsoft\Windows\Start Menu\Programs\
    const shortcutPath = path.join(appData, "Microsoft", "Windows", "Start Menu", "Programs", "Kanban-Desktop.lnk");
    // check if shortcut doesn't exist -> create it, if it exist and invalid -> update it
    try { 
      const shortcutDetails = shell.readShortcutLink(shortcutPath); // throws error if it doesn't exist yet
      // validate shortcutDetails
      if (
        shortcutDetails.target !== appLocation ||
        shortcutDetails.appUserModelId !== appID ||
        shortcutDetails.toastActivatorClsid !== toastActivatorClsid
      ) {
        throw "needUpdate";
      }
      // if the execution got to this line, the shortcut exists and is valid
    } catch (error) { // if not valid -> Register shortcut
      shell.writeShortcutLink(
        shortcutPath,
        error === "needUpdate" ? "update" : "create",
        {
          target: appLocation,
          cwd: path.dirname(appLocation),
          description: "Kanban Desktop Electron Based",
          appUserModelId: appID,
          toastActivatorClsid
        }
      );
    }
  }
}
// 您可以把应用程序其他的流程写在在此文件中
// 代码也可以拆分成几个文件，然后用 require 导入。
