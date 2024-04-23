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
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { ICurrencyItem, SortType } from '../../types/types';
import { CurrencyListItemComponent } from '../CurrencyListItemComponent';
import api from '../../api';
import { StyledText } from '../../theme/StyledText';

const ERROR_MESSAGE = 'An error has occurred during the currencies fetching';

const CurrencySelectScreen = ({
  navigation,
  route,
}: any): React.JSX.Element => {
  const currentCurrency = route.params.currentCurrency as string;
  const conversionDirection = route.params.conversionDirection as string;

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(currentCurrency);

  const [data, setData] = useState<ICurrencyItem[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const [rankSort, setRankSort] = useState<
    SortType.PositiveRank | SortType.NegativeRank
  >(SortType.PositiveRank);
  const [priceSort, setPriceSort] = useState<
    SortType.PositivePrice | SortType.NegativePrice
  >(SortType.PositivePrice);
  const [lastActiveSort, setLastActiveSort] = useState<'Rank' | 'Price' | null>(
    null
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    getCurrencies(offset);
  }, [offset, rankSort, priceSort, inputValue]);

  const getCurrencies = (offsetValue?: number) => {
    const sortBy =
      lastActiveSort === 'Price'
        ? priceSort
        : lastActiveSort === 'Rank'
        ? rankSort
        : undefined;
    api
      .getCurrencies(sortBy, offsetValue, inputValue.toLowerCase())
      .then((res) => {
        let currencies: ICurrencyItem[] = [];
        Object.values(res.data?.data)?.map((elem: ICurrencyItem) => {
          let currency = {
            id: elem.id,
            name: elem.name,
            symbol: elem.symbol,
            values: {
              USD: {
                price: elem.values.USD.price,
              },
            },
          } as ICurrencyItem;
          currencies.push(currency);
        });
        setData(offsetValue ? [...data, ...currencies] : currencies);
      })
      .catch(() => {
        navigation.navigate('ConversionScreen', {
          errorMessage: ERROR_MESSAGE,
        });
      });
  };

  const onCurrencySelected = (code: string, price: number): void => {
    setSelectedCurrency(code);
    setTimeout(() => {
      navigation.navigate('ConversionScreen', {
        code,
        conversionDirection,
        price,
      });
    }, 100);
  };

  const onPriceSortPressed = () => {
    const sortOption =
      priceSort === SortType.PositivePrice
        ? SortType.NegativePrice
        : SortType.PositivePrice;
    setPriceSort(sortOption);
    setLastActiveSort('Price');
    setOffset(0);
  };

  const onRankSortPressed = () => {
    const sortOption =
      rankSort === SortType.PositiveRank
        ? SortType.NegativeRank
        : SortType.PositiveRank;
    setRankSort(sortOption);
    setLastActiveSort('Rank');
    setOffset(0);
  };

  const loadMoreData = () => {
    setOffset(offset + 10);
  };

  const onInputChange = (value: string) => {
    clearTimeout(timer);
    setInputValue(value);
    const newTimer = setTimeout(() => {
      // Search using 'symbol' doesn't work on the backend side
      getCurrencies();
    }, 500);

    setTimer(newTimer);
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
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={onInputChange}
            placeholder="Search for a currency..."
          />
        </View>
        <View style={styles.sortOptionsContainer}>
          <TouchableOpacity onPress={onRankSortPressed} style={styles.row}>
            <StyledText text={'Rank'} />
            <View
              style={[
                styles.sortIconContainer,
                {
                  backgroundColor:
                    lastActiveSort === 'Rank' ? COLORS.BLUE : COLORS.WHITE,
                },
              ]}
            >
              <Image
                source={require('../../assets/icons/arrow_back.png')}
                style={[
                  {
                    transform: [
                      {
                        rotate:
                          rankSort === SortType.PositiveRank
                            ? '90deg'
                            : '-90deg',
                      },
                    ],
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPriceSortPressed} style={styles.row}>
            <StyledText text={'Price'} />
            <View
              style={[
                styles.sortIconContainer,
                {
                  backgroundColor:
                    lastActiveSort === 'Price' ? COLORS.BLUE : COLORS.WHITE,
                },
              ]}
            >
              <Image
                source={require('../../assets/icons/arrow_back.png')}
                style={[
                  {
                    transform: [
                      {
                        rotate:
                          priceSort === SortType.PositivePrice
                            ? '90deg'
                            : '-90deg',
                      },
                    ],
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CurrencyListItemComponent
              elem={item || {}}
              onPress={onCurrencySelected}
              selectedCurrency={selectedCurrency}
            />
          )}
          style={styles.currencyItemsContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
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
    backgroundColor: COLORS.LIGHTER_GRAY,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  input: {
    height: 43,
    flex: 1,
  },
  sortOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortIconContainer: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  currencyItemsContainer: {
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default CurrencySelectScreen;
