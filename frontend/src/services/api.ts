import axios from 'axios';
import { Document, DocumentExtended, DocumentShare, DocumentVersion } from '../types/document';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const documentService = {
  // Listar documentos
  getDocuments: async () => {
    const response = await api.get<DocumentExtended[]>('/documents');
    return response.data;
  },

  // Obter um documento específico
  getDocument: async (id: string) => {
    const response = await api.get<DocumentExtended>(`/documents/${id}`);
    return response.data;
  },

  // Criar um novo documento
  createDocument: async (document: Partial<DocumentExtended>) => {
    const formData = new FormData();
    Object.entries(document).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    const response = await api.post<DocumentExtended>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Atualizar um documento
  updateDocument: async (id: string, document: Partial<DocumentExtended>) => {
    const response = await api.put<DocumentExtended>(`/documents/${id}`, document);
    return response.data;
  },

  // Deletar um documento
  deleteDocument: async (id: string) => {
    await api.delete(`/documents/${id}`);
  },

  // Compartilhar um documento
  shareDocument: async (id: string, share: Partial<DocumentShare>) => {
    const response = await api.post<DocumentShare>(`/documents/${id}/share`, share);
    return response.data;
  },

  // Obter versões de um documento
  getDocumentVersions: async (id: string) => {
    const response = await api.get<DocumentVersion[]>(`/documents/${id}/versions`);
    return response.data;
  },

  // Fazer upload de uma nova versão
  uploadNewVersion: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<DocumentVersion>(`/documents/${id}/versions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 