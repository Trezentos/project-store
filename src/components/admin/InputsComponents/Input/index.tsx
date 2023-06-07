import React, { ChangeEvent } from 'react'
import { FieldError } from 'react-hook-form'
import { Container } from './styles'

interface InputProps {
  type: string
  label: string
  value: any
  inputError?: FieldError
  register: any
  id: string
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  inputError,
  register,
  id,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
  }

  return (
    <Container>
      <label>{label}</label>
      <input
        id={id}
        {...register}
        type={type}
        value={value}
        onChange={handleChange}
      />
      {inputError && <p>{inputError.message}</p>}
    </Container>
  )
}

export default Input
