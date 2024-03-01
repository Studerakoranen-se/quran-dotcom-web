import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'
import { localizedStrings } from './localizedStrings'

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0',
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

export type ContactEmailProps = {
  locale: 'en' | 'ar' | 'sv' // Specify the allowed locales
}

const ContactEmail = ({ locale = 'ar' }: ContactEmailProps) => {
  const strings = localizedStrings[locale]

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{strings.previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text
            style={paragraph}
            dangerouslySetInnerHTML={{
              __html: strings.previewText,
            }}
          />

          <Text
            style={paragraph}
            dangerouslySetInnerHTML={{
              __html: strings.content,
            }}
          />

          <Text
            style={paragraph}
            dangerouslySetInnerHTML={{
              __html: strings.footerText,
            }}
          />
          <Hr style={hr} />
        </Container>
        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <Link
                className="text-gray-400 hover:text-gray-500"
                href="https://www.facebook.com/people/StuderaKoranennu/61553792279856/"
              >
                <Img
                  src={`https://quran-dotcom-web.vercel.app/assets/Facebook.svg`}
                  style={{ width: '24px', height: '24px' }}
                />
              </Link>
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <Link
                className="text-gray-400 hover:text-gray-500"
                href="https://www.instagram.com/studerakoranen.nu"
              >
                <Img
                  src={`https://quran-dotcom-web.vercel.app/assets/Instagram.svg`}
                  style={{ width: '24px', height: '24px' }}
                />
              </Link>
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: 'center', color: '#706a7b' }}>
              © 2024 StuderaKoranen, All Rights Reserved <br />
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}

export default ContactEmail
