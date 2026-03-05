module.exports = {
  version: "5.0",
  title: "InfernoSaber Automapper",
  description: "Flexible Automapper for Beatsaber made for any difficulty",
  icon: "icon.png",
  menu: async (kernel, info) => {
    const installed = info.exists("install_successfull.txt")
    const running = {
      install: info.running("install.json"),
      start: info.running("start.json"),
      update: info.running("update.json")
    }

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.json"
      }]
    }

    if (running.update) {
      return [{
        default: true,
        icon: "fa-solid fa-terminal",
        text: "Updating",
        href: "update.json"
      }]
    }

    if (installed) {
      if (running.start) {
        const local = info.local("start.json")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.json"
          }, {
            icon: "fa-solid fa-sync",
            text: "Update",
            href: "update.json"
          }]
        }
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.json"
        }]
      }

      return [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Launch",
        href: "start.json"
      }, {
        icon: "fa-solid fa-sync",
        text: "Update",
        href: "update.json"
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.json"
      }]
    }

    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.json"
    }]
  }
}
