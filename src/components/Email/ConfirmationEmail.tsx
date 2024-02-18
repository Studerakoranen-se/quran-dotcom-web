import { Body, Container, Head, Hr, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface ConfirmationEmailProps {
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

const ConfirmationEmail = ({ firstName, lastName }: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Tack för din ansökan till Studera Koranen!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {`${firstName} ${lastName}`},</Text>
        <Text style={paragraph}>
          Welcome to Studera Koranen, the online Koran teaching platform that helps you learn the
          Koran in interactive way.
        </Text>

        <Text style={paragraph}>
          Our team recieved your request and we will get back to you as soon as possible.
        </Text>

        <Text style={paragraph}>
          Best,
          <br />
          The Studera Koranen team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Eksatravagen 471, 12738 Skarholmen, Stockholm</Text>
      </Container>
    </Body>
  </Html>
)

export default ConfirmationEmail
