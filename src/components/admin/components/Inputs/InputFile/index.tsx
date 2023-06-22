import { Plus } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
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
  const isFilled = (file?.length ?? 0) > 0 ? 'file-selected' : ''

  return (
    <Container>
      <label htmlFor={id} className={`${className} ${isFilled}`}>
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
