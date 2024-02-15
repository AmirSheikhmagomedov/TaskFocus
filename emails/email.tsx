import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface Props {
  code?: string
  isPasswordChange: boolean
}

export const MyEmail = ({ code, isPasswordChange }: Props) => (
  <Html>
    <Head lang="en" />
    <Preview>Your verification code is {code!}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={secondary}>
          Enter the following code to{' '}
          {isPasswordChange ? 'change password' : 'sign up'}
        </Heading>
        <Section style={codeContainer}>
          <Text style={codeStyles}>{code}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default MyEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eee',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  marginTop: '20px',
  width: '360px',
  margin: '0 auto',
  padding: '68px 0 40px',
}

const secondary = {
  color: '#000',
  display: 'block',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '24px',
  marginBottom: '0',
  marginTop: '0',
  textAlign: 'center' as const,
}

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px auto 14px',
  verticalAlign: 'middle',
  width: '280px',
}

const codeStyles = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'Arial,sans-serif',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center' as const,
}
