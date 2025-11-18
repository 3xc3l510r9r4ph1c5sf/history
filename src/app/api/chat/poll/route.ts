// Polling endpoint for long-running research tasks
// This endpoint can be called repeatedly from the client to check task status

const DEEPRESEARCH_API_URL = 'https://api.valyu.ai/v1/deepresearch';
const DEEPRESEARCH_API_KEY = process.env.VALYU_API_KEY;

export const maxDuration = 60; // Short timeout for polling endpoint

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return new Response(
        JSON.stringify({ error: 'Missing taskId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch task status from DeepResearch API
    const statusResponse = await fetch(
      `${DEEPRESEARCH_API_URL}/tasks/${taskId}/status`,
      {
        headers: {
          'X-API-Key': DEEPRESEARCH_API_KEY!,
        },
      }
    );

    if (!statusResponse.ok) {
      throw new Error('Failed to get task status');
    }

    const statusData = await statusResponse.json();

    return new Response(
      JSON.stringify(statusData),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('[Poll API] Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
