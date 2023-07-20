import { ImageProduct } from '@/contexts/pages/admin/ProductsAdminContext'
import { Container, InputFileContainer } from './styles'
import { Upload, X } from 'phosphor-react'
import React, { useCallback, useEffect, useState } from 'react'

interface ImageListProps {
  images: ImageProduct[]
  register: any
  disabled?: boolean
  id: string
}

export default function ImagesInput({
  images,
  register,
  id,
  disabled,
}: ImageListProps) {
  const [files, setFile] = useState<any>()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files)
  }, [])

  return (
    <Container>
      <p>Imagens</p>
      <div>
        {images.map((image) => (
          <strong key={image.id}>
            {image.originalName} <X size={24} />
          </strong>
        ))}
      </div>

      <InputFileContainer>
        <p>Imagens selecionadas</p>
        <label htmlFor={id}>
          {files ? (
            Array.from(files).map((item: any) => (
              <strong key={item.name}>{item.name}</strong>
            ))
          ) : (
            <Upload size={24} />
          )}
        </label>
        <input
          type="file"
          id={id}
          {...register}
          disabled={disabled}
          accept="image/*"
          onChange={onChange}
          multiple
          {...images}
        />
      </InputFileContainer>
    </Container>
  )
}
