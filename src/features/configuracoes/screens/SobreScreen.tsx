import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

import { AppCard } from '@/components/ui/AppCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';

const INTEGRANTES = [
  { nome: 'Dandália Teixeira', ra: '00000860045', modulo: 'Módulo 1 — Produtos' },
  { nome: 'Victoria Beltrão', ra: '00000850093', modulo: 'Módulo 2 — Estoque e Entradas' },
  { nome: 'Jader Silva', ra: '00000859896', modulo: 'Módulo 3 — Vendas e Conta' },
  { nome: 'José Guimarães', ra: '00000855161', modulo: 'Módulo 4 — Início e Histórico' },
];

const SECOES: { titulo: string; icone: string; itens: string[] }[] = [
  {
    titulo: 'Objetivo',
    icone: 'target',
    itens: [
      'Ajudar pequenos comércios a controlar produtos, estoque e vendas de forma simples e acessível.',
    ],
  },
  {
    titulo: 'Público-alvo',
    icone: 'account-group-outline',
    itens: ['Pessoas idosas e pessoas com pouca familiaridade com tecnologia.'],
  },
  {
    titulo: 'Acessibilidade',
    icone: 'human',
    itens: [
      'Letras grandes e botão "A A A" para aumentar o texto.',
      'Alto contraste e botões grandes, sempre com texto.',
      'Modo Simplificado com as ações principais.',
      'Confirmação antes de excluir e mensagens claras.',
    ],
  },
  {
    titulo: 'Principais funcionalidades',
    icone: 'star-outline',
    itens: [
      'Cadastro, edição, consulta e exclusão de produtos.',
      'Controle de estoque, alerta de estoque baixo e entrada de mercadoria.',
      'Registro de vendas com baixa automática do estoque.',
      'Histórico de entradas e vendas e painel com resumo do dia.',
    ],
  },
  {
    titulo: 'Tecnologias',
    icone: 'code-tags',
    itens: [
      'React Native + Expo + TypeScript',
      'Expo Router (navegação)',
      'Zustand (estado global)',
      'Axios + TanStack Query (dados e cache)',
      'React Native Paper (componentes visuais)',
    ],
  },
  {
    titulo: 'Arquitetura',
    icone: 'sitemap-outline',
    itens: [
      'Organizada por funcionalidades (features), um módulo por integrante.',
      'Telas → hooks (TanStack Query) → services → API Express (ou dados de exemplo).',
      'Dados de exemplo temporários, trocados pela API sem mudar as telas.',
    ],
  },
];

export function SobreScreen() {
  const { cores } = useAppTheme();

  return (
    <ScreenContainer seguroTopo>
      <PageHeader
        titulo="Sobre o Estoque Sênior"
        subtitulo="Projeto acadêmico — versão mobile."
        voltar
      />

      {SECOES.map((secao) => (
        <AppCard key={secao.titulo}>
          <View style={styles.titulo}>
            <Icon source={secao.icone} size={28} color={cores.primary} />
            <Text variant="titleLarge" style={{ color: cores.navy }}>
              {secao.titulo}
            </Text>
          </View>
          {secao.itens.map((item) => (
            <Text key={item} variant="bodyLarge" style={{ color: cores.text }}>
              • {item}
            </Text>
          ))}
        </AppCard>
      ))}

      <AppCard>
        <View style={styles.titulo}>
          <Icon source="account-multiple-outline" size={28} color={cores.primary} />
          <Text variant="titleLarge" style={{ color: cores.navy }}>
            Integrantes
          </Text>
        </View>
        {INTEGRANTES.map((p) => (
          <View key={p.ra} style={[styles.integrante, { borderBottomColor: cores.border }]}>
            <Text variant="titleSmall" style={{ color: cores.text }}>
              {p.nome}
            </Text>
            <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
              RA {p.ra} · {p.modulo}
            </Text>
          </View>
        ))}
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titulo: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  integrante: { paddingVertical: espaco.sm, borderBottomWidth: StyleSheet.hairlineWidth },
});
