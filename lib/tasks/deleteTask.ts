export async function deleteTask(taskId: string) {
  const res = await fetch(`/api/tasks/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ taskId }),
  })

  if (!res.ok) {
    throw new Error('Failed to delete a task')
  }

  return res.json()
}
