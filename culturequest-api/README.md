# CultureQuest API

CultureQuest is a platform for preserving and sharing cultural heritage, connecting urban youth with their traditional roots through digital storytelling, artisan showcases, and cultural events.

## 🌟 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, User, Moderator)
  - Secure password hashing with bcrypt

- **Cultural Stories**
  - Multi-format storytelling (text, audio, video)
  - Language and dialect tracking
  - Verification system
  - Analytics (views, downloads, shares)

- **Artisan Profiles**
  - Detailed artisan information
  - Location-based search
  - Craft categorization
  - Verification system
  - Contact tracking

- **Cultural Events**
  - Event management
  - Location-based search
  - Session handling
  - Attendance tracking

- **Content Moderation**
  - Content review system
  - Moderation status tracking
  - Moderator assignment

- **Analytics**
  - Usage statistics
  - Content performance metrics
  - Trend analysis

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm or yarn

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NtwaliEliel/Culture_Quest_App
   cd culturequest-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/culturequest?schema=public"

   # JWT Configuration
   JWT_SECRET="your-super-secret-key-change-in-production"
   JWT_EXPIRATION="1d"

   # Server Configuration
   PORT=9000
   NODE_ENV="development"

   # API Configuration
   API_PREFIX="/api"
   API_VERSION="v1"

   # CORS Configuration
   CORS_ORIGIN="http://localhost:9000"
   ```

4. Set up the database:
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate

   # Seed initial data
   npm run prisma:seed
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:9000`
Swagger documentation will be available at `http://localhost:9000/api`

## 🏗️ Architecture

### Tech Stack
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

### Directory Structure
```
culturequest-api/
├── src/
│   ├── modules/           # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── users/        # User management
│   │   ├── artisans/     # Artisan profiles
│   │   ├── stories/      # Cultural stories
│   │   ├── events/       # Cultural events
│   │   ├── analytics/    # Analytics
│   │   └── ...
│   ├── prisma/           # Database schema and migrations
│   ├── common/           # Shared utilities
│   └── main.ts          # Application entry point
├── test/                # Test files
└── docs/               # Additional documentation
```

### Database Schema

#### Core Entities

1. **User**
   - Authentication details
   - Profile information
   - Role and permissions
   - Language preferences
   - Activity tracking

2. **Artisan**
   - Profile information
   - Location data
   - Craft specializations
   - Verification status
   - Contact information
   - Gallery and documents

3. **Story**
   - Multi-format content
   - Cultural metadata
   - Verification status
   - Analytics tracking
   - Related stories

4. **Event**
   - Event details
   - Location information
   - Session management
   - Capacity tracking
   - Media attachments

5. **ContentModeration**
   - Moderation status
   - Moderator assignment
   - Review notes
   - Timestamp tracking

6. **Analytics**
   - Usage metrics
   - Performance data
   - Temporal tracking

## 🔌 API Integration

### Authentication

1. Register a new user:
   ```http
   POST /api/auth/register
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "secure_password",
     "name": "User Name"
   }
   ```

2. Login to get JWT token:
   ```http
   POST /api/auth/login
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "secure_password"
   }
   ```

3. Use the JWT token in subsequent requests:
   ```http
   GET /api/stories
   Authorization: Bearer <your_jwt_token>
   ```

### API Endpoints

Detailed API documentation is available through Swagger UI at `/api`. Key endpoints include:

- **/api/auth**: Authentication endpoints
- **/api/users**: User management
- **/api/artisans**: Artisan profile management
- **/api/stories**: Cultural story management
- **/api/events**: Cultural event management
- **/api/analytics**: Analytics data
- **/api/moderation**: Content moderation

### Integration Examples

#### Flutter App Integration
```dart
Future<void> login() async {
  final response = await http.post(
    Uri.parse('http://your-api-url/api/auth/login'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'email': 'user@example.com',
      'password': 'password'
    }),
  );
  
  if (response.statusCode == 200) {
    final token = jsonDecode(response.body)['access_token'];
    // Store token securely
  }
}
```

#### Web App Integration (JavaScript)
```javascript
async function login() {
  const response = await fetch('http://your-api-url/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'password'
    })
  });
  
  if (response.ok) {
    const { access_token } = await response.json();
    // Store token securely
  }
}
```

## 📦 Deployment

### Production Setup
1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables
3. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

4. Start the production server:
   ```bash
   npm run start:prod
   ```

### Docker Deployment
```dockerfile
# Dockerfile provided in repository
docker build -t culturequest-api .
docker run -p 9000:9000 culturequest-api
```

## 🔒 Security Considerations

- JWT tokens are used for authentication
- Passwords are hashed using bcrypt
- Role-based access control is implemented
- Input validation using class-validator
- CORS is configured for security
- Rate limiting is implemented
- Request validation middleware
