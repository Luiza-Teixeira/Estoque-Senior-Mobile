# Integração com o back-end Express — necessidades do app mobile

Este documento descreve **o que o app mobile precisa** da API Express. Ele **não define** a arquitetura do back-end: é uma lista de necessidades do front para facilitar a integração. Nomes de rotas e campos podem mudar; se mudarem, ajustamos só os arquivos `src/features/*/services/*.service.ts`.

Hoje o app funciona com dados de exemplo (`EXPO_PUBLIC_USE_MOCKS=true`). Para ligar na API: `EXPO_PUBLIC_USE_MOCKS=false` e `EXPO_PUBLIC_API_URL=<endereço>` no `.env`.

## 1. Padrões gerais

- JSON em português, com os mesmos nomes de campos do back-end Java (`precoVenda`, `quantidadeEstoque`, `estoqueMinimo`, `dataHora`...).
- Valores em dinheiro como **número** (ex.: `25.9`), não texto.
- Datas em ISO 8601 (ex.: `2026-11-10T14:32:00Z`).
- Ids numéricos.
- CORS liberado para testes no navegador (Expo web).

## 2. Entidades

### Produto
| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| id | number | sim | gerado |
| nome | string | sim | não vazio |
| precoVenda | number | sim | > 0 |
| quantidadeEstoque | number | sim | ≥ 0 |
| estoqueMinimo | number | sim | ≥ 0 |
| categoria | string | não | novo (aparece nos designs) |
| descricao | string | não | novo (aparece nos designs) |

### EntradaMercadoria (relacionamento → Produto)
| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| id | number | sim | gerado |
| produto | `{ id, nome }` | sim | produto existente |
| quantidade | number | sim | > 0, **soma** ao estoque |
| custoUnitario | number | sim | > 0 |
| dataHora | string | sim | gerada pelo servidor |
| fornecedor | string | não | novo |
| observacao | string | não | novo |

### Venda (relacionamento → Produto, por item)
| Campo | Tipo | Obrigatório | Regra |
| --- | --- | --- | --- |
| id | number | sim | gerado |
| itens | `ItemVenda[]` | sim | pelo menos 1 |
| total | number | sim | soma de quantidade × valorUnitario |
| formaPagamento | `"DINHEIRO" \| "PIX" \| "CARTAO"` | sim | novo |
| cliente | string | não | novo (texto livre) |
| dataHora | string | sim | gerada pelo servidor |

`ItemVenda`: `{ produtoId, nomeProduto, quantidade, valorUnitario }` — `valorUnitario` é o preço do produto no momento da venda; cada item **subtrai** do estoque; não pode vender mais do que há em estoque.

> No Java, cada venda tem só 1 produto. Os designs mostram vendas com vários produtos, por isso o app envia uma lista de itens.

### Usuario
`{ id, nome, email }` (a senha nunca volta na resposta).

## 3. Operações que o app usa

| Recurso | Método e rota sugerida | Envia | Recebe | Usado em |
| --- | --- | --- | --- | --- |
| Login | `POST /auth/login` | `{ email, senha }` | `{ usuario, token }` | Login |
| Cadastro | `POST /auth/cadastro` | `{ nome, email, senha }` | `{ usuario, token }` | Criar conta |
| Perfil | `PUT /usuarios/me` | `{ nome, email, novaSenha? }` | `Usuario` | Configurações › Perfil |
| Listar produtos | `GET /produtos` | — | `Produto[]` | Produtos, Venda, Entrada |
| Buscar produto | `GET /produtos/:id` | — | `Produto` | Detalhes, Editar |
| Criar produto | `POST /produtos` | `{ nome, precoVenda, quantidadeEstoque, estoqueMinimo, categoria?, descricao? }` | `Produto` (201) | Cadastrar produto |
| Atualizar produto | `PUT /produtos/:id` | `{ nome, precoVenda, estoqueMinimo, categoria?, descricao? }` | `Produto` | Editar produto |
| **Excluir produto** | `DELETE /produtos/:id` | — | 204 | Produtos (não existe no Java) |
| Estoque geral | `GET /estoque` | — | `{ produtoId, nomeProduto, quantidadeEstoque, estoqueMinimo, estoqueBaixo }[]` | Estoque |
| Estoque baixo | `GET /estoque/baixo` | — | mesmo formato | Início, Estoque |
| Registrar entrada | `POST /entradas-mercadoria` | `{ produtoId, quantidade, custoUnitario, fornecedor?, observacao? }` | `EntradaMercadoria` (201) | Entrada de mercadoria |
| Listar entradas | `GET /entradas-mercadoria` | — | `EntradaMercadoria[]` | Entradas registradas |
| Buscar entrada | `GET /entradas-mercadoria/:id` | — | `EntradaMercadoria` | Detalhe da entrada |
| Registrar venda | `POST /vendas` | `{ itens: [{ produtoId, quantidade }], formaPagamento, cliente? }` | `Venda` (201) | Realizar venda |
| Listar vendas | `GET /vendas` | — | `Venda[]` (mais recente primeiro) | Vendas, Início |
| Buscar venda | `GET /vendas/:id` | — | `Venda` | Detalhe da venda |
| Histórico | `GET /historico` | — | `Movimentacao[]` | Histórico |
| Registro do histórico | `GET /historico/:id` | — | `Movimentacao` | Detalhe do registro |
| Resumo | `GET /dashboard/resumo` | — | `ResumoDashboard` | Início |

`Movimentacao`: `{ id: string, tipo: "ENTRADA" | "SAIDA", referenciaId, produtoId, nomeProduto, quantidade, valorUnitario, dataHora }` — um registro por entrada e um por **item** de venda. O Java já devolve quase tudo; faltam `id` e `referenciaId` (para abrir o detalhe).

`ResumoDashboard`: `{ totalProdutosCadastrados, quantidadeProdutosEstoqueBaixo, quantidadeProdutosSemEstoque, quantidadeVendasDia, valorTotalVendidoDia }` — `quantidadeProdutosSemEstoque` é novo.

Filtros (busca, tipo, período, ordenação) hoje são feitos no próprio app. Se a lista crescer, o back-end pode oferecer query params (`?busca=`, `?tipo=`, `?de=&ate=`).

## 4. Autenticação

- Login devolve `{ usuario, token }`.
- O app envia `Authorization: Bearer <token>` em todas as chamadas (`src/services/api.ts`).
- Resposta **401** em qualquer rota faz o app sair da conta e voltar para o Login.
- O token fica salvo no aparelho (SecureStore) quando a pessoa marca “Lembrar meu acesso”.

## 5. Erros que o app sabe tratar

O app espera o mesmo formato de erro do Java (`RespostaDeErro`):

```json
{
  "timestamp": "2026-11-10T14:32:00",
  "status": 409,
  "erro": "Conflict",
  "mensagem": "Estoque insuficiente.",
  "caminho": "/vendas",
  "detalhes": ["quantidade: deve ser maior que zero"]
}
```

| Status | Situação | O que o app faz |
| --- | --- | --- |
| 400 | campo inválido | mostra `mensagem` |
| 401 | sessão inválida / login errado | volta ao Login / mostra `mensagem` |
| 404 | não encontrado | mostra `mensagem` |
| 409 | estoque insuficiente, e-mail já usado | mostra `mensagem` no formulário |
| 500 | erro do servidor | “O sistema teve um problema. Tente novamente em instantes.” |
| sem resposta | sem internet | “Sem conexão com o servidor...” |

**Pedido importante:** que o campo `mensagem` venha em **português simples**, pois é mostrado direto para pessoas idosas.