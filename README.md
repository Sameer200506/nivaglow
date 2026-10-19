# NivaGlow (AI WhatsApp sales & support platform for D2C brands)

NivaGlow is a multi-tenant backend for running WhatsApp sales and support with
AI. It ingests conversations, resolves customers and orders, classifies intent,
drafts replies, manages campaigns/templates, and escalates to human agents.

## Domain modules (`src/api/src/`)

| Module | Responsibility |
| --- | --- |
| `auth` | Sign-up/login, JWT sessions, guards |
| `organization` | Tenants, members, plan/limits |
| `whatsapp` | Cloud API webhook, send, phone numbers |
| `conversation` | Threads, assignment, status |
| `message` | Inbound/outbound messages, media |
| `ai-agent` | Intent detection + reply generation |
| `customer` | Customer profiles and tags |
| `ticket` | Human handoff / support tickets |
| `campaign` | Broadcast campaigns |
| `template` | Approved WhatsApp templates |
| `integration` | Order/return/product system connectors |

## Stack

NestJS, TypeScript, Prisma, PostgreSQL, Jest, ESLint/Prettier. The repo is an
npm-workspaces monorepo (`src/api`, `src/web`); the web workspace is currently a
placeholder.

## Run locally

```bash
npm install
copy .env.example .env        # fill in DATABASE_URL, JWT secrets, WhatsApp creds
cd src/api
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run start:dev
```

```bash
npm test          # API unit tests
npm run build
```

## Environment

See the root `.env.example`. Required: `DATABASE_URL`, `JWT_SECRET`,
`JWT_REFRESH_SECRET`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`,
`WHATSAPP_VERIFY_TOKEN` and an AI provider key. `.env` files are git-ignored.

## Related

`AI WhatsApp automation` is the lighter Express prototype of the same idea; this
repository is the structured NestJS platform.
