module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone --branch main_app --depth 1 https://github.com/fred-brenner/InfernoSaber---BeatSaber-Automapper app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "conda create -y -p conda python=3.10"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "conda install -y -p conda -c conda-forge ffmpeg aubio"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "conda run -p conda python -m pip install --upgrade pip",
          "conda run -p conda python -m pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "notify",
      params: {
        html: "Install complete. Click 'Start' to launch InfernoSaber."
      }
    }
  ]
}
