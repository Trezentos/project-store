import { CarrouselContext } from '@/contexts/pages/admin/CarrouselEditionContext'
import { Pencil, ArrowBendDownLeft } from 'phosphor-react'
import { useContext } from 'react'

export default function EditIcons() {
  const { toggleEditMode, editMode } = useContext(CarrouselContext)

  return editMode ? (
    <ArrowBendDownLeft onClick={() => toggleEditMode()} size={20} />
  ) : (
    <Pencil onClick={() => toggleEditMode()} size={20} />
  )
}
