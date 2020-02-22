import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

const ExportCSV = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.spacing}>
          <Button
            title="Tap to download CSV file"
            onPress={() => alert('Done!')}
          />
        </View>
        <View style={styles.spacing}>
          <Button
            title="Back to expense list"
            onPress={() => navigation.navigate('ExpenseList')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spacing: {
    margin: 20,
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default ExportCSV;
