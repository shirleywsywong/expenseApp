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
      amount: 0
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
      console.log(token)
      const response = await fetch('http://192.168.0.162:8000/expense/add-item', {
        method: "POST",
        //need to send token along with request to let server know you're already authenticated
        headers: {
          authorization: `Bearer ${token}`
        },
        body: {
          date: date,
          itemDesc: itemDesc,
          amount: amount
        },
      })
      const data = await response.json();
      console.log(data)
    } catch (err) {

    }
  }

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
                await this.handleSubmit();
                await this.props.navigation.navigate('ExpenseList')
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

export default expenseItem;
