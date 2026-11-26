import { useMutation } from '@tanstack/react-query';

import { authService } from '@/features/conta/services/auth.service';
import type { PerfilInput } from '@/features/conta/types/conta';
import { useAuthStore } from '@/stores/authStore';

export function useAtualizarPerfil() {
  const atualizarUsuario = useAuthStore((s) => s.atualizarUsuario);
  return useMutation({
    mutationFn: (dados: PerfilInput) =>
      authService.atualizarPerfil(dados),
    onSuccess: (atualizado) => atualizarUsuario(atualizado),
  });
}
