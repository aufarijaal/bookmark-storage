import { useState } from 'react'

function AddItemModal({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    isFolder: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = () => {
    // Handle form submission logic here
  }

  return (
    <div id="add-item-modal" className="fixed inset-0 grid w-screen h-screen bg-black/20 place-items-center">
      <div className="dark:bg-[#202020] p-3">
        <div className="flex items-center justify-between modal-header dark:text-white min-w-[300px] max-w-[500px]">
          <div className="text-sm font-bold">Add New Item</div>
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
          <div className="flex flex-col justify-center gap-2 text-sm dark:text-white">
            <label htmlFor="input-title">Title</label>
            <input
              type="text"
              id="input-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="text-xs dark:bg-[#313131] focus:ring-1 focus:ring-[hsl(206,100%,62%)] outline-none px-1 h-[24px]"
            />
          </div>

          {!form.isFolder && (
            <div className="flex flex-col justify-center gap-2 text-sm dark:text-white">
              <label htmlFor="input-url">Url</label>
              <input
                type="url"
                id="input-url"
                name="url"
                value={form.url}
                onChange={handleChange}
                className="flex-grow text-xs dark:bg-[#313131] focus:ring-1 focus:ring-[hsl(206,100%,62%)] outline-none px-1 h-[24px]"
              />
            </div>
          )}

          <div>
            <label htmlFor="input-set-as-folder" className="flex items-center gap-2 text-xs dark:text-white">
              <input
                type="checkbox"
                id="input-set-as-folder"
                name="isFolder"
                checked={form.isFolder}
                onChange={handleChange}
              />
              Set as folder
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 modal-footer">
          <button className="bg-[#313131] hover:bg-[hsl(0,0%,25%)] text-xs px-3 py-1 text-white" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-[#0078d4] hover:bg-[hsl(206,100%,52%)] text-xs px-3 py-1 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItemModal
