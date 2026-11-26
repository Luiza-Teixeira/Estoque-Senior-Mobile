export function formatarMoeda(valor: number): string {
  const [inteiro, centavos] = Math.abs(valor).toFixed(2).split('.');
  const comMilhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${valor < 0 ? '-' : ''}R$ ${comMilhar},${centavos}`;
}

const doisDigitos = (n: number) => String(n).padStart(2, '0');

export function formatarData(iso: string): string {
  const d = new Date(iso);
  return `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function formatarHora(iso: string): string {
  const d = new Date(iso);
  return `${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;
}

export function formatarDataHora(iso: string): string {
  if (ehHoje(iso)) return `Hoje, ${formatarHora(iso)}`;
  return `${formatarData(iso)} às ${formatarHora(iso)}`;
}

export function ehHoje(iso: string): boolean {
  const d = new Date(iso);
  const hoje = new Date();
  return (
    d.getDate() === hoje.getDate() &&
    d.getMonth() === hoje.getMonth() &&
    d.getFullYear() === hoje.getFullYear()
  );
}

export function formatarCodigo(prefixo: 'P' | 'V' | 'E', id: number): string {
  const casas = prefixo === 'V' ? 5 : prefixo === 'E' ? 4 : 3;
  return `${prefixo}${String(id).padStart(casas, '0')}`;
}

export function paraNumero(texto: string): number {
  const limpo = texto.trim();
  if (limpo === '') return NaN;
  const normalizado = limpo.includes(',') ? limpo.replace(/\./g, '').replace(',', '.') : limpo;
  return Number(normalizado);
}

export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
