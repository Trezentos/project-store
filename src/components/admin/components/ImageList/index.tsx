import {
  ImageProduct,
  ProductsAdminContext,
} from '@/contexts/pages/admin/ProductsAdminContext'
import { Container, InputFileContainer } from './styles'
import { Upload, X } from 'phosphor-react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { errorToast } from '@/utils/toast/sucessToast'

interface ImageListProps {
  register: any
  disabled?: boolean
  id: string
}

export default function ImagesInput({
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
      <InputFileContainer>
        <p>Clique no icone abaixo para enviar novas imagens</p>
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
        />
      </InputFileContainer>
    </Container>
  )
}
