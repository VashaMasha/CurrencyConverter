import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { COLORS } from './colors';

interface IStyledTextProps {
  text: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  color?: string;
}

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = COLORS.BLACK;

export const StyledText = ({
  text,
  size,
  style,
  color,
}: IStyledTextProps): React.JSX.Element => {
  return <Text style={[style, {fontSize: size || DEFAULT_SIZE, color: color || DEFAULT_COLOR}]}>{text}</Text>;
};
