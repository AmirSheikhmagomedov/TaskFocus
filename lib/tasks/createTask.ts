export async function createTask(task: string, taskListId: string) {
  const res = await fetch(`/api/tasks/create`, {
    method: 'POST',
    body: JSON.stringify({ task, taskListId }),
  })

  if (!res.ok) {
    throw new Error('Failed to create a task')
  }

  return res.json()
}
