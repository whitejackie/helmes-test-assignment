# Helmes Test Assignment

Small full-stack application that lets a user enter a name, select one or more sectors from a hierarchical list, agree to the terms, and save or update the data.

## Tech stack

| Layer    | Choice              | Why                                                       |
| -------- | ------------------- | --------------------------------------------------------- |
| Frontend | Angular             | Required by the assignment                                |
| Backend  | NestJS + TypeScript | Clean structure, easy to extend, good fit for a small API |
| Database | SQLite              | Zero configuration, single file                           |

## Installation

Install dependencies for both apps:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Running the application

### 1) Start the backend

```bash
cd backend
npm run start:dev
```

The NestJS API runs on:

- http://localhost:3000

The backend initializes the SQLite database automatically on startup and seeds the sectors table if it is empty.

### 2) Start the frontend

In a separate terminal:

```bash
cd frontend
npm start
```

The Angular app runs on:

- http://localhost:4200

## API

### GET /sectors

Returns the available sector hierarchy.

Example response:

```json
[
  {
    "id": 1,
    "name": "Manufacturing",
    "parentId": null,
    "sortOrder": 1
  }
]
```

### POST /users

Creates a new user.

Request body:

```json
{
  "name": "John Doe",
  "sectors": [1, 6, 342],
  "agree": true
}
```

Validation rules:

- name is required
- at least one sector must be selected
- agree must be true

### PUT /users/:id

Updates an existing user record and replaces the sector relation list.

## Database

The backend uses SQLite and creates the database file automatically in the backend folder as `sectors.db`.

The seed data is defined in:

- `backend/src/database/init.ts`
- `database_dump.sql`

## Notes

- The frontend makes requests to `http://localhost:3000`.
- CORS is enabled in the NestJS backend to allow local Angular development.
- The sector list is nested by `parent_id` and sorted with `sort_order`.

## Useful commands

### Backend

```bash
npm run build
npm run test
npm run test:e2e
npm run lint
```

### Frontend

```bash
npm run build
npm start
npm test
```

## Summary

This project demonstrates a simple but complete full-stack flow: an Angular form posts to a NestJS API, which validates and stores user data in SQLite while returning the sector tree to the UI.
