import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../utils/stylesheet';
import { getToken } from '../utils/token'

class ExpenseList extends Component {
  constructor({ navigation }) {
    super();
    this.state = {
      token: "",
      expenseGroup: [],
      selectedItemID: "",
    };
  }

  iconAdd = (<IconFeather name="plus-square" size={50} color="#109" />);
  iconEdit = (<IconFeather name="edit" size={45} color="#109" />);
  iconTrash = (<IconFeather name="trash-2" size={45} color="#109" />);
  iconExport = (<IconMaterial name="export" size={50} color="#109" />);

  componentDidMount() {
    //if we move to another screen and come back to it, get data from database again
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getExpenseData()
    });
    return unsubscribe;
  }

  //get user's expense list
  getExpenseData = async () => {
    const token = await getToken();
    this.setState({ token })
    try {
      const response = await fetch('http://192.168.0.162:8000/expense/', {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      const data = await response.json();
      this.setState({ expenseGroup: data })
    } catch (err) {
      console.log(err)
    }
  }

  //render items from database, and make them into links
  renderListItem = (title) => {
    return (
      <TouchableOpacity
        style={styles.listText}
        onPress={() => this.onSelect(title.item._id)}
      >
        <Text style={styles.regularFont}>{title.item.itemDesc}</Text>
      </TouchableOpacity>
    );
  }
  //listen for which item is selected
  onSelect = (id) => {
    this.setState({ selectedItemID: id })
  }

  //when delete icon is pressed, delete the item selected
  handleDelete = async () => {
    try {
      const { token, selectedItemID } = this.state;

      //make a delete request to delete note endpoint
      const response = await fetch(`http://192.168.0.162:8000/expense/${selectedItemID}`, {
        method: "DELETE",

        //need to send token along in req.headers to let server know you're already authenticated
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log("data after delete", data)
      this.setState({ expenseGroup: data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.spacing}>
            <View style={styles.iconGroup}>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExpenseItem', {})}>
                <IconFeather>{this.iconAdd}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExpenseItem', { expenseId: this.state.selectedItemID })}>
                <IconFeather>{this.iconEdit}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => {
                  //can add modal here to confirm delete
                  this.handleDelete();
                }}>
                <IconFeather>{this.iconTrash}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExportCSV')}>
                <IconMaterial>{this.iconExport}</IconMaterial>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subTitle}>List of Expense Items</Text>
              <FlatList
                data={this.state.expenseGroup}
                renderItem={this.renderListItem}
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


//title object:
// {
//   "index": 1,
//   "item": {
//     "__v": 0,
//     "_id": "5e64040ed8c4592c68589393",
//     "amount": "6",
//     "date": "2020-03-01T05:00:00.000Z",
//     "itemDesc": "katsu"
//   },
//   "separators": {
//     "highlight": [Function highlight],
//       "unhighlight": [Function unhighlight],
//         "updateProps": [Function updateProps]
//   }
// }
export default ExpenseList;
