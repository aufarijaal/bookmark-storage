import { useLocalStorage } from '@uidotdev/usehooks'
import { createContext, useContext, useState } from 'react'

interface ContextProps {
  openLinkInNewTab: boolean
  setOpenLinkInNewTab: React.Dispatch<React.SetStateAction<boolean>>
  linkToShow: string
  setLinkToShow: React.Dispatch<React.SetStateAction<string>>
  selectedFolder: string | null
  setSelectedFolder: React.Dispatch<React.SetStateAction<string | null>>
  root: number[]
  setRoot: React.Dispatch<React.SetStateAction<number[]>>
}

const CommonContext = createContext({
  openLinkInNewTab: true,
  setOpenLinkInNewTab: () => {},
  linkToShow: '',
  setLinkToShow: () => {},
  selectedFolder: null,
  setSelectedFolder: () => {},
  root: [0],
  setRoot: () => {},
} as ContextProps)

export function CommonProvider({ children }: { children: React.ReactNode }) {
  const [openLinkInNewTab, setOpenLinkInNewTab] = useLocalStorage('openLinkInNewTab', true)
  const [root, setRoot] = useLocalStorage('root', [0])
  const [linkToShow, setLinkToShow] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const value = {
    openLinkInNewTab,
    setOpenLinkInNewTab,
    linkToShow,
    setLinkToShow,
    selectedFolder,
    setSelectedFolder,
    root,
    setRoot,
  }

  return <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
}

export function useCommon() {
  return useContext(CommonContext)
}
