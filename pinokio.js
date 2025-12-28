const path = require("path")

module.exports = {
  version: "1.5",
  title: "InfernoSaber",
  description: "Flexible Beat Saber automapper with a Gradio UI for inference and map generation.",
  icon: "icon.png",
  menu: async (kernel) => {
    const installing = await kernel.running(__dirname, "install.js")
    const running = await kernel.running(__dirname, "start.js")
    const installed = await kernel.exists(__dirname, "app", "conda")

    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    }

    if (installed) {
      if (running) {
        const local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            icon: "fa-solid fa-rocket",
            text: "Open InfernoSaber",
            href: local.url,
            popout: true,
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          }]
        }

        return [{
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js",
        }]
      }

      return [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js",
      }, {
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.js",
      }, {
        icon: "fa-solid fa-plug",
        text: "Reinstall",
        href: "install.js",
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
      }]
    }

    return [{
      default: true,
      icon: "fa-solid fa-plug",
      text: "Install",
      href: "install.js",
    }]
  }
}
