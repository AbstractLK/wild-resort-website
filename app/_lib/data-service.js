// import { supabase } from "./supabase";
import pool from "./pgClient";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from 'date-fns';

const countryApiKey = process.env.COUNTRY_API_KEY;


// Get a single cabin by ID
export async function getCabin(id) {
  try {
    const { rows } = await pool.query('SELECT * FROM cabins WHERE id = $1', [id]);
    
    // For testing
    // await new Promise((res) => setTimeout(res, 1000));
    
    if (rows.length === 0) {
      notFound();
    }
    
    return rows[0];
  } catch (error) {
    console.error(error);
    notFound();
  }
}

// Get all cabins
export const getCabins = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM cabins ORDER BY name');
    
    // For testing
    // await new Promise((res) => setTimeout(res, 1000));
    
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
};

// export const getCountries = async () => {
//   try {
//     const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
//     // const res = await fetch('https://restcountries.com/v2/all?fields=name,flag');
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     throw new Error("Countries could not be fetched");
//   }
// }

export const getCountries = async () => {
  try {
    const res = await fetch("https://restfulcountries.com/api/v1/countries", {
      headers: {
        'Authorization': `Bearer ${countryApiKey}`
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } 
  catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Countries could not be fetched");
  }
}

export async function getSettings() {
  try {
    const { rows } = await pool.query('SELECT * FROM settings LIMIT 1');
    
    if (rows.length === 0) {
      throw new Error('Settings not found');
    }
    
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  try {
    // Getting all bookings - equivalent to Supabase's .or() condition
    const { rows } = await pool.query(
      `SELECT * FROM bookings 
       WHERE "cabinId" = $1 
       AND ("startDate" >= $2 OR status = 'checked-in')`,
      [cabinId, today]
    );

    // Converting to actual dates to be displayed in the date picker
    const bookedDates = rows
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();

    return bookedDates;
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
}


// Guests are uniquely identified by their email address
export async function getGuest(email) {
  try {
    const { rows } = await pool.query('SELECT * FROM guests WHERE email = $1', [email]);
    
    // Return null if no guest found (similar to Supabase behavior)
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// CREATE
export async function createGuest(newGuest) {
  try {
    const keys = Object.keys(newGuest);
    const values = Object.values(newGuest);
    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO guests (${columns}) VALUES (${placeholders}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }
}

export async function createBooking(newBooking) {
  try {
    const keys = Object.keys(newBooking);
    const values = Object.values(newBooking);
    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO bookings (${columns}) VALUES (${placeholders}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
}


// UPDATE
export async function updateGuest(id, updatedFields) {
  try {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');

    const query = `UPDATE guests SET ${setClause} WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id, ...values]);
    
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
}

export async function updateBooking(id, updatedFields) {
  try {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');

    const query = `UPDATE bookings SET ${setClause} WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id, ...values]);
    
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
}


export async function getBookings(guestId) {
  try {
    // Using JOIN to get cabin data similar to Supabase's select with relation
    const { rows } = await pool.query(
      `SELECT 
        b.id, 
        b.created_at, 
        b."startDate", 
        b."endDate", 
        b."numNights", 
        b."numGuests", 
        b."totalPrice", 
        b."guestId", 
        b."cabinId",
        c.name as cabin_name,
        c.image as cabin_image
      FROM bookings b
      JOIN cabins c ON b."cabinId" = c.id
      WHERE b."guestId" = $1
      ORDER BY b."startDate"`,
      [guestId]
    );

    // Transform the result to match the expected structure
    const transformedRows = rows.map(row => ({
      id: row.id,
      created_at: row.created_at,
      startDate: row.startDate,
      endDate: row.endDate,
      numNights: row.numNights,
      numGuests: row.numGuests,
      totalPrice: row.totalPrice,
      guestId: row.guestId,
      cabinId: row.cabinId,
      cabins: {
        name: row.cabin_name,
        image: row.cabin_image
      }
    }));

    return transformedRows;
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
}


export async function getBooking(bookingId) {
  try {
    const { rows } = await pool.query('SELECT * FROM bookings WHERE id = $1', [bookingId]);
    
    if (rows.length === 0) {
      throw new Error('Booking not found');
    }
    
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }
}

// DELETE
export async function deleteBooking(id) {
  try {
    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
}
