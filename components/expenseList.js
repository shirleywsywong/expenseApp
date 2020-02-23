import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

class ExpenseList extends Component {
  constructor({navigation}) {
    super();
    this.state = {
      isChecked: false,
    };
  }

  radio_props = [
    {label: 'param1', value: 0, amount: 45.7},
    {label: 'param2', value: 1, amount: 18.67},
  ];

  iconAdd = (<IconFeather name="plus-square" size={50} color="#109" />);
  iconEdit = (<IconFeather name="edit" size={45} color="#109" />);
  iconTrash = (<IconFeather name="trash-2" size={45} color="#109" />);
  iconExport = (<IconMaterial name="export" size={50} color="#109" />);

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
              <RadioForm
                radio_props={this.radio_props}
                initial={0}
                onPress={value => {
                  this.setState({value: value});
                }}
              />
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
