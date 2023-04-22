import db from '../db/investWithFriendsDb';

export const userExists = async (email: string): Promise<boolean> => {
  const query = 'SELECT * FROM users WHERE email = $1;';
  const { rows: userEntry } = await db.query(query, [email]);

  return userEntry.length !== 0;
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User> => {
  const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) 
    RETURNING user_id AS id, first_name AS "firstName", last_name AS "lastName", email
  `;
  const params = [firstName, lastName, email, password];
  const data = await db.query(query, params);

  const createdUser = data.rows[0] as User;

  return createdUser;
};

export const getExistingUser = async (
  email: string
): Promise<User & { password: string }> => {
  const query = `
    SELECT user_id AS id, first_name AS "firstName", last_name AS "lastName", email, password 
    FROM users WHERE email=$1
  `;
  const params = [email];

  const data = await db.query(query, params);
  const existingUser = data.rows[0] as User & { password: string };

  return existingUser;
};
