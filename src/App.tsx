import ExternalIcon from '@/components/atoms/icons/ExternalIcon'
import BookmarkItem from '@/components/bookmark-item'
import { useCommon } from '@/context/commonContext'
import React, { useEffect, useState } from 'react'
import AddItemModal from '@/components/modals/add-item-modal'
import DashboardModal from '@/components/modals/dashboard-modal'
import b from '@/bookmarks'

function App() {
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [showDashboardModal, setShowDashboardModal] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [bookmarks, setBookmarks] = useState<string>('[]')
  const { openLinkInNewTab, setOpenLinkInNewTab, selectedFolder, setSelectedFolder, root, setRoot } = useCommon()

  async function getBookmarks() {
    if (typeof chrome.bookmarks !== 'undefined') {
      const result = await chrome.bookmarks.getTree()
      setBookmarks(JSON.stringify(result))
    } else {
      setBookmarks(b)
    }
  }

  function handleContextMenu(event: any) {
    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  useEffect(() => {
    setShowContextMenu(contextMenuPosition.x > 0 && contextMenuPosition.y > 0)
  }, [contextMenuPosition])

  useEffect(() => {
    if (showAddItemModal) {
      setContextMenuPosition({
        x: 0,
        y: 0,
      })
      setSelectedFolder(null)
    }
  }, [showAddItemModal])

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        setShowContextMenu(false)
      }
    })

    getBookmarks()
  }, [])

  return (
    <main>
      {showAddItemModal && <AddItemModal onClose={() => setShowAddItemModal(false)} />}
      {showDashboardModal && <DashboardModal onClose={() => setShowDashboardModal(false)} />}

      {/* {storeLinkToShow && (
    <div className="fixed bottom-0 left-0 px-2 py-0.5 text-xs text-white border bg-zinc-900 border-zinc-400">
      {storeLinkToShow}
    </div>
  )} */}

      {showContextMenu && (
        <div
          id="context-menu-overlay"
          className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/20"
          onClick={() => setShowContextMenu(false)}
        >
          <div
            id="context-menu"
            className="absolute top-0 left-0 py-1 text-xs text-white border bg-zinc-900 border-zinc-700 w-max h-max min-w-[170px]"
            style={{ top: contextMenuPosition.y + 'px', left: contextMenuPosition.x + 'px' }}
          >
            <ul>
              <li
                className="h-[25px] hover:bg-zinc-800 px-2 flex items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAddItemModal(true)
                }}
              >
                Add item
              </li>
              {!selectedFolder && (
                <li
                  className="h-[25px] hover:bg-zinc-800 px-2 flex items-center cursor-pointer"
                  onClick={() => {
                    /* Handle edit logic */
                  }}
                >
                  Edit
                </li>
              )}
              {selectedFolder && (
                <li
                  className="h-[25px] hover:bg-zinc-800 px-2 flex items-center cursor-pointer"
                  onClick={() => {
                    /* Handle rename logic */
                  }}
                >
                  Rename
                </li>
              )}
              {selectedFolder && (
                <li
                  className="h-[25px] hover:bg-zinc-800 px-2 flex items-center cursor-pointer"
                  onClick={() => {
                    /* Handle delete logic */
                  }}
                >
                  Set as root
                </li>
              )}
              <li
                className="h-[25px] bg-rose-500/40 hover:bg-rose-500 px-2 flex items-center cursor-pointer"
                onClick={() => {
                  /* Handle delete logic */
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
      )}

      <div
        id="toolbar"
        className="h-[25px] dark:bg-[#181818] border-b dark:border-[#303030] fixed top-0 left-0 bg-inherit w-full flex items-center justify-between"
      >
        <div className="pl-2 text-xs font-bold uppercase dark:text-white">Bookmark Storage</div>

        <div className="flex">
          <button
            title="Synced"
            className={`flex items-center justify-center dark:hover:bg-[#303030] w-[24px] h-[24px] dark:text-white`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <button
            title="Open link in new tab"
            onClick={() => {
              setOpenLinkInNewTab(!openLinkInNewTab)
            }}
            className={`flex items-center justify-center dark:hover:bg-[#303030] w-[24px] h-[24px] ${
              openLinkInNewTab ? 'text-green-400' : 'dark:text-white'
            }`}
          >
            <ExternalIcon />
          </button>

          <button
            title="Open dashboard"
            onClick={() => {
              setShowDashboardModal(true)
            }}
            className="flex items-center justify-center dark:hover:bg-[#303030] w-[24px] h-[24px] dark:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="none" fill-rule="evenodd">
                <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M16 15c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2h9.17A3.001 3.001 0 0 1 16 15m0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2M8 9a3 3 0 0 1 2.762 1.828l.067.172H20a1 1 0 0 1 .117 1.993L20 13h-9.17a3.001 3.001 0 0 1-5.592.172L5.17 13H4a1 1 0 0 1-.117-1.993L4 11h1.17A3.001 3.001 0 0 1 8 9m0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8-8c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1 0-2h9.17A3.001 3.001 0 0 1 16 3m0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {bookmarks && bookmarks !== '[]' ? (
        <div id="bookmark-list" className="flex flex-col gap-1 pb-10 pt-[26px] dark:bg-[#181818] min-h-screen">
          {JSON.parse(bookmarks)[0].children[0].children.map((item: Item, index: number) => {
            return <BookmarkItem key={index} item={item} onShowMenu={handleContextMenu} depth={0} />
          })}
        </div>
      ) : (
        <div
          id="bookmarks-empty"
          className="pb-10 pt-[26px] dark:bg-[#181818] min-h-screen grid place-items-center dark:text-white text-xs"
        >
          No bookmarks.
        </div>
      )}
    </main>
  )
}

export default App
