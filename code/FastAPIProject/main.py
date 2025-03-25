from fastapi import FastAPI,Response,Request

import uvicorn
import service as sv
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("/api/predict")
async def predict(request: Request):
    file_path = request.get("file_path")
    data = await request.json()
    file_path = data.get("file_path")
    headers = {
        "Content-Disposition": "attachment; filename=custom_data.csv",
        "Content-Type": "text/csv",
    }
    csv_response= sv.predict(file_path)
    return Response(content=csv_response.getvalue(), media_type="text/csv", headers=headers)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)