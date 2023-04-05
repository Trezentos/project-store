import { IProductsPerColor } from '..'
import { Colors } from '../styles'
import { Dot } from './styles'

interface ListColorsProps {
  productsColors: IProductsPerColor[]
  handleActiveProduct: (
    product: IProductsPerColor,
    currentElement: HTMLElement | null,
  ) => void
}

function ColorsSelection({
  productsColors,
  handleActiveProduct,
}: ListColorsProps) {
  return (
    <Colors className="dots-selector">
      {productsColors.map((productColor, index) => {
        return (
          <Dot
            key={productColor.id}
            dotColor={productColor.colorHex}
            className={`product-color-id-${productColor.id} ${
              index === 0 ? 'active' : ''
            }`}
            onClick={(e) => handleActiveProduct(productColor, e.currentTarget)}
          />
        )
      })}
    </Colors>
  )
}

export default ColorsSelection
