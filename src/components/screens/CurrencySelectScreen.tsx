import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
  View,
  FlatList,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import {
  ICurrencyApiItem,
  ICurrencyItem,
} from '../../types/types';
import storedCurrencies from '../../data/currencies.json';
import { CurrencyListItemComponent } from '../CurrencyListItemComponent';
import api from '../../api';

const CurrencySelectScreen = ({
  navigation,
  route,
}: any): React.JSX.Element => {
  const currentCurrency = route.params.currentCurrency as string;
  const conversionDirection = route.params.conversionDirection as string;

  const [inputValue, setInputValue] = useState<string>(currentCurrency);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(currentCurrency);

  const [data, setData] = useState<ICurrencyItem[]>();
  const [searchData, setSearchData] = useState<ICurrencyItem[]>();

  useEffect(() => {
    api.getCurrencies()
      .then((res) => {
        let availableCurrencies: ICurrencyItem[] = [];
        Object.values(res.data).map((elem: ICurrencyApiItem) => {
          let availableCurrency = storedCurrencies.find(
            (elemStored) => elem.code === elemStored.code
          ) || {
            code: elem.code,
            name: elem.name,
            symbolNative: elem.symbol_native,
            flagSrc: '',
          } as ICurrencyItem;
          availableCurrencies.push(availableCurrency);
        });
        setData(availableCurrencies);
      })
      .catch(() => {
        navigation.navigate('ConversionScreen', {
          errorMessage: 'An error has occurred during the currencies fetching',
        });
      });
  }, []);

  const onCurrencySelected = (
    code: string,
    flagImage: string,
    symbol: string
  ): void => {
    setSelectedCurrency(code);
    setTimeout(() => {
      navigation.navigate('ConversionScreen', {
        code,
        conversionDirection,
        flagImage,
        symbol,
      });
    }, 100);
  };

  const ifIncludes = (str: string, substring: string) => str.toLocaleLowerCase().includes(substring.toLocaleLowerCase())

  const onInputChange = (value: string): void => {
    setInputValue(value);
    if (!value) {
      setData(data);
      return;
    }
    const searchResult = data?.filter(
      (item: ICurrencyItem) => ifIncludes(item.code, value) || ifIncludes(item.name, value));
    setSearchData(searchResult);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screenContainer}
      >
        <View style={styles.inputContainer}>
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={onInputChange}
          />
        </View>
        <FlatList
          data={searchData ?? data ?? []}
          renderItem={({ item }) => (
            <CurrencyListItemComponent
              elem={item || {}}
              onPress={onCurrencySelected}
              selectedCurrency={selectedCurrency}
            />
          )}
          style={styles.currencyItemsContainer}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  input: {
    height: 43,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  currencyItemsContainer: {
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: COLORS.LIGHTER_GRAY,
    borderRadius: 8,
  },
});

export default CurrencySelectScreen;
