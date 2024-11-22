import { NextResponse } from 'next/server';
import { Intervenant } from '@/app/lib/definition';
import { fetchIntervenants } from '@/app/lib/data';

// Gestion des requêtes GET
export async function GET() {
  try {
    console.log("GET /api/intervenants/get triggered");
    const intervenants = await fetchIntervenants();
    console.log("Fetched intervenants:", intervenants);
    return NextResponse.json(intervenants);
  } catch (error) {
    console.error("Error in GET /api/intervenants/get:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

