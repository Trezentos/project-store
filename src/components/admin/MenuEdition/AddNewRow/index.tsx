import { useContext } from 'react'
import AddRowModal from './AddRowModal'
import { EditCategoriesContext } from '@/contexts/pages/admin/EditCategoriesContext'
import { Container } from './styles'
import { Plus } from 'phosphor-react'

export default function AddNewRow() {
  const { addModalIsOpen, closeAddModal, openAddModal } = useContext(
    EditCategoriesContext,
  )

  return (
    <Container>
      <AddRowModal isOpen={addModalIsOpen} closeModal={closeAddModal} />
      <button onClick={openAddModal}>
        <Plus color="#767776" size={32} />
      </button>
    </Container>
  )
}
