export async function uncompleteTask(taskId: string) {
  const res = await fetch(`/api/tasks/uncomplete`, {
    method: 'PATCH',
    body: JSON.stringify({ taskId }),
  })

  if (!res.ok) {
    throw new Error('Failed to uncomplete a task')
  }

  return res.json()
}
