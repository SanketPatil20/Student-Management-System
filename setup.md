# Student Management System - Setup Guide

## 🚀 Quick Start

This is a full-stack Student Management System built with Node.js, Express, MongoDB, and Angular.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-management
NODE_ENV=development
```

### 3. Database Setup

Make sure MongoDB is running on your system, or update the `MONGODB_URI` in your `.env` file to point to your MongoDB instance.

## 🏃‍♂️ Running the Application

### Development Mode (Both Backend and Frontend)

```bash
# Run both backend and frontend concurrently
npm run dev:full
```

### Backend Only

```bash
# Run backend server
npm run dev
```

### Frontend Only

```bash
# Run frontend development server
cd client
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📚 API Endpoints

### Students
- `GET /api/students` - Get all students (with optional filters)
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Query Parameters
- `search` - Search by name, email, or course
- `course` - Filter by course
- `status` - Filter by status (active/inactive/graduated)
- `sort` - Sort field (name, email, course, enrollmentDate)
- `order` - Sort order (asc/desc)

## 🎨 Features

### Backend Features
- ✅ RESTful API with Express
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Security headers with helmet
- ✅ Request logging with morgan

### Frontend Features
- ✅ Modern Angular 16 application
- ✅ Responsive Bootstrap 5 UI
- ✅ Reactive forms with validation
- ✅ Real-time search and filtering
- ✅ Confirmation modals for delete operations
- ✅ Loading states and error handling
- ✅ Beautiful gradient design system
- ✅ Font Awesome icons
- ✅ Smooth animations and transitions

### Student Management Features
- ✅ Add new students
- ✅ Edit existing students
- ✅ Delete students with confirmation
- ✅ Search students by name, email, or course
- ✅ Filter by status (active/inactive/graduated)
- ✅ Sort by various fields
- ✅ Student statistics dashboard
- ✅ Form validation and error handling
- ✅ Responsive card-based layout

## 🏗️ Project Structure

```
student-management-system/
├── server.js                 # Express server entry point
├── package.json             # Backend dependencies
├── models/
│   └── Student.js           # Mongoose student model
├── routes/
│   └── students.js          # Student API routes
├── client/                  # Angular frontend
│   ├── package.json         # Frontend dependencies
│   ├── angular.json         # Angular configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── src/
│       ├── app/
│       │   ├── components/  # Angular components
│       │   ├── services/    # Angular services
│       │   ├── models/      # TypeScript interfaces
│       │   └── app.module.ts
│       ├── styles.scss      # Global styles
│       └── main.ts          # Angular entry point
└── setup.md                 # This file
```

## 🎯 Usage Examples

### Adding a Student
1. Navigate to "Add New Student" from the navbar
2. Fill in the required fields (name, email, course)
3. Optionally add phone, address, and status
4. Click "Add Student"

### Searching Students
1. Use the search box to find students by name, email, or course
2. Use the status filter to show only active/inactive/graduated students
3. Use the sort dropdown to order results

### Editing a Student
1. Click on any student card or the "Edit" button
2. Modify the information in the form
3. Click "Update Student"

### Deleting a Student
1. Click the "Delete" button on any student card
2. Confirm the deletion in the modal
3. The student will be permanently removed

## 🔧 Customization

### Styling
The application uses CSS custom properties for easy theming. Modify the variables in `client/src/styles.scss`:

```scss
:root {
  --primary-color: #4f46e5;
  --secondary-color: #64748b;
  // ... other variables
}
```

### Adding New Fields
To add new student fields:

1. Update the Mongoose model in `models/Student.js`
2. Update the TypeScript interface in `client/src/app/models/student.ts`
3. Update the form component in `client/src/app/components/student-form/student-form.component.ts`
4. Update the list component to display the new field

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in `.env`
   - For MongoDB Atlas, ensure your IP is whitelisted

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill processes using the default ports

3. **Angular Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Update Angular CLI: `npm install -g @angular/cli@latest`

4. **CORS Issues**
   - The backend is configured with CORS enabled
   - Ensure the frontend URL is allowed in the CORS configuration

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Coding! 🎉**
