import * as argon2 from 'argon2';

export const generateFromPassword = async (password: string) => {
  const hash = await argon2.hash(password);

  return hash;
};

export const comparePasswordAndHash = async (
  encodedHash: string,
  password: string,
) => {
  try {
    return await argon2.verify(encodedHash, password);
  } catch (e) {
    return false;
  }
};
