import React, { Component } from 'react';
import {
  SafeAreaView,
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
      existingItemId: "",
      date: "2020-03-13T05:00:00.000+00:00",
      itemDesc: "",
      amount: 0,
      error: "",
    }
  }

  componentDidMount() {
    console.log("component start to mount")
    //if we passed in an ID from expense list, get the existing ID
    if (this.props.route.params.expenseId) {
      this.setState({ existingItemId: this.props.route.params.expenseId })
      console.log("componentDidMount: if expenseID is passed through props")
      this.getExisitingItem()
      return
    }
    console.log("component finish mounting")
  }

  getExisitingItem = async () => {
    console.log("get existing item endpoint")
    const token = await getToken();
    try {
      const { existingItemId } = this.state
      console.log("getExistingItem existingItemId: " + data)
      const response = await fetch(`http://192.168.0.162:8000/expense/${existingItemId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      const data = await response.json();
      console.log("getExistingItem data: " + data)

      if (!response.ok) {
        console.log(data)
        throw new Error(data.message)
      }

      const { amount, date, itemDesc } = data
      this.setState({ amount, date, itemDesc })
      console.log("got existing item from database: ", amount, date, itemDesc)

    } catch (err) {
      console.log(err)
      this.setState({ error: err.message })
    }
  }

  enteringData = (state, value) => {
    this.setState({
      [state]: value
    })
  }

  addItem = async () => {
    console.log("adding item endpoint")
    const token = await getToken();
    try {
      const { date, itemDesc, amount } = this.state;

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
      console.log("adding item: ", amount, date, itemDesc)
      //if everything is ok and expense is added to database, go ahead to next screen
      return true;
    } catch (err) {
      //if there's an error in adding the expense item, display the error in UI
      this.setState({ error: err.message })

      //can't proceed if there's an error
      return false;
    }
    //we've sent an expense to database, go to expenseRoutes to handle the request
  }

  editItem = async () => {
    console.log("edit an existing item endpoint")
    const token = await getToken();
    try {
      const { existingItemId, date, itemDesc, amount } = this.state;
      console.log("editItem: " + existingItemId)

      //make a put request to edit note endpoint
      const response = await fetch(`http://192.168.0.162:8000/expense/${existingItemId}`, {
        method: "PUT",

        //need to send token along in req.headers to let server know you're already authenticated
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, date, itemDesc })
      })
      const data = await response.json()


      console.log("editing item: ", data)

      if (!response.ok) {

        throw new Error(data.message)
      }

      //if everything is ok and expense is added to database, go ahead to next screen
      return true;
    } catch (err) {
      console.log(err)
      this.setState({ error: err.message })

      //can't proceed if there's an error
      return false;
    }
  }

  addOrEdit = async () => {
    console.log("Are we adding or editing an item?")
    let shouldProceed = undefined;
    try {
      if (this.state.existingItemId) {
        console.log("We're editing an item")
        shouldProceed = await this.editItem()
      } else {
        console.log("We're adding an item")
        shouldProceed = await this.addItem()
      }
      if (shouldProceed) {
        console.log("Go to the next screen")
        await this.props.navigation.navigate('ExpenseList')
      }
    }
    catch (err) {
      this.setState({ error: err.message })
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
                value={this.state.date}
              />
            </View>
            <View style={styles.spacing}>
              <Text>Item Name:</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={(text) => this.enteringData("itemDesc", text)}
                value={this.state.itemDesc}
              />
            </View>
            <View style={styles.spacing}>
              <Text>Amount</Text>
              <TextInput
                placeholder={'$'}
                keyboardType={'numeric'}
                style={styles.TextInput}
                onChangeText={(text) => this.enteringData("amount", text)}
                value={this.state.amount}
              />
            </View>
            <Button
              title="Submit"
              onPress={async () => await this.addOrEdit()}
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
