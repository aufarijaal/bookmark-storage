interface Item {
  url: string
  title: string
  children: Item[]
  dateAdded: number
  dateGroupModified?: number
  dateLastUsed?: number
  id: string
  index?: number
  parentId?: string
}
