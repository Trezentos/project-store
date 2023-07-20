import Image from 'next/image'
import { ImageTooltip } from './styles'
import { useContext } from 'react'
import { HighlightProductsContext } from '@/contexts/pages/admin/Home/HighlightProductsContext'

function HighlightCardProperties() {
  const { toggleEditMode, highlightItem } = useContext(HighlightProductsContext)

  return (
    highlightItem && (
      <>
        <div>
          <ImageTooltip>
            <div className="tooltip">
              <Image
                width={200}
                height={250}
                src={highlightItem.image1Link}
                alt=""
              />
            </div>
            <p>Imagem 1</p>
            <strong>{highlightItem.image1Name}</strong>
          </ImageTooltip>
        </div>
        <div>
          <ImageTooltip>
            <div className="tooltip">
              <Image
                width={200}
                height={250}
                src={highlightItem.image2Link}
                alt=""
              />
            </div>
            <p>Imagem 2</p>
            <strong>{highlightItem.image2Name}</strong>
          </ImageTooltip>
        </div>
      </>
    )
  )
}

export default HighlightCardProperties
