import { NextRequest } from "next/server";
import db from "@/db";
import { advocates } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams;
  let limit = 20;
  if (search.has("count")) {
    limit = Number(search.get("count"));
    if (Number.isNaN(limit)) {
      limit = 20;
    }
  }

  let where: any = true;
  if (search.has("q")) {
    const q = "%" + search.get("q") + "%";
    where = or(
      ilike(advocates.firstName, q),
      ilike(advocates.lastName, q),
      ilike(advocates.city, q),
      ilike(advocates.degree, q),
      ilike(sql`(${advocates.specialties})::text`, q),
      ilike(sql`(${advocates.yearsOfExperience})::text`, q),
    );
  }

  const data = await db.select().from(advocates).where(where).limit(limit);

  return Response.json({ data, count: data.length });
}
