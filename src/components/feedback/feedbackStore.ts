import { create } from 'zustand';

type TipoFeedback = 'sucesso' | 'erro';

interface FeedbackState {
  visivel: boolean;
  mensagem: string;
  tipo: TipoFeedback;
  mostrar: (mensagem: string, tipo: TipoFeedback) => void;
  esconder: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  visivel: false,
  mensagem: '',
  tipo: 'sucesso',
  mostrar: (mensagem, tipo) => set({ visivel: true, mensagem, tipo }),
  esconder: () => set({ visivel: false }),
}));

export function useFeedback() {
  const mostrar = useFeedbackStore((s) => s.mostrar);
  return {
    sucesso: (mensagem: string) => mostrar(mensagem, 'sucesso'),
    erro: (mensagem: string) => mostrar(mensagem, 'erro'),
  };
}
