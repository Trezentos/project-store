import { useContext } from 'react'
import Modal from '../../../components/Modal'
import { EditHeaderFromAdminContext } from '@/contexts/pages/admin/EditHeaderFromAdminContext'
import { Container } from './styles'
import { Plus } from 'phosphor-react'
import RowAddForm from '../RowAddForm'

export default function AddNewRowModal() {
  const { addModalIsOpen, closeAddModal, openAddModal } = useContext(
    EditHeaderFromAdminContext,
  )

  return (
    <Container>
      <Modal isOpen={addModalIsOpen} closeModal={closeAddModal}>
        <RowAddForm />
      </Modal>
      <button onClick={openAddModal}>
        <Plus color="#767776" size={32} />
      </button>
    </Container>
  )
}
