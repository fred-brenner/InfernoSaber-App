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
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "install_successfull.txt"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        when: "start.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running",
        type: "label",
        href: "start.json"
      }, {
        when: "start.json",
        off: "<i class='fa-solid fa-power-off'></i> Launch",
        href: "start.json?fullscreen=true&run=true",
      }, {
        when: "start.json",
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "start.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "start.json?fullscreen=true"
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
