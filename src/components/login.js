import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';

//hello@hello.com
//abc123

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
    }
  }

  enteringEmail = (text) => {
    console.log(`user is entering email `, text)
    this.setState({ email: text })
  }

  enteringPassword = (text) => {
    console.log(`user is entering password `, text)
    this.setState({ password: text })
  }

  submitFromButton = async () => {
    console.log(`user hit submit button`, this.state.email, this.state.password)
    const { email, password } = this.state
    const response = await fetch('http://192.168.0.162:8000/user/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json();
    console.log(data)
  }

  render() {
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
                <TextInput
                  style={styles.TextInput}
                  autoFocus={true}
                  keyboardType={"email-address"}
                  onChangeText={(text) => this.enteringEmail(text)}
                />
              </View>
              <View style={styles.spacing}>
                <Text>Password:</Text>
                <TextInput
                  style={styles.TextInput}
                  onChangeText={(text) => this.enteringPassword(text)}
                />
              </View>
              {/* <TouchableOpacity
                style={styles.fakeButton}
                onPress={() => {
                  this.submitFromButton()
                  // this.submitFromButton.bind(this)
                  this.props.navigation.navigate('ExpenseList')
                }}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity> */}
              <Button
                title="Sign in"
                onPress={() => {
                  this.submitFromButton()
                  this.props.navigation.navigate('ExpenseList')
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

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
  fakeButton: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Login;
