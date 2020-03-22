import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
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
      error: "",
      selectedItemID: "",
      editDisabled: true,
      editIcon: this.iconEditDisabled,
      trashDisabled: true,
      trashIcon: this.iconTrashDisabled
    };
  }

  iconAdd = (<IconFeather name="plus-square" size={50} color="#109" />);
  iconEditEnabled = (<IconFeather name="edit" size={45} color="#109" />);
  iconEditDisabled = (<IconFeather name="edit" size={45} color="#BBB" />);
  iconTrashEnabled = (<IconFeather name="trash-2" size={45} color="#109" />);
  iconTrashDisabled = (<IconFeather name="trash-2" size={45} color="#BBB" />);
  iconExport = (<IconMaterial name="export" size={50} color="#BBB" />);

  componentDidMount() {
    //if we move to another screen and come back to it, run these
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      //set all items in the state's expense array to be un-selected, then put it back in state
      currentExpenseGroup = this.state.expenseGroup
      currentExpenseGroup.forEach(element => {
        element["isSelected"] = false
      })
      this.setState({
        expenseGroup: currentExpenseGroup,
      })
      //since nothing is selected, cannot interact with edit and delete icons
      this.setIconInteractive(false)
      //get the latest copy of expense items from database
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
      this.setState({ error: err.message })
    }
  }

  //render items from database, and make them into links
  renderListItem = (title) => {
    //default styles when item isn't selected
    let backgroundStyle = styles.listText
    let textStyle = styles.regularFont

    //if item is selected, change the styles
    if (title.item.isSelected) {
      backgroundStyle = styles.listTextSelected
      textStyle = styles.highlightedFont
    }

    return (
      <TouchableOpacity
        style={backgroundStyle}
        onPress={() => this.onSelect(title.item._id, title.index)}>
        <View style={styles.expenseItem}>
          <Text style={textStyle}>{title.item.itemDesc}</Text>
          <Text style={textStyle}>${title.item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  //listen for which item is selected
  onSelect = (id, index) => {
    //every time an item is pressed, can only have 1 item selected, everything else is un-selected
    currentExpenseGroup = this.state.expenseGroup
    currentExpenseGroup.forEach(element => {
      element["isSelected"] = false
    })
    currentExpenseGroup[index]["isSelected"] = true
    this.setState({
      expenseGroup: currentExpenseGroup,
      selectedItemID: id
    })

    //if an item is selected, allow icons to be interactive again
    if (id) this.setIconInteractive(true)
  }

  //update the edit and delete icons
  setIconInteractive = (shouldBeInterative) => {
    if (shouldBeInterative) {
      this.setState({
        editIcon: this.iconEditEnabled,
        editDisabled: false,
        trashIcon: this.iconTrashEnabled,
        trashDisabled: false
      })
    } else {
      this.setState({
        editIcon: this.iconEditDisabled,
        editDisabled: true,
        trashIcon: this.iconTrashDisabled,
        trashDisabled: true
      })
    }
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
      this.setState({ expenseGroup: data })

      //once action is done, turn all icons off
      this.setIconInteractive(false)
    } catch (err) {
      console.log(err)
      this.setState({ error: err.message })
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View style={styles.iconGroup}>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExpenseItem', {})}>
                <IconFeather>{this.iconAdd}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => {
                  this.props.navigation.navigate('ExpenseItem', { expenseId: this.state.selectedItemID })
                }}
                disabled={this.state.editDisabled}
              >
                <IconFeather>{this.state.editIcon}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => {
                  //can add modal here to confirm delete
                  this.handleDelete();
                }}
                disabled={this.state.trashDisabled}
              >
                <IconFeather>{this.state.trashIcon}</IconFeather>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExportCSV')}>
                <IconMaterial>{this.iconExport}</IconMaterial>
              </TouchableOpacity> */}
            </View>
            <View style={styles.spacing}>
              <Text style={styles.subTitle}>
                {this.state.expenseGroup.length < 1
                  ? "No expenses yet. Add an item!"
                  : ""}
              </Text>
              {this.state.error
                ? <Text style={styles.error}>{this.state.error}</Text>
                : null}
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
