# Arquitetura do Sistema

## Visão Geral

O sistema de gerenciamento de documentos é construído com uma arquitetura distribuída, utilizando microserviços para diferentes funcionalidades.

## Componentes

### Frontend (React.js)
- Interface do usuário construída com React.js e TypeScript
- Utiliza Vite como bundler
- Comunica-se com o backend através de APIs REST

### Backend (NestJS)
- API principal em Node.js usando NestJS
- Gerencia a lógica de negócios principal
- Integra com os microserviços
- Gerencia o armazenamento de documentos

### Microserviços

#### OCR Service (FastAPI)
- Serviço de reconhecimento óptico de caracteres
- Utiliza Tesseract OCR
- Expõe API REST para extração de texto de imagens

#### AI Service (FastAPI)
- Serviço de inteligência artificial
- Utiliza modelos de transformers para classificação
- Expõe API REST para análise de texto

## Comunicação

- Frontend → Backend: HTTP/REST
- Backend → Microserviços: HTTP/REST
- Todos os serviços expõem endpoints de health check

## Armazenamento

- Documentos: AWS S3
- Metadados: Banco de dados (a ser definido)

## Segurança

- CORS configurado para comunicação entre serviços
- Autenticação e autorização (a ser implementada)
- Validação de entrada em todos os serviços

## Escalabilidade

- Cada serviço pode ser escalado independentemente
- Containerização planejada com Docker
- Orquestração com Kubernetes (opcional) 