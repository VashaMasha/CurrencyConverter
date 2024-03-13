import AsyncStorage from '@react-native-async-storage/async-storage';

const setLatestExchangeRates = async (value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('latestExchangeRates', value);
  } catch (e) {}
};

const getLatestExchangeRates = async (): Promise<string | null> => {
  try {
    const rates = await AsyncStorage.getItem('latestExchangeRates');
    return rates;
  } catch (e) {
    return null;
  }
};

export const store = {
  setLatestExchangeRates,
  getLatestExchangeRates,
};
