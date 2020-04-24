import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {UserType} from '../../constants';

const Login = ({onAuthSuccess}) => {
  const loginLeft = React.useRef(new Animated.Value(400)).current;
  const registerLeft = React.useRef(new Animated.Value(0)).current;
  const [userType, setUserType] = React.useState(UserType.FREELANCER);
  const [data, setData] = React.useState(null);

  const goLogin = () => {
    Animated.timing(registerLeft, {
      toValue: -400,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(loginLeft, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const goRegister = () => {
    Animated.timing(registerLeft, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(loginLeft, {
      toValue: 400,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const setValue = (name) => (e) => {
    e.persist();

    setData((prev) => ({
      ...prev,
      [name]: e?.nativeEvent?.text,
    }));
  };

  const setType = (type) => () => setUserType(type);
  const onLogin = () => onAuthSuccess();
  const onRegister = () => onAuthSuccess();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.logoContainer} />
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.login,
              {
                transform: [{translateX: registerLeft}],
              },
            ]}>
            <Text style={styles.title}>Create an Account</Text>
            <View style={styles.userButtons}>
              <TouchableOpacity
                style={[
                  userType === UserType.FREELANCER
                    ? styles.button
                    : styles.buttonDisable,
                  styles.marginRight,
                ]}
                onPress={setType(UserType.FREELANCER)}>
                <Text
                  style={
                    userType === UserType.FREELANCER
                      ? styles.buttonText
                      : styles.buttonDisableText
                  }>
                  FREELANCER
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  userType === UserType.CLIENT
                    ? styles.button
                    : styles.buttonDisable,
                  styles.marginRight,
                ]}
                onPress={setType(UserType.CLIENT)}>
                <Text
                  style={
                    userType === UserType.CLIENT
                      ? styles.buttonText
                      : styles.buttonDisableText
                  }>
                  PERSON
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Full Name"
                value={data?.name}
                onChange123={setValue('name')}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Email"
                value={data?.email}
                onChange123={setValue('email')}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Password"
                value={data?.password}
                onChange123={setValue('password')}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={onRegister}>
              <Text style={styles.submitButtonText}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={goLogin}>
                <Text style={styles.link}>Log In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.register, {transform: [{translateX: loginLeft}]}]}>
            <Text style={styles.title}>Welcome back!</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Email"
                value={data?.email}
                onChange123={setValue('email')}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor="gray"
                placeholder="Password"
                value={data?.password}
                onChange123={setValue('password')}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={onLogin}>
              <Text style={styles.submitButtonText}>SIGN IN</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={goRegister}>
                <Text style={styles.link}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  logoContainer: {
    flex: 0.4,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    flex: 1,
    position: 'relative',
    borderTopRightRadius: 24,
    padding: 24,
  },
  login: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 24,
    top: 24,
  },
  register: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 24,
    top: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: 'purple',
    width: 130,
  },
  marginLeft: {
    marginLeft: 6,
  },
  marginRight: {
    marginRight: 6,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  buttonDisable: {
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: 'lightgray',
    width: 130,
  },
  buttonDisableText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  form: {
    marginVertical: 20,
  },
  textInput: {
    backgroundColor: 'lightgray',
    height: 48,
    fontSize: 18,
    color: 'black',
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  submitButton: {
    backgroundColor: 'purple',
    height: 48,
    fontSize: 18,
    color: 'black',
    marginBottom: 12,
    justifyContent: 'center',
    borderRadius: 8,
  },
  submitButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'gray',
    marginBottom: 8,
  },
  link: {
    color: 'purple',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
