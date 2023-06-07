import Image from 'next/image'
import { ArrowBendDownLeft, Pencil } from 'phosphor-react'
import { Container } from './styles'
import HighlightCardProperties from './HighlightCard'
import CardEdit from './CardEdit'
import { useContext, useEffect } from 'react'
import {
  HighlightItem,
  HighlightProductsContext,
} from '@/contexts/pages/admin/Home/HighlightProductsContext'

interface HighlightProductsProps {
  highlightItemFromApi: HighlightItem
}

function HighlightProducts({ highlightItemFromApi }: HighlightProductsProps) {
  const { toggleEditMode, editMode, updateHighlightItem, highlightItem } =
    useContext(HighlightProductsContext)

  useEffect(() => {
    if (!highlightItem.id) updateHighlightItem(highlightItemFromApi)
  }, [highlightItem, highlightItemFromApi, updateHighlightItem])

  return (
    <Container>
      <header>
        <h4>Imagens de destaque</h4>
        {editMode ? (
          <ArrowBendDownLeft size={24} onClick={() => toggleEditMode()} />
        ) : (
          <Pencil size={24} onClick={() => toggleEditMode()} />
        )}
      </header>
      {editMode ? <CardEdit /> : <HighlightCardProperties />}
    </Container>
  )
}

export default HighlightProducts
