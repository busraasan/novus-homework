from fastapi import FastAPI, Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse

from model import *

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.head("/")
@app.get("/")
def index() -> FileResponse:
    return FileResponse(path="static/index.html", media_type="text/html")

@app.get("/infer_gpt2")
def gpt2(input):
    output = generate_text(input, 512)
    return {"output": output}

