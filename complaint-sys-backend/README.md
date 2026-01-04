# Complaint System Backend

Node.js/Express API for the GCTU Complaint System.

## Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- Environment variables (.env file)

## Installation

```bash
npm install
```

## Setup

1. Create a `.env` file based on `.env.example`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

2. Create an admin account:
```bash
node reset-admin.js
```

## Running Locally

```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/:id` - Get complaint by ID
- `PUT /api/complaints/:id` - Update complaint status
- `DELETE /api/complaints/:id` - Delete complaint

## Deployment on Railway

1. Push code to GitHub
2. Go to https://railway.app
3. Create new project → Import from GitHub
4. Select this repository
5. Add environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
6. Deploy

Your backend URL will be: `https://your-railway-app.up.railway.app`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
