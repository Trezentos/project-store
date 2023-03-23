import { Minus, Plus } from 'phosphor-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from './styles'

interface AccordeonDetailProps {
  bodyText: string
}

export default function AccordeonDetail({ bodyText }: AccordeonDetailProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const accordionRef = useRef<HTMLDivElement>(null)

  const expandAccordion = useCallback((e: any) => {
    console.log('oap')

    if (!accordionRef || !accordionRef.current) return

    console.log(accordionRef.current?.style.maxHeight)

    if (accordionRef.current?.style.maxHeight === '0px') {
      setIsExpanded(true)
      accordionRef.current.style.maxHeight =
        accordionRef.current.scrollHeight + 'px'
    } else {
      setIsExpanded(false)
      accordionRef.current.style.maxHeight = 0 + 'px'
    }
  }, [])

  useEffect(() => {
    if (!accordionRef || !accordionRef.current) return

    accordionRef.current.style.maxHeight =
      accordionRef.current.scrollHeight + 'px'
  }, [])

  return (
    <Container ref={accordionRef} onClick={expandAccordion}>
      <button>
        Detalhes {isExpanded ? <Minus size={22} /> : <Plus size={22} />}
      </button>
      <p>{bodyText}</p>
    </Container>
  )
}
