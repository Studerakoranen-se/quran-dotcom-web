import { Body, Container, Head, Hr, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface ContactEmailAdminProps {
  message: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const ContactEmailAdmin = ({ message }: ContactEmailAdminProps) => (
  <Html>
    <Head />
    <Preview>{message}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>{message}</Text>
      </Container>
    </Body>
  </Html>
)

export default ContactEmailAdmin
