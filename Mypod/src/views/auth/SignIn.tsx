import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import {FormikHelpers} from 'formik';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';
import {updateLoggedInState, updateProfile} from 'src/store/auth';
import {useDispatch} from 'react-redux';
import {Keys, saveToAsyncStorage} from '@utils/asyncStorage';

const signInSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing.')
    .email('Invalid email.')
    .required('Email is required.'),
  password: yup
    .string()
    .trim('Password is missing')
    .min(8, 'Password is too short')
    .required('Password is required.'),
});

interface Props {}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/sign-in', {
        ...values,
      });

      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);

      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signInSchema}>
      <AuthFormContainer
        header="Welcome back!"
        subHeader="Let's get it started.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="ryu@ryu.com"
            label="Email"
            containerStyle={styles.marginBottom}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthInputField
            name="password"
            placeholder="*******"
            label="Password"
            containerStyle={styles.marginBottom}
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />

          <SubmitBtn title="Sign in" />
          <View style={styles.linkContainer}>
            <AppLink
              title="Forgot your password?"
              onPress={() => {
                navigation.navigate('LostPassword');
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

export default SignIn;
