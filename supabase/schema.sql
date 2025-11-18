-- History Research Database Schema
-- Run this in Supabase SQL Editor to create all required tables

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  avatar_url text,
  subscription_tier text DEFAULT 'free'::text
    CHECK (subscription_tier = ANY (ARRAY['free'::text, 'pay_per_use'::text, 'unlimited'::text])),
  polar_customer_id text UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  subscription_id text,
  subscription_status text DEFAULT 'inactive'::text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Research tasks (stores minimal metadata, full data fetched from DeepResearch API)
CREATE TABLE public.research_tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  deepresearch_id text NOT NULL UNIQUE, -- The DeepResearch API task ID
  location_name text NOT NULL,
  location_lat double precision NOT NULL,
  location_lng double precision NOT NULL,
  status text NOT NULL DEFAULT 'queued'::text
    CHECK (status = ANY (ARRAY['queued'::text, 'running'::text, 'completed'::text, 'failed'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  anonymous_id text, -- For anonymous users
  CONSTRAINT research_tasks_pkey PRIMARY KEY (id),
  CONSTRAINT research_tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Rate limits
CREATE TABLE public.user_rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  usage_count integer NOT NULL DEFAULT 0,
  reset_date text NOT NULL,
  last_request_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_rate_limits_pkey PRIMARY KEY (id),
  CONSTRAINT user_rate_limits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_research_tasks_user_id ON public.research_tasks(user_id);
CREATE INDEX idx_research_tasks_created_at ON public.research_tasks(created_at DESC);
CREATE INDEX idx_research_tasks_deepresearch_id ON public.research_tasks(deepresearch_id);
CREATE INDEX idx_research_tasks_status ON public.research_tasks(status);
