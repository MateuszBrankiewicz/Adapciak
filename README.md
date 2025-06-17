# 🐕 Adapciak - Animal Adoption Platform

Adapciak is a comprehensive web application designed to facilitate pet adoption by connecting pet owners with potential adopters. The platform focuses on dogs and cats, providing a user-friendly interface for posting adoption ads, browsing available pets, and communicating between users.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Docker Setup](#-docker-setup)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Password encryption with bcryptjs
- User profile management (edit profile, change password)
- Protected routes for authenticated users

### 📝 Pet Advertisement System
- Create, edit, and delete pet adoption ads
- Upload multiple images per ad
- Detailed pet information (breed, age, size, location)
- View counter for ads
- Location-based filtering (voivodeships and cities)
- Search functionality

### 💬 Messaging System
- Direct messaging between users
- Real-time conversation management
- Message history

### ❤️ Favorites System
- Save favorite pet ads
- Manage bookmarked pets
- Quick access to saved ads

### 📱 Responsive Design
- Mobile-first responsive design
- Modern UI with Material-UI components
- Smooth animations with Framer Motion
- Intuitive navigation

### 🔍 Advanced Filtering
- Filter by pet type (dogs/cats)
- Filter by location (voivodeship/city)
- Filter by age and size
- Advanced search capabilities

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: 
  - Tailwind CSS 4.0
  - Material-UI (MUI) 6.4.8
  - Emotion for styled components
- **State Management**: TanStack Query (React Query) 5.76.1
- **Routing**: React Router DOM 7.3.0
- **Forms**: React Hook Form 7.54.2 with Zod validation
- **HTTP Client**: Axios 1.8.3
- **Icons**: Lucide React, Material-UI Icons
- **Animations**: Framer Motion 12.5.0

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB with Mongoose 8.12.1
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **Validation**: Express Validator 7.2.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.4.7

### Development Tools
- **TypeScript**: Full TypeScript support
- **Testing**: Jest 29.5.14
- **Linting**: ESLint
- **Development**: Nodemon for backend hot reload
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
Adapciak/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── controller/     # Route controllers
│   │   ├── model/          # MongoDB schemas
│   │   ├── service/        # Business logic layer
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   └── config/         # Configuration files
│   ├── tests/              # Test files
│   └── package.json
├── docker-compose.yaml     # Docker configuration
├── backend.Dockerfile      # Backend Docker image
├── frontend.Dockerfile     # Frontend Docker image
└── README.md
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Docker** (optional, for containerized development)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/adapciak.git
cd adapciak
```

### 2. Environment Setup

Create environment files:

**Backend Environment (backend/src/.env):**
```env
MONGODB_URL=mongodb://localhost:27017/adapciak
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=3000
```

**Root Environment (.env):**
```env
CHOKIDAR_USEPOLLING=true
WDS_SOCKET_PORT=5173
VITE_HMR_PORT=24678
```

### 3. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## 🔧 Development

### Running Locally

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:3000`

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

1. **Start all services:**
```bash
docker-compose up -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop services:**
```bash
docker-compose down
```

### Services:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`
- **MongoDB**: `mongodb://localhost:27017`

## 📊 Database Schema

### User Model
```typescript
interface IUser {
  email: string;           // Unique email address
  password: string;        // Hashed password
  firstName: string;       // User's first name
  lastName: string;        // User's last name
  phone: string;          // Contact phone number
  street: string;         // Street address
  voivodeship: string;    // Polish voivodeship
  postalCode: string;     // Postal code
  homeNumber: string;     // House/apartment number
  city: string;           // City name
}
```

### Ad Model
```typescript
interface IAds {
  title: string;           // Ad title
  description: string;     // Pet description
  note: string;           // Additional notes
  userId: ObjectId;       // Reference to User
  images: IImage[];       // Array of images
  pet: string;            // Pet type (dog/cat)
  age: string;            // Pet age
  size: string;           // Pet size
  voivodeship: string;    // Location - voivodeship
  city: string;           // Location - city
  number: string;         // Contact number
  views: number;          // View counter
  createdAt: Date;        // Creation timestamp
  updatedAt: Date;        // Last update timestamp
}
```

### Message Model
```typescript
interface IMessage {
  senderId: ObjectId;     // Message sender
  receiverId: ObjectId;   // Message receiver
  content: string;        // Message content
  timestamp: Date;        // Send timestamp
  isRead: boolean;        // Read status
}
```

### Favorites Model
```typescript
interface IFavorites {
  userId: ObjectId;       // User who favorited
  adId: ObjectId;         // Favorited ad
  createdAt: Date;        // When favorited
}
```

## 🎨 Frontend Architecture

### Key Components

**Layout Components:**
- `NavigationBar` - Main navigation with auth state
- `NavigationBarAuth` - Authenticated user navigation
- `NavigationBarNoAuth` - Guest user navigation

**Ad Components:**
- `UniversalAdCard` - Reusable ad card component
- `UniversalAdsList` - Ad listing with pagination
- `SearchFilters` - Advanced filtering interface
- `AddAdFloatingButton` - Quick add action button

**Pages:**
- `HomePage` - Landing page with featured ads
- `ShowAds` - Browse all available ads
- `SingleAd` - Detailed ad view
- `AdsAdd` - Create new ad
- `EditAd` - Edit existing ad
- `LoginPage` / `RegisterPage` - Authentication
- `EditProfile` - User profile management
- `MessagePage` - Messaging interface
- `FavoriteAd` - Saved ads management

### Custom Hooks

- `useAdsFilters` - Ad filtering logic
- `useUserAdsManagement` - User's ad management
- `useResponsive` - Responsive design utilities
- `formFillersHooks` - Form population helpers

### API Hooks (TanStack Query)
- `authHooks` - Authentication API calls
- `adHooks` - Ad-related API operations

## 🔧 Backend Architecture

### Controllers
- `AuthController` - Authentication endpoints
- `AdController` - Ad CRUD operations
- `UserController` - User management
- `MessageController` - Messaging system
- `FavoriteController` - Favorites management

### Services (Business Logic)
- `AuthService` - Authentication logic
- `AdService` - Ad business logic
- `UserService` - User operations
- `MessageService` - Messaging logic
- `FavoriteService` - Favorites logic

### Middleware
- `auth` - JWT authentication middleware
- `UserValidation` - User input validation
- `AdValidation` - Ad input validation

### API Routes

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/profile/password` - Change password

**Ads:**
- `GET /api/ads` - Get all ads (with filters)
- `GET /api/ads/:id` - Get single ad
- `POST /api/ads` - Create new ad
- `PUT /api/ads/:id` - Update ad
- `DELETE /api/ads/:id` - Delete ad
- `GET /api/ads/user/:userId` - Get user's ads

**Messages:**
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark as read

**Favorites:**
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:adId` - Remove from favorites

## 🧪 Testing

### Running Tests

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

### Test Structure
- Unit tests for services
- Integration tests for API endpoints
- Component tests for React components

## 🔍 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive commit messages

### Security
- Input validation on both frontend and backend
- JWT tokens for authentication
- Password hashing with bcrypt
- CORS configuration
- Environment variables for sensitive data

### Performance
- Image optimization
- Lazy loading for components
- Database indexing
- Query optimization with TanStack Query
- Responsive images

## 🚀 Deployment

### Production Environment Setup

1. **Environment Variables:**
```env
NODE_ENV=production
MONGODB_URL=your_production_mongodb_url
JWT_SECRET=your_production_jwt_secret
```

2. **Build Applications:**
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

3. **Deploy:**
- Backend: Deploy to services like Heroku, Railway, or VPS
- Frontend: Deploy to Vercel, Netlify, or serve from backend
- Database: MongoDB Atlas for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
1. Ensure all tests pass
2. Follow the existing code style
3. Add tests for new features
4. Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

## 🔄 Recent Updates

- Added user profile editing functionality
- Separated password change from profile updates
- Enhanced validation schemas
- Improved responsive design
- Added comprehensive API documentation

---

**Happy Pet Adoption! 🐕🐱**
