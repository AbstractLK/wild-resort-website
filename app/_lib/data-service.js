import { supabase } from "./supabase";
import { notFound } from "next/navigation";

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
