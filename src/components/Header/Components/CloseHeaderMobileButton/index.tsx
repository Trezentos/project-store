import { HeaderContext } from '@/contexts/HeaderContext'
import { X } from 'phosphor-react'
import { useContext } from 'react'

export default function CloseHeaderMobileButton() {
  const { toggleMobileHeader } = useContext(HeaderContext)

  return (
    <button
      type="submit"
      onClick={() => {
        toggleMobileHeader()
      }}
    >
      <X size={20} />
    </button>
  )
}
