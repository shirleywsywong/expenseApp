import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spacing: {
    margin: 20,
  },
  subTitle: {
    fontSize: 20,
    textAlign: "center"
  },
  listText: {
    fontSize: 20,
    margin: 5,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5
  },
  regularFont: {
    fontSize: 20
  },
  title: {
    padding: 20,
    backgroundColor: '#eee',
  },
  appName: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  fakeButton: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  error: {
    color: '#af3b40',
    fontWeight: 'bold'
  },
  switch: {
    borderRadius: 40,
    borderWidth: 50,
    borderColor: '#d6d7da',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkboxLabel: {
    padding: 5,
  },
  iconAddItem: {
    height: 50,
    width: 50,
  },
});

export default styles;