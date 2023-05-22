import { IncomingForm, Fields, Files, File } from 'formidable'
import type { NextApiRequest } from 'next'

const form = new IncomingForm()

export default function formToDataFormatter(req: NextApiRequest) {
  const resolvedDatas = new Promise<{
    files: Files
    fields: Fields
  }>((resolve, reject) => {
    form.parse(req, (err, fields: Fields, files: Files) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      resolve({ files, fields })
    })
  })

  return resolvedDatas
}
