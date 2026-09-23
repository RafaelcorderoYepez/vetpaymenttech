import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const leadInput = z.object({
  formName: z.string().trim().min(2).max(60),
  practice: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(24),
  volume: z.string().trim().max(60).optional(),
  rooms: z.string().trim().max(20).optional(),
  software: z.string().trim().max(120).optional(),
})

export const submitLead = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => leadInput.parse(data))
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import('./email-templates/send-email')
    const idempotencyKey = `lead-${data.email}-${Date.now()}`
    try {
      await sendTemplateEmail('lead-notification', 'contact@vetpaymenttech.com', {
        templateData: data,
        idempotencyKey,
        replyTo: data.email,
      })
    } catch (error) {
      console.error('Lead notification email failed', error)
      return { ok: false as const }
    }
    return { ok: true as const }
  })
