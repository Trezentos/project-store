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

function MainBackgroundHome() {
  const { backgroundItem, updateBackgroundItem, editMode, toggleEditMode } =
    useContext(MainBackgroundHomeContext)

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
