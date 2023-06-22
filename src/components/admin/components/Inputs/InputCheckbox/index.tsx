import { Container } from './styles'
import React, { useState } from 'react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  values: SelectOption[]
  title: string
  register: any
  id: string
}

const Checkbox: React.FC<SelectProps> = ({
  options,
  values,
  title,
  id,
  register,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(values)

  const handleOptionClick = (option: SelectOption) => {
    const isOptionSelected = selectedOptions.some(
      (selected) => selected.value === option.value,
    )

    if (isOptionSelected) {
      const updatedOptions = selectedOptions.filter(
        (selected) => selected.value !== option.value,
      )
      setSelectedOptions(updatedOptions)
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  return (
    <Container>
      <p>{title}</p>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name={id}
              id={id}
              {...register}
              checked={selectedOptions.some(
                (selected) => selected.value === option.value,
              )}
              onChange={() => handleOptionClick(option)}
              value={option.value}
            />
            {option.label}
          </label>
        ))}
      </div>
    </Container>
  )
}

export default Checkbox
