import { useLocalSearchParams } from 'expo-router';

import { EntradaDetalheScreen } from '@/features/estoque/screens/EntradaDetalheScreen';

export default function EntradaDetalheRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <EntradaDetalheScreen id={Number(id)} />;
}
