import * as db from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing share token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { data: task, error } = await db.getPublicResearchTask(token);

  if (error || !task) {
    return new Response(JSON.stringify({ error: "Research not found or is not shared" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ task }), {
    headers: { "Content-Type": "application/json" }
  });
}
