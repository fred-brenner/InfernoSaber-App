# Inferno Saber APP

Flexible Automapper for BeatSaber made for any difficulty

[Based on Repo](https://github.com/fred-brenner/InfernoSaber---BeatSaber-Automapper)

## Use with Pinokio

1. Click **Install** and wait for the completion notification. Installation can be rerun after a failed attempt without deleting the downloaded app.
2. Click **Launch**, then **Open Web UI** when it appears.
3. In **Setup**, choose a dedicated InfernoSaber input folder and import your music. Optionally select your Beat Saber folder to export maps automatically.
4. Select a model and difficulty settings, then generate maps. Models download on first use, so internet access and additional disk space are required.

**Update** refreshes the app code. Use **Install** again if dependencies need to be refreshed. Pinokio's Stop control stops the running app.

The app and its isolated Python 3.10 Conda environment live in `infernosaber/`. On macOS, the installer builds Aubio 0.4.9 against NumPy 1.26.4 with build isolation disabled and a Clang compatibility flag for its legacy callback signatures. Windows and Linux use the Conda audio packages. Installation verifies Aubio, TensorFlow, Gradio, Tkinter, and FFmpeg before writing the installation marker.

If installation fails, inspect `logs/api/install.json/latest`; previous steps are saved in timestamped files in the same folder.

## API

Launch the app first and use the URL shown by **Open Web UI** as `APP_URL` below. Gradio's **Use via API** link lists the endpoints and their input types; Python clients can also call `client.view_api()`.

Configure the input folder and import songs in the UI before generating maps through the API. `/run_process` takes the worker count, model (`fav_15`, `pp3_15`, `easy_15`, or `expert_15`), and five difficulty values. Set unused difficulty values to zero. It returns progress text; generated maps are saved in the configured output folder. The first request may download the selected model.

### Python

Install `gradio_client` in your client environment, then:

```python
import os
from gradio_client import Client

client = Client(os.environ["APP_URL"])
result = client.predict(1, "fav_15", 3, 0, 0, 0, 0, api_name="/run_process")
print(result)
```

### JavaScript

Install `@gradio/client` in your client project, then:

```javascript
import { Client } from "@gradio/client";

const client = await Client.connect(process.env.APP_URL);
const result = await client.predict("/run_process", [1, "fav_15", 3, 0, 0, 0, 0]);
console.log(result.data);
```

### Curl

Submit a generation request, then use the returned `event_id` to stream the result:

```sh
curl -X POST "$APP_URL/gradio_api/call/run_process" \
  -H 'Content-Type: application/json' \
  -d '{"data":[1,"fav_15",3,0,0,0,0]}'

curl -N "$APP_URL/gradio_api/call/run_process/EVENT_ID"
```
