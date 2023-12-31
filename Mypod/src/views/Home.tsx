import {FC} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'src/store/notification';

interface Props {}

const Home: FC<Props> = props => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="test"
        onPress={() => {
          dispatch(
            updateNotification({message: 'Just for test', type: 'success'}),
          );
        }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
