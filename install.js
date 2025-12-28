module.exports = async () => {
  const script = {
    run: [
      {
        method: "shell.run",
        params: {
          message: [
            "git clone -b main_app https://github.com/fred-brenner/InfernoSaber---BeatSaber-Automapper app"
          ]
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
      },
      {
        method: "fs.link",
        params: {
          venv: "app/env"
        }
      },
      {
        method: "notify",
        params: {
          html: "Install complete. Click the Start tab to launch InfernoSaber."
        }
      }
    ]
  }

  script.requires = [
    {
      type: "conda",
      name: ["ffmpeg", "libsndfile", "libsamplerate", "aubio"],
      args: "-c conda-forge"
    }
  ]

  return script
}
