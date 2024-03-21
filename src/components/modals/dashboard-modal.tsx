import { useAuth } from '@/context/authContext'
import { useState } from 'react'

function DashboardModal({ onClose }) {
  const [loading, setLoading] = useState(false)
  const { googleSignInWithRedirect, signOut, currentUser } = useAuth()

  return (
    <div id="dashboard-modal" className="fixed inset-0 grid w-screen h-screen bg-black/20 place-items-center">
      <div className="dark:bg-[#202020] p-3">
        <div className="flex items-center justify-between modal-header dark:text-white min-w-[300px] max-w-[500px]">
          <div className="text-sm font-bold">Dashboard</div>
          <button className="dark:hover:bg-[#313131] p-1 flex justify-center items-center rounded-md" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 py-4 modal-body">
          <div>
            <div className="flex justify-center">
              {typeof window.chrome.bookmarks === 'undefined' ? (
                <div className="text-xs text-center dark:text-orange-300 max-w-[200px]">
                  Can't retrieve your browser bookmarks because you are not running this page as browser extension.
                </div>
              ) : null}
            </div>
          </div>

          {currentUser ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-center dark:text-white">
                Signed in as <strong>{currentUser?.email}</strong>
              </div>
              <button
                className="bg-[#0078d4] w-max hover:bg-[hsl(206,100%,52%)] text-xs px-3 py-1 text-white disabled:bg-[hsl(206,100%,22%)] disabled:cursor-not-allowed flex gap-1 items-center"
                onClick={() => signOut()}
              >
                {loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="animate-spin"
                  >
                    <path
                      fill="currentColor"
                      d="M140 32v32a12 12 0 0 1-24 0V32a12 12 0 0 1 24 0m33.25 62.75a12 12 0 0 0 8.49-3.52l22.63-22.63a12 12 0 0 0-17-17l-22.6 22.66a12 12 0 0 0 8.48 20.49M224 116h-32a12 12 0 0 0 0 24h32a12 12 0 0 0 0-24m-42.26 48.77a12 12 0 1 0-17 17l22.63 22.63a12 12 0 0 0 17-17ZM128 180a12 12 0 0 0-12 12v32a12 12 0 0 0 24 0v-32a12 12 0 0 0-12-12m-53.74-15.23L51.63 187.4a12 12 0 0 0 17 17l22.63-22.63a12 12 0 1 0-17-17M76 128a12 12 0 0 0-12-12H32a12 12 0 0 0 0 24h32a12 12 0 0 0 12-12m-7.4-76.37a12 12 0 1 0-17 17l22.66 22.6a12 12 0 0 0 17-17Z"
                    />
                  </svg>
                )}
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-center dark:text-white">Sign in to be able to upload your bookmarks.</div>
              <button
                className="bg-[#0078d4] w-max hover:bg-[hsl(206,100%,52%)] text-xs px-3 py-1 text-white disabled:bg-[hsl(206,100%,22%)] disabled:cursor-not-allowed flex gap-1 items-center"
                onClick={googleSignInWithRedirect}
              >
                {loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="animate-spin"
                  >
                    <path
                      fill="currentColor"
                      d="M140 32v32a12 12 0 0 1-24 0V32a12 12 0 0 1 24 0m33.25 62.75a12 12 0 0 0 8.49-3.52l22.63-22.63a12 12 0 0 0-17-17l-22.6 22.66a12 12 0 0 0 8.48 20.49M224 116h-32a12 12 0 0 0 0 24h32a12 12 0 0 0 0-24m-42.26 48.77a12 12 0 1 0-17 17l22.63 22.63a12 12 0 0 0 17-17ZM128 180a12 12 0 0 0-12 12v32a12 12 0 0 0 24 0v-32a12 12 0 0 0-12-12m-53.74-15.23L51.63 187.4a12 12 0 0 0 17 17l22.63-22.63a12 12 0 1 0-17-17M76 128a12 12 0 0 0-12-12H32a12 12 0 0 0 0 24h32a12 12 0 0 0 12-12m-7.4-76.37a12 12 0 1 0-17 17l22.66 22.6a12 12 0 0 0 17-17Z"
                    />
                  </svg>
                )}
                Sign in with <strong>Google</strong>
              </button>
            </div>
          )}

          {typeof window.chrome.bookmarks !== 'undefined' ? (
            <>
              <div className="w-full h-px bg-zinc-700"></div>

              <div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs dark:text-white">Click button below to trigger bookmarks upload.</p>
                  <button className="bg-[#0078d4] w-max hover:bg-[hsl(206,100%,52%)] text-xs px-3 py-1 text-white disabled:bg-[hsl(206,100%,22%)] disabled:cursor-not-allowed flex gap-1 items-center">
                    Upload now
                  </button>
                </div>
              </div>

              <div className="w-full h-px bg-zinc-700"></div>

              <div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs dark:text-white">
                    Click button below to download the uploaded bookmarks into this browser.
                  </p>
                  <button
                    className="bg-yellow-600 w-max hover:bg-yellow-500 text-xs px-3 py-1 text-white font-semibold disabled:bg-[hsl(206,100%,22%)] disabled:cursor-not-allowed flex gap-1 items-center"
                    onClick={() => alert('helo world')}
                  >
                    Download & Replace
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="flex justify-end gap-2 modal-footer">
          <button className="bg-[#313131] hover:bg-[hsl(0,0%,25%)] text-xs px-3 py-1 text-white" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardModal
