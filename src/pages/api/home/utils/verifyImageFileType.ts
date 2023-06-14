import { fileTypeFromFile } from 'file-type'
import { NextApiResponse } from 'next'

export default async function verifyFileType(filepath: string) {
  const fileType = await fileTypeFromFile(filepath)

  const allowedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
  ]

  if (!fileType) {
    throw new Error('O tipo de arquivo não pôde ser determinado.')
  }

  if (!allowedFileTypes.includes(fileType.mime)) {
    throw new Error(
      'Tipo de arquivo inválido. Apenas jpeg, jpg, png, e webp são permitidos.',
    )
  }
}
