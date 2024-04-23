import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { StyledText } from '../theme/StyledText';
import { COLORS } from '../theme/colors';
import { ICurrencyItem } from '../types/types';

interface ICurrencyItemProps {
  elem: ICurrencyItem;
  onPress: (code: string, price: number) => void;
  selectedCurrency: string;
}

export const CurrencyListItemComponent = ({
  elem,
  onPress,
  selectedCurrency,
}: ICurrencyItemProps): React.JSX.Element => (
  <TouchableOpacity
    style={styles.currencyItem}
    onPress={() => onPress(elem.symbol, elem.values.USD.price)}
  >
    <View style={styles.currencyItemTextContiner}>
      <StyledText text={elem.name} style={styles.boldText} />
      <StyledText text={elem.symbol} color={COLORS.GRAY} />
    </View>
    {selectedCurrency === elem.symbol && (
      <View style={styles.radioIcon}>
        <View style={styles.radioIconChecked} />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  currencyItem: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  radioIcon: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderRadius: 27,
    borderColor: COLORS.BLUE,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIconChecked: {
    height: 8,
    width: 8,
    borderRadius: 27,
    backgroundColor: COLORS.BLUE,
  },
  currencyItemTextContiner: {
    flexDirection: 'column',
    paddingRight: 10,
    flex: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
