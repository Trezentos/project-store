import Image from 'next/image'
import { ImageTooltip } from './styles'
import FImage1 from '../../../../../assets/highlightsProducts/1.jpg'
import FImage2 from '../../../../../assets/highlightsProducts/2.jpg'
import { Pencil } from 'phosphor-react'
import { useContext } from 'react'
import { HighlightProductsContext } from '@/contexts/pages/admin/home/HighlightProductsContext'

function HighlightCardProperties() {
  const { toggleEditMode, highlightItem } = useContext(HighlightProductsContext)
  const { image1Key, image1Link, image2Key, image2Link } = highlightItem

  return (
    <>
      <div>
        <ImageTooltip>
          <div className="tooltip">
            <Image width={200} height={250} src={image1Link} alt="" />
          </div>
          <p>Imagem 1</p>
          <strong>{image1Key}</strong>
        </ImageTooltip>
      </div>
      <div>
        <ImageTooltip>
          <div className="tooltip">
            <Image width={200} height={250} src={image2Link} alt="" />
          </div>
          <p>Imagem 2</p>
          <strong>{image2Key}</strong>
        </ImageTooltip>
      </div>
    </>
  )
}

export default HighlightCardProperties
