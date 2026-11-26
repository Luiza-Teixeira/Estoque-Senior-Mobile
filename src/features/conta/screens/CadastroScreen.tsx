import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useFeedback } from '@/components/feedback/feedbackStore';
import { FormTextField } from '@/components/forms/FormTextField';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useAuthStore } from '@/stores/authStore';
import { mensagemDeErro } from '@/types/api';

const cadastroSchema = z
  .object({
    nome: z.string().trim().min(3, 'Digite seu nome completo.'),
    email: z.string().trim().email('Digite um e-mail válido. Ex.: maria@exemplo.com'),
    senha: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres.'),
    confirmarSenha: z.string(),
  })
  .refine((v) => v.senha === v.confirmarSenha, {
    message: 'As senhas não são iguais.',
    path: ['confirmarSenha'],
  });
type CadastroValores = z.infer<typeof cadastroSchema>;

export function CadastroScreen() {
  const feedback = useFeedback();
  const cadastrar = useAuthStore((s) => s.cadastrar);
  const [salvando, setSalvando] = useState(false);
  const { control, handleSubmit } = useForm<CadastroValores>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: '', email: '', senha: '', confirmarSenha: '' },
  });

  async function salvar({ nome, email, senha }: CadastroValores) {
    setSalvando(true);
    try {
      await cadastrar({ nome, email, senha });
      feedback.sucesso('Conta criada! Bem-vindo(a) ao Estoque Sênior.');
    } catch (erro) {
      feedback.erro(mensagemDeErro(erro));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScreenContainer seguroTopo>
      <PageHeader
        titulo="Criar conta"
        subtitulo="Preencha seus dados para acessar o sistema."
        voltar
      />
      <AppCard>
        <FormTextField
          control={control}
          name="nome"
          rotulo="Nome completo"
          obrigatorio
          icone="account-outline"
          placeholder="Ex.: Maria Oliveira"
        />
        <FormTextField
          control={control}
          name="email"
          rotulo="E-mail"
          obrigatorio
          icone="email-outline"
          placeholder="Ex.: maria@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormTextField
          control={control}
          name="senha"
          rotulo="Senha"
          obrigatorio
          icone="lock-outline"
          secureTextEntry
          ajuda="Pelo menos 8 caracteres."
        />
        <FormTextField
          control={control}
          name="confirmarSenha"
          rotulo="Confirmar senha"
          obrigatorio
          icone="lock-check-outline"
          secureTextEntry
        />
        <AppButton
          titulo="Cadastrar"
          icone="account-plus-outline"
          onPress={() => handleSubmit(salvar)()}
          loading={salvando}
          disabled={salvando}
        />
      </AppCard>
    </ScreenContainer>
  );
}
