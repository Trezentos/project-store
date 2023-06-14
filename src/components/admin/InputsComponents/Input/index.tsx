import React, { ChangeEvent, useState } from 'react'
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
  const [changeValue, setChangeValue] = useState(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setChangeValue(value)
  }

  return (
    <Container>
      <label>{label}</label>
      <input
        id={id}
        {...register}
        type={type}
        value={changeValue}
        onChange={handleChange}
      />
      {inputError && <p>{inputError.message}</p>}
    </Container>
  )
}

export default Input
