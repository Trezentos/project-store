import { CarrouselItem } from '..'
import CarrouselAttributes from './CarrouselCard'
import EditForm from './EditForm'

interface CarrouselContainerProps {
  editMode: boolean
}

export default function CarrouselCard({ editMode }: CarrouselContainerProps) {
  return editMode ? <EditForm /> : <CarrouselAttributes />
}
