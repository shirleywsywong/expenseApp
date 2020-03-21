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
      expenseGroup: [],
    };
  }

  iconAdd = (<IconFeather name="plus-square" size={50} color="#109" />);
  iconEdit = (<IconFeather name="edit" size={45} color="#109" />);
  iconTrash = (<IconFeather name="trash-2" size={45} color="#109" />);
  iconExport = (<IconMaterial name="export" size={50} color="#109" />);

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getExpenseData()
    });
    return unsubscribe;
  }

  getExpenseData = async () => {
    try {
      const token = await getToken();
      const response = await fetch('http://192.168.0.162:8000/expense/', {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      const data = await response.json();
      console.log("expense list", data)
      this.setState({ expenseGroup: data })
    } catch (err) {
      console.log(err)
    }
  }

  renderListItem = (title) => {
    console.log("render item: ", title)
    return (
      <View style={styles.listText}>
        <Text style={styles.regularFont}>{title.item.itemDesc}</Text>
      </View>
    );
  }

  toggleSelect = () => {
    //const expenseObj = {
    //  isSelected: bool,
    //  date: date,
    //  name: name,
    //  amount: amount
    //}
    //this.setState({expenseObj})
  };
  //for each item in the list, create a checkbox component where value = each.isSelect and onChange calls toggleSelect, which takes an argument of the list index
  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.spacing}>
            <View style={styles.iconGroup}>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExpenseItem')}>
                <IconFeather>{this.iconAdd}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => this.props.navigation.navigate('ExpenseItem')}>
                <IconFeather>{this.iconEdit}</IconFeather>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spacing}
                onPress={() => {
                  alert('Are you sure?');
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

// {
//   "index": 1,
//     "item": {
//     "__v": 0,
//       "_id": "5e64040ed8c4592c68589393",
//         "amount": "6",
//           "date": "2020-03-01T05:00:00.000Z",
//             "itemDesc": "katsu"
//   },
//   "separators": {
//     "highlight": [Function highlight],
//       "unhighlight": [Function unhighlight],
//         "updateProps": [Function updateProps]
//   }
// }
export default ExpenseList;
