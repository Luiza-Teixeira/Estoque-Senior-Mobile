import { router } from 'expo-router';

import { ActionCard } from '@/components/ui/ActionCard';
import { DicaBox } from '@/components/ui/DicaBox';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

export function EstoqueMenuSimplificado() {
  return (
    <ScreenContainer>
      <PageHeader titulo="Estoque" subtitulo="O que deseja fazer?" />
      <ActionCard
        titulo="Registrar entrada de mercadoria"
        descricao="Anotar produtos que chegaram."
        icone="truck-delivery-outline"
        cor="verde"
        aoPressionar={() => router.push('/estoque/entrada')}
      />
      <ActionCard
        titulo="Ver estoque"
        descricao="Ver a quantidade de cada produto."
        icone="package-variant"
        aoPressionar={() => router.push('/estoque?ver=lista')}
      />
      <ActionCard
        titulo="Ver produtos com estoque baixo"
        descricao="Saber o que precisa repor."
        icone="alert-outline"
        cor="laranja"
        aoPressionar={() => router.push('/estoque?ver=lista&baixo=1')}
      />
      <DicaBox texto="Mantenha o estoque sempre atualizado para evitar a falta de produtos." />
    </ScreenContainer>
  );
}
