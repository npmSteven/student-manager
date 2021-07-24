const USER_KEY = 'user';

export const getUser = (): any | null => {
  const user: any = localStorage.getItem(USER_KEY);
  const userParsed = JSON.parse(user);
  return userParsed;
};

export const setUser = (user: any): void =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));
