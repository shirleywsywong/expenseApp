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
  CheckBox,
} from 'react-native';

class ExpenseList extends Component {
  constructor({navigation}) {
    super();
    this.state = {
      isChecked: false,
    };
  }

  toggleCheckBox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.spacing}>
            <Text>Add an expense item</Text>
            <View style={styles.checkboxGroup}>
              <CheckBox
                value={this.state.isChecked}
                onChange={() => this.toggleCheckBox()}
              />
              <Text styles={styles.checkboxLabel}>Item</Text>
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
});

export default ExpenseList;
