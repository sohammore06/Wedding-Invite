import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().min(2),
  guests: z.number().min(1).max(10),
  attending: z.enum(["yes", "no", "maybe"]),
  events: z.array(z.string()).optional(),
  message: z.string().max(500).optional(),
});

const RSVP_FILE = path.join(process.cwd(), "data", "rsvp-submissions.json");

async function ensureDataFile() {
  const dir = path.dirname(RSVP_FILE);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, "[]", "utf-8");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const submission = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    };

    /*
     * TODO: Replace local JSON storage with your preferred service:
     *
     * Google Sheets:
     *   - Use googleapis package with a service account
     *   - Append row to spreadsheet via sheets.spreadsheets.values.append()
     *
     * Airtable:
     *   - POST to https://api.airtable.com/v0/{baseId}/{tableName}
     *   - Headers: Authorization: Bearer {AIRTABLE_API_KEY}
     *
     * Email (Resend):
     *   - npm install resend
     *   - await resend.emails.send({ from, to, subject, html })
     *
     * Example:
     *   await appendToGoogleSheet(submission);
     *   return NextResponse.json({ success: true });
     */

    await ensureDataFile();
    const existing = JSON.parse(await fs.readFile(RSVP_FILE, "utf-8"));
    existing.push(submission);
    await fs.writeFile(RSVP_FILE, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  /*
   * TODO: Remove or protect this endpoint in production.
   * For local development only — returns all submissions.
   */
  try {
    await ensureDataFile();
    const data = await fs.readFile(RSVP_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}
