import { getSql } from './db';

// Data function to insert a new bar price
export const insertBarPrice = async (barPriceData: any) => {
  const {
    bar_name,
    location,
    serving_size,
    price,
    happy_hour,
    happy_hour_day,
    happy_hour_start,
    happy_hour_end,
  } = barPriceData;

  const sql = await getSql();

  // Insert the bar price into the database
  const result = await sql`
    INSERT INTO bar_prices (
      bar_name, location, serving_size, price, happy_hour, happy_hour_day, happy_hour_start, happy_hour_end
    ) VALUES (
      ${bar_name}, ${location}, ${serving_size}, ${price}, ${
    happy_hour || false
  }, ${happy_hour_day || null}, ${happy_hour_start || null}, ${
    happy_hour_end || null
  }
    ) RETURNING *;
  `;

  // Return the newly created record
  return result[0];
};