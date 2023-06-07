import { CarrouselContext } from '@/contexts/pages/admin/Home/CarrouselEditionContext'
import { Pencil, ArrowBendDownLeft, X } from 'phosphor-react'
import { useCallback, useContext, useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import { api } from '@/lib/api'
import { errorToast, successToast } from '@/utils/toast/sucessToast'
import SwitchButton from '../SwitchButton'
import { Container } from './styles'

export default function OptionsCardHeader() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toggleEditMode, editMode, carrouselCard, updateCarrouselCard } =
    useContext(CarrouselContext)

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const openModal = () => {
    setModalIsOpen(true)
  }

  const handleRemoveCard = useCallback(async () => {
    try {
      setIsSubmitting(true)
      await api.delete(`/home/remove-carrousel/${carrouselCard.id}`)

      const cardContainer = document.getElementById(
        `carrousel-id-${carrouselCard.id}`,
      )

      if (!cardContainer) return

      cardContainer.style.display = 'none'

      closeModal()
      successToast('Carrossel removido com sucesso')
    } catch (error: any) {
      const { data } = error.response
      if (!data) errorToast('Houve algum erro ao remover o carrossel...')
      errorToast(data)
    } finally {
      setIsSubmitting(false)
    }
  }, [carrouselCard.id])

  const handleDeactivateCarrouselCard = useCallback(
    async (isChecked: boolean, toggleSwich: () => void) => {
      try {
        await api.put(`/home/hide-carrousel-item`, {
          carrouselCard: {
            ...carrouselCard,
            active: isChecked,
          },
        })

        updateCarrouselCard({
          ...carrouselCard,
          active: isChecked,
        })

        toggleSwich()
      } catch (error: any) {
        const { data } = error.response
        const isChekedStr = isChecked ? 'ativar' : 'desativar'
        if (!data)
          return errorToast(`Houve algum erro ao ${isChekedStr} o carrossel...`)
        errorToast(data)
      }
    },
    [carrouselCard, updateCarrouselCard],
  )

  return editMode ? (
    <ArrowBendDownLeft onClick={() => toggleEditMode()} size={20} />
  ) : (
    <Container>
      <SwitchButton functionToToggle={handleDeactivateCarrouselCard} />
      <Pencil onClick={() => toggleEditMode()} size={20} />
      <X onClick={() => openModal()} size={20} />
      <ConfirmModal
        handleRemoveCard={handleRemoveCard}
        isOpen={modalIsOpen}
        closeModal={closeModal}
        isSubmitting={isSubmitting}
      />
    </Container>
  )
}
