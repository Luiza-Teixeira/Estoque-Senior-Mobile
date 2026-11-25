import { useLocalSearchParams } from 'expo-router';

import { VendaDetalheScreen } from '@/features/vendas/screens/VendaDetalheScreen';

export default function VendaDetalheRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <VendaDetalheScreen id={Number(id)} />;
}
