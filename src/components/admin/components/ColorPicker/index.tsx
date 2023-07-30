import React, { useState, useCallback } from 'react'
import { CompactPicker } from 'react-color'
import { Controller } from 'react-hook-form'
import { Container } from './styles'

interface ColorPickerProps {
  name: string
  control: any
  defaultColor: string
}

const ColorPicker = ({
  control,
  defaultColor = '#fff',
  name,
}: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor)

  return (
    <Container>
      <p>Escolha uma cor</p>
      <Controller
        name={name}
        control={control}
        defaultValue={selectedColor}
        render={({ field }) => (
          <CompactPicker
            color={selectedColor}
            onChangeComplete={(item) => {
              setSelectedColor(item.hex)
              field.onChange(item.hex)
            }}
          />
        )}
      />
    </Container>
  )
}

export default ColorPicker
