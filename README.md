# Edutech Admin Dashboard - React

A modern admin dashboard built with React and Tailwind CSS for the Edutech educational platform.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Top navigation header
│   ├── Sidebar.jsx          # Left navigation sidebar
│   └── sections/
│       ├── Overview.jsx     # Dashboard overview with stats
│       ├── Courses.jsx      # Course management
│       ├── Students.jsx     # Student management
│       └── Analytics.jsx    # Analytics and performance metrics
├── App.jsx                  # Main app component
├── App.css                  # App styles
├── index.css                # Global styles
└── main.jsx                 # Entry point
```

## Features

- **Dashboard Overview**: Key metrics and course management
- **Courses Management**: View and manage all courses
- **Student Management**: Track student progress and performance
- **Analytics**: View enrollment trends and revenue insights
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Built with Tailwind CSS and Material Symbols icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling framework
- **Material Symbols**: Icon library

## Dark Mode

Click the "Dark Mode" button in the sidebar to toggle between light and dark themes. The preference is stored in the component state.

## Component Overview

### Sidebar
Navigation component with tab switching and dark mode toggle.

### Header
Top header with search bar, notifications, and user profile.

### Overview
Displays dashboard metrics, stats cards, and course management table.

### Courses
Grid view of all available courses with details.

### Students
Table view of students with performance metrics and completion rates.

### Analytics
Charts and performance metrics including enrollment trends and revenue breakdowns.

## Customization

All colors and styling can be customized through:
- `tailwind.config.js` for Tailwind configuration
- `src/index.css` for global styles
- Component files for component-specific styling

## License

This project is part of the Edutech educational platform.
