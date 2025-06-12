# CareerConnect

A comprehensive career development platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-Role Dashboard**: Different interfaces for Students, Employers, Career Counselors, and Administrators
- **Student Features**: Resume builder, job search, career guidance, appointment booking
- **Employer Features**: Job posting, candidate management, company profile management
- **Counselor Features**: Student management, appointment scheduling, consultation tracking, course creation
- **Admin Features**: User management, analytics, content management, system settings

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/career-connect.git
cd career-connect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   └── layout/          # Layout components (Header, Sidebar, etc.)
├── context/             # React Context providers
├── pages/               # Page components organized by role
│   ├── admin/          # Admin dashboard pages
│   ├── counselor/      # Career counselor pages
│   ├── employer/       # Employer dashboard pages
│   └── student/        # Student dashboard pages
├── types/              # TypeScript type definitions
└── data/               # Mock data and constants
```

## 🎯 User Roles

### Students
- Browse job listings and company profiles
- Build and manage resumes
- Book appointments with career counselors
- Access career development courses
- Track application status

### Employers
- Post and manage job listings
- Browse and filter candidates
- Manage company profile
- Organize recruitment events
- Track hiring analytics

### Career Counselors
- Manage student profiles and progress
- Schedule and conduct consultations
- Create career development courses
- Set availability for appointments
- Track consultation outcomes

### Administrators
- Monitor platform analytics
- Manage user accounts and permissions
- Configure system settings
- Manage platform content
- Generate reports

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed as part of Software Analysis & Design (SAD) course project.

## 🙏 Acknowledgments

- React and Vite communities for excellent tooling
- Tailwind CSS for the utility-first CSS framework
- Lucide for beautiful icons
