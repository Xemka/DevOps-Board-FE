const { menubar } = require('menubar')
const { Menu } = require('electron')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const mb = menubar({
  browserWindow: { transparent: true },
  browserWindow: { height: 375 },
  browserWindow: { width: 270 },
})

mb.on('ready', () => { /* start when menubar's tray icon has been created and initialized, i.e. when menubar is ready to be used */

  const contextMenu = Menu.buildFromTemplate([
    { label: "Exit", type: "normal", role: "quit" }
  ])

  mb.tray.on('click', () => mb.window.show()) /* handling a click on an icon */
  mb.tray.setContextMenu(contextMenu) /* right-click menu for tray icon */
  mb.tray.setToolTip('DevOps Board')

  console.log('app is ready..')

  setInterval(() => { updateInformation() }, 60000) /* updating information every minute */

})

function updateInformation() { /* request for information about sites and output in html */
  axios.get('https://run.mocky.io/v3/8171e068-4542-47be-8fc1-fd04968b9deb')
    .then (function (response) {
      const html = toHTML(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })

  mb.tray.setToolTip(getUpdateTime())
}

function getUpdateTime() { /* recieve current time for updating update-time in tray */
  var today = new Date()
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
  var time = today.getHours() + ":" + today.getMinutes()
  return `DevOps Board\nLast updated ${date} at ${time}`
}

function toHTML (res) { /* transform the recieved json into html code */
  let servers = {}
  let sites = res

  sites.forEach((item) => {
    servers[item.serverName] = ''
  })

  sites.forEach((item) => {

    item.isActive === true ? isActive = "site active" : isActive = "site inactive"

    servers[item.serverName] +=`
      <div class="${isActive}">
      <p class="site-name">${item.siteName}<span class="site-status">&#149;</span></p>
      </div>
      `
  })

  html = ``

  let idx = 0
  for (let item in servers) {
    html += 
    `
    <div class="server">
      <div class="server-header">
        <div class="title">
          <h2>${item}</h2>
          <img class="server-logo" src="img/server.png" alt="server-logo">
        </div>
        <p class="server-number"> <span>&#8984;</span> ${idx+1} </p>
      </div>
    ` + `
    ${servers[item]}
    ` + `
      </div>     
    </div>
    `
    idx++
  }
  return html
}