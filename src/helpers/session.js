// Dependencies
import AsyncStorage from '@react-native-community/async-storage';

const SESSION_KEY = 'eBoost';

export const setSession = (user) =>
  AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
export const removeSession = () => AsyncStorage.removeItem(SESSION_KEY);

export const getSession = async () => {
  const session = await AsyncStorage.getItem(SESSION_KEY);
  if (!session) {
    return null;
  }
  return JSON.parse(session);
};

export const updateSession = async (data) => {
  const session = await getSession();
  const newSession = {...session, ...data};
  await setSession(newSession);
  return newSession;
};

export const isLogged = async () => {
  const session = await getSession();
  return session;
};
