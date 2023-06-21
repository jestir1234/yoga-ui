import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-web-linear-gradient';
import {
  Container, Input, FormControl, WarningOutlineIcon, Text,
  Link, Button, Spinner,
} from 'native-base';
import { login } from '@app/services/api';
import { loginSuccess, loginStart } from '@app/features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/humi-logo.svg';

function Login() {
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setEmailError] = useState(false);
  const [hasPasswordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setEmailError(true);
    }

    if (!password) {
      setPasswordError(true);
    }

    if (!email || !password) return;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    dispatch(loginStart());
    const response = await login(formData);
    if (response) {
      dispatch(loginSuccess(response.user));
      navigate('/home');
    }
  };
  return (
    <LinearGradient colors={['#c27089', '#8a5873', '#4d3f5f']} style={styles.linearGradient}>
      <Image
        source={logo}
        alt="logo"
        style={styles.logo}
      />
      <Container style={{ marginTop: '40px' }}>
        <FormControl>
          <FormControl.Label><Text style={{ fontSize: '20px' }}>Sign In</Text></FormControl.Label>
          <View style={styles.field}>
            <FormControl isRequired isInvalid={hasEmailError}>
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
            <FormControl isRequired isInvalid={hasPasswordError}>
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
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleLogin}
            style={styles.button}
          >
            {loggedInUser.isLoading ? <Spinner accessibilityLabel="Loading" /> : 'Log in'}
          </Button>
        </View>
        <View style={styles.bottomDescription}>
          <Text>No account yet? </Text>
          <Link href="signup">Sign up</Link>
        </View>
      </Container>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: '100vw',
    minHeight: '100vh',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '150px',
    width: '210px',
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
    marginTop: 10,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    marginTop: 20,
    borderRadius: '20px',
    width: 250,
  },
});

export default Login;
