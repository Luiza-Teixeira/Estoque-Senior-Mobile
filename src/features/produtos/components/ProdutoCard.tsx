import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { StatusEstoqueChip } from '@/components/ui/StatusEstoqueChip';
import { espaco } from '@/constants/spacing';
import { useAppTheme } from '@/constants/theme';
import type { Produto } from '@/features/produtos/types/produto';
import { formatarCodigo, formatarMoeda } from '@/utils/formatadores';

interface ProdutoCardProps {
  produto: Produto;
  aoVer: () => void;
  aoEditar: () => void;
  aoExcluir: () => void;
}

export function ProdutoCard({ produto, aoVer, aoEditar, aoExcluir }: ProdutoCardProps) {
  const { cores } = useAppTheme();

  return (
    <AppCard>
      <TouchableRipple
        onPress={aoVer}
        accessibilityRole="button"
        accessibilityLabel={`${produto.nome}, ${formatarMoeda(produto.precoVenda)}, ${produto.quantidadeEstoque} unidades. Ver detalhes.`}
      >
        <View style={styles.topo}>
          <View style={styles.textos}>
            <Text variant="bodySmall" style={{ color: cores.textSecondary }}>
              {formatarCodigo('P', produto.id)}
              {produto.categoria ? ` · ${produto.categoria}` : ''}
            </Text>
            <Text variant="titleMedium" style={{ color: cores.text }}>
              {produto.nome}
            </Text>
            <Text variant="titleSmall" style={{ color: cores.primary }}>
              {formatarMoeda(produto.precoVenda)}
            </Text>
          </View>
          <View style={styles.estoque}>
            <Text variant="titleSmall" style={{ color: cores.text }}>
              {produto.quantidadeEstoque} un
            </Text>
            <StatusEstoqueChip
              quantidade={produto.quantidadeEstoque}
              minimo={produto.estoqueMinimo}
            />
          </View>
        </View>
      </TouchableRipple>
      <View style={styles.acoes}>
        <AppButton
          titulo="Editar"
          icone="pencil"
          variante="secundario"
          onPress={aoEditar}
          style={styles.botao}
        />
        <AppButton
          titulo="Excluir"
          icone="trash-can-outline"
          variante="texto"
          textColor={cores.danger}
          onPress={aoExcluir}
          style={styles.botao}
        />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  topo: { flexDirection: 'row', gap: espaco.sm },
  textos: { flex: 1, gap: 2 },
  estoque: { alignItems: 'flex-end', gap: espaco.xs },
  acoes: { flexDirection: 'row', gap: espaco.sm },
  botao: { flex: 1 },
});
