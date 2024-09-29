#!/bin/bash
curl --request GET --url "${SUPABASE_PATH}" --header "apikey: ${SUPABASE_ANON_PUBLIC}"
