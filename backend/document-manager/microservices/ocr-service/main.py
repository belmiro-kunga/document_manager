from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
from PIL import Image
import io

app = FastAPI(title="OCR Service")

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ocr/extract")
async def extract_text(file: UploadFile = File(...)):
    # Lê o arquivo de imagem
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Extrai o texto usando Tesseract
    text = pytesseract.image_to_string(image)
    
    return {"text": text}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 