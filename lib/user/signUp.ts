export async function signUp(
  email: string,
  password: string,
  isCheck: boolean
) {
  const res = await fetch(`/api/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password, isCheck }),
  })

  if (!res.ok) {
    return res.text()
  }

  return res.json()
}
