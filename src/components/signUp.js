import React, { useState } from 'react';
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

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.spacing}>
          <View style={styles.spacing}>
            <Text>Email:</Text>
            <TextInput style={styles.TextInput} />
          </View>
          <View style={styles.spacing}>
            <Text>Password:</Text>
            <TextInput style={styles.TextInput} />
          </View>
          <Button
            title="Create an account"
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

export default SignUp;
