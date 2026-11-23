import { useQuery } from '@tanstack/react-query';

import { dashboardService } from '@/features/acompanhamento/services/dashboard.service';
import { queryKeys } from '@/services/queryKeys';

export function useResumoDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: dashboardService.resumo,
  });
}
