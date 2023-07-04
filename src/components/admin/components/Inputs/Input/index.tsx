import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  inputError?: FieldError
  register: any
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  value = '',
  inputError,
  register,
  ...rest
}) => {
  const [changeValue, setChangeValue] = useState(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setChangeValue(value)
    return value
  }

  return (
    <Container>
      <label>{label}</label>
      <input
        {...register}
        value={changeValue}
        onChange={handleChange}
        {...rest}
      />
      {inputError && <p>{inputError.message}</p>}
    </Container>
  )
}

export default Input
