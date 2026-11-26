export const cores = {
  primary: '#0B3B8C',
  navy: '#0A2A5C',
  primaryLight: '#E8F1FC',
  primarySoft: '#D6E6FA',
  background: '#F5F8FC',
  surface: '#FFFFFF',
  border: '#C7D7EE',
  text: '#0F1B2D',
  textSecondary: '#4A5568',
  textOnPrimary: '#FFFFFF',
  success: '#1E7D32',
  successBg: '#E6F4EA',
  warning: '#B85C00',
  warningBg: '#FFF1E0',
  danger: '#C62828',
  dangerBg: '#FDECEC',
  info: '#0B3B8C',
  infoBg: '#E8F1FC',
};

export type Paleta = typeof cores;

export const coresAltoContraste: Paleta = {
  ...cores,
  primary: '#002A6E',
  navy: '#001B44',
  primaryLight: '#FFFFFF',
  primarySoft: '#DCE8FF',
  background: '#FFFFFF',
  border: '#001B44',
  text: '#000000',
  textSecondary: '#1A1A1A',
  success: '#0B5D1E',
  warning: '#7A3D00',
  danger: '#8E0000',
};