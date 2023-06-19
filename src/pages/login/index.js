import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-web-linear-gradient';
import {
  Container, Input, FormControl, WarningOutlineIcon, Text,
  Link,
} from 'native-base';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('email', email);
  console.log('password', password);
  return (
    <LinearGradient colors={['#c27089', '#8a5873', '#4d3f5f']} style={styles.linearGradient}>
      <img
        src="/humi-logo.svg"
        alt="logo"
        style={styles.logo}
      />
      <Container style={{ marginTop: '40px' }}>
        <FormControl>
          <FormControl.Label><Text style={{ fontSize: '20px' }}>Sign In</Text></FormControl.Label>
          <View style={styles.field}>
            <FormControl isRequired>
              <Input
                size="lg"
                style={styles.input}
                variant="underlined"
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#a3a3a3"
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
                <Text style={{ color: 'white' }}>Please enter your email</Text>
              </FormControl.ErrorMessage>
            </FormControl>
          </View>
          <View style={styles.field}>
            <FormControl isRequired>
              <Input
                size="lg"
                style={styles.input}
                variant="underlined"
                type="password"
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#a3a3a3"
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
                <Text style={{ color: 'white' }}>Please enter your password</Text>
              </FormControl.ErrorMessage>
            </FormControl>
          </View>
        </FormControl>
        <View style={styles.bottomDescription}>
          <Text>No account yet? </Text>
          <Link href="signup">Sign up</Link>
        </View>
      </Container>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#dad4e6',
  },
  linearGradient: {
    width: '100vw',
    minHeight: '100vh',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '100px',
    width: '200px',
    marginTop: '20px',
    marginBottom: '40px',
  },
  input: {
    width: 300,
  },
  field: {
    marginBottom: 20,
    marginTop: 20,
  },
  bottomDescription: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Login;
