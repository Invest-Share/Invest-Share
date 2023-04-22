import type { QueryResultRow } from 'pg';
import db from '../db/investWithFriendsDb';

export const addRelationship = async (
  user_id: number,
  first_name: string,
  last_name: string
): Promise<QueryResultRow[]> => {
  // query that pulls follow id
  const query =
    'SELECT user_id FROM users WHERE first_name=$1 and last_name=$2';
  const params = [first_name, last_name];
  const follow_id: number = (await db.query(query, params)).rows[0].user_id;

  // query that pulls follow id
  const query2 = `
    INSERT INTO relationships (user_id, follow_id) 
    SELECT $1, $2 
    WHERE NOT EXISTS (
      SELECT relationship_id 
      FROM relationships 
      WHERE user_id = $1 AND follow_id = $2
    )`;
  const params2 = [user_id, follow_id];
  const result = await db.query(query2, params2);
  return result.rows;
};

export const getRelationships = async (
  id: string | number
): Promise<QueryResultRow[]> => {
  const query =
    'SELECT u.user_id, u.first_name, u.last_name, u.email FROM relationships r LEFT JOIN users u ON r.follow_id=u.user_id WHERE r.user_id=$1';
  const params = [id];

  const relationships = await db.query(query, params);
  return relationships.rows;
};
