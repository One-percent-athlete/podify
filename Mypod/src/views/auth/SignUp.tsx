import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import colors from '@utils/colors';
import {FormikHelpers} from 'formik';
import {FC, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import CircleUI from '@ui/CircleUI';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';

const signupSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing.')
    .min(3, 'Name is too short.')
    .required('Name is required.'),
  email: yup
    .string()
    .trim('Email is missing.')
    .email('Invalid email.')
    .required('Email is required.'),
  password: yup
    .string()
    .trim('Password is missing')
    .required('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});

interface Props {}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const togglePasswordView = () => {
    setSecureEntry(!secureEntry);
  };

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });
      navigation.navigate('Verification', {userInfo: data.user});
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}>
      <AuthFormContainer header="Welcome!" subHeader="Let's get it started.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Ryu"
            label="Name"
            containerStyle={styles.marginBottom}
          />
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

          <SubmitBtn title="Sign up" />
          <View style={styles.linkContainer}>
            <AppLink
              title="Forgot your password? "
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign in"
              onPress={() => {
                navigation.navigate('SignIn');
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

export default SignUp;
