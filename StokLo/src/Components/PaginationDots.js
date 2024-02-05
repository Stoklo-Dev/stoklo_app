import React from 'react';
import { View, StyleSheet } from 'react-native';

const PaginationDots = ({ totalDots, currentIndex }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalDots }).map((_, dotIndex) => (
        <View
          key={dotIndex}
          style={[
            styles.dot,
            { backgroundColor: dotIndex === currentIndex ? '#FF8F28' : '#FFD2A8' },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 7,
    borderRadius: 5,
    margin: 5,
  },
});

export default PaginationDots;
