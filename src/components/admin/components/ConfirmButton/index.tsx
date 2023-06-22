import { Button } from './styles'

interface ConfirmButtonProps {
  isSubmitting: boolean
}

export default function ConfirmButton({ isSubmitting }: ConfirmButtonProps) {
  return (
    <Button disabled={isSubmitting} type="submit">
      {isSubmitting ? (
        <div className="loader active"></div>
      ) : (
        'Confirmar edição'
      )}
    </Button>
  )
}
