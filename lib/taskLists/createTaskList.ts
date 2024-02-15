export async function createTaskList(taskListName: string) {
  const res = await fetch(`/api/tasklists/create`, {
    method: 'POST',
    body: JSON.stringify({ taskListName }),
  })

  if (!res.ok) {
    throw new Error('Failed to create a task list')
  }

  return res.json()
}
