import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react'
import { ConfigButtons, Container, MainMenu, PanelContent } from './styles'
import logoImgSrc from '../../../assets/logo2.png'
import {
  House,
  Package,
  Pencil,
  Gear,
  SignOut,
  CaretDown,
} from 'phosphor-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface SidebarProps {
  children: ReactNode
}

const painelMenu = [
  {
    name: 'Home',
    icon: <House size={20} />,
    subMenu: [
      {
        id: '1',
        link: '/admin/home/carrousel',
        name: 'Carrousel',
      },
      {
        id: '2',
        link: '/admin/home/produtos-em-destaque-1',
        name: 'Produtos em destaque 1',
      },
      {
        id: '3',
        link: '/admin/home/imagem-em-destaque',
        name: 'Imagem de fundo',
      },
      {
        id: '4',
        link: '/admin/home/produtos-em-destaque-2',
        name: 'Produtos em destaque 2',
      },
    ],
  },
  {
    name: 'Editar Menu',
    icon: <Pencil size={20} />,
    subMenu: [],
  },
  {
    name: 'Produtos',
    icon: <Package size={20} />,
    subMenu: [],
  },
]

function Sidebar({ children }: SidebarProps) {
  const iconeSize = 24

  const handleActiveButton = useCallback(
    (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
      ulelement: HTMLUListElement | null,
    ) => {
      const allButtons = document.querySelectorAll('#main-buttons button')
      allButtons.forEach((button) => {
        button.classList.remove('active')
      })

      e.currentTarget.classList.add('active')

      if (!ulelement) return

      if (
        ulelement?.style.maxHeight === '0px' ||
        ulelement?.style.maxHeight === ''
      ) {
        ulelement.style.maxHeight = ulelement.scrollHeight + 'px'
      } else {
        ulelement.style.maxHeight = 0 + 'px'
      }
    },
    [],
  )

  useEffect(() => {
    const allButtons = document.querySelectorAll('#main-buttons button')
    allButtons[0].classList.add('active')
  }, [])

  return (
    <Container>
      <PanelContent>
        <Image src={logoImgSrc.src} alt="" fill />
        <MainMenu id="main-buttons">
          <h4>Menu Principal</h4>
          {painelMenu.map((item) => (
            <div key={item.name}>
              <button
                onClick={(e) =>
                  handleActiveButton(
                    e,
                    e.currentTarget.nextElementSibling as HTMLUListElement,
                  )
                }
              >
                <div>
                  {item.icon}
                  {item.name}
                </div>
                <CaretDown />
              </button>
              <ul>
                {item.subMenu.map((subItem) => (
                  <li key={subItem.id}>
                    <Link href={subItem.link}>{subItem.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </MainMenu>
        <ConfigButtons>
          <button>
            <Gear size={iconeSize} />
            Configuraçoes
          </button>
          <button>
            <SignOut size={iconeSize} />
            Sair
          </button>
        </ConfigButtons>
      </PanelContent>
      {children}
    </Container>
  )
}

export default Sidebar
