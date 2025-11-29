# Doctor Appointment System - Firebase Edition

A comprehensive healthcare appointment booking system built with Next.js 14 and Firebase.

## 🚀 Features

- **Multi-role Authentication**: Separate portals for Patients, Doctors, and Admins
- **Real-time Database**: Firebase Firestore for scalable data management
- **Appointment Booking**: Easy scheduling system with availability management
- **Admin Dashboard**: Complete user and doctor management interface
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Role-based Access Control**: Secure authentication and authorization

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Custom JWT + Firebase Auth
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React

## 📱 Access Points

- **Patient Portal**: `/login`
- **Doctor Portal**: `/doctor/login`
- **Admin Portal**: `/admin/login`

## 🔐 Demo Credentials

- **Admin**: admin@medicareplus.com / admin123
- **Doctor**: sarah.johnson@medicareplus.com / doctor123
- **Patient**: john.smith@example.com / user123

## 🏗 Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication (optional)
5. Get your Firebase configuration

### 2. Environment Variables

Create a `.env.local` file:

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Environment
NODE_ENV=development
\`\`\`

### 3. Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

## 📊 Firebase Collections Structure

### Users Collection
\`\`\`javascript
{
  id: "auto-generated",
  name: "string",
  email: "string",
  password: "hashed-string",
  role: "user|doctor|admin",
  phone: "string",
  specialization: "string", // for doctors
  experience: "number", // for doctors
  isApproved: "boolean", // for doctors
  createdAt: "timestamp"
}
\`\`\`

### Appointments Collection
\`\`\`javascript
{
  id: "auto-generated",
  userId: "string",
  doctorId: "string",
  date: "timestamp",
  timeSlot: {
    startTime: "string",
    endTime: "string"
  },
  status: "pending|confirmed|cancelled",
  createdAt: "timestamp"
}
\`\`\`

### Availability Collection
\`\`\`javascript
{
  id: "auto-generated",
  doctorId: "string",
  date: "timestamp",
  timeSlots: [
    {
      startTime: "string",
      endTime: "string",
      isBooked: "boolean"
    }
  ],
  createdAt: "timestamp"
}
\`\`\`

## 🔒 Security Rules (Firestore)

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Appointments
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
    
    // Availability
    match /availability/{availabilityId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        resource.data.doctorId == request.auth.uid;
    }
  }
}
\`\`\`

## 🚀 Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Deploy to Vercel, Netlify, or your preferred platform

3. Set up environment variables in your deployment platform

4. Configure Firebase security rules for production

## 📝 License

MIT License - see LICENSE file for details
