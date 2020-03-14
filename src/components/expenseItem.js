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

const expenseItem = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.spacing}>
          <View style={styles.spacing}>
            <Text>Date:</Text>
            <TextInput style={styles.TextInput} />
          </View>
          <View style={styles.spacing}>
            <Text>Item Name:</Text>
            <TextInput style={styles.TextInput} />
          </View>
          <View style={styles.spacing}>
            <Text>Amount</Text>
            <TextInput
              placeholder={'$'}
              keyboardType={'numeric'}
              style={styles.TextInput}
              onEndEditing={text => this.changeText(text)}
              // value={this.state.charCount}
            />
          </View>
          <Button
            title="Submit"
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

export default expenseItem;
