import { Button } from './styles'

interface ConfirmButtonProps {
  isSubmitting: boolean
  children: string
}

export default function ConfirmButton({
  isSubmitting,
  children,
}: ConfirmButtonProps) {
  return (
    <Button disabled={isSubmitting} type="submit">
      {isSubmitting ? <div className="loader active"></div> : children}
    </Button>
  )
}
