import { Body, Container, Head, Hr, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface ContactEmailProps {
  firstName: string
  lastName: string
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

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}

const ContactEmail = ({ firstName, lastName }: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting us!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {`${firstName} ${lastName}`},</Text>
        <Text style={paragraph}>Thank you for reaching to us</Text>

        <Text style={paragraph}>We will get back to you as soon as possible.</Text>

        <Text style={paragraph}>
          Best regards,
          <br />
          The Studera Koranen team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Eksatravagen 471, 12738 Skarholmen, Stockholm</Text>
      </Container>
    </Body>
  </Html>
)

export default ContactEmail
