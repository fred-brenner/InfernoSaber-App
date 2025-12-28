module.exports = {
  daemon: true,
  run: [
    {
      id: "launch",
      method: "shell.run",
      params: {
        path: "app",
        env: {
          PYTHONUNBUFFERED: "1"
        },
        message: [
          "conda run -p conda python main_app.py"
        ],
        on: [{
          event: "/http:\/\/\S+/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    },
    {
      method: "proxy.start",
      params: {
        uri: "{{local.url}}",
        name: "InfernoSaber"
      }
    }
  ]
}
