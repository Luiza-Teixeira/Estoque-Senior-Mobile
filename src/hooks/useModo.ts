import { usePreferenciasStore } from '@/stores/preferenciasStore';

export function useModo() {
  const modo = usePreferenciasStore((s) => s.modo);
  return { modo, simplificado: modo === 'simplificado' };
}
