import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from 'date-fns';


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

export const getCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flag,flags");
    const data = await res.json();
    return data;
  } catch {
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