import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';

import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAppTheme } from '@/constants/theme';
import { PerfilTab } from '@/features/conta';
import { AcessibilidadeTab } from '@/features/configuracoes/components/AcessibilidadeTab';
import { SistemaTab } from '@/features/configuracoes/components/SistemaTab';

type Aba = 'perfil' | 'acessibilidade' | 'sistema';

export function ConfiguracoesScreen() {
  const { fonts } = useAppTheme();
  const params = useLocalSearchParams<{ aba?: Aba }>();
  const [aba, setAba] = useState<Aba>(params.aba ?? 'perfil');

  return (
    <ScreenContainer seguroTopo>
      <PageHeader titulo="Configurações" voltar />
      <SegmentedButtons
        value={aba}
        onValueChange={(v) => setAba(v as Aba)}
        buttons={[
          {
            value: 'perfil',
            label: 'Perfil',
            icon: 'account-outline',
            labelStyle: fonts.labelMedium,
          },
          {
            value: 'acessibilidade',
            label: 'Acessível',
            icon: 'human',
            labelStyle: fonts.labelMedium,
          },
          {
            value: 'sistema',
            label: 'Sistema',
            icon: 'cog-outline',
            labelStyle: fonts.labelMedium,
          },
        ]}
      />
      {aba === 'perfil' ? <PerfilTab /> : null}
      {aba === 'acessibilidade' ? <AcessibilidadeTab /> : null}
      {aba === 'sistema' ? <SistemaTab /> : null}
    </ScreenContainer>
  );
}
