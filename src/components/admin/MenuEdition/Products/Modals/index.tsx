import { useContext } from 'react'
import Modal from '../../../components/Modal'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import RowEditForm from '../RowEditForm'

export default function Modals() {
  const { editModalIsOpen, closeEditModal } = useContext(ModalAdminContext)

  return (
    <>
      <Modal isOpen={editModalIsOpen} closeModal={closeEditModal}>
        <RowEditForm />
      </Modal>
    </>
  )
}
