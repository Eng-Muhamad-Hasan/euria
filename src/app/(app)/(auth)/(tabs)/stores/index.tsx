import { View, StyleSheet, ScrollView } from 'react-native';

export default function Stores() {
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.container}>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});