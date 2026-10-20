import { api } from '@/boot/axios';
import type { AdminDashboardResponse } from '../types/dashboard';

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await api.get<AdminDashboardResponse>('/dashboard/admin');
  return response.data;
}
