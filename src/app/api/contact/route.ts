import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const form = await req.formData()
  // In production, integrate with your email provider here (Resend/SendGrid/etc.)
  // For now, just acknowledge success so the UI can redirect to success page.
  const payload: Record<string, string> = {}
  for (const [key, value] of form.entries()) {
    payload[key] = String(value)
  }
  return NextResponse.json({ ok: true }, { status: 200 })
}


