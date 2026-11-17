import { useLocalSearchParams } from 'expo-router';

import { ProdutoFormScreen } from '@/features/produtos/screens/ProdutoFormScreen';

export default function EditarProdutoRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProdutoFormScreen id={Number(id)} />;
}
