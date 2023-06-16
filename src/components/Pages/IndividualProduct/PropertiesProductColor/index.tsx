import { ColorOptionType } from '@/pages/categories/individualProduct/[id]'
import { useCallback, useState } from 'react'
import { ColorDiv, ColorsOptionsContainer, Container, SizeDiv } from './styles'

interface ColorType {
  id: string
  hexColor: string
  ColorName: string
}

interface SizeType {
  id: string
  size: string
}

interface PropertiesProductProps {
  selectedColor: ColorOptionType
  type: 'color' | 'size'
  colorOptions: ColorOptionType[]
  changeColor: (colorOpt: ColorOptionType) => void
}

export default function PropertiesProductColor({
  type,
  colorOptions,
  changeColor,
  selectedColor,
}: PropertiesProductProps) {
  const mainTitle = () => {
    if (type === 'color')
      return (
        <h4>
          Cor: <span>{selectedColor.name}</span>
        </h4>
      )
    if (type === 'size') return <h4>Tamanho:</h4>
  }

  return (
    <Container>
      {mainTitle()}
      <ColorsOptionsContainer>
        {type === 'color' &&
          colorOptions.map((item, index) => {
            return (
              <ColorDiv
                className={selectedColor.name === item.name ? 'active' : ''}
                color={item.hexName}
                key={item.hexName}
                onClick={() => changeColor(item)}
              />
            )
          })}
        {/* {type === 'size' &&
          colorOptions.map((item, index) => {
            return (
              <SizeDiv
                className={selectedOption === item ? 'active' : ''}
                color={item}
                key={item}
                onClick={() => changeOption(item)}
              >
                <span>{item}</span>
              </SizeDiv>
            )
          })} */}
      </ColorsOptionsContainer>
    </Container>
  )
}
