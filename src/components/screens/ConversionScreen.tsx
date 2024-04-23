import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { useFocusEffect } from '@react-navigation/native';
import { StyledText } from '../../theme/StyledText';
import { CurrencyButtonComponent } from '../CurrencyButtonComponent';

const CURRENCY_DEFAULT_CODE = '-';
type ConversionDirection = 'First' | 'Second';

const ConversionScreen = ({ navigation, route }: any): React.JSX.Element => {
  const { code, price } = route?.params || {};
  const errorMessage = route?.params?.errorMessage as string;
  const conversionDirection = route?.params
    ?.conversionDirection as ConversionDirection;

  const [firstCurrencyCode, setFirstCurrencyCode] = useState<string>(
    CURRENCY_DEFAULT_CODE
  );
  const [firstCurrencyPrice, setFirstCurrencyPrice] = useState(null);

  const [secondCurrencyCode, setSecondCurrencyCode] = useState<string>(
    CURRENCY_DEFAULT_CODE
  );
  const [secondCurrencyPrice, setSecondCurrencyPrice] = useState(null);

  const [firstInput, setFirstInput] = useState<string>('1');
  const [secondInput, setSecondInput] = useState<string>('1');
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  useFocusEffect(
    useCallback(() => {
      if (errorMessage) {
        Alert.alert(errorMessage);
        return;
      }

      if (!code) return;

      if (conversionDirection === 'First') {
        setFirstCurrencyCode(code);
        setFirstCurrencyPrice(price);
        convertValue(price, secondCurrencyPrice, firstInput, true);
      }

      if (conversionDirection === 'Second') {
        setSecondCurrencyCode(code);
        setSecondCurrencyPrice(price);
        convertValue(firstCurrencyPrice, price, secondInput, true);
      }
    }, [code, price])
  );

  const convertValue = (
    firstPrice: number | null,
    secondPrice: number | null,
    amountValue: string,
    isFirstToSecond?: boolean
  ): void => {
    if (firstPrice === null || secondPrice === null) return;

    const calculatedValue =
      (firstPrice / secondPrice) * parseFloat(amountValue);
    isFirstToSecond
      ? setSecondInput(calculatedValue.toFixed(2))
      : setFirstInput(calculatedValue.toFixed(2));
  };

  const onSwapPressed = (): void => {
    setSecondCurrencyCode(firstCurrencyCode);
    setFirstCurrencyCode(secondCurrencyCode);

    setSecondCurrencyPrice(firstCurrencyPrice);
    setFirstCurrencyPrice(secondCurrencyPrice);
    convertValue(secondCurrencyPrice, firstCurrencyPrice, firstInput, true);
  };

  const onCurrencyPressed = (
    code: string,
    conversionDirection: string
  ): void => {
    navigation.push('CurrencySelectScreen', {
      currentCurrency: code,
      conversionDirection,
    });
  };

  const onAmountChange = (value: string, isFirst?: boolean): void => {
    const formattedValue = value.replace(/[^0-9.]/g, '');
    if (formattedValue) {
      isFirst ? setFirstInput(formattedValue) : setSecondInput(formattedValue);
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        isFirst
          ? convertValue(
              firstCurrencyPrice,
              secondCurrencyPrice,
              value,
              isFirst
            )
          : convertValue(secondCurrencyPrice, firstCurrencyPrice, value);
      }, 500);

      setTimer(newTimer);
    } else {
      isFirst ? setSecondInput('') : setFirstInput('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screenContainer}
      >
        <View style={styles.converterContainer}>
          <StyledText text={'Converter'} size={20} style={styles.header} />
          <View style={styles.columnsContainer}>
            <View style={styles.columnContainer}>
              <TextInput
                value={firstInput}
                onChangeText={(value) => onAmountChange(value, true)}
                style={styles.input}
                keyboardType="decimal-pad"
              />
              <View style={styles.spacer} />
              <TextInput
                value={secondInput}
                onChangeText={onAmountChange}
                style={styles.input}
                keyboardType="decimal-pad"
              />
            </View>
            <TouchableOpacity
              style={styles.swapIconContainer}
              onPress={onSwapPressed}
            >
              <Image
                source={require('../../assets/icons/arrow_swap.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View
              style={[styles.columnContainer, { alignContent: 'flex-end' }]}
            >
              <CurrencyButtonComponent
                direction="First"
                code={firstCurrencyCode}
                onPress={onCurrencyPressed}
              />
              <View style={styles.spacer} />
              <CurrencyButtonComponent
                direction="Second"
                code={secondCurrencyCode}
                onPress={onCurrencyPressed}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  converterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
  },
  header: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  columnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    fontSize: 16,
  },
  spacer: {
    backgroundColor: COLORS.LIGHTER_GRAY,
    height: 1,
    marginVertical: 15,
  },
  swapIconContainer: {
    padding: 10,
  },
  icon: {
    height: 40,
    width: 40,
  },
  titleText: {
    marginBottom: 5,
  },
  calculatedText: {
    fontSize: 42,
  },
});

export default ConversionScreen;
