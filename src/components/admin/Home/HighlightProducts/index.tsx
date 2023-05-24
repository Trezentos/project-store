import Image from 'next/image'
import { ArrowBendDownLeft, Pencil } from 'phosphor-react'
import { Container } from './styles'
import HighlightCardProperties from './HighlightCard'
import CardEdit from './CardEdit'
import { useContext } from 'react'
import { HighlightProductsContext } from '@/contexts/pages/admin/home/HighlightProductsContext'

function HighlightProducts() {
  const { toggleEditMode, editMode } = useContext(HighlightProductsContext)

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
