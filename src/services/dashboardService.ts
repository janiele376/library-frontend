import { api } from '@/boot/axios';

import type { AdminDashboardResponse, UserDashboardResponse } from '@/types/dashboard';

interface DashboardPaginationParams {
  page?: number;
  size?: number;
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await api.get<AdminDashboardResponse>('/dashboard/admin');

  return response.data;
}

export async function getUserDashboard(
  params?: DashboardPaginationParams,
): Promise<UserDashboardResponse> {
  const response = await api.get<UserDashboardResponse>('/dashboard/me', {
    params,
  });

  return response.data;
}
