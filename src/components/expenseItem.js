import React, { Component } from 'react';
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
import styles from '../utils/stylesheet'
import { getToken } from '../utils/token'

class expenseItem extends Component {
  constructor(props) {
    super()
    this.state = {
      date: "",
      itemDesc: "",
      amount: 0,
      error: "",
    }
  }

  enteringData = (state, value) => {
    this.setState({
      [state]: value
    })
  }

  handleSubmit = async () => {
    try {
      const { date, itemDesc, amount } = this.state;

      const token = await getToken();
      //make a post request to add note endpoint
      const response = await fetch('http://192.168.0.162:8000/expense/add-item', {
        method: "POST",

        //need to send token along in req.headers to let server know you're already authenticated
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

        //the expense item itself is sent via req.body
        body: JSON.stringify({
          date, itemDesc, amount
        }),
      })

      //after the post request, we see what the response is from server
      const data = await response.json();

      //if server is anything but ok, pass error to catch block
      if (!response.ok) {
        console.log(data)
        throw new Error(data.message)
      }

      //if everything is ok and expense is added to database, go ahead to next screen
      return true;
    } catch (err) {
      //if there's an error in adding the expense item, display the error in UI
      this.setState({ error: err.message })

      //can't proceed if there's an error
      return false;
    }
  }

  //we've sent an expense to database, go to expenseRoutes to handle the request

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.spacing}>
            <View style={styles.spacing}>
              <Text>Date:</Text>
              <TextInput
                style={styles.TextInput}
                autoFocus={true}
                onChangeText={(text) => this.enteringData("date", text)}
              />
            </View>
            <View style={styles.spacing}>
              <Text>Item Name:</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={(text) => this.enteringData("itemDesc", text)}
              />
            </View>
            <View style={styles.spacing}>
              <Text>Amount</Text>
              <TextInput
                placeholder={'$'}
                keyboardType={'numeric'}
                style={styles.TextInput}
                onChangeText={(text) => this.enteringData("amount", text)}
              />
            </View>
            <Button
              title="Submit"
              onPress={async () => {
                if (await this.handleSubmit()) {
                  await this.props.navigation.navigate('ExpenseList')
                }
              }}
            />
            {this.state.error
              ? <Text style={styles.error}>{this.state.error}</Text>
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

export default expenseItem;
