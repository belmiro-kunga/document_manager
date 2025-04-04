from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
import cv2
import numpy as np
from PIL import Image
import io
import os

# Configurar o caminho do Tesseract
TESSERACT_PATH = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
if os.path.exists(TESSERACT_PATH):
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH
else:
    print(f"AVISO: Tesseract não encontrado em {TESSERACT_PATH}")
    print("Por favor, verifique se o Tesseract está instalado corretamente.")

app = FastAPI(title="OCR Service", description="Serviço de OCR para extração de texto de imagens")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "OCR Service está funcionando!"}

@app.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    try:
        # Lê a imagem
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Pré-processamento da imagem
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        # Extração do texto
        text = pytesseract.image_to_string(thresh, lang='por')
        
        return {
            "success": True,
            "text": text.strip(),
            "filename": file.filename
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 