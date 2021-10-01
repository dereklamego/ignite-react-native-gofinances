import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import AppLoading from 'expo-app-loading'; //expo install expo-app-loading 
import { ThemeProvider } from 'styled-components';
import {StatusBar} from 'expo-status-bar'
import {NavigationContainer} from '@react-navigation/native';

import{AuthProvider, useAuth} from './src/hooks/auth'
import{
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import {Routes} from './src/routes'

import {SignIn} from './src/screens/SignIn'

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {userStorageLoading} = useAuth();

  if(!fontsLoaded || userStorageLoading){
    return <AppLoading/>
    
  }

  return (
    <ThemeProvider theme={theme}>
     
      <StatusBar 
        style="light"
        backgroundColor="transparent"
        translucent
      />
      
      <AuthProvider>
        <Routes/>
      </AuthProvider>
          
    </ThemeProvider>
  )
}

