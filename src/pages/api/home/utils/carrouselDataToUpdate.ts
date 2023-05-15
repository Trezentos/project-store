import { ManagedUpload } from 'aws-sdk/clients/s3'

export default function carrouselToUpdate(
  device: string,
  returnedS3Upload: ManagedUpload.SendData,
) {
  const dataToUpdate = {}

  if (device === 'desktop') {
    Object.assign(dataToUpdate, {
      desktopLink: returnedS3Upload.Location,
      desktopKey: returnedS3Upload.Key,
    })
  } else {
    Object.assign(dataToUpdate, {
      mobileLink: returnedS3Upload.Location,
      mobileKey: returnedS3Upload.Key,
    })
  }

  return dataToUpdate
}
