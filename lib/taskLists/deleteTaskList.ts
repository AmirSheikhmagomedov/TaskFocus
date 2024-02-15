export async function deleteTaskList(taskListId: string) {
  const res = await fetch(`/api/tasklists/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ taskListId }),
  })

  if (!res.ok) {
    throw new Error('Failed to delete a task list')
  }

  return res.json()
}
