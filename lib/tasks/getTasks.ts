export async function getTasks() {
  const res = await fetch(`/api/tasks/get`)

  if (!res.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return res.json()
}
