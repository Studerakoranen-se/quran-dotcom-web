export default function getGtmList(listName: string, listId?: string) {
  const gtmList: Record<string, string> = {
    item_list_name: listName || '',
    item_list_id: listName?.toLowerCase().replace(/ /g, '_') || '',
  }

  if (listId) {
    gtmList.item_list_id = `${listId}_${listName}`.toLowerCase().replace(/ /g, '_')
  }

  return gtmList
}
