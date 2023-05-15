// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, Fields, Files } from 'formidable'
import fs from 'fs'
import path from 'path'
import s3 from '@/lib/s3'
import { prisma } from '@/lib/prisma'

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm()

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const formattedFilesData = await new Promise<Files>((resolve, reject) => {
    form.parse(req, (err, fields: Fields, files: Files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })

  const finalObjs = []

  for (const [key, value] of Object.entries(formattedFilesData)) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME ?? '',
      // @ts-ignore
      Key: value.originalFilename ?? '',
      // @ts-ignore
      Body: fs.readFileSync(value.filepath),
      ContentType: 'mimeType',
      ACL: 'public-read',
    }
    const returnedData = await s3.upload(params).promise()

    console.log(returnedData)

    finalObjs.push({
      name: key,
      link: returnedData.Location,
      key: returnedData.Key,
    })
  }

  const formattedObjs = []
  for (let index = 0; index < finalObjs.length / 2; index++) {
    formattedObjs.push({
      desktop: finalObjs[index * 2],
      mobile: finalObjs[index * 2 + 1],
    })
  }

  formattedObjs.forEach(async (item) => {
    await prisma.carrousselImage.create({
      data: {
        desktopKey: item.desktop.key,
        desktopLink: item.desktop.link,
        mobileKey: item.mobile.key,
        mobileLink: item.mobile.link,
      },
    })
  })
}

export default upload
