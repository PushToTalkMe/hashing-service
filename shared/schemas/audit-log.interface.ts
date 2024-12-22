export interface AuditLog {
  id: number;
  userId: string;
  action: string;
  status: string;
  additionalData: string;
  createdAt: string;
}
