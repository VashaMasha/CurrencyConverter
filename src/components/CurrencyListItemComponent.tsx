import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { StyledText } from '../theme/StyledText';
import { COLORS } from '../theme/colors';
import { ICurrencyItem } from '../types/types';
import { FlagComponent } from './FlagComponent';

interface ICurrencyItemProps {
  elem: ICurrencyItem;
  onPress: (code: string, flagImage: string, symbol: string) => void;
  selectedCurrency: string;
}

export const CurrencyListItemComponent = ({
  elem,
  onPress,
  selectedCurrency,
}: ICurrencyItemProps): React.JSX.Element => (
  <TouchableOpacity
    style={[
      styles.currencyItem,
      selectedCurrency === elem.code && { backgroundColor: COLORS.GRAY },
    ]}
    onPress={() => {
      onPress(elem.code, elem.flagSrc, elem.symbolNative);
    }}
  >
    <FlagComponent flagImage={elem.flagSrc} />
    <StyledText
      text={`${elem.code} - ${elem.name}`}
      style={styles.currencyItemText}
    />
    <View style={styles.radioIcon}>
      {selectedCurrency === elem.code && (
        <View style={styles.radioIconChecked}></View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  currencyItem: {
    paddingHorizontal: 15,
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
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIconChecked: {
    height: 8,
    width: 8,
    borderRadius: 27,
    backgroundColor: COLORS.BLACK,
  },
  currencyItemText: {
    paddingRight: 10,
    flex: 2,
  },
});
