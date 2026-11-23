import { useFeedback } from '@/components/feedback/feedbackStore';
import { AppButton } from '@/components/ui/AppButton';
import { useModo } from '@/hooks/useModo';
import { usePreferenciasStore } from '@/stores/preferenciasStore';

export function TrocarModoBotao() {
  const { simplificado } = useModo();
  const definirModo = usePreferenciasStore((s) => s.definirModo);
  const feedback = useFeedback();

  return (
    <AppButton
      titulo={simplificado ? 'Usar modo padrão' : 'Usar modo simplificado'}
      icone="swap-horizontal"
      variante="secundario"
      onPress={() => {
        definirModo(simplificado ? 'padrao' : 'simplificado');
        feedback.sucesso(simplificado ? 'Modo Padrão ativado.' : 'Modo Simplificado ativado.');
      }}
    />
  );
}
