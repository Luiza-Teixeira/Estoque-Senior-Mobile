import { router } from 'expo-router';

import { ActionCard } from '@/components/ui/ActionCard';
import { DicaBox } from '@/components/ui/DicaBox';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

export function VendasMenuSimplificado() {
  return (
    <ScreenContainer>
      <PageHeader titulo="Vendas" subtitulo="O que deseja fazer?" />
      <ActionCard
        titulo="Realizar nova venda"
        descricao="Registrar uma venda agora."
        icone="cart-plus"
        cor="verde"
        aoPressionar={() => router.push('/vendas/nova')}
      />
      <ActionCard
        titulo="Ver vendas realizadas"
        descricao="Ver as vendas feitas."
        icone="format-list-bulleted"
        aoPressionar={() => router.push('/vendas?ver=lista')}
      />
      <ActionCard
        titulo="Consultar uma venda"
        descricao="Procurar pelo cliente ou número."
        icone="magnify"
        cor="laranja"
        aoPressionar={() => router.push('/vendas?ver=lista&buscar=1')}
      />
      <DicaBox texto="Registre as vendas e acompanhe o desempenho do seu negócio." />
    </ScreenContainer>
  );
}
