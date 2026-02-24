# Edutech Platform - System Documentation

Comprehensive documentation of the Edutech educational platform architecture, technology stack, features, and workflows.

---

## 1. Project Overview
Edutech is a modern, full-stack educational platform designed for seamless course management and learning experiences. It features a dedicated **Admin Dashboard** for course creators and a **Student Dashboard** for learners, integrated with AI-driven assistance.

## 2. System Architecture
The project follows a decoupled architecture with separate frontend and backend services to ensure scalability and easier deployment.

```text
Edutech/
├── frontend/          # React Single Page Application (Vite)
├── backend/           # Node.js Express API
└── _legacy/           # Original backup of the unified project
```

## 3. Technology Stack

### Frontend
- **React 18**: Component-based UI development.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for modern styling.
- **Material Symbols**: Google's modern icon library.
- **Axios**: Promised-based HTTP client for API communication.

### Backend
- **Node.js & Express**: Robust server-side runtime and framework.
- **Firebase Admin SDK**: Secure server-side access to Firebase services.
- **Google Generative AI (Gemini)**: Powers the intelligent educational chatbot.
- **Cors**: Middleware for cross-origin resource sharing.

### Database & Infrastructure
- **Firestore**: NoSQL document database for user profiles, courses, and enrollments.
- **Firebase Auth**: Secure user authentication and session management.
- **Firebase Storage**: Cloud storage for course thumbnails, videos, and resources.
- **Render.com**: Hosting platform for both the Static Frontend and Web Service Backend.

## 4. Key Features

### Admin Dashboard
- **Dashboard Overview**: At-a-glance metrics (Total courses, revenue, students).
- **Course Management**: Full CRUD (Create, Read, Update, Delete) capability for courses, lessons, and resources.
- **Thumbnail Management**: Custom image uploads with auto-optimization and compression.
- **Student Performance**: Track student progress and completion rates.

### Student Dashboard
- **Course Directory**: Browse available courses and enroll instantly.
- **Learning Interface**: Integrated lesson viewer for videos and curriculum.
- **Resource Center**: Securely download course materials via signed URLs.
- **Progress Tracking**: Real-time stats on completed versus in-progress courses.

### AI Educational Assistant
- **Gemini Integration**: A context-aware chatbot capable of answering complex educational doubts and guiding students through their learning journey.

### Responsive Design
- **Multi-Role Mobile Support**: Custom sliding drawer sidebars and hamburger menus for both Admin and Student roles, ensuring a premium experience on phones and tablets.

## 5. Core Workflows

### Deployment Workflow
The system is optimized for **Render.com**:
1. **Source Control**: Both services reside in a single GitHub repository.
2. **Backend Service**: Deployed as a Web Service from the `/backend` root.
3. **Frontend Site**: Deployed as a Static Site from the `/frontend` root with rewrite rules for React Router.

### Media Management Workflow
- **Upload**: Large course images are compressed client-side before upload to stay within database limits.
- **Access**: Sensitive resources are accessed via **Signed URLs** generated on-the-fly, ensuring that only authorized students can access paid content.

### Authentication Workflow
- **Registration**: Users choose their role (Admin or Student) during sign-up.
- **Session Management**: Auth state is managed via React Context and Firebase Auth, maintaining persistence across sessions.

## 6. Environment Configuration

### Backend (.env)
- `FIREBASE_PROJECT_ID`: Unique project identifier.
- `FIREBASE_PRIVATE_KEY`: Secret key for Admin SDK.
- `FIREBASE_CLIENT_EMAIL`: Service account email.
- `FIREBASE_STORAGE_BUCKET`: Host for cloud files.
- `GEMINI_API_KEY`: Key for AI features.

### Frontend (.env)
- `VITE_API_BASE_URL`: The live URL of the backend API.
- `VITE_FIREBASE_...`: Standard Firebase client-side config keys.

---

## 7. Recent System Enhancements
- **Project Decoupling**: Migrated from a monolithic structure to a cleaner `frontend`/`backend` split.
- **Mobile Overhaul**: Redesigned all navigation components to be fully responsive.
- **Security Hardening**: Implemented signed URL logic for all student resources.
- **Performance**: Integrated client-side image compression for course thumbnails.

---
*Last Updated: February 2026*
