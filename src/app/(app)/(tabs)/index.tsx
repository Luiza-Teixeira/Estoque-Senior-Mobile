import { InicioScreen } from '@/features/acompanhamento/screens/InicioScreen';
import { InicioSimplificadoScreen } from '@/features/acompanhamento/screens/InicioSimplificadoScreen';
import { useModo } from '@/hooks/useModo';

export default function InicioRoute() {
  const { simplificado } = useModo();
  return simplificado ? <InicioSimplificadoScreen /> : <InicioScreen />;
}
