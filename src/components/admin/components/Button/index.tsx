import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './styles'

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean
  children: string
}

export default function Button({
  isSubmitting,
  children,
  ...rest
}: ConfirmButtonProps) {
  return (
    <ButtonContainer disabled={isSubmitting} {...rest}>
      {isSubmitting ? <div className="loader active"></div> : children}
    </ButtonContainer>
  )
}
