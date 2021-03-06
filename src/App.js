import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Login from './components/login';
import SignUp from './components/signUp';
import ExpenseList from './components/expenseList';
import ExpenseItem from './components/expenseItem';
import ExportCSV from './components/exportCSV';

console.disableYellowBox = true;

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome!"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Welcome!" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ExpenseList" component={ExpenseList} />
        <Stack.Screen name="ExpenseItem" component={ExpenseItem} />
        <Stack.Screen name="ExportCSV" component={ExportCSV} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
