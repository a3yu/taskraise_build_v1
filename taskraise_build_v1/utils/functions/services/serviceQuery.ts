"use server";
import { ServiceSearch } from "@/app/(marketplace)/marketplace/types";
import { createClient } from "@/utils/supabase/server";

export async function getService(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .select(`*, organizations (*, campaigns(*))`)
    .eq("id", id)
    .returns<ServiceSearch[]>();

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data;
}

export async function searchServices(productTitle: string) {
  const supabase = createClient();
  const { data: tickets, error } = await supabase
    .rpc("search_services", {
      product_title: productTitle,
    })
    .select(
      `
      *,
      organizations (
        *,
        campaigns (*)
      )
    `
    )
    .limit(30)
    .returns<ServiceSearch[]>();

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return tickets;
}

// Function to search services nearby based on location and radius
export async function searchServicesNearby(
  productTitle: string,
  radius: string,
  latitude: string,
  longitude: string
) {
  const supabase = createClient();
  const { data: tickets, error } = await supabase
    .rpc("search_nearby_services", {
      product_title: productTitle,
      dist_meters: parseFloat(radius) * 1600,
      lat: parseFloat(longitude),
      long: parseFloat(latitude),
    })
    .select(
      `
      *,
      organizations (
        *, campaigns(*)
      )
    `
    )
    .limit(30)
    .returns<ServiceSearch[]>();

  if (error) {
    console.error("Error fetching nearby services:", error);
    return [];
  }

  return tickets;
}

// Function to search for remote services
export async function searchServicesRemote(productTitle: string) {
  const supabase = createClient();
  const { data: tickets, error } = await supabase
    .rpc("search_remote_services", {
      product_title: productTitle,
    })
    .select(
      `
      *,
      organizations (
        *, campaigns(*)
      )
    `
    )
    .limit(30)
    .returns<ServiceSearch[]>();

  if (error) {
    console.error("Error fetching remote services:", error);
    return [];
  }

  return tickets;
}

export async function getServicesSearchNormal(
  from: number,
  to: number,
  search: string
) {
  const supabase = createClient();
  const { data } = await supabase
    .rpc("search_services", {
      product_title: search,
    })
    .select(
      `
      *,
      organizations (
        *, campaigns(*)
      )
    `
    )
    .range(from, to)
    .returns<ServiceSearch[]>();

  return data;
}

export async function getServicesSearchNearby(
  from: number,
  to: number,
  search: string,
  radius: string,
  lat: string,
  long: string
) {
  const supabase = createClient();
  const { data } = await supabase
    .rpc("search_nearby_services", {
      product_title: search,
      dist_meters: parseFloat(radius) * 1600,
      lat: parseFloat(lat),
      long: parseFloat(long),
    })
    .select(
      `
      *,
      organizations (
        *, campaigns(*)
      )
    `
    )
    .range(from, to)
    .returns<ServiceSearch[]>();

  return data;
}

export async function getServicesSearchRemote(
  from: number,
  to: number,
  search: string
) {
  const supabase = createClient();
  const { data } = await supabase
    .rpc("search_remote_services", {
      product_title: search,
    })
    .select(
      `
      *,
      organizations (
        *, campaigns(*)
      )
    `
    )
    .range(from, to)
    .returns<ServiceSearch[]>();

  return data;
}
