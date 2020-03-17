import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from '../utils/stylesheet'

//hello@hello.com
//abc123

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
    console.log(`user is entering email `, text)
    this.setState({ email: text })
  }

  enteringPassword = (text) => {
    console.log(`user is entering password `, text)
    this.setState({ password: text })
  }

  //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
  // compare password function is not defined in userModel yet!! \\
  //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

  submitFromButton = async () => {
    try {
      const { email, password } = this.state

      //make a post request to login endpoint
      const response = await fetch('http://192.168.0.162:8000/user/login', {
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

      //flag to proceed to next screen
      return true;
    } catch (err) {
      //err messages are from userRoutes 
      this.setState({ error: err.message })

      // flag to stop going to next screen
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View style={styles.title}>
              <Text style={styles.appName}>Happy Reimbursary!</Text>
              <Button
                title="New user? Sign Up!"
                onPress={() => this.props.navigation.navigate('SignUp')}
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

export default Login;
