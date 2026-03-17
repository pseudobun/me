create extension if not exists "pg_net" with schema "extensions";

drop function if exists "public"."rls_auto_enable"();


  create table "public"."github_stats" (
    "id" integer not null,
    "commits" integer not null,
    "additions" integer not null,
    "deletions" integer not null,
    "repos" integer not null,
    "measured_at" timestamp without time zone not null
      );


grant delete on table "public"."github_stats" to "anon";

grant insert on table "public"."github_stats" to "anon";

grant references on table "public"."github_stats" to "anon";

grant select on table "public"."github_stats" to "anon";

grant trigger on table "public"."github_stats" to "anon";

grant truncate on table "public"."github_stats" to "anon";

grant update on table "public"."github_stats" to "anon";

grant delete on table "public"."github_stats" to "authenticated";

grant insert on table "public"."github_stats" to "authenticated";

grant references on table "public"."github_stats" to "authenticated";

grant select on table "public"."github_stats" to "authenticated";

grant trigger on table "public"."github_stats" to "authenticated";

grant truncate on table "public"."github_stats" to "authenticated";

grant update on table "public"."github_stats" to "authenticated";

grant delete on table "public"."github_stats" to "service_role";

grant insert on table "public"."github_stats" to "service_role";

grant references on table "public"."github_stats" to "service_role";

grant select on table "public"."github_stats" to "service_role";

grant trigger on table "public"."github_stats" to "service_role";

grant truncate on table "public"."github_stats" to "service_role";

grant update on table "public"."github_stats" to "service_role";


