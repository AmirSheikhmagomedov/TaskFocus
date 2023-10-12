export async function completeTask(taskId: string) {
  const res = await fetch(`/api/tasks/complete`, {
    method: 'PATCH',
    body: JSON.stringify({ taskId }),
  })

  if (!res.ok) {
    throw new Error('Failed to complete a task')
  }

  return res.json()
}
