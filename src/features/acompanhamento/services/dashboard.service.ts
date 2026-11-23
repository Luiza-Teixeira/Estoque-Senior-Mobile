import type { ResumoDashboard } from '@/features/acompanhamento/types/acompanhamento';
import { api } from '@/services/api';

export const dashboardService = {
  async resumo(): Promise<ResumoDashboard> {
    const { data } = await api.get<ResumoDashboard>('/dashboard/resumo');
    return data;
  },
};