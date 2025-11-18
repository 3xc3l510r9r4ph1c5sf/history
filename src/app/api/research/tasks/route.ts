import * as db from '@/lib/db';

export async function GET(req: Request) {
  const { data: { user } } = await db.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { data: tasks, error } = await db.getResearchTasks(user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Normalize field names (SQLite uses camelCase, Supabase uses snake_case)
  const normalizedTasks = tasks?.map((t: any) => ({
    id: t.id,
    deepresearchId: t.deepresearch_id || t.deepresearchId,
    locationName: t.location_name || t.locationName,
    locationLat: t.location_lat || t.locationLat,
    locationLng: t.location_lng || t.locationLng,
    status: t.status,
    createdAt: t.created_at || t.createdAt,
    updatedAt: t.updated_at || t.updatedAt,
    completedAt: t.completed_at || t.completedAt,
  })) || [];

  return new Response(JSON.stringify({ tasks: normalizedTasks }), {
    headers: { "Content-Type": "application/json" }
  });
}
