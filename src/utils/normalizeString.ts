/* eslint-disable no-useless-escape */
export default function normalizeString(str: string) {
  // Substituir 'ç' por 'c'
  str = str.replace(/ç/g, 'c')

  // Remover acentos
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Remover pontuações
  str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')

  // Substituir espaços por '-'
  str = str.replaceAll(/\s/g, '-')

  // Remover caracteres especiais
  str = str.replace(/[^a-zA-Z0-9\-]/g, '')

  str = str.toLowerCase()

  return str
}
