import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '172.20.10.2' })
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
