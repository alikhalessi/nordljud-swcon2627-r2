# G02 schema recovery review

No schema preparation, migration, reset, rollback, provider/database command or real schema failure occurred. The schema recovery path is NOT EXERCISED. No destructive operation was injected to manufacture evidence.

Any future authorized preparation failure must stop automatic changes, preserve data/logs and report a concrete recovery plan. A normal failed local transaction abort is distinct from destructive existing-data recovery, which requires separate approval. Native Guest corrupt/newer-schema tests preserve isolated records and are not Supabase recovery evidence.
