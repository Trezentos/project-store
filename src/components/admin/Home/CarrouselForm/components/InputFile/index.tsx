import { Plus } from 'phosphor-react'
import React, { useEffect } from 'react'
import { FieldErrors } from 'react-hook-form'
import { Container } from './styles'

interface FormValues {
  addDesktopImage: FileList | null
  addMobileImage: FileList | null
}

interface InputFileProps {
  disabled: boolean
  file: FileList | null
  register: any
  id: string
  title: string
  className: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputFile({
  disabled,
  file,
  onChange,
  register,
  id,
  className,
  title,
}: InputFileProps) {
  return (
    <Container>
      <label htmlFor={id} className={className}>
        {title}
        {file?.[0]?.name ? <strong>{file[0].name}</strong> : <Plus size={40} />}
      </label>
      <input
        type="file"
        id={id}
        {...register}
        disabled={disabled}
        accept="image/*"
        onChange={onChange}
      />
    </Container>
  )
}
