create table "github_stats" (
    "id" integer not null,
    "commits" integer not null,
    "additions" integer not null,
    "deletions" integer not null,
    "repos" integer not null,
    "measured_at" timestamp not null
);
alter table if exists github_stats enable row level security;