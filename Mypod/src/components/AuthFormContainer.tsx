import CircleUI from '@ui/CircleUI';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  children: ReactNode;
  header?: string;
  subHeader?: string;
}

const AuthFormContainer: FC<Props> = ({children, header, subHeader}) => {
  return (
    <View style={styles.container}>
      <CircleUI position="top-left" size={200} />
      <CircleUI position="top-right" size={100} />
      <CircleUI position="bottom-left" size={100} />
      <CircleUI position="bottom-right" size={200} />

      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.subHeader}>{subHeader}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  header: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeader: {color: colors.CONTRAST, fontSize: 16},
  headerContainer: {
    marginBottom: 20,
  },
});

export default AuthFormContainer;
