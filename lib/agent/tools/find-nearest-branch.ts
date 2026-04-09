import { tool } from "ai";
import { z } from "zod";
import { branches } from "@/lib/data";
import { normalize } from "@/lib/utils/text";

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default tool({
  description:
    "Tìm chi nhánh Vinmec gần nhất dựa trên vị trí (lat/lng) hoặc tên thành phố.",
  inputSchema: z.object({
    city: z.string().optional().describe("Tên thành phố hoặc khu vực (ví dụ: 'Hà Nội', 'TP.HCM')"),
    lat: z.number().optional().describe("Vĩ độ của vị trí người dùng"),
    lng: z.number().optional().describe("Kinh độ của vị trí người dùng"),
  }),
  execute: async ({ city, lat, lng }) => {
    if (lat !== undefined && lng !== undefined) {
      const withDistance = branches.map((b) => ({
        id: b.id,
        name: b.name,
        address: b.address,
        city: b.city,
        phone: b.phone,
        distanceKm: Math.round(haversineKm(lat, lng, b.lat, b.lng) * 10) / 10,
      }));
      return withDistance.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);
    }

    if (city) {
      const keyword = normalize(city);
      const matches = branches.filter((b) => normalize(b.city).includes(keyword));
      if (matches.length > 0) {
        return matches.map((b) => ({
          id: b.id,
          name: b.name,
          address: b.address,
          city: b.city,
          phone: b.phone,
        }));
      }
    }

    // Return all branches
    return branches.map((b) => ({
      id: b.id,
      name: b.name,
      address: b.address,
      city: b.city,
      phone: b.phone,
    }));
  },
});
