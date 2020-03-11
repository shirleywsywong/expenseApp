import React, {Component} from 'react';
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

class ExpenseList extends Component {
  constructor({navigation}) {
    super();
    this.state = {
      expenseGroup: [],
    };
  }

  DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      isSelected: true,
      date: 'Feb 1, 2019',
      name: 'Lunch',
      amount: 15,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      isSelected: false,
      date: 'Feb 7, 2019',
      name: 'Go transit',
      amount: 15,
    },
  ];

  iconAdd = (<IconFeather name="plus-square" size={50} color="#109" />);
  iconEdit = (<IconFeather name="edit" size={45} color="#109" />);
  iconTrash = (<IconFeather name="trash-2" size={45} color="#109" />);
  iconExport = (<IconMaterial name="export" size={50} color="#109" />);

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
            <Text>Add an expense item</Text>
            <View style={styles.checkboxGroup}>
              <Switch style={styles.switch} />
              <Text style={styles.checkBoxLabel}>Expense Item</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  spacing: {
    margin: 10,
  },
  switch: {
    borderRadius: 40,
    borderWidth: 50,
    borderColor: '#d6d7da',
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  iconGroup: {
    margin: 20,
    flexDirection: 'row',
    padding: 10,
  },
  checkboxLabel: {
    padding: 5,
  },
  iconAddItem: {
    height: 50,
    width: 50,
  },
});

export default ExpenseList;
