import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

const Login = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View style={styles.title}>
            <Text style={styles.appName}>App Name</Text>
            <Button
              title="New user? Sign Up!"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
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
              title="Sign in"
              onPress={() => navigation.navigate('ExpenseList')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spacing: {
    margin: 20,
  },
  title: {
    padding: 20,
    backgroundColor: '#eee',
  },
  appName: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Login;
