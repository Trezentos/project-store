import Image from 'next/image'
import { ArrowBendDownLeft, Pencil } from 'phosphor-react'
import { Container } from './styles'
import HighlightCardProperties from './CardAttributes'
import CardEdit from './CardEdit'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  MainBackgroundItem,
  MainBackgroundHomeContext,
} from '@/contexts/pages/admin/Home/MainBackgroundHomeContext'

interface HighlightProductsProps {
  mainBackgroundItemFromApi: MainBackgroundItem
}

function MainBackgroundHome({
  mainBackgroundItemFromApi,
}: HighlightProductsProps) {
  const { backgroundItem, updateBackgroundItem, editMode, toggleEditMode } =
    useContext(MainBackgroundHomeContext)

  useEffect(() => {
    if (!backgroundItem.id) updateBackgroundItem(mainBackgroundItemFromApi)
  }, [backgroundItem, mainBackgroundItemFromApi, updateBackgroundItem])

  return (
    <Container>
      <header>
        <h4>Imagem principal de fundo</h4>
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

export default MainBackgroundHome
