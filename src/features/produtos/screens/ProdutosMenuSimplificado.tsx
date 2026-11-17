import { router } from 'expo-router';

import { ActionCard } from '@/components/ui/ActionCard';
import { DicaBox } from '@/components/ui/DicaBox';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

export function ProdutosMenuSimplificado() {
  return (
    <ScreenContainer>
      <PageHeader titulo="Produtos" subtitulo="O que deseja fazer?" />
      <ActionCard
        titulo="Cadastrar novo produto"
        descricao="Colocar um produto novo na loja."
        icone="cube-outline"
        cor="verde"
        aoPressionar={() => router.push('/produtos/novo')}
      />
      <ActionCard
        titulo="Ver lista de produtos"
        descricao="Ver preços e quantidades."
        icone="format-list-bulleted"
        aoPressionar={() => router.push('/produtos?ver=lista')}
      />
      <ActionCard
        titulo="Editar ou excluir produto"
        descricao="Escolha o produto na lista."
        icone="pencil-outline"
        cor="laranja"
        aoPressionar={() => router.push('/produtos?ver=lista&buscar=1')}
      />
      <DicaBox texto="Mantenha os produtos sempre atualizados para um controle de estoque mais seguro." />
    </ScreenContainer>
  );
}
