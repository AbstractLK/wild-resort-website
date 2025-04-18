import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from 'date-fns';

const countryApiKey = process.env.COUNTRY_API_KEY;


// GET
export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    // console.error(error);
    notFound();
  }

  return data;
}

export const getCabins = async () => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

    // For testing
//   await new Promise((res) => setTimeout(res, 1000));
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
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
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Countries could not be fetched");
  }
}

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}


// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here. We handle the possibility of no guest in the sign in callback
  return data;
}


// CREATE
export async function createGuest(newGuest) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}


/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    // .select()
    // .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
}


export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from('bookings')
    // We also need data on the cabins as well.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}


export async function getBooking(bookingId) {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

// DELETE ---------------------------------

export async function deleteBooking(id) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
}
