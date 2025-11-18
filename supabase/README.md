# Supabase Setup for History Research App

This directory contains all the SQL files needed to set up your Supabase database for the History research application.

## Quick Setup

Run these files in order in your Supabase SQL Editor:

1. **schema.sql** - Creates all tables and indexes
2. **triggers.sql** - Sets up automatic user sync triggers  
3. **policies.sql** - Enables Row Level Security policies

## Files Overview

### 1. schema.sql
Creates the following tables:
- `users` - User profiles and subscription info
- `research_tasks` - Research task metadata (location, status, deepresearch_id)
- `user_rate_limits` - Usage tracking and rate limits

**Note**: Full research data is fetched from the DeepResearch API on demand. Only metadata is stored in Supabase to avoid duplication.

### 2. triggers.sql
Sets up automatic triggers for:
- Creating user records when auth.users is created
- Updating user records when auth.users is updated
- Deleting user records when auth.users is deleted

This keeps `auth.users` and `public.users` in sync automatically.

### 3. policies.sql
Enables Row Level Security (RLS) on all tables with policies for:
- Users can only view/edit their own data
- Anonymous users can access research tasks via `anonymous_id`
- Service role has full access for API operations

## Important Notes

### Service Role Usage
The application uses the **Service Role** key for:
- Creating research tasks when users click on the globe
- Updating task status (queued → running → completed/failed)
- Fetching research task history for authenticated users

Make sure your `SUPABASE_SERVICE_ROLE_KEY` is set in your environment variables.

### Anonymous Users
Anonymous (non-authenticated) users can:
- Create research tasks (stored with `anonymous_id`)
- View their own research tasks (matched by `anonymous_id`)
- Subject to rate limits (5 queries per day)
