export function dateFormat(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const formattedDate = formatter.format(date)
  const regex = /^(\d{2})\D+(\w{3})\D+(\d{4})$/
  const match = formattedDate.match(regex)

  if (match) {
    const day = match[1]
    const month = match[2]
    const year = match[3]

    const formattedDate2 = `${day}, ${month} ${year}`
    return formattedDate2
  }
}
