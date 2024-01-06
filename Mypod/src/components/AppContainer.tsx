import {FC, ReactNode} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import AppNotification from './AppNotification';

interface Props {
  children: ReactNode;
}

const AppContainer: FC<Props> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNotification>{children}</AppNotification>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
