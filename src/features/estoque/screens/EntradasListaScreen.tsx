import { router } from 'expo-router';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { EntradaCard } from '@/features/estoque/components/EntradaCard';
import { useEntradas } from '@/features/estoque/queries/useEntradas';
import { mensagemDeErro } from '@/types/api';

export function EntradasListaScreen() {
  const entradas = useEntradas();

  return (
    <ScreenContainer>
      <PageHeader
        titulo="Entradas registradas"
        subtitulo="Mercadorias que chegaram, da mais recente para a mais antiga."
        voltar
      />
      {entradas.isLoading ? <LoadingState mensagem="Carregando entradas..." /> : null}
      {entradas.isError ? (
        <ErrorState
          mensagem={mensagemDeErro(entradas.error)}
          aoTentarNovamente={() => entradas.refetch()}
        />
      ) : null}
      {entradas.data && entradas.data.length === 0 ? (
        <EmptyState
          titulo="Nenhuma entrada registrada"
          icone="truck-delivery-outline"
          acao={{
            titulo: 'Registrar entrada',
            icone: 'plus',
            aoPressionar: () => router.push('/estoque/entrada'),
          }}
        />
      ) : null}
      {entradas.data?.map((entrada) => (
        <EntradaCard
          key={entrada.id}
          entrada={entrada}
          aoVer={() => router.push(`/estoque/entradas/${entrada.id}`)}
        />
      ))}
    </ScreenContainer>
  );
}
