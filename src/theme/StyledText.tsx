import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface IStyledTextProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export const StyledText = ({
  text,
  style,
}: IStyledTextProps): React.JSX.Element => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
