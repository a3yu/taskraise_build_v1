import { Tables } from "@/types/supabase";

export function formatNumberToId(number: number) {
  let str = number.toString().padStart(6, "0");
  return `${str.slice(0, 3)}-${str.slice(3)}`;
}

export function formatToDollar(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Add this line to cap the return to two letters
}

export function getActive(services: Tables<"services">[]) {
  return services.filter((service) => service.inactive !== true);
}
