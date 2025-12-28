module.exports = {
  version: "1.0",
  title: "InfernoSaber",
  description: "Flexible Beat Saber automapper with an easy Gradio-based UI.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    const installed = info.exists("app/env")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    }

    if (installed) {
      if (running.start) {
        const local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open InfernoSaber",
            href: local.url,
            popout: true
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        }
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js"
        }]
      }

      if (running.update) {
        return [{
          default: true,
          icon: "fa-solid fa-rotate",
          text: "Updating",
          href: "update.js"
        }]
      }

      if (running.reset) {
        return [{
          default: true,
          icon: "fa-solid fa-rotate-left",
          text: "Resetting",
          href: "reset.js"
        }]
      }

      return [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js"
      }, {
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.js"
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
        confirm: "Are you sure you want to remove the current app install?"
      }]
    }

    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js"
    }]
  }
}
