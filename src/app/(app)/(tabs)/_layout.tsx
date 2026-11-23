import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/constants/theme';
import { fontes } from '@/constants/typography';
import { AppHeader } from '@/features/configuracoes/components/AppHeader';

const ABAS = [
  { nome: 'index', titulo: 'Início', icone: 'home-outline' },
  { nome: 'produtos', titulo: 'Produtos', icone: 'cube-outline' },
  { nome: 'estoque', titulo: 'Estoque', icone: 'package-variant' },
  { nome: 'vendas', titulo: 'Vendas', icone: 'cart-outline' },
  { nome: 'historico', titulo: 'Histórico', icone: 'clock-outline' },
];

export default function TabsLayout() {
  const { cores } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
        tabBarActiveTintColor: cores.primary,
        tabBarInactiveTintColor: cores.textSecondary,
        tabBarActiveBackgroundColor: cores.primarySoft,
        tabBarStyle: {
          height: 72 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: cores.surface,
          borderTopColor: cores.border,
        },
        tabBarItemStyle: { paddingVertical: 6 },
        tabBarLabelStyle: { fontFamily: fontes.bold, fontSize: 14 },
      }}
    >
      {ABAS.map((aba) => (
        <Tabs.Screen
          key={aba.nome}
          name={aba.nome}
          options={{
            title: aba.titulo,
            tabBarAccessibilityLabel: aba.titulo,
            tabBarIcon: ({ color }) => (
              <Icon source={aba.icone} size={28} color={color as string} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}