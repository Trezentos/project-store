import { ColorOptionType } from '@/pages/individualProduct/[id]'
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
  defaultSize?: string
  sizeOptions: string[]
  selectedSize: string | undefined
  changeSize: (size: string) => void
}

export default function PropertiesProductSize({
  sizeOptions,
  defaultSize,
  changeSize,
  selectedSize,
}: PropertiesProductProps) {
  return (
    <Container>
      {<h4>Tamanho:</h4>}
      <ColorsOptionsContainer>
        {sizeOptions.map((item, index) => {
          return (
            <SizeDiv
              className={selectedSize === item ? 'active' : ''}
              color={item}
              key={item}
              onClick={() => changeSize(item)}
            >
              <span>{item}</span>
            </SizeDiv>
          )
        })}
      </ColorsOptionsContainer>
    </Container>
  )
}
