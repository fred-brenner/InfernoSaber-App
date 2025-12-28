module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python -m pip install --upgrade pip",
          "pip install -r requirements.txt"
        ]
      }
    }
  ]
}
