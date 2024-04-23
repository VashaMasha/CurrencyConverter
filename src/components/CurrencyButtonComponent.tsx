import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StyledText } from '../theme/StyledText';

interface IButtonProps {
  direction: string;
  code: string;
  onPress: (code: string, conversionDirection: string) => void;
}

export const CurrencyButtonComponent = ({
  direction,
  code,
  onPress,
}: IButtonProps): React.JSX.Element => (
  <View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onPress(code, direction);
      }}
    >
      <StyledText text={code} />
      <Image
        source={require('../assets/icons/arrow_down.png')}
        style={styles.arrowDown}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  arrowDown: {
    marginLeft: 15,
    marginRight: 5,
  },
  titleText: {
    marginBottom: 5,
  },
});
