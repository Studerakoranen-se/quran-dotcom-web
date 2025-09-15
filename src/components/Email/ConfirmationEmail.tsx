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
import { localizedApplicationStrings } from './localizedStrings'

export type ConfirmationEmailProps = {
  locale: 'en' | 'ar' | 'sv' // Specify the allowed locales
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

const ConfirmationEmail = ({ locale = 'ar' }: ConfirmationEmailProps) => {
  const currentYear = new Date().getFullYear()

  const strings = localizedApplicationStrings[locale]

  return (
    <Html>
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
              <Link href="https://www.facebook.com/people/StuderaKoranennu/61553792279856/">
                <Img
                  src={`https://studerakoranen.nu/facebook.svg`}
                  style={{ width: '24px', height: '24px' }}
                />
              </Link>
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <Link href="https://www.instagram.com/studerakoranen.nu">
                <Img
                  src={`https://studerakoranen.nu/instagram.svg`}
                  style={{ width: '24px', height: '24px' }}
                />
              </Link>
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: 'center', color: '#706a7b' }}>
              © {currentYear} StuderaKoranen, All Rights Reserved <br />
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}

export default ConfirmationEmail
