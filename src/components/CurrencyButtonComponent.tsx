import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StyledText } from '../theme/StyledText';
import { COLORS } from '../theme/colors';
import { FlagComponent } from './FlagComponent';

interface IButtonProps {
  title: string;
  code: string;
  flagImage: string;
  onPress: (code: string, conversionDirection: string) => void;
}

export const CurrencyButtonComponent = ({
  title,
  code,
  flagImage,
  onPress,
}: IButtonProps): React.JSX.Element => (
  <View>
    <StyledText style={styles.titleText} text={`${title} :`} />
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onPress(code, title);
      }}
    >
      <FlagComponent flagImage={flagImage} />
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
    backgroundColor: COLORS.GRAY,
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
