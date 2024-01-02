import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing.')
    .email('Invalid email.')
    .required('Email is required.'),
});

interface Props {}

interface initialValue {
  email: string;
}

const initialValues = {
  email: '',
};

const handleSubmit = async (
  values: initialValue,
  actions: FormikHelpers<initialValue>,
) => {
  actions.setSubmitting(true);
  try {
    const {data} = await client.post('/auth/forget-password', {
      ...values,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  actions.setSubmitting(false);
};

const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={lostPasswordSchema}>
      <AuthFormContainer
        header="Forget Password"
        subHeader="Don't worry, we'll help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="ryu@ryu.com"
            label="Email"
            containerStyle={styles.marginBottom}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <SubmitBtn title="Send link" />
          <View style={styles.linkContainer}>
            <AppLink
              title="Sign in"
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
            <AppLink
              title="Sign up"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default LostPassword;
