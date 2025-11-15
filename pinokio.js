const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}
module.exports = {
  title: "InfernoSaber Automapper",
  description: "Flexible Automapper for Beatsaber made for any difficulty",
  icon: "icon.png",
  daemon: true,
  menu: async (kernel, info) => {
    let installed = await exists(path.resolve(__dirname, "install_successfull.txt"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      let local = info && info.local ? info.local("start.js") : null
      let url = (local && local.url) || (session && session.url) || null
      return [{
        when: "start.js",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running",
        type: "label",
        href: "start.js"
      }, {
        when: "start.js",
        off: "<i class='fa-solid fa-power-off'></i> Launch",
        href: "start.js?fullscreen=true&run=true",
      }, {
        when: "start.js",
        on: (url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: url,
        target: "_blank"
      }, {
        when: "start.js",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "start.js?fullscreen=true"
      }, {
        html: '<i class="fa-solid fa-sync"></i> Update',
        type: "link",
        href: "update.json?run=true&fullscreen=true"
      }]
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        type: "link",
        href: "install.json?run=true&fullscreen=true"
      }]
    }
  }
}
