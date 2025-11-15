module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "infernosaber",
        message: [
          "{{platform === 'win32' ? 'conda activate inferno_env && python main_app.py' : 'source activate inferno_env && python main_app.py'}}"
        ],
        on: [
          {
            event: "/(https?:\\/\\/[0-9A-Za-z.:-]+(?:\\/[0-9A-Za-z._~!$&',;=:@%+?-]*)?)(?=\\s|$|[)\\]])/i",
            done: true
          },
          {
            event: "/errno/i",
            break: false
          },
          {
            event: "/error:/i",
            break: false
          }
        ]
      }
    },
    {
      when: "{{!!(input.event && input.event[1])}}",
      method: "local.set",
      params: {
        url: "{{(() => { let url = input.event[1].trim(); if (url.startsWith('http://0.0.0.0')) { url = url.replace('http://0.0.0.0', 'http://127.0.0.1'); } return url; })()}}"
      }
    },
    {
      when: "{{!!local.url}}",
      method: "self.set",
      params: {
        "session.json": {
          url: "{{local.url}}"
        }
      }
    },
    {
      when: "{{!!local.url}}",
      method: "browser.open",
      params: {
        uri: "{{local.url}}",
        target: "_blank"
      }
    },
    {
      method: "process.wait"
    }
  ]
}
