import aws from 'aws-sdk'
import nextConnect from 'next-connect'
import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'

// Configurar o AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const s3 = new aws.S3()
const upload = multer()

const handler = nextConnect<NextApiRequest, NextApiResponse>()

handler.use(upload.single('image')).post(async (req, res) => {
  try {
    const { file } = req
    const { originalname, buffer } = file

    // Gerar um nome de arquivo único
    const fileName = Date.now() + '_' + originalname

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }

    // Enviar o arquivo para o Amazon S3
    const response = await s3.upload(params).promise()

    // Retornar a URL do arquivo enviado
    res.status(200).json({ url: response.Location })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao fazer upload do arquivo.' })
  }
})

export default handler
