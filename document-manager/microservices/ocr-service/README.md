# Serviço OCR

Este é um microserviço para extração de texto de imagens usando OCR (Optical Character Recognition).

## Requisitos

- Python 3.8+
- Tesseract OCR
- Dependências Python listadas em `requirements.txt`

## Instalação

1. Crie um ambiente virtual:
```bash
python -m venv venv
```

2. Ative o ambiente virtual:
- Windows:
```bash
.\venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Instale o Tesseract OCR:
- Windows: Baixe e instale de https://github.com/UB-Mannheim/tesseract/wiki
- Linux: `sudo apt-get install tesseract-ocr`
- Mac: `brew install tesseract`

## Executando o Serviço

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /`: Verifica se o serviço está funcionando
- `POST /ocr`: Extrai texto de uma imagem
  - Recebe: arquivo de imagem (multipart/form-data)
  - Retorna: texto extraído em formato JSON

## Exemplo de Uso

```python
import requests

url = "http://localhost:8000/ocr"
files = {"file": open("imagem.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```

## Documentação da API

A documentação interativa da API está disponível em:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc 