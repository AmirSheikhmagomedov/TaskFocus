import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'
import Email from '../../../emails/email'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { code, email, isReset } = body

    if (!code) {
      return new NextResponse('Code is missing', { status: 404 })
    }

    const decryptedCode = AES.decrypt(
      code,
      process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
    ).toString(encUTF8)

    await resend.sendEmail({
      from: 'TaskFocus <onboarding@resend.dev>',
      to: email,
      subject: isReset ? 'Сhange password' : 'Email verification',
      react: Email({ code: decryptedCode, isPasswordChange: isReset }),
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 409 })
  }
}
