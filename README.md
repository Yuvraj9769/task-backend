# Catering Search API

A simple REST API to manage caterers. Built with Express, TypeScript and MongoDB.

## Setup

### 1. Install
```bash
cd backend
pnpm install
```

### 2. Environment Variables
Copy the example file and add your values:
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/catering-search
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### 3. Start Server
```bash
pnpm dev
```

Server runs on: `http://localhost:5000`

## Testing

Use **Thunder Client** in VS Code:
1. Open Thunder Client extension
2. Import `thunder-client-collection.json`
3. Test each endpoint

Or **curl** from terminal.

---

## API Endpoints

### 1. GET All Caterers

**Request:**
```
GET http://localhost:5000/api/v1/caterers
```

**With filters:**
```
GET http://localhost:5000/api/v1/caterers?search=taj&maxPrice=150
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Caterers fetched successfully",
  "data": [
    {
      "_id": "6a319accdac1c33e0870afb5",
      "name": "Taj Flavors Catering",
      "email": "taj@catering.com",
      "location": "new york",
      "pricePerPlate": 150,
      "cuisines": ["Indian", "North Indian", "Mughlai"],
      "rating": 4.8,
      "createdAt": "2026-06-17T10:30:00.000Z",
      "updatedAt": "2026-06-17T10:30:00.000Z"
    }
  ]
}
```

---

### 2. GET Caterer by ID

**Request:**
```
GET http://localhost:5000/api/v1/caterers/6a319accdac1c33e0870afb5
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Caterer fetched successfully",
  "data": {
    "_id": "6a319accdac1c33e0870afb5",
    "name": "Taj Flavors Catering",
    "email": "taj@catering.com",
    "location": "new york",
    "pricePerPlate": 150,
    "cuisines": ["Indian", "North Indian", "Mughlai"],
    "rating": 4.8,
    "createdAt": "2026-06-17T10:30:00.000Z",
    "updatedAt": "2026-06-17T10:30:00.000Z"
  }
}
```

---

### 3. POST Create Caterer

**Request:**
```
POST http://localhost:5000/api/v1/caterers
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Gourmet Kitchen",
  "email": "gourmet@catering.com",
  "location": "Boston",
  "pricePerPlate": 175,
  "cuisines": ["French", "Mediterranean", "Fine Dining"],
  "rating": 4.9
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Caterer created successfully",
  "data": {
    "_id": "6a319accdac1c33e0870afb6",
    "name": "Gourmet Kitchen",
    "email": "gourmet@catering.com",
    "location": "boston",
    "pricePerPlate": 175,
    "cuisines": ["French", "Mediterranean", "Fine Dining"],
    "rating": 4.9,
    "createdAt": "2026-06-17T11:00:00.000Z",
    "updatedAt": "2026-06-17T11:00:00.000Z"
  }
}
```

**Error - Duplicate Email (409 Conflict):**
```json
{
  "success": false,
  "statusCode": 409,
  "message": "A caterer with this email already exists",
  "errors": []
}
```

**Error - Missing Fields (400 Bad Request):**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "pricePerPlate",
      "message": "Price per plate must be greater than 0"
    }
  ]
}
```

---

## Curl Examples

**List caterers:**
```bash
curl http://localhost:5000/api/v1/caterers
```

**Search by name:**
```bash
curl "http://localhost:5000/api/v1/caterers?search=taj"
```

**Filter by price:**
```bash
curl "http://localhost:5000/api/v1/caterers?maxPrice=150"
```

**Get by ID:**
```bash
curl http://localhost:5000/api/v1/caterers/6a319accdac1c33e0870afb5
```

**Create caterer:**
```bash
curl -X POST http://localhost:5000/api/v1/caterers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spice Masters",
    "email": "spice@catering.com",
    "location": "Chicago",
    "pricePerPlate": 130,
    "cuisines": ["Thai", "Vietnamese"],
    "rating": 4.7
  }'
```

---

## Email Field - Unique Constraint

Each caterer must have a **unique email address**. This prevents duplicate entries in the database.

**Why?** Prevents the same caterer from being added multiple times.

### Example

**First request (works):**
```bash
curl -X POST http://localhost:5000/api/v1/caterers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Taj Foods",
    "email": "taj@catering.com",
    "location": "New York",
    "pricePerPlate": 150,
    "cuisines": ["Indian"],
    "rating": 4.8
  }'
# Returns: 201 Created ✓
```

**Second request with same email (fails):**
```bash
curl -X POST http://localhost:5000/api/v1/caterers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Different Name",
    "email": "taj@catering.com",
    "location": "Boston",
    "pricePerPlate": 120,
    "cuisines": ["Indian"],
    "rating": 4.5
  }'
# Returns: 409 Conflict - Email already exists ✗
```

**Always use different emails for each caterer!**

3. Add some sample caterers to the database:

   ```bash
   pnpm seed
   ```

4. Start the server:

   ```bash
   pnpm dev
   ```

   The API runs on `http://localhost:5000`.

## Endpoints

All responses come back in the same shape:
`{ success, statusCode, data, message }`.

| Method | Path                | What it does                                   |
| ------ | ------------------- | ---------------------------------------------- |
| GET    | `/api/caterers`     | List caterers. Optional `search`, `minPrice`, `maxPrice` query params. |
| GET    | `/api/caterers/:id` | Get one caterer by id.                         |
| POST   | `/api/caterers`     | Add a new caterer.                             |

### Examples

List and filter:

```bash
curl "http://localhost:5000/api/caterers?search=spice&maxPrice=800"
```

Create one:

```bash
curl -X POST http://localhost:5000/api/caterers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sunrise Caterers",
    "location": "Chennai",
    "pricePerPlate": 550,
    "cuisines": ["South Indian"],
    "rating": 4.2
  }'
```

If the body is missing fields or has bad values, you get a `422` back with a
message for each field that failed.

## Scripts

- `pnpm dev` – run in watch mode
- `pnpm build` – compile to `dist/`
- `pnpm start` – run the compiled build

## Folder layout

```
src/
  config/        env + database connection
  models/        Mongoose schema for a caterer
  validators/    Zod schemas for the request body and query
  controllers/   the actual request handlers
  routes/        maps URLs to controllers
  utils/         ApiResponse, ApiError, asyncHandler
  app.ts         builds the Express app
  server.ts      connects to the DB and starts listening
```
