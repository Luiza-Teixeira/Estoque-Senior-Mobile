import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { z } from 'zod';

import { useFeedback } from '@/components/feedback/feedbackStore';
import { CheckboxField } from '@/components/forms/CheckboxField';
import { FormTextField } from '@/components/forms/FormTextField';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAppTheme } from '@/constants/theme';
import { LogoMarca } from '@/features/conta/components/LogoMarca';
import { useAuthStore } from '@/stores/authStore';
import { mensagemDeErro } from '@/types/api';

const loginSchema = z.object({
  email: z.string().trim().email('Digite um e-mail válido. Ex.: maria@exemplo.com'),
  senha: z.string().min(1, 'Digite sua senha.'),
});

type LoginValores = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const { cores } = useAppTheme();
  const feedback = useFeedback();
  const login = useAuthStore((s) => s.login);
  const [lembrar, setLembrar] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [entrando, setEntrando] = useState(false);

  const { control, handleSubmit } = useForm<LoginValores>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', senha: '' },
  });

  async function entrar(valores: LoginValores) {
    setEntrando(true);

    try {
      await login(valores, lembrar);
    } catch (erro) {
      feedback.erro(mensagemDeErro(erro));
    } finally {
      setEntrando(false);
    }
  }

  return (
    <ScreenContainer seguroTopo>
      <LogoMarca />

      <Text variant="bodyLarge" style={[styles.centro, { color: cores.textSecondary }]}>
        Gerencie seu estoque de forma simples e acessível.
      </Text>

      <AppCard>
        <FormTextField
          control={control}
          name="email"
          rotulo="E-mail"
          placeholder="Ex.: maria@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          icone="account-outline"
        />

        <FormTextField
          control={control}
          name="senha"
          rotulo="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={!mostrarSenha}
          icone="lock-outline"
          right={
            <TextInput.Icon
              icon={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setMostrarSenha(!mostrarSenha)}
              accessibilityLabel={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
            />
          }
        />

        <CheckboxField
          rotulo="Lembrar meu acesso"
          marcado={lembrar}
          aoAlterar={setLembrar}
        />

        <AppButton
          titulo="Entrar"
          icone="login"
          onPress={() => handleSubmit(entrar)()}
          loading={entrando}
          disabled={entrando}
        />

        <AppButton
          titulo="Criar uma conta"
          variante="secundario"
          onPress={() => router.push('/cadastro')}
        />

        <AppButton
          titulo="Esqueci minha senha"
          variante="texto"
          onPress={() =>
            feedback.erro('Para trocar a senha, fale com o responsável pelo sistema.')
          }
        />
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centro: {
    textAlign: 'center',
  },
});