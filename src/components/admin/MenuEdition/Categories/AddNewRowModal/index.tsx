import { useContext } from 'react'
import Modal from '../../../components/Modal'
import { EditCategoriesContext } from '@/contexts/pages/admin/EditCategoriesContext'
import { Container } from './styles'
import { Plus } from 'phosphor-react'
import AddNewRowForm from '../RowAddForm'

export default function AddNewRow() {
  const { addModalIsOpen, closeAddModal, openAddModal } = useContext(
    EditCategoriesContext,
  )

  return (
    <Container>
      <Modal isOpen={addModalIsOpen} closeModal={closeAddModal}>
        <AddNewRowForm />
      </Modal>
      <button onClick={openAddModal}>
        <Plus color="#767776" size={32} />
      </button>
    </Container>
  )
}
