module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git fetch --all",
          "git checkout main_app",
          "git pull"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "conda install -y -p conda -c conda-forge ffmpeg aubio",
          "conda run -p conda python -m pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "notify",
      params: {
        html: "Update complete. Restart InfernoSaber if it is running."
      }
    }
  ]
}
