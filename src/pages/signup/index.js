import React, { useReducer } from 'react';
import {
  Container,
  Input,
  Button,
  Select,
  View,
  FormControl,
  WarningOutlineIcon,
  CheckIcon,
  Text,
  Link,
  Spinner,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { signup } from '@app/services/api';
import { validateEmail } from '@app/utils';
import LinearGradient from 'react-native-web-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginStart, loginFailure } from '@app/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-native';
import logo from '@assets/humi-logo.svg';


const initialState = {
  first_name: { value: null, error: null },
  last_name: { value: null, error: null },
  email: { value: null, error: null },
  password: { value: null, error: null },
  type: { value: 'normal', error: null },
  studio_name: { value: null, error: null },
  studio_location: { value: null, error: null },
};

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, [action.field]: { value: action.value, error: null } };
    case 'RESET_FORM':
      return initialState;
    case 'SET_ERRORS':
      return { ...state, ...action.value };
    default:
      return state;
  }
}

function SignupPage() {
  const [formState, localDispatch] = useReducer(formReducer, initialState);
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    localDispatch({ type: 'CHANGE_INPUT', field, value });
  };

  const handleSubmit = async () => {
    const errors = fieldsWithErrors();
    if (Object.keys(errors).length) {
      localDispatch({ type: 'SET_ERRORS', value: errors });
      return;
    }
    const {
      first_name, last_name, email, password, type, studio_name, studio_location,
    } = formState;

    dispatch(loginStart());

    try {
      const response = await signup({
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
        type: type.value,
        studio_name: studio_name.value,
        studio_location: studio_location.value,
      });
      if (response) {
        dispatch(loginSuccess(response));
        navigate('/home');
      }
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  const fieldsWithErrors = () => {
    const fields = Object.keys(initialState).reduce((acc, val) => {
      if (formState.type.value !== 'teacher' && (val === 'studio_name' || val === 'studio_location')) {
        return acc;
      }

      // Validate fields are not empty
      if (!formState[val].value) {
        acc[val] = {
          error: true,
          value: formState[val].value,
        };
      }

      // Validate password
      if (val === 'password' && formState.password.value?.length < 6) {
        acc[val] = {
          error: true,
          value: formState[val].value,
        };
      }

      // Validate email
      if (val === 'email' && !validateEmail(formState[val].value)) {
        acc[val] = {
          error: true,
          value: formState[val].value,
        };
      }
      return acc;
    }, {});
    return fields;
  };
  return (
    <LinearGradient colors={['#c27089', '#8a5873', '#4d3f5f']} style={styles.linearGradient}>
      <Image
        source={logo}
        alt="logo"
        style={styles.logo}
      />
      <Container>
        <FormControl isInvalid={loggedInUser.error}>
          <FormControl isRequired isInvalid={formState.first_name.error}>
            <FormControl.Label><Text>First Name</Text></FormControl.Label>
            <Input
              size="md"
              variant="underlined"
              placeholder="Please enter your first name"
              onChangeText={(text) => handleInputChange('first_name', text)}
              placeholderTextColor="#a3a3a3"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
              <Text style={{ color: 'white' }}>Please enter your first name</Text>
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={formState.last_name.error}>
            <FormControl.Label><Text>Last Name</Text></FormControl.Label>
            <Input
              size="md"
              variant="underlined"
              placeholder="Please enter your last name"
              onChangeText={(text) => handleInputChange('last_name', text)}
              placeholderTextColor="#a3a3a3"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
              <Text style={{ color: 'white' }}>Please enter your last name</Text>
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={formState.email.error}>
            <FormControl.Label><Text>Email</Text></FormControl.Label>
            <Input
              size="md"
              variant="underlined"
              keyboardType="email-address"
              placeholder="Please enter a valid email"
              onChangeText={(text) => handleInputChange('email', text)}
              placeholderTextColor="#a3a3a3"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
              <Text style={{ color: 'white' }}>Please enter your email</Text>
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={formState.password.error}>
            <FormControl.Label><Text>Password</Text></FormControl.Label>
            <Input
              size="md"
              variant="underlined"
              type="password"
              placeholder="Please enter a password"
              onChangeText={(text) => handleInputChange('password', text)}
              placeholderTextColor="#a3a3a3"
            />
            <FormControl.HelperText>
              <Text style={{ color: '#a3a3a3', fontSize: '12px' }}>Must be atleast 6 characters</Text>
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
              <Text style={{ color: 'white' }}>Atleast 6 characters are required.</Text>
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl w="4/4" maxW="300" isRequired style={styles.userType}>
            <FormControl.Label><Text>User Type</Text></FormControl.Label>
            <Select
              placeholder="Select User Type"
              selectedValue={formState.type.value}
              onValueChange={(value) => handleInputChange('type', value)}
              minWidth="200"
              accessibilityLabel="Select User Type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              <Select.Item label="Normal" value="normal" />
              <Select.Item label="Teacher" value="teacher" />
            </Select>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" color="white" />}>
              <Text style={{ color: 'white' }}>Please make a selection</Text>
            </FormControl.ErrorMessage>
          </FormControl>
          {formState.type.value === 'teacher' && (
          <View style={styles.userTypeOptionsContainer}>
            <FormControl isRequired={formState.type.value === 'teacher'} isInvalid={formState.studio_name.error}>
              <FormControl.Label><Text>Studio Name</Text></FormControl.Label>
              <Input
                size="md"
                variant="underlined"
                placeholder="Studio Name"
                onChangeText={(text) => handleInputChange('studio_name', text)}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                <Text style={{ color: 'white' }}>Please enter the name of your studio</Text>
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired={formState.type.value === 'teacher'} isInvalid={formState.studio_location.error}>
              <FormControl.Label><Text>Studio Location</Text></FormControl.Label>
              <Input
                size="md"
                variant="underlined"
                placeholder="Studio Location"
                onChangeText={(text) => handleInputChange('studio_location', text)}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                <Text style={{ color: 'white' }}>Please enter your studio address</Text>
              </FormControl.ErrorMessage>
            </FormControl>
          </View>
          )}
          <Button
            block
            onPress={handleSubmit}
            size="sm"
            style={styles.button}
          >
            {loggedInUser.isLoading ? <Spinner accessibilityLabel="Loading" /> : 'Create user'}
          </Button>

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            <Text style={{ color: 'white' }}>{loggedInUser.error}</Text>
          </FormControl.ErrorMessage>

        </FormControl>
        <View style={styles.bottomDescription}>
          <Text>Already have an account? </Text>
          <Link href="login">Sign in</Link>
        </View>
      </Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: '20px',
  },
  userType: {
    marginTop: 20,
  },
  linearGradient: {
    width: '100vw',
    minHeight: '100vh',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '120px',
    width: '170px',
    marginTop: '20px',
    marginBottom: '40px',
  },
  userTypeOptionsContainer: {
    marginTop: 20,
  },
  bottomDescription: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default SignupPage;
