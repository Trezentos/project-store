import { createContext, ReactNode, useState, useEffect } from 'react'

export interface InstagramPostProps {
  imageSrc: string
  id: string
  description: string
  timestamp: string
}

interface InstagramContextType {
  goNextSelectedMediaInsta: () => void
  goPreviousSelectedMediaInsta: (e: any) => void
  updatesInstagramMedias: (instaMedias: InstagramPostProps[]) => void
  instagramMedias: InstagramPostProps[]
  selectedIntaMedia: InstagramPostProps
  updateSelectedModalMedia: (instaMedia: InstagramPostProps) => void
}

interface InstagramContextProviderProps {
  children: ReactNode
}

export const InstagramContext = createContext({} as InstagramContextType)

export function InstagramContextProvider({
  children,
}: InstagramContextProviderProps) {
  const [selectedIntaMedia, setSelectedIntaMedia] = useState(
    {} as InstagramPostProps,
  )
  const [instagramMedias, setInstagramMedias] = useState(
    [] as InstagramPostProps[],
  )

  function updatesInstagramMedias(instaMedias: InstagramPostProps[]) {
    setInstagramMedias(instaMedias)
  }

  function updateSelectedModalMedia(instaMedia: InstagramPostProps) {
    setSelectedIntaMedia(instaMedia)
  }

  function goNextSelectedMediaInsta() {
    const indexMedia = instagramMedias.findIndex(
      (item) => item.id === selectedIntaMedia.id,
    )

    if (indexMedia === instagramMedias.length - 1) {
      setSelectedIntaMedia(instagramMedias[0])
      return
    }
    setSelectedIntaMedia(instagramMedias[indexMedia + 1])
  }

  function goPreviousSelectedMediaInsta(e: any) {
    e.stopPropagation()

    const indexMedia = instagramMedias.findIndex(
      (item) => item.id === selectedIntaMedia.id,
    )

    if (indexMedia === 0) {
      setSelectedIntaMedia(instagramMedias[instagramMedias.length - 1])
      return
    }

    setSelectedIntaMedia(instagramMedias[indexMedia - 1])
  }

  return (
    <InstagramContext.Provider
      value={{
        goNextSelectedMediaInsta,
        goPreviousSelectedMediaInsta,
        selectedIntaMedia,
        updatesInstagramMedias,
        instagramMedias,
        updateSelectedModalMedia,
      }}
    >
      {children}
    </InstagramContext.Provider>
  )
}
