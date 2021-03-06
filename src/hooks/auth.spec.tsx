import fetchMock from 'jest-fetch-mock';
import { mocked } from 'ts-jest/utils';
import { renderHook, act } from '@testing-library/react-hooks';
import {AuthProvider, useAuth} from './auth';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

jest.mock('expo-auth-session');

describe('Auth hook',()=>{

  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it('must be able to sign in with an existing Google account', async ()=>{
    const userTest = {
      id: 'any_id',
      email: 'john.doe@email.com',
      name: 'John Doe',
      photo: 'any_photo.png'
    };
    
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }   
    })

    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(),{
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user.email).toBe(userTest.email);
  });

  it('user must not connect if authentication with Google is terminated', async ()=>{
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    })

   // fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(),{
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user).not.toHaveProperty('id');
  });

  it('must give error in google parameters', async ()=>{
  

   // fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(),{
      wrapper: AuthProvider
    });

    try{
      await act(() => result.current.signInWithGoogle());
    }catch{
      expect(result.current.user).toEqual({});
    }
      


    
  });
})