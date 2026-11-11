export interface RespostaDeErro {
  timestamp?: string;
  status: number;
  erro?: string;
  mensagem: string;
  caminho?: string;
  detalhes?: string[];
}

export class ApiError extends Error {
  status: number;
  detalhes: string[];

  constructor(status: number, mensagem: string, detalhes: string[] = []) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
    this.detalhes = detalhes;
  }
}

export const MENSAGENS_PADRAO: Record<number, string> = {
  0: 'Sem conexão com o servidor. Verifique a internet e tente de novo.',
  400: 'Alguns dados estão incorretos. Confira os campos e tente de novo.',
  401: 'Sua sessão terminou. Entre novamente.',
  404: 'Não encontramos esse item.',
  409: 'Não foi possível concluir. Confira as quantidades.',
  500: 'O sistema teve um problema. Tente novamente em instantes.',
};

export function mensagemDeErro(erro: unknown): string {
  if (erro instanceof ApiError) return erro.message;
  if (erro instanceof Error && erro.message) return erro.message;
  return MENSAGENS_PADRAO[500];
}
