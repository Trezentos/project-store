import Link from 'next/link'
import Newsletter from '../Pages/Home/Newsletter'
import {
  Container,
  NewsletterContainer,
  OutlineContainer,
  PagesLinks,
} from './styles'

export default function Footer() {
  return (
    <>
      <Container>
        <PagesLinks>
          <strong>Páginas acessíveis</strong>
          <ul>
            <li>
              <Link href={''}>Página 1</Link>
            </li>
            <li>
              <Link href={''}>Página 2</Link>
            </li>
            <li>
              <Link href={''}>Página 3</Link>
            </li>
            <li>
              <Link href={''}>Página 4</Link>
            </li>
            <li>
              <Link href={''}>Página 5</Link>
            </li>
            <li>
              <Link href={''}>Página 6</Link>
            </li>
            <li>
              <Link href={''}>Página 7</Link>
            </li>
            <li>
              <Link href={''}>Página 8</Link>
            </li>
            <li>
              <Link href={''}>Página 9</Link>
            </li>
            <li>
              <Link href={''}>Página 10</Link>
            </li>
            <li>
              <Link href={''}>Página 11</Link>
            </li>
          </ul>
        </PagesLinks>

        <NewsletterContainer>
          <h3>Fique por dentro de tudo!</h3>
          <Newsletter />
        </NewsletterContainer>
      </Container>
      <OutlineContainer>
        <Link href={''}>2023 right reserveds</Link>

        <div>
          <Link href={''}>Termos de uso</Link>
          <Link href={''}>Política de Privacidade</Link>
        </div>
      </OutlineContainer>
    </>
  )
}
