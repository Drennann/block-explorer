export function timestampAgo(desde: number): string {
  const ahora = new Date().getTime()
  const segundosTranscurridos = Math.floor(Math.floor(ahora / 1000) - desde)

  if (segundosTranscurridos < 60) {
    return `${segundosTranscurridos} secs ago`
  }

  const minutosTranscurridos = Math.floor(segundosTranscurridos / 60)
  if (minutosTranscurridos < 60) {
    return `${minutosTranscurridos} mins ago`
  }

  const horasTranscurridas = Math.floor(minutosTranscurridos / 60)
  if (horasTranscurridas < 24) {
    return `${horasTranscurridas} hours ago`
  }

  const diasTranscurridos = Math.floor(horasTranscurridas / 24)
  return `${diasTranscurridos} days ago`
}

export function truncAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}
