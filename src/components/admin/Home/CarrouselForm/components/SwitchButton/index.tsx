import { useCallback, useContext, useState } from 'react'
import { Slider, SwitchContainer, SwitchInputChecked } from './styles'
import { CarrouselContext } from '@/contexts/pages/admin/Home/CarrouselEditionContext'

interface SwitchProps {
  functionToToggle: (isChecked: boolean, toggleSwich: () => void) => void
}

export default function SwitchButton({
  functionToToggle: handleDeactivateCarrouselCard,
}: SwitchProps) {
  const { carrouselCard } = useContext(CarrouselContext)
  const [isChecked, setIsChecked] = useState(carrouselCard.active)

  const toggleSwich = useCallback(() => {
    setIsChecked(!isChecked)
  }, [isChecked])

  return (
    <SwitchContainer className="switch-hide-carrosel">
      <SwitchInputChecked
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          handleDeactivateCarrouselCard(!isChecked, toggleSwich)
        }}
      />
      <Slider />
    </SwitchContainer>
  )
}
