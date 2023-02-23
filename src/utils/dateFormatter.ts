export default function dateFormatter(date: string) {
  if (!date) return

  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}
