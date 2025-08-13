// app/_lib/data-service.js
import { pool } from "./database";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from 'date-fns';

const countryApiKey = process.env.COUNTRY_API_KEY;

// GET
export async function getCabin(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM cabins WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      notFound();
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

export const getCabins = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM cabins ORDER BY name');
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  } finally {
    client.release();
  }
};

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
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Countries could not be fetched");
  }
}

export async function getSettings() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM settings LIMIT 1');
    if (result.rows.length === 0) {
      throw new Error('Settings could not be loaded');
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM bookings 
       WHERE "cabinId" = $1 
       AND ("startDate" >= $2 OR status = 'checked-in')`,
      [cabinId, today]
    );

    const bookedDates = result.rows
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();

    return bookedDates;
  } finally {
    client.release();
  }
}

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM guests WHERE email = $1', [email]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

// CREATE
export async function createGuest(newGuest) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO guests ("fullName", email) VALUES ($1, $2) RETURNING *',
      [newGuest.fullName, newGuest.email]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  } finally {
    client.release();
  }
}

export async function createBooking(newBooking) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO bookings 
       ("startDate", "endDate", "numNights", "numGuests", "cabinPrice", "extrasPrice", "totalPrice", "status", "hasBreakfast", "isPaid", "observations", "cabinId", "guestId")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        newBooking.startDate, newBooking.endDate, newBooking.numNights, 
        newBooking.numGuests, newBooking.cabinPrice, newBooking.extrasPrice, 
        newBooking.totalPrice, newBooking.status, newBooking.hasBreakfast, 
        newBooking.isPaid, newBooking.observations, newBooking.cabinId, newBooking.guestId
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  } finally {
    client.release();
  }
}

// UPDATE
export async function updateGuest(id, updatedFields) {
  const client = await pool.connect();
  try {
    const setClause = Object.keys(updatedFields)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(updatedFields)];
    
    await client.query(
      `UPDATE guests SET ${setClause} WHERE id = $1`,
      values
    );
  } catch (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  } finally {
    client.release();
  }
}

export async function updateBooking(id, updatedFields) {
  const client = await pool.connect();
  try {
    const setClause = Object.keys(updatedFields)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(updatedFields)];
    
    await client.query(
      `UPDATE bookings SET ${setClause} WHERE id = $1`,
      values
    );
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  } finally {
    client.release();
  }
}

export async function getBookings(guestId) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT b.id, b.created_at, b."startDate", b."endDate", b."numNights", 
              b."numGuests", b."totalPrice", b."guestId", b."cabinId",
              c.name, c.image
       FROM bookings b
       JOIN cabins c ON b."cabinId" = c.id
       WHERE b."guestId" = $1
       ORDER BY b."startDate"`,
      [guestId]
    );
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  } finally {
    client.release();
  }
}

export async function getBooking(bookingId) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM bookings WHERE id = $1', [bookingId]);
    if (result.rows.length === 0) {
      throw new Error('Booking could not get loaded');
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

// DELETE
export async function deleteBooking(id) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM bookings WHERE id = $1', [id]);
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  } finally {
    client.release();
  }
}
