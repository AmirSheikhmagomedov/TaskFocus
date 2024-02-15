export async function getTaskLists() {
  const res = await fetch(`/api/tasklists/get`)

  if (!res.ok) {
    throw new Error('Failed to fetch tasks list')
  }

  return res.json()
}
