/* eslint-disable react/no-unescaped-entities */
import { Column } from '@react-email/column'
import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Preview } from '@react-email/preview'
import { Row } from '@react-email/row'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontFamily,
  fontSize: '16px',
  lineHeight: '26px',
}

const paragraphTitle = { fontFamily, margin: '-0.8rem 0rem ', fontSize: '16px' }

const paragraphElementSelector = {
  padding: '1.3rem 0 0',
}

const hr = {
  borderColor: '#cccccc',
}

export interface ConfirmationTutorEmailProps {
  firstName: string
  lastName: string
  age: string
  email: string
  phone: string
  studyLevel: string
  gender: string
  topic: string
  goals: string
  others: string
}

function ConfirmationTutorEmail({
  firstName = 'Mustafa',
  lastName = 'Ali',
  age = '30',
  email = 'mustafa@example.com',
  phone = '123-456-7890',
  studyLevel = 'Bachelor',
  gender = 'Male',
  topic = 'Mathematics',
  goals = 'Improve grades',
  others = 'N/A',
}: ConfirmationTutorEmailProps) {
  const currentYear = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>
        You have got a new student request from {firstName} {lastName}.
      </Preview>
      <Section style={main}>
        <Container style={container}>
          <Text style={{ ...paragraph, fontWeight: 'bold' }}>
            Assalamu Aleykum Wa rahmatullahi Wa barakatuh
          </Text>
          <Text style={paragraph}>
            Dear Instructor, You have got a new student request from {firstName} {lastName}.
          </Text>
          <Text style={paragraph}>Here's Student Information:</Text>

          <Section>
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Name & Surname</b>
                </Text>
                <Text style={paragraph}>
                  {firstName} {lastName}
                </Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Email</b>
                </Text>
                <Text style={paragraph}>{email}</Text>
              </Column>
            </Row>

            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Phone</b>
                </Text>
                <Text style={paragraph}>{phone}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Age</b>
                </Text>
                <Text style={paragraph}>{age}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Study Level</b>
                </Text>
                <Text style={paragraph}>{studyLevel}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Gender</b>
                </Text>
                <Text style={paragraph}>{gender}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Topic</b>
                </Text>
                <Text style={paragraph}>{topic}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Goals</b>
                </Text>
                <Text style={paragraph}>{goals}</Text>
              </Column>
            </Row>
            <Hr style={hr} />
            <Row>
              <Column style={paragraphElementSelector}>
                <Text style={paragraphTitle}>
                  <b>Others</b>
                </Text>
                <Text style={paragraph}>{others}</Text>
              </Column>
            </Row>
          </Section>
          <Text style={paragraph}>Please get back to the student when are available.</Text>

          <Text style={paragraph}>
            Best Regards,
            <br />
            The Studera Koranen team
          </Text>
          <Hr style={hr} />

          <Text style={paragraph}>
            © {currentYear} StuderaKoranen, All Rights Reserved <br />
          </Text>
        </Container>
      </Section>
    </Html>
  )
}

export default ConfirmationTutorEmail
