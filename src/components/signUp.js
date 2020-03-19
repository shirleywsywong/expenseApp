import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

import styles from '../utils/stylesheet';
import { storeToken } from '../utils/token'

class SignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
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

  //post request to sign up endpoint
  submitFromButton = async () => {
    const { email, password } = this.state
    try {
      const response = await fetch('http://192.168.0.162:8000/user/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      //response look like this:
      //{"data": {"accessToken": "long token string"}}
      const data = await response.json();

      //if response is anything but ok, throw an error and go to catch block
      if (!response.ok) {
        console.log(data)
        throw new Error(data.message)
      }

      //store access token to async storage 
      await storeToken(data.data.accessToken)

      //flag to proceed to next screen
      return true;
    } catch (err) {
      //err messages are from userRoutes 
      this.setState({ error: err.message })

      //flag to stop going to next screen
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
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
            <Button
              title="Sign in"
              onPress={async () => {
                if (await this.submitFromButton()) {
                  this.props.navigation.navigate('ExpenseList')
                }
              }}
            />
            {this.state.error
              ? <Text>{this.state.error}</Text>
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};


export default SignUp;
