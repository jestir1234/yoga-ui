import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import SignupScreen from '@app/pages/signup';
import Login from '@app/pages/login';
import Home from '@app/pages/home';
import Explore from '@app/pages/explore';
import NavTabs from '@app/components/NavTabs';
import { getCsrf } from '@app/services/api';
import { useSelector } from 'react-redux';
import {
  Router, Routes, Route, Navigate,
} from './routing';

function ProtectedRoute({ children }) {
  const loggedInUser = useSelector((state) => state.user);
  if (!loggedInUser.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const theme = extendTheme({
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: 'md',
        _text: {
          color: 'white',
        },
      },
      defaultProps: {
        colorScheme: 'amber',
      },
    },
    Text: {
      baseStyle: {
        color: '#e9e8eb',
      },
    },
    Input: {
      baseStyle: {
        fontSize: ['lg', 'lg', 'xl'],
        color: '#e9e8eb',
      },
    },
  },
  fonts: {
    heading: 'Helvetica',
    body: 'Helvetica',
    mono: 'Helvetica',
  },
  fontSizes: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950,
  },
});

function App() {
  useEffect(() => {
    getCsrf();
  }, []);

  const loggedInUser = useSelector((state) => state.user);

  return (
    <NativeBaseProvider theme={theme}>
      <View style={styles.container}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="home"
              element={(
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )}
            />
            <Route
              path="explore"
              element={(
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              )}
            />
          </Routes>
          {loggedInUser.user && <NavTabs />}
        </Router>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
});
export default App;
