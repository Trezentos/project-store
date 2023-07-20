import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { Container } from './styles'
import formatToCurrency from './formattersFunctions'

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
  id,
  register,
  ...rest
}) => {
  const [changeValue, setChangeValue] = useState(value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (id === 'price') {
      setChangeValue(formatToCurrency(value))
      return
    }

    setChangeValue(value)
    return value
  }

  return (
    <Container>
      <label>{label}</label>
      <input
        {...register}
        id={id}
        value={changeValue}
        onChange={handleChange}
        {...rest}
      />
      {inputError && <p>{inputError.message}</p>}
    </Container>
  )
}

export default Input
