# Architecture

## Current Decisions

### Shared Database Package

Status: accepted informally

Decision:
`packages/db` owns Drizzle schema and database adapters.

Reason:
The same backend should run with PostgreSQL in self-hosted mode and PGlite in Electron mode.

Consequences:

- `packages/db` must not depend on NestJS.
- Runtime config is owned by apps.
- Feature services must not create database connections directly.

Future ADR:
Extract when Postgres wiring is used by CRUD and PGlite support is introduced.
