/**
 * Server-side helper to fetch completed research from Valyu DeepResearch API
 */

const DEEPRESEARCH_API_URL = 'https://api.valyu.ai/v1/deepresearch';
const DEEPRESEARCH_API_KEY = process.env.VALYU_API_KEY;

export interface ResearchContent {
  output?: string;
  messages?: any[];
  sources?: any[];
  status: string;
}

/**
 * Fetch completed research content from Valyu API
 * Returns null if research is not completed or fails
 */
export async function fetchCompletedResearch(taskId: string): Promise<ResearchContent | null> {
  if (!DEEPRESEARCH_API_KEY) {
    console.error('[fetch-research] Missing VALYU_API_KEY');
    return null;
  }

  try {
    console.log('[fetch-research] Fetching research for task:', taskId);
    const response = await fetch(
      `${DEEPRESEARCH_API_URL}/tasks/${taskId}/status`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': DEEPRESEARCH_API_KEY,
        },
        // Don't cache this during development
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`[fetch-research] API returned ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log('[fetch-research] Research status:', data.status);
    console.log('[fetch-research] Has output:', !!data.output);

    // Only return if research is completed
    if (data.status !== 'completed') {
      console.log('[fetch-research] Research not completed, status:', data.status);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[fetch-research] Error fetching research:', error);
    return null;
  }
}
