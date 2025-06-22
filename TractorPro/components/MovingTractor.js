import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function MovingTractor() {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: screenWidth - 200,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.iconContainer, { transform: [{ translateX: moveAnim }] }]}>
      <MaterialCommunityIcons name="tractor" size={180} color="#1a237e" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: 40,
  },
});
