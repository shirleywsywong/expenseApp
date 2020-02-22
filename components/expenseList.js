import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Image,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

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

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.spacing}>
            <View style={styles.spacing}>
              <TouchableOpacity
                onPress={this.props.navigation.navigate('ExpenseItem')}>
                {/* {iconAdd} */}
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.spacing}>
              <Button
                title="Edit item"
                onPress={() => this.props.navigation.navigate('ExpenseItem')}
              />
            </View>
            <View style={styles.spacing}>
              <Button
                title="Delete item"
                onPress={() => {
                  alert('Are you sure?');
                }}
              />
            </View>
            <View style={styles.spacing}>
              <Button
                title="Export selected"
                onPress={() => this.props.navigation.navigate('ExportCSV')}
              />
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
    margin: 20,
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  checkboxGroup: {
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
