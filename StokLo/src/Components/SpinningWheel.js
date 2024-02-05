import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const SpinningWheel = ({ items, onSpin, spinButtonText = 'SPIN', resultText = 'Selected:' }) => {
  const rotating = useRef(new Animated.Value(0)).current;
  const [selectedValue, setSelectedValue] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const colors = [
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#33FFFA',
    '#FF33F5',
  ];

  const startRotation = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setSelectedValue(null);

      Animated.timing(rotating, {
        toValue: 360 * 6 + Math.floor(Math.random() * 360),
        duration: 4000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        const selectedItemIndex = Math.floor((rotating._value % 360) / (360 / items.length));
        setSelectedValue(items[selectedItemIndex]);
        setIsSpinning(false);
        if (onSpin) onSpin(items[selectedItemIndex]);
      });
    }
  };

  const wheelStyles = {
    transform: [{ rotate: rotating.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheel}>
        <Animated.View style={[styles.rotatingContainer, wheelStyles]}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.item, { backgroundColor: colors[index] % colors.length }]}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
      <TouchableOpacity onPress={startRotation} style={isSpinning ? styles.spinButtonDisabled : styles.spinButton}>
        <Text style={styles.spinButtonText}>{isSpinning ? 'SPINNING...' : spinButtonText}</Text>
      </TouchableOpacity>
      {selectedValue && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultText} {selectedValue}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
  rotatingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    position: 'absolute',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    color: 'white',
  },
  spinButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  spinButtonDisabled: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  spinButtonText: {
    color: 'white',
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
  },
});

export default SpinningWheel;
