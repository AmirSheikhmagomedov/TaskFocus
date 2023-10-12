export async function updateTask(task: string, taskId: string) {
  const res = await fetch(`/api/tasks/update`, {
    method: 'PATCH',
    body: JSON.stringify({ task, taskId }),
  })

  if (!res.ok) {
    throw new Error('Failed to update a task')
  }

  return res.json()
}
