import AsyncStorage from '@react-native-community/async-storage';

storeData = async () => {
  try {
    await AsyncStorage.setItem('@storage_Key', 'stored value')
  } catch (e) {
    // saving error
  }
}