import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface LeadNotificationProps {
  formName?: string
  practice?: string
  name?: string
  email?: string
  phone?: string
  volume?: string
  rooms?: string
  software?: string
}

const row: React.CSSProperties = { margin: '0 0 10px', fontSize: '15px', lineHeight: '22px', color: '#0f2744' }

export function LeadNotification({
  formName = 'Website form',
  practice = '—',
  name = '—',
  email = '—',
  phone = '—',
  volume,
  rooms,
  software,
}: LeadNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New ${formName} lead: ${practice}`}</Preview>
      <Body style={{ backgroundColor: '#f4f7fa', fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: '24px' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '28px', maxWidth: '560px' }}>
          <Heading style={{ fontSize: '22px', color: '#0f2744', margin: '0 0 6px' }}>New lead from VetPaymentTech</Heading>
          <Text style={{ ...row, color: '#5b7089', margin: '0 0 18px' }}>{formName}</Text>
          <Hr style={{ borderColor: '#e4eaf1' }} />
          <Section style={{ paddingTop: '14px' }}>
            <Text style={row}><strong>Practice:</strong> {practice}</Text>
            <Text style={row}><strong>Contact:</strong> {name}</Text>
            <Text style={row}><strong>Email:</strong> {email}</Text>
            <Text style={row}><strong>Phone:</strong> {phone}</Text>
            {volume ? <Text style={row}><strong>Monthly volume:</strong> {volume}</Text> : null}
            {rooms ? <Text style={row}><strong>Exam / treatment rooms:</strong> {rooms}</Text> : null}
            {software ? <Text style={row}><strong>Current PIMS / EHR:</strong> {software}</Text> : null}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadNotification,
  displayName: 'New lead notification',
  subject: (data: Record<string, any>) => `New lead: ${data['practice'] || 'Veterinary practice'}`,
  to: 'contact@vetpaymenttech.com',
  previewData: {
    formName: 'Free savings analysis',
    practice: 'Happy Paws Veterinary',
    name: 'Jordan Smith',
    email: 'jordan@practice.com',
    phone: '(555) 555-0123',
    volume: '$50,000–$100,000',
  },
} satisfies TemplateEntry
