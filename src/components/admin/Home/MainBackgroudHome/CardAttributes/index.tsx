import Image from 'next/image'
import { ImageTooltip } from './styles'
import FImage1 from '../../../../../assets/highlightsProducts/1.jpg'
import FImage2 from '../../../../../assets/highlightsProducts/2.jpg'
import { Pencil } from 'phosphor-react'
import { useContext } from 'react'
import { MainBackgroundHomeContext } from '@/contexts/pages/admin/Home/MainBackgroundHomeContext'

function HighlightCardProperties() {
  const { backgroundItem } = useContext(MainBackgroundHomeContext)

  return (
    backgroundItem && (
      <>
        <div>
          <ImageTooltip>
            <div className="tooltip">
              <Image
                width={200}
                height={250}
                src={backgroundItem.desktopLink}
                alt=""
              />
            </div>
            <p>Imagem desktop</p>
            <strong>{backgroundItem.desktopImageName}</strong>
          </ImageTooltip>
        </div>
        <div>
          <ImageTooltip>
            <div className="tooltip">
              <Image
                width={200}
                height={250}
                src={backgroundItem.mobileLink}
                alt=""
              />
            </div>
            <p>Imagem mobile</p>
            <strong>{backgroundItem.mobileImageName}</strong>
          </ImageTooltip>
        </div>
      </>
    )
  )
}

export default HighlightCardProperties
