import postgres from 'postgres';
import 'dotenv/config';

// Load environment variables from .env in non-production environments

// Function to create a PostgreSQL connection using the DATABASE_CONNECT environment variable
const createSqlConnection = () => {
  if (!process.env.DATABASE_CONNECT) {
    console.error('Error: DATABASE_CONNECT is not set in the environment');
    throw new Error('DATABASE_CONNECT is not set in the environment');
  }

  console.log('Creating PostgreSQL connection...');
  return postgres(process.env.DATABASE_CONNECT, {
    ssl: {
      rejectUnauthorized: false, // Disable strict SSL to connect to Railway's PostgreSQL
    },
  });
};

let sqlPromise: ReturnType<typeof createSqlConnection> | null = null;

export const getSql = async () => {
  if (!sqlPromise) {
    sqlPromise = createSqlConnection();
  }
  return sqlPromise;
};
