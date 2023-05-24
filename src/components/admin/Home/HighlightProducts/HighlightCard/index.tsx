import Image from 'next/image'
import { ImageTooltip } from './styles'
import FImage1 from '../../../../../assets/highlightsProducts/1.jpg'
import FImage2 from '../../../../../assets/highlightsProducts/2.jpg'
import { Pencil } from 'phosphor-react'
import { useContext } from 'react'
import { HighlightProductsContext } from '@/contexts/pages/admin/home/HighlightProductsContext'

function HighlightCardProperties() {
  const { toggleEditMode } = useContext(HighlightProductsContext)

  return (
    <>
      <div>
        <ImageTooltip>
          <div className="tooltip">
            <Image width={200} height={250} src={FImage1} alt="" />
          </div>
          <p>Imagem 1</p>
          <strong>{'1.jpg'}</strong>
        </ImageTooltip>
      </div>
      <div>
        <ImageTooltip>
          <div className="tooltip">
            <Image width={200} height={250} src={FImage1} alt="" />
          </div>
          <p>Imagem 2</p>
          <strong>{'2.jpg'}</strong>
        </ImageTooltip>
      </div>
    </>
  )
}

export default HighlightCardProperties
