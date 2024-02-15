export async function updateTaskList(newName: string, taskListId: string) {
  const res = await fetch(`/api/tasklists/update`, {
    method: 'PATCH',
    body: JSON.stringify({ newName, taskListId }),
  })

  if (!res.ok) {
    throw new Error('Failed to update a task list')
  }

  return res.json()
}
