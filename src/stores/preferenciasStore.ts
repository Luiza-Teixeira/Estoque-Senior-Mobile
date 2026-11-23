import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Modo = 'padrao' | 'simplificado';

export const ESCALAS_TEXTO = [1, 1.15, 1.3] as const;

export type EscalaTexto = (typeof ESCALAS_TEXTO)[number];

interface PreferenciasState {
  modo: Modo;
  escalaTexto: EscalaTexto;
  altoContraste: boolean;
  definirModo: (modo: Modo) => void;
  definirEscalaTexto: (escala: EscalaTexto) => void;
  proximaEscalaTexto: () => void;
  definirAltoContraste: (ativo: boolean) => void;
}

export const usePreferenciasStore = create<PreferenciasState>()(
  persist(
    (set, get) => ({
      modo: 'padrao',
      escalaTexto: 1,
      altoContraste: false,

      definirModo: (modo) => set({ modo }),

      definirEscalaTexto: (escalaTexto) => set({ escalaTexto }),

      proximaEscalaTexto: () => {
        const atual = ESCALAS_TEXTO.indexOf(get().escalaTexto);

        set({
          escalaTexto:
            ESCALAS_TEXTO[(atual + 1) % ESCALAS_TEXTO.length],
        });
      },

      definirAltoContraste: (altoContraste) =>
        set({ altoContraste }),
    }),
    {
      name: 'estoque-senior-preferencias',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ modo, escalaTexto, altoContraste }) => ({
        modo,
        escalaTexto,
        altoContraste,
      }),
    }
  )
);