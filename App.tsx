/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/router'

function App (): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </SafeAreaView>
      <Router />
    </NavigationContainer>
  )
}

export default App
