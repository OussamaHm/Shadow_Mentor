# 🚀 Quick Start Guide - Shadow Mentor Frontend

## ⚡ Installation & Setup

### Step 1: Navigate to Frontend Directory

```powershell
cd frontend
```

### Step 2: Install Dependencies

```powershell
npm install
```

### Step 3: Start Development Server

```powershell
npm run dev
```

The app will open automatically at **http://localhost:3000** 🎉

---

## 📱 What You Get

### ✨ **Landing Page** (`/`)

- **Hero Section** - Stunning animated hero with gradient text
- **Statistics Cards** - 4 real-time stats with icons
- **Features Grid** - 6 feature cards with hover effects
- **How It Works** - 3-step AI cycle explanation
- **Benefits Section** - Checklist with metrics
- **CTA Section** - Call-to-action with gradient background
- **Responsive Navigation** - Sticky header with smooth scroll

### 📊 **Dashboard** (`/dashboard`)

- **Collapsible Sidebar** - Navigation with icons
- **4 Stat Cards** - Active employees, integration time, success rate, gaps
- **Onboarding Progress Chart** - Bar chart showing weekly progress
- **Role Distribution** - Interactive pie chart
- **Integration Gaps Alert** - Real-time issue detection
- **Employee Table** - Sortable table with progress bars
- **Fully Responsive** - Works on all screen sizes

### 👤 **Employee View** (`/employee/:id`)

- Individual employee profile (placeholder - ready for expansion)

### ⚙️ **Admin Panel** (`/admin`)

- Configuration panel (placeholder - ready for expansion)

---

## 🎨 Design Features

✅ **Dark Theme** - Professional dark mode with orange accents  
✅ **Glass Morphism** - Modern glassmorphic cards  
✅ **Smooth Animations** - Framer Motion for fluid transitions  
✅ **Interactive Charts** - Recharts for data visualization  
✅ **Gradient Accents** - Beautiful gradients throughout  
✅ **Responsive Design** - Mobile-first approach  
✅ **Custom Scrollbar** - Styled scrollbar matching theme  
✅ **Hover Effects** - Interactive elements with scale and shadow

---

## 🎯 Color Palette

```
Primary Orange:    #F59E0B
Dark Background:   #0F0F0F
Secondary Dark:    #1A1A1A
Tertiary Dark:     #262626
Success Green:     #10B981
Error Red:         #EF4444
Info Blue:         #3B82F6
```

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx    ← Hero, features, benefits
│   │   ├── Dashboard.jsx       ← Main admin dashboard
│   │   ├── EmployeeView.jsx   ← Employee profile
│   │   └── AdminPanel.jsx     ← Settings
│   ├── App.jsx                 ← Routing
│   ├── main.jsx                ← Entry point
│   └── index.css               ← Global styles
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🔧 Available Commands

```powershell
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Routes

- `/` - Landing page
- `/dashboard` - Admin dashboard
- `/employee/:id` - Employee details
- `/admin` - Admin panel

---

## 🎭 Key Components & Features

### Landing Page Highlights:

- **Animated Hero** - Floating background elements
- **Feature Cards** - 6 cards with unique gradient icons
- **3-Step Process** - Visual workflow explanation
- **Stats Grid** - 4 animated stat cards
- **Benefits Checklist** - With check icons
- **Smooth Scroll** - Auto-scroll to sections

### Dashboard Highlights:

- **Sidebar Navigation** - Collapsible with icons
- **Real-time Stats** - 4 KPI cards with trends
- **Charts** - Bar chart (onboarding) + Pie chart (roles)
- **Integration Gaps** - Alert system for issues
- **Employee Table** - With progress bars and status badges
- **Responsive Sidebar** - Auto-collapse on mobile

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#F59E0B',  // Change this!
    dark: '#D97706',
    light: '#FCD34D'
  }
}
```

### Add New Pages

1. Create file in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:

```javascript
<Route path="/your-path" element={<YourPage />} />
```

---

## 🐛 Troubleshooting

### Port Already in Use?

```powershell
# Change port in vite.config.js
server: {
  port: 3001  // Change to any available port
}
```

### Dependencies Not Installing?

```powershell
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🔗 Connect to Backend

When your Python backend is ready:

1. Create `.env` file:

```
VITE_API_URL=http://localhost:5000
```

2. Use in components:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
fetch(`${API_URL}/api/employees`);
```

---

## 🚀 Next Steps

1. ✅ Frontend is ready!
2. 🔨 Build Python backend API
3. 🔌 Connect frontend to backend
4. 📊 Fetch real employee data from Astra DB
5. 🤖 Integrate IBM Watsonx AI agent
6. 📅 Add Google Calendar integration
7. 💬 Add Slack integration

---

## 📸 Screenshots

### Landing Page

- Modern hero with gradient text
- Animated floating backgrounds
- Feature showcase
- 3-step process visualization

### Dashboard

- Sidebar with navigation
- Real-time KPI cards
- Interactive charts
- Employee table with progress

---

## 🎉 You're All Set!

Run `npm run dev` and visit **http://localhost:3000** to see your stunning UI!

**Happy Coding! 🚀**
