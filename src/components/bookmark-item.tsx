import { useState } from 'react'
import FolderIcon from '@/components/atoms/icons/FolderIcon'
import { useCommon } from '@/context/commonContext'

function BookmarkItem({
  item,
  onShowMenu,
  depth,
}: {
  item: Item
  onShowMenu: (e: any, folder: string | null) => void
  depth: number
}) {
  const [expand, setExpand] = useState(false)
  const { openLinkInNewTab, setSelectedFolder, root, setRoot } = useCommon()

  function getHostname(url: string) {
    const result = new URL(url)
    return result.hostname
  }

  function handleContextMenu(e: React.MouseEvent<HTMLButtonElement>) {
    onShowMenu(e, item.children ? item.title : null)
  }

  function handleClick(url: string) {
    if (url) {
      window.open(url, openLinkInNewTab ? '_blank' : '_self')?.focus()
    } else {
      if (item.children) {
        setExpand(!expand)
      }
    }
  }

  return (
    <div title={item.title || item.url}>
      <button
        className="flex items-center gap-2 select-none dark:hover:dark:bg-[#303030] focus:bg-[#04395e] hover:focus:bg-[#04395e] border border-transparent focus:border-[hsl(205,92%,30%)] outline-none h-[25px] px-2 w-full"
        onClick={() => handleClick(item.url)}
        onContextMenu={(e) => {
          e.preventDefault()
          setSelectedFolder(item.children ? item.title : null)
          handleContextMenu(e)
        }}
      >
        {item.url ? (
          <img
            className="flex-shrink-0"
            src={`https://www.google.com/s2/favicons?domain=${getHostname(item.url)}&sz=16`}
            width="16"
            alt="icon"
          />
        ) : (
          <FolderIcon />
        )}
        <div className="flex-grow max-w-[calc(100%-10px)] text-xs text-left overflow-ellipsis line-clamp-1 dark:text-white">
          {item.title}
        </div>
      </button>

      {item.children && (
        <div
          style={{ marginLeft: '20px', paddingLeft: '5px' }}
          className={`border-l border-gray-700 ${expand ? 'block' : 'hidden'}`}
        >
          {item.children.map((child: Item, index: number) => {
            return <BookmarkItem key={index} item={child} onShowMenu={handleContextMenu} depth={depth + 1} />
          })}
        </div>
      )}
    </div>
  )
}

export default BookmarkItem
