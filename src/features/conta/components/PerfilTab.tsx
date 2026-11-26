import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { z } from 'zod';

import { useFeedback } from '@/components/feedback/feedbackStore';
import { FormTextField } from '@/components/forms/FormTextField';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { useAppTheme } from '@/constants/theme';
import { useAtualizarPerfil } from '@/features/conta/mutations/useAtualizarPerfil';
import { useAuthStore } from '@/stores/authStore';
import { mensagemDeErro } from '@/types/api';

const perfilSchema = z
  .object({
    nome: z.string().trim().min(3, 'Digite seu nome completo.'),
    email: z.string().trim().email('Digite um e-mail válido.'),
    novaSenha: z
      .string()
      .refine((v) => v === '' || v.length >= 8, 'A senha precisa ter pelo menos 8 caracteres.'),
    confirmarSenha: z.string(),
  })
  .refine((v) => v.novaSenha === v.confirmarSenha, {
    message: 'As senhas não são iguais.',
    path: ['confirmarSenha'],
  });
type PerfilValores = z.infer<typeof perfilSchema>;

export function PerfilTab() {
  const { cores } = useAppTheme();
  const feedback = useFeedback();
  const usuario = useAuthStore((s) => s.usuario);
  const atualizar = useAtualizarPerfil();
  const { control, handleSubmit, reset } = useForm<PerfilValores>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nome: usuario?.nome ?? '',
      email: usuario?.email ?? '',
      novaSenha: '',
      confirmarSenha: '',
    },
  });

  function salvar({ nome, email, novaSenha }: PerfilValores) {
    atualizar.mutate(
      { nome, email, novaSenha: novaSenha || undefined },
      {
        onSuccess: (u) => {
          feedback.sucesso('Perfil atualizado.');
          reset({ nome: u.nome, email: u.email, novaSenha: '', confirmarSenha: '' });
        },
        onError: (erro) => feedback.erro(mensagemDeErro(erro)),
      },
    );
  }

  return (
    <AppCard>
      <Text variant="titleLarge" style={{ color: cores.navy }}>
        Meu perfil
      </Text>
      <Text variant="bodyMedium" style={{ color: cores.textSecondary }}>
        Gerencie suas informações pessoais.
      </Text>
      <FormTextField
        control={control}
        name="nome"
        rotulo="Nome completo"
        obrigatorio
        icone="account-outline"
      />
      <FormTextField
        control={control}
        name="email"
        rotulo="E-mail"
        obrigatorio
        icone="email-outline"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormTextField
        control={control}
        name="novaSenha"
        rotulo="Nova senha (opcional)"
        icone="lock-outline"
        secureTextEntry
        placeholder="Digite uma nova senha"
      />
      <FormTextField
        control={control}
        name="confirmarSenha"
        rotulo="Confirmar nova senha"
        icone="lock-check-outline"
        secureTextEntry
        placeholder="Confirme a nova senha"
      />
      <AppButton
        titulo="Salvar alterações"
        icone="content-save-outline"
        onPress={() => handleSubmit(salvar)()}
        loading={atualizar.isPending}
        disabled={atualizar.isPending}
      />
    </AppCard>
  );
}
