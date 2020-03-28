import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../utils/stylesheet'
import { storeToken } from '../utils/token'

//sameple users:
//[hello, abc123]
//[Q, Q]
//[E, E]

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    }
  }

  enteringEmail = (text) => {
    this.setState({ email: text })
  }

  enteringPassword = (text) => {
    this.setState({ password: text })
  }

  submitFromButton = async () => {
    try {
      const { email, password } = this.state

      //make a post request to login endpoint
      const response = await fetch('https://happy-reimbursary.herokuapp.com/user/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json();

      //if login is not successful, throw a new error
      if (!response.ok) {
        throw new Error(data.message)
      }

      //store access token to async storage 
      await storeToken(data.data.accessToken)

      //flag to proceed to next screen
      return true;
    } catch (err) {
      //err messages are from userRoutes 
      this.setState({ error: err.message })

      // flag to stop going to next screen
      return false;
    }
  }

  //user gets jwt back in async storage, expense list renders, and user can add an expense item (expenseRoutes)

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <KeyboardAvoidingView>
            <View style={styles.title}>
              <Text style={styles.appName}>Happy Reimbursary!</Text>
            </View>
            <View style={styles.spacing}>
              <View style={styles.spacing}>
                <Text style={styles.regularFont}>Email:</Text>
                <TextInput
                  style={styles.TextInput}
                  keyboardType={"email-address"}
                  onChangeText={(text) => this.enteringEmail(text)}
                />
              </View>
              <View style={styles.spacing}>
                <Text style={styles.regularFont}>Password:</Text>
                <TextInput
                  style={styles.TextInput}
                  onChangeText={(text) => this.enteringPassword(text)}
                />
              </View>
              <View style={styles.spacing}>
                <View>
                  {this.state.error
                    ? <Text style={styles.error}>{this.state.error}</Text>
                    : null}
                </View>
                <Button
                  title="Sign in"
                  onPress={async () => {
                    if (await this.submitFromButton()) {
                      this.props.navigation.navigate('ExpenseList')
                    }
                  }}
                />
              </View>
              <View style={styles.spacing}>
                <Button
                  title="New user? Sign Up!"
                  onPress={() => this.props.navigation.navigate('SignUp')}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

export default Login;
