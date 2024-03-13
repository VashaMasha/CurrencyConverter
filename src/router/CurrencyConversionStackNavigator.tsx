import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversionScreen from '../components/screens/ConversionScreen';
import CurrencySelectScreen from '../components/screens/CurrencySelectScreen';
import { Image, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { StyledText } from '../theme/StyledText';

const Stack = createNativeStackNavigator();

const CurrencyConversionStackNavigator = (): React.JSX.Element => (
  <Stack.Navigator initialRouteName="ConversionScreen">
    <Stack.Screen
      name="ConversionScreen"
      component={ConversionScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CurrencySelectScreen"
      component={CurrencySelectScreen}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../assets/icons/arrow_back.png')} />
            <StyledText text="Currency Select" style={styles.backButtonText} />
          </Pressable>
        ),
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.BLACK,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default CurrencyConversionStackNavigator;
