import { EditHeaderFromAdminContext } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { X } from 'phosphor-react'
import React, { ReactNode, useContext } from 'react'
import { Container } from './styles'

interface FeaturedImagePreviewProps {
  thereIsFeaturedImage: string | null
  children: ReactNode
}

export default function FeaturedImagePreview({
  children,
  thereIsFeaturedImage,
}: FeaturedImagePreviewProps) {
  const { removeFeaturedImage } = useContext(EditHeaderFromAdminContext)

  return (
    <Container className={thereIsFeaturedImage ? '' : 'invisible'}>
      {children}
      <button type="button" onClick={() => removeFeaturedImage()}>
        <X size={20} />
      </button>
    </Container>
  )
}
