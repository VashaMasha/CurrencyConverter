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
import api from '../../api';
import { StyledText } from '../../theme/StyledText';
import { CurrencyButtonComponent } from '../CurrencyButtonComponent';
import NetInfo from '@react-native-community/netinfo';
import { store } from '../../store';

const CURRENCY_DEFAULT_VALUE = {
  code: 'USD',
  symbol: '$',
  flagImage: 'https://flagcdn.com/h40/us.png',
};
const CONVERSION_ERROR_MESSAGE =
  'An error has occurred during the currency conversion';

interface ICurrency {
  code: string;
  flagImage: string;
  symbol: string;
};

const ConversionScreen = ({ navigation, route }: any): React.JSX.Element => {
  const { code, flagImage, symbol } = route?.params || ({} as ICurrency);
  const errorMessage = route?.params?.errorMessage as string;
  const conversionDirection = route?.params?.conversionDirection as string;

  const [fromCurrency, setFromCurrency] = useState<ICurrency>(CURRENCY_DEFAULT_VALUE);
  const [toCurrency, setToCurrency] = useState<ICurrency>(CURRENCY_DEFAULT_VALUE);

  const [amount, setAmount] = useState<string>('1');
  const [calculatedValue, setCalculatedValue] = useState<string>('1');
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  useFocusEffect(
    useCallback(() => {
      if (errorMessage) {
        Alert.alert(errorMessage);
        return;
      }

      if (!code) return;

      const currency: ICurrency = {
        code,
        flagImage: flagImage || '',
        symbol,
      };

      if (conversionDirection === 'From') {
        setFromCurrency(currency);
        convertValue(code, toCurrency.code);
      }

      if (conversionDirection === 'To') {
        setToCurrency(currency);
        convertValue(fromCurrency.code, code);
      }
    }, [code, flagImage])
  );

  const convertValue = (
    from: string,
    to: string,
    amountValue?: string
  ): void => {
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          api
          .getRates(from)
          .then((res) => {
            const value = res.data.rates[to] * parseFloat(amountValue || amount);
            setCalculatedValue(value.toFixed(2));
            store.setLatestExchangeRates(JSON.stringify(res.data.rates));
          })
          .catch(() => Alert.alert(CONVERSION_ERROR_MESSAGE));
        } else {
          store.getLatestExchangeRates()
            .then((res) => {
              if (res) {
                const rates = JSON.parse(res);
                const value = parseFloat(amountValue || amount) * (1 / rates[from]) * rates[to];
                setCalculatedValue(value.toFixed(2));
              } else Alert.alert(CONVERSION_ERROR_MESSAGE);
            })
            .catch(() => Alert.alert(CONVERSION_ERROR_MESSAGE));
        }
      })
      .catch(() => Alert.alert(CONVERSION_ERROR_MESSAGE));
  };

  const onSwapPressed = (): void => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
    convertValue(toCurrency.code, fromCurrency.code);
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

  const onAmountChange = (value: string): void => {
    setAmount(value.replace(/[^0-9.]/g, ''));
    if (value) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        convertValue(fromCurrency.code, toCurrency.code, value);
      }, 500);

      setTimer(newTimer);
    } else {
      setCalculatedValue('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screenContainer}
      >
        <View style={styles.buttonsContainer}>
          <CurrencyButtonComponent
            title="From"
            code={fromCurrency.code}
            onPress={onCurrencyPressed}
            flagImage={fromCurrency.flagImage}
          />
          <TouchableOpacity
            style={styles.swapIconContainer}
            onPress={onSwapPressed}
          >
            <Image source={require('../../assets/icons/arrow_swap.png')} />
          </TouchableOpacity>
          <CurrencyButtonComponent
            title="To"
            code={toCurrency.code}
            onPress={onCurrencyPressed}
            flagImage={toCurrency.flagImage}
          />
        </View>
        <StyledText text="Amount:" style={styles.titleText} />
        <TextInput
          value={amount}
          onChangeText={onAmountChange}
          style={styles.input}
          keyboardType="decimal-pad"
        />
        <StyledText
          text={`${amount} ${fromCurrency.symbol} `}
          style={styles.titleText}
        />
        <StyledText
          text={`${calculatedValue} ${toCurrency.symbol}`}
          style={styles.calculatedText}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    height: 43,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 30,
    backgroundColor: COLORS.WHITE,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  swapIconContainer: {
    padding: 10,
  },
  titleText: {
    marginBottom: 5,
  },
  calculatedText: {
    fontSize: 42,
  },
});

export default ConversionScreen;
