# DocuGuardian Backend

Backend da aplicação DocuGuardian, desenvolvido com FastAPI e PostgreSQL.

## Requisitos

- Python 3.8+
- Docker e Docker Compose
- pip (gerenciador de pacotes Python)

## Instalação

1. Clone o repositório
2. Navegue até a pasta do backend:
```bash
cd backend
```

3. Crie um ambiente virtual Python:
```bash
python -m venv venv
```

4. Ative o ambiente virtual:
- Windows:
```bash
.\venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

5. Instale as dependências:
```bash
pip install -r requirements.txt
```

6. Inicie o PostgreSQL usando Docker Compose:
```bash
docker-compose up -d
```

7. Inicialize o banco de dados:
```bash
python -c "from app.db.init_db import init_db; init_db()"
```

8. Crie o usuário admin:
```bash
python create_admin.py
```

9. Inicie o servidor:
```bash
uvicorn app.main:app --reload
```

O servidor estará disponível em http://localhost:8000

## Credenciais do Admin

- Email: admin@docuguardian.com
- Senha: admin123

## Documentação da API

A documentação da API está disponível em:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc 