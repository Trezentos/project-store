import { FormEvent, ReactNode, useCallback } from 'react'
import { Container } from './styles'
import { api } from '@/lib/axios'

export default function Home() {
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // impede que o formulário seja enviado normalmente
    const formInputs = e.target
    const form = new FormData()
    // @ts-ignore
    for (let index = 0; index < formInputs.elements.length / 2 - 1; index++) {
      // @ts-ignore
      form.append(`desktopImage-${index}`, formInputs[index * 2].files[0])
      // @ts-ignore
      form.append(`mobileImage-${index}`, formInputs[index * 2 + 1].files[0])
    }

    await api.post('home/update-carrousel', form)
  }, [])

  return (
    <Container>
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <p>Carrousel 1</p>
        <input type="file" name="" id="" />
        <input type="file" name="" id="" />

        <button type="submit">Upar imagens</button>
      </form>
    </Container>
  )
}

Home.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>
}
