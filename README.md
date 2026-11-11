# Estoque Sênior — Mobile

Aplicativo mobile de gestão de estoque e vendas desenvolvido com foco em acessibilidade, simplicidade e facilidade de uso.

O Estoque Sênior foi pensado especialmente para pessoas idosas e pessoas com pouca familiaridade com tecnologia, utilizando uma interface clara, botões amplos, textos legíveis e recursos de acessibilidade.

## Tecnologias

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand
- Axios
- TanStack Query
- React Native Paper
- React Hook Form
- Zod

## Funcionalidades

- autenticação de usuário;
- cadastro e edição de perfil;
- gerenciamento de produtos;
- controle de estoque;
- registro de entradas de mercadoria;
- registro de vendas;
- histórico de movimentações;
- busca e filtros;
- controle de estoque baixo;
- modo padrão e modo simplificado;
- ajuste de tamanho do texto;
- alto contraste;
- navegação acessível.

## Estrutura do projeto

```text
src/
├── app/
├── components/
├── constants/
├── features/
├── hooks/
├── providers/
├── services/
├── stores/
├── types/
└── utils/
```

O projeto é organizado por funcionalidades, separando telas, componentes, serviços, hooks e tipos.

## Configuração

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Depois execute:

```bash
npx expo start
```

Também é possível abrir a versão web pressionando:

```text
w
```

no terminal do Expo.

## Comandos úteis

```bash
npx tsc --noEmit
```

Verifica os tipos TypeScript.

```bash
npx expo lint
```

Verifica o padrão do código.

```bash
npx expo install --check
```

Verifica a compatibilidade das dependências com a versão do Expo.

## Integração com API

O aplicativo está preparado para consumir uma API REST através do Axios.

A URL do back-end deve ser configurada pela variável:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

As requisições são centralizadas na camada de serviços do projeto.

## Equipe

| Integrante | RA |
| --- | --- |
| Dandália Teixeira | 00000860045 |
| Victoria Beltrão | 00000850093 |
| Jader Silva | 00000859896 |
| José Guimarães | 00000855161 |