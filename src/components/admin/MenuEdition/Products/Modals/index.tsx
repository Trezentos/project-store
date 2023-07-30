import { useContext } from 'react'
import Modal from '../../../components/Modal'
import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import RowEditProductVariationForm from '../RowEditProductVariationForm'
import { ProductsAdminContext } from '@/contexts/pages/admin/ProductsAdminContext'
import RowAddProductVariationForm from '../RowAddProductVariationForm'
import Button from '@/components/admin/components/Button'
import { Container } from './styles'
import { Plus, PlusCircle } from 'phosphor-react'
import RowEditProductNameForm from '../RowEditProductNameForm'
import DeleteMainProductWarning from '../DeleteMainProductWarning'
import RowAddProductMainForm from '../RowAddProductMainForm'

export default function Modals() {
  const {
    editModalIsOpen,
    closeEditModal,
    subAddModalIsOpen,
    closeSubAddModal,
    openAddModal,
    subEditModalIsOpen,
    closeSubEditModal,
    warningModalIsOpen,
    closeWarningModal,
    addModalIsOpen,
    closeAddModal,
  } = useContext(ModalAdminContext)
  const { allProducts } = useContext(ProductsAdminContext)

  return (
    <Container>
      <Modal isOpen={editModalIsOpen} closeModal={closeEditModal}>
        <RowEditProductNameForm />
      </Modal>
      <Modal isOpen={subEditModalIsOpen} closeModal={closeSubEditModal}>
        <RowEditProductVariationForm />
      </Modal>
      <Modal isOpen={subAddModalIsOpen} closeModal={closeSubAddModal}>
        <RowAddProductVariationForm />
      </Modal>
      <Modal isOpen={addModalIsOpen} closeModal={closeAddModal}>
        <RowAddProductMainForm />
      </Modal>
      <Modal isOpen={warningModalIsOpen} closeModal={closeWarningModal}>
        <DeleteMainProductWarning />
      </Modal>
      <button onClick={() => openAddModal()}>
        <Plus />
      </button>
    </Container>
  )
}
