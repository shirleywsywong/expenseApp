import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
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
    //if we passed in an ID from expense list, get the existing ID
    if (this.props.route.params.expenseId) {
      this.setState({ existingItemId: this.props.route.params.expenseId })
      this.getExisitingItem()
      return
    }
  }

  //look into the database to get the data from the existing item ID
  getExisitingItem = async () => {
    const token = await getToken();
    try {
      const { existingItemId } = this.state
      const response = await fetch(`https://happy-reimbursary.herokuapp.com/expense/${existingItemId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      const data = await response.json();

      if (!response.ok) {
        console.log(data)
        throw new Error(data.message)
      }

      const { amount, date, itemDesc } = data

      //populate existing item details to state to be rendered in UI
      this.setState({ amount, date, itemDesc })
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

  //add an item to the database
  addItem = async () => {
    const token = await getToken();
    try {
      const { date, itemDesc, amount } = this.state;

      //make a post request to add note endpoint
      const response = await fetch('https://happy-reimbursary.herokuapp.com/expense/add-item', {
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
    //we've sent an expense to database, go to expenseRoutes to handle the request
  }

  //edit an existing expense item
  editItem = async () => {
    const token = await getToken();
    try {
      const { existingItemId, date, itemDesc, amount } = this.state;

      //make a put request to edit note endpoint
      const response = await fetch(`https://happy-reimbursary.herokuapp.com/expense/${existingItemId}`, {
        method: "PUT",

        //need to send token along in req.headers to let server know you're already authenticated
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, date, itemDesc })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      //if everything is ok and expense is updated to database, go ahead to next screen
      return true;
    } catch (err) {
      console.log(err)
      this.setState({ error: err.message })

      //can't proceed if there's an error
      return false;
    }
  }

  //what to do when submit button is pressed, and what to do after
  addOrEdit = async () => {
    let shouldProceed = undefined;
    try {
      //if we have an existing item, submit button is used to edit it
      if (this.state.existingItemId) {
        shouldProceed = await this.editItem()
      } else {
        //if we don't have an existing item, submit button is used to add it
        shouldProceed = await this.addItem()
      }

      //if add or edit is successful, go to the next screen
      if (shouldProceed) {
        await this.props.navigation.navigate('ExpenseList')
      }
    }
    catch (err) {
      //otherwise, return an error
      this.setState({ error: err.message })
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.spacing}>
            <View style={styles.spacing}>
              <Text style={styles.regularFont}>Date:</Text>
              <TextInput
                style={styles.TextInput}
                autoFocus={true}
                onChangeText={(text) => this.enteringData("date", text)}
                value={this.state.date}
              />
            </View>
            <View style={styles.spacing}>
              <Text style={styles.regularFont}>Item Name:</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={(text) => this.enteringData("itemDesc", text)}
                value={this.state.itemDesc}
              />
            </View>
            <View style={styles.spacing}>
              <Text style={styles.regularFont}>Amount</Text>
              <TextInput
                placeholder={'$'}
                keyboardType={'numeric'}
                style={styles.TextInput}
                onChangeText={(text) => this.enteringData("amount", text)}
                value={this.state.amount}
              />
            </View>
            {this.state.error
              ? <Text style={styles.error}>{this.state.error}</Text>
              : null}
            <Button
              title="Submit"
              onPress={async () => await this.addOrEdit()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}

export default expenseItem;
