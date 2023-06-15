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
  CaretUp,
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
    link: 'home',
    hifen: 'home',
    icon: <House size={20} />,
    subMenu: [
      {
        id: '1',
        link: '/admin/home/carrousel',
        name: 'Carrousel',
        hifen: 'carrousel',
      },
      {
        id: '2',
        link: '/admin/home/produtos-em-destaque-1',
        name: 'Produtos em destaque 1',
        hifen: 'produtos-em-destaque-1',
      },
      {
        id: '3',
        link: '/admin/home/imagem-em-destaque',
        name: 'Imagem de fundo',
        hifen: 'imagem-em-destaque',
      },
      {
        id: '4',
        link: '/admin/home/produtos-em-destaque-2',
        name: 'Produtos em destaque 2',
        hifen: 'produtos-em-destaque-2',
      },
    ],
  },
  {
    name: 'Editar Menu',
    link: 'edit-menu',
    icon: <Pencil size={20} />,
    subMenu: [
      {
        id: '1',
        link: '/admin/edit-menu/editar-categorias',
        name: 'Editar Categorias',
        hifen: 'editar-categorias',
      },
      {
        id: '2',
        link: '/admin/edit-menu/editar-header',
        name: 'Editar Cabeçalho',
        hifen: 'editar-header',
      },
    ],
  },
  {
    name: 'Produtos',
    link: 'products',
    icon: <Package size={20} />,
    subMenu: [
      {
        id: '1',
        link: '/admin/products/edit-products',
        name: 'Editar produtos',
        hifen: 'edit-products',
      },
    ],
  },
]

function Sidebar({ children }: SidebarProps) {
  const router = useRouter()
  const iconeSize = 24

  const handleDropdownButton = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      const ulelement = e.currentTarget.nextElementSibling as HTMLUListElement

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
    // Open one of dropdowns menu item and close the others
    const allDivs = document.querySelectorAll<HTMLUListElement>(
      '#main-buttons > div',
    )

    allDivs.forEach((divItem) => {
      const activeButton = divItem.getElementsByClassName('active')
      if (!divItem.lastElementChild) return

      if (activeButton[0]) {
        // @ts-ignore
        divItem.lastElementChild.style.maxHeight =
          divItem.lastElementChild.scrollHeight + 'px'
      } else {
        // @ts-ignore
        divItem.lastElementChild.style.maxHeight = 0 + 'px'
      }
    })
  }, [])

  useEffect(() => {
    // highlight the menu-item
    const [, , selectedSubPage, subOption] = router.pathname.split('/')
    const subPageAsideButton = document.querySelector(
      `#main-buttons #${selectedSubPage}`,
    )

    const subOptionAsideButton = document.querySelector(
      `#main-buttons li#${subOption}`,
    )

    const allButtons = document.querySelectorAll(`#main-buttons button`)
    allButtons.forEach((button) => button.classList.remove('active'))

    const allSubOptions = document.querySelectorAll(`#main-buttons  li`)
    allSubOptions.forEach((button) => button.classList.remove('active'))

    subPageAsideButton?.classList.add('active')
    subOptionAsideButton?.classList.add('active')
  }, [router])

  return (
    <Container>
      <PanelContent>
        <Image src={logoImgSrc.src} alt="" fill />
        <MainMenu id="main-buttons">
          <h4>Menu Principal</h4>
          {painelMenu.map((item) => (
            <div key={item.name}>
              <button id={item.link} onClick={handleDropdownButton}>
                <div>
                  {item.icon}
                  {item.name}
                </div>
                <CaretDown />
              </button>
              <ul id={item.link}>
                {item.subMenu.map((subItem) => (
                  <li key={subItem.id} id={subItem.hifen}>
                    <Link href={subItem.link} className="">
                      {subItem.name}
                    </Link>
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
