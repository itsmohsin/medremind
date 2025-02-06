import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react';

export default function RootLayout(){
  return(
    <>
      <StatusBar style="light" />
      <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor:'White'},
        animation: 'slide_from_right',
        header:() => null,
        navigationBarHidden:true,
      }}
      >
        <Stack.Screen name="index" options={{headerShown: false}}/>
      </Stack>
    </>
);
}
