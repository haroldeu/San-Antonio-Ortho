# San Antonio Ortho

A starting template for the San Antonio Ortho project — a codebase intended to support an orthopedics practice with patient-facing features and provider tools. Replace the example sections below with the repository's concrete details (services used, setup instructions, architecture diagrams, screenshots, etc.).

Status: WIP

Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone & install](#clone--install)
  - [Environment](#environment)
  - [Database](#database)
  - [Run](#run)
  - [Tests](#tests)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Maintainers & contacts](#maintainers--contacts)
- [Notes](#notes)

## About

San Antonio Ortho is a platform intended to manage patient scheduling, provider workflows, and clinical data for an orthopedic practice. This repository contains the code, infrastructure, and scripts for local development and deployment. (Update this paragraph with a one-line summary describing the exact scope of this repo.)

## Features (example)

- Patient site with appointment booking and patient intake forms
- Provider dashboard for schedules, charting, and notes
- Secure API for patient and appointment data
- Role-based authentication and authorization
- Basic analytics and reporting for clinic operations

## Tech stack (example)

- Frontend: React / Next.js
- Backend: Node.js / Express (or your chosen framework)
- Database: PostgreSQL (or whichever DB you use)
- Auth: OAuth2 / JWT / SSO integration
- DevOps: Docker, docker-compose for local development; CI/CD via GitHub Actions
- Testing: Jest / React Testing Library / integration tests

## Getting started

Prerequisites

- Git
- Node.js (version X.X.X) and npm or yarn, or the runtime your project uses
- Docker & docker-compose (optional but recommended for local DB/services)
- Any cloud CLIs required for deployment (e.g., AWS CLI)

Clone & install

```bash
git clone https://github.com/haroldeu/San-Anton-Ortho.git
cd San-Anton-Ortho
```

Install dependencies (example for Node.js projects)

```bash
npm install
# or
yarn install
```

Environment

- Copy the environment example to `.env.local` and fill in values there:

```bash
cp .env.example .env.local
# edit .env.local and set DB connection, API keys, and other secrets
```

- Email notifications for form submissions require these variables:

```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
MAIL_FROM=clinic@your-domain.com
MAIL_TO=you@your-domain.com
SENT_TO=certificate@your-domain.com
```

- Supabase authentication is required for admin panel access:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (server-side only)
```

Database (example)

- With docker-compose:

```bash
docker-compose up -d
# then apply migrations / seed data as needed
npm run migrate
npm run seed
```

- For Supabase:

1. Apply the certificate request schema: [supabase/migrations/20260408_create_certificate_requests.sql](supabase/migrations/20260408_create_certificate_requests.sql)
2. Apply the admin users schema: [supabase/migrations/20260408_create_admin_users.sql](supabase/migrations/20260408_create_admin_users.sql)
3. Create an admin user via the Supabase dashboard:
   - Sign up for a Supabase account at your instance
   - Navigate to Auth → Users and create a new user (or use an existing admin account)
   - Copy the user's UUID from the auth.users table
   - Go to the SQL Editor and run:
   ```sql
   INSERT INTO public.admin_users (auth_id, email, role, is_active)
   VALUES ('USER_UUID_HERE', 'admin@example.com', 'super_admin', true);
   ```
   - Replace `USER_UUID_HERE` with the actual UUID from step 3
4. To access the admin panel: Go to `/admin/certificates`, enter your email and password, and click Sign In

- The app expects:
  - A `certificate_requests` table with customer fields, `admin_fields` JSON, `pdf_url`, and `status` columns
  - An `admin_users` table linking Supabase auth users to admin roles

Run (example)

- Development:

```bash
npm run dev
# or
yarn dev
```

- Production build:

```bash
npm run build
npm start
```

Tests

```bash
npm test
# or
yarn test
```

## Deployment

Describe how to deploy (example):

- Build and push Docker images to your registry
- Apply infrastructure as code (Terraform / CloudFormation)
- Run migrations and any deployment scripts
- Example: GitHub Actions pipeline triggers on push to `main`

Project structure (example)

- /frontend — UI application
- /backend — API, business logic, and services
- /infra — infrastructure as code and deployment scripts
- /scripts — helper & maintenance scripts
- /docs — design docs, runbooks, and architecture diagrams

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feat/my-change`
3. Commit: `git commit -m "Add feature"`
4. Push to your fork and open a pull request

Guidelines:

- Follow code style and linters
- Add tests for new behavior
- Use issues to discuss larger changes before implementation

## License

Choose and add a LICENSE file (for example MIT). If you don't want to publish a license yet, state that the project is currently unlicensed.

## Maintainers & contacts

- Owner: @haroldeu
- For support or questions: open an issue or contact the maintainers listed in the repository

## Notes

- Replace placeholder sections with actual project specifics (framework versions, commands, CI config).
- Add badges, screenshots, and links to live demos or design docs where helpful.
