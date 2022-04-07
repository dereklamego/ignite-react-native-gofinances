import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native'
import { Register } from '.';
import theme from '../../global/styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const Providers: React.FC = ({ children })=>(
  <NavigationContainer>
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  </NavigationContainer>
)

describe('Register Screen', ()=>{

  it('should open modal when user clicks category button',async () => {
    const { getByTestId } = render(
      <Register/>,
      {
        wrapper: Providers
      }
    );

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
     
    
  })
})

