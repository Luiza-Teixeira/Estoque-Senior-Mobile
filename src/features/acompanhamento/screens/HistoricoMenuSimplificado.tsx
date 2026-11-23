import { router } from 'expo-router';

import { ActionCard } from '@/components/ui/ActionCard';
import { DicaBox } from '@/components/ui/DicaBox';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

export function HistoricoMenuSimplificado() {
  return (
    <ScreenContainer>
      <PageHeader titulo="Histórico" subtitulo="O que deseja fazer?" />
      <ActionCard
        titulo="Consultar registros"
        descricao="Ver todas as entradas e vendas."
        icone="magnify"
        aoPressionar={() => router.push('/historico?ver=lista')}
      />
      <ActionCard
        titulo="Ver registros de hoje"
        descricao="O que aconteceu hoje na loja."
        icone="calendar-today"
        cor="verde"
        aoPressionar={() => router.push('/historico?ver=lista&periodo=hoje')}
      />
      <ActionCard
        titulo="Ver só as vendas"
        descricao="Produtos que saíram."
        icone="cart-outline"
        aoPressionar={() => router.push('/historico?ver=lista&tipo=SAIDA')}
      />
      <ActionCard
        titulo="Ver só as entradas"
        descricao="Mercadorias que chegaram."
        icone="truck-delivery-outline"
        cor="laranja"
        aoPressionar={() => router.push('/historico?ver=lista&tipo=ENTRADA')}
      />
      <DicaBox texto="Acompanhe entradas e vendas de forma simples e organizada." />
    </ScreenContainer>
  );
}
