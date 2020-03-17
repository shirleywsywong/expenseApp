import AsyncStorage from '@react-native-community/async-storage';
// On iOS, `AsyncStorage` is backed by native code that stores small values in a serialized dictionary and larger values in separate files.
// On Android, `AsyncStorage` will use either[RocksDB](http://rocksdb.org/) or SQLite based on what is available.

export async function storeToken(token) {
  try {
    await AsyncStorage.setItem('JWT_TOKEN', token)
  } catch (e) {
    console.error(e)
  }
}

export async function getToken() {
  try {
    const value = await AsyncStorage.getItem('JWT_TOKEN')
    return value
  } catch (e) {
    console.error(e)
  }
}