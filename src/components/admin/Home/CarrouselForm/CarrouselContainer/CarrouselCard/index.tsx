import Image from 'next/image'
import { CarrouselItem } from '../..'
import { Container, ImageTooltip } from './styles'
import { Upload } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { CarrouselContext } from '@/contexts/pages/admin/CarrouselEditionContext'

interface CarrouselCardProps {
  carrouselItem: CarrouselItem
}

function CarrouselCard() {
  const { updateCarrouselCard, carrouselCard } = useContext(CarrouselContext)
  const { desktopLink, desktopKey, id, mobileKey, mobileLink } = carrouselCard

  useEffect(() => {
    if (!carrouselCard.id) updateCarrouselCard(carrouselCard)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <div>
        <ImageTooltip>
          <div className="tooltip">
            <Image width={300} height={120} src={desktopLink} alt="" />
          </div>
          <p>Carrousel Desktop</p>
          <strong>{desktopKey}</strong>
        </ImageTooltip>
      </div>
      <div>
        <ImageTooltip>
          <div className="tooltip">
            <Image width={160} height={280} src={mobileLink} alt="" />
          </div>
          <p>Carrousel Mobile</p>
          <strong>{mobileKey}</strong>
        </ImageTooltip>
      </div>
    </Container>
  )
}

export default CarrouselCard
