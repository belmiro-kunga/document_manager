export interface Document {
  id: string;
  title: string;
  description?: string;
  file_path: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  status: DocumentStatus;
  version: number;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  is_public: boolean;
  document_metadata?: string;
}

export enum DocumentStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

export interface DocumentExtended extends Document {
  file_type: string;
  file_metadata: any;
  category_id?: string;
  client_id?: string;
  is_archived: boolean;
  tags?: Tag[];
  versions?: DocumentVersion[];
  shares?: DocumentShare[];
  audit_logs?: DocumentAuditLog[];
  reminders?: DocumentReminder[];
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version: number;
  file_path: string;
  file_metadata: any;
  created_at: string;
  created_by: string;
}

export interface DocumentShare {
  id: string;
  document_id: string;
  shared_with: string;
  permissions: DocumentPermission;
  expires_at?: string;
  created_at: string;
}

export enum DocumentPermission {
  READ = "read",
  WRITE = "write",
  ADMIN = "admin"
}

export interface DocumentAuditLog {
  id: string;
  document_id: string;
  user_id: string;
  action: string;
  details: any;
  created_at: string;
}

export interface DocumentReminder {
  id: string;
  document_id: string;
  user_id: string;
  reminder_date: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
} 