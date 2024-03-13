import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { StyledText } from '../theme/StyledText';

interface IFlagComponentProps {
  flagImage: string;
}

export const FlagComponent = ({
  flagImage,
}: IFlagComponentProps): React.JSX.Element => {
  if (flagImage) {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: flagImage }} />
      </View>
    );
  } else {
    return (
      <View style={styles.emptyContainer}>
        <StyledText text="?" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 4,
    width: 30,
    height: 20,
    marginRight: 10,
  },
  emptyContainer: {
    width: 30,
    height: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
});
