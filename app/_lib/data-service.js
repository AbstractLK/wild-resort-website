import { pool } from "./database";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from 'date-fns';
import countriesData from "./countries.json";

const countryApiKey = process.env.COUNTRY_API_KEY;


// GET
export async function getCabin(id) {
  const [rows] = await pool.query("SELECT * FROM cabins WHERE id = ?", [id]);

  if (!rows || rows.length === 0) {
    notFound();
  }

  return rows[0];
}

export const getCabins = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM cabins ORDER BY name");
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
  return countriesData;
};

export async function getSettings() {
  try {
    const [rows] = await pool.query("SELECT * FROM settings LIMIT 1");

    if (rows.length === 0) {
      throw new Error('No settings found');
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

  try {
    // Getting all bookings
    const [rows] = await pool.query(
      `SELECT * FROM bookings 
       WHERE cabinId = ? AND (startDate >= ? OR status = 'checked-in')`,
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
    const [rows] = await pool.query("SELECT * FROM guests WHERE email = ?", [email]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    // No error here. We handle the possibility of no guest in the sign in callback
    return null;
  }
}


// CREATE
export async function createGuest(newGuest) {
  try {
    const [result] = await pool.query(
      "INSERT INTO guests (fullName, email) VALUES (?, ?)",
      [newGuest.fullName, newGuest.email]
    );
    return { id: result.insertId, ...newGuest };
  } catch (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }
}

export async function createBooking(newBooking) {
  try {
    const [result] = await pool.query(
      `INSERT INTO bookings 
       (startDate, endDate, numNights, numGuests, cabinPrice, totalPrice, 
        extrasPrice, isPaid, hasBreakfast, status, observations, guestId, cabinId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newBooking.startDate,
        newBooking.endDate,
        newBooking.numNights,
        newBooking.numGuests,
        newBooking.cabinPrice,
        newBooking.totalPrice,
        newBooking.extrasPrice,
        newBooking.isPaid,
        newBooking.hasBreakfast,
        newBooking.status,
        newBooking.observations,
        newBooking.guestId,
        newBooking.cabinId,
      ]
    );

    // Return the newly created booking
    const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [result.insertId]);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
}


/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  try {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    await pool.query(`UPDATE guests SET ${setClause} WHERE id = ?`, [...values, id]);
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
}

export async function updateBooking(id, updatedFields) {
  try {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    await pool.query(`UPDATE bookings SET ${setClause} WHERE id = ?`, [...values, id]);
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
}


export async function getBookings(guestId) {
  if (!guestId) return [];

  try {
    const [rows] = await pool.query(
      `SELECT b.id, b.created_at, b.startDate, b.endDate, b.numNights, 
              b.numGuests, b.totalPrice, b.status, b.guestId, b.cabinId,
              c.name AS cabin_name, c.image AS cabin_image
       FROM bookings b
       JOIN cabins c ON b.cabinId = c.id
       WHERE b.guestId = ?
       ORDER BY b.created_at DESC`,
      [guestId]
    );

    // Reshape rows to match the original Supabase nested format: { ...booking, cabins: { name, image } }
    return rows.map((row) => ({
      id: row.id,
      created_at: row.created_at,
      startDate: row.startDate,
      endDate: row.endDate,
      numNights: row.numNights,
      numGuests: row.numGuests,
      totalPrice: row.totalPrice,
      status: row.status,
      guestId: row.guestId,
      cabinId: row.cabinId,
      cabins: {
        name: row.cabin_name,
        image: row.cabin_image,
      },
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
}


export async function getBooking(bookingId) {
  try {
    const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [bookingId]);

    if (rows.length === 0) {
      throw new Error('Booking not found');
    }

    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }
}

// DELETE ---------------------------------

export async function deleteBooking(id) {
  try {
    await pool.query("DELETE FROM bookings WHERE id = ?", [id]);
  } catch (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
}
