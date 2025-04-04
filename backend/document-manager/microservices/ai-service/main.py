from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import torch

app = FastAPI(title="AI Service")

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializa o modelo de classificação
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

class TextInput(BaseModel):
    text: str

@app.post("/ai/classify")
async def classify_text(input_data: TextInput):
    try:
        result = classifier(input_data.text)
        return {"classification": result[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 