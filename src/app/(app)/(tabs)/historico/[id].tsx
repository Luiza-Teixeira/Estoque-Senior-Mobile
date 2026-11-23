import { useLocalSearchParams } from 'expo-router';

import { MovimentacaoDetalheScreen } from '@/features/acompanhamento/screens/MovimentacaoDetalheScreen';

export default function MovimentacaoDetalheRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <MovimentacaoDetalheScreen id={id} />;
}
