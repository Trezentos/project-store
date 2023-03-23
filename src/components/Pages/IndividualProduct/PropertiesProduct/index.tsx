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
  type: 'color' | 'size'
  content: string[]
}

export default function PropertiesProduct({
  type,
  content,
}: PropertiesProductProps) {
  const [selectedOption, setSelectedOption] = useState<string>(content[0])

  const mainTitle = () => {
    if (type === 'color')
      return (
        <h4>
          Cor: <span>{selectedOption}</span>
        </h4>
      )
    if (type === 'size') return <h4>Tamanho:</h4>
  }

  const changeOption = useCallback((option: string) => {
    setSelectedOption(option)
  }, [])

  return (
    <Container>
      {mainTitle()}
      <ColorsOptionsContainer>
        {type === 'color' &&
          content.map((item, index) => {
            return (
              <ColorDiv
                className={selectedOption === item ? 'active' : ''}
                color={item}
                key={item}
                onClick={() => changeOption(item)}
              />
            )
          })}
        {type === 'size' &&
          content.map((item, index) => {
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
          })}
      </ColorsOptionsContainer>
    </Container>
  )
}
