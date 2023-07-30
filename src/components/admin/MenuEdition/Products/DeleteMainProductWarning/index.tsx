import { ModalAdminContext } from '@/contexts/pages/admin/ModalAdminContext'
import { Container } from './styles'
import { useContext } from 'react'
import Button from '@/components/admin/components/Button'

export default function DeleteMainProductWarning() {
  const { warningAction, closeWarningModal } = useContext(ModalAdminContext)

  return (
    <Container>
      <h3>Você realmente deseja apagar esse produto principal?</h3>
      <p>
        Após a exclusão, todos os produtos associados a este serão apagados
        também, e não terá como recuperá-los depois
      </p>
      <div>
        <Button onClick={() => warningAction?.()}>Apagar</Button>
        <Button onClick={() => closeWarningModal()}>Cancelar</Button>
      </div>
    </Container>
  )
}

// 2bc8cf8442b55e1b95efb1958
