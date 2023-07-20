import formidable from 'formidable'

export default function getArrayFrom(
  name: string,
  fields: formidable.Fields | formidable.Files,
) {
  const newArray = []

  for (const [key, value] of Object.entries(fields)) {
    if (key.includes(name)) newArray.push(value)
  }

  return newArray
}
