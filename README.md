# 🌉 Bridge Between Investor and Business People

A simple web platform connecting investors and entrepreneurs built using HTML, CSS, JavaScript, and Firebase.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)

## ✨ Features

### 👥 Dual User System
- **Separate Registration** - Different accounts for Investors and Business People
- **Role-Based Access** - Customized dashboard based on user type
- **User Profiles** - Store name, email, and account type
- **Persistent Login** - Firebase Authentication with session management

### 💼 For Business People
- **Post Business Ideas** - Share proposals with potential investors
- **Include Details** - Title, description, budget needed, contact info
- **View Investors** - See investment opportunities from investors
- **Connect Directly** - Contact information visible on posts

### 💰 For Investors
- **Post Investment Opportunities** - Share what you're looking to invest in
- **Browse Business Ideas** - Discover promising entrepreneurial proposals
- **Filter by Type** - See posts from both investors and businesses
- **Direct Contact** - Connect with entrepreneurs directly

### 🎨 Design Features
- **Clean Interface** - Simple, elegant design without clutter
- **Rounded Edges** - Modern card-based layout
- **Soft Shadows** - Subtle depth effects
- **Hover Effects** - Interactive button animations
- **Responsive Design** - Works on mobile and desktop
- **Neutral Colors** - Light background with dark text

## 📁 Project Structure

```
investor-business/
│
├── index.html      # Main HTML structure
├── style.css       # All styling (240 lines)
├── script.js       # App logic & Firebase operations (245 lines)
├── firebase.js     # Firebase configuration (19 lines)
├── .env            # Environment variables (not in git)
├── .env.example    # Example env file
├── .gitignore      # Git ignore file
└── README.md       # Documentation
```

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Vinayakyeti/Investor-Business.git
cd Investor-Business
```

### 2. Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** → Email/Password
4. Enable **Firestore Database** (start in test mode)

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy the config values

3. Edit `.env` and add your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Run the App
Since this uses environment variables with `import.meta.env`, you'll need a dev server:

**Option A: Using Vite (Recommended)**
```bash
npm install -g vite
vite
```

**Option B: Using Python**
```bash
python -m http.server 8000
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### 5. Start Using
1. Open the app in your browser
2. Register an account (Investor or Business)
3. Start posting and connecting!

## 💻 How to Use

### For Business People
1. **Register**:
   - Click "I have a Business Idea" on homepage
   - Select "Business Person" user type
   - Enter email, password, and name
   - Click "Create Account"

2. **Post Business Idea**:
   - Go to Dashboard after login
   - Fill in business idea form:
     - Title (e.g., "Mobile Food Delivery App")
     - Description (explain your idea)
     - Budget needed (e.g., "$50,000")
     - Contact info (email/phone)
   - Click "Post"

3. **View Investors**:
   - Scroll to "Investment Opportunities & Business Ideas"
   - See posts from investors looking to invest
   - Contact them using provided contact info

### For Investors
1. **Register**:
   - Click "I'm an Investor" on homepage
   - Select "Investor" user type
   - Enter email, password, and name
   - Click "Create Account"

2. **Post Investment Opportunity**:
   - Go to Dashboard after login
   - Fill in investment form:
     - Title (e.g., "Seeking Tech Startups")
     - Description (investment criteria)
     - Investment amount (e.g., "$100,000 - $500,000")
     - Contact info (email/phone)
   - Click "Post"

3. **Browse Business Ideas**:
   - Scroll to "Business Proposals"
   - See pitches from entrepreneurs
   - Contact promising businesses directly

### Login
- Click "Login/Register" in navbar
- Select your user type
- Click "Already have an account? Login here"
- Enter email and password
- Click "Login"

## 🔧 Technical Details

### Authentication System
- **Firebase Authentication** with Email/Password
- Secure password hashing handled by Firebase
- Session persists across page reloads
- Real-time auth state management

### Firebase Firestore Database Structure

**Users Collection:**
```json
{
  "uid": "firebase_user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "userType": "investor",
  "createdAt": Timestamp
}
```

**Posts Collection:**
```json
{
  "title": "Tech Startup Investment",
  "description": "Looking to invest...",
  "budget": "$100,000",
  "contact": "john@example.com",
  "userId": "firebase_user_id",
  "userName": "John Doe",
  "userType": "investor",
  "createdAt": Timestamp
}
```

### Key Functions

**Authentication:**
- Firebase `createUserWithEmailAndPassword()`
- Firebase `signInWithEmailAndPassword()`
- `onAuthStateChanged()` listener for session
- Automatic password hashing and security

**Database Operations (Firestore):**
- `addDoc()` - Create new user/post
- `getDocs()` - Fetch all posts with sorting
- `query()` with `orderBy()` - Sort by creation date
- Real-time listeners available

**UI Functions:**
- `showHome()` - Display landing page
- `showAuth()` - Show login/register
- `showDashboard()` - Display user dashboard
- `loadPosts()` - Fetch and render posts
- `toggleAuthMode()` - Switch login/register

### Form Validation
- All fields required (basic HTML5 validation)
- Empty field check before submission
- Email format validation (HTML5)
- Duplicate email prevention
- Trim whitespace from inputs

## 🎨 UI Components

### Navigation Bar
- Sticky header with logo
- Dynamic links (show/hide based on auth state)
- Home, Login/Register, Dashboard, Logout

### Home Page
- Hero section with CTA buttons
- Feature cards explaining benefits
- Direct navigation to registration

### Auth Page
- User type selector (Investor/Business)
- Email/password inputs
- Name field (register only)
- Toggle between login/register modes

### Dashboard
- User info card with welcome message
- Post creation form (role-specific labels)
- Posts feed with real-time updates
- Cards with hover effects

### Post Cards
- Color-coded by user type
- Title, description, budget, contact
- Author name and post date
- Hover animation (lift effect)

## 🎯 Responsive Design

### Desktop (> 768px)
- Max-width 1200px centered
- Multi-column grid for features
- Horizontal navigation
- Spacious padding

### Mobile (≤ 768px)
- Single column layouts
- Stacked buttons
- Reduced padding
- Smaller font sizes
- Touch-friendly tap targets

## 🔒 Security Considerations

### Current Setup
- **Firebase Authentication** - Industry-standard security
- **Environment Variables** - Credentials stored in `.env` (not committed)
- **Gitignore** - `.env` file excluded from version control
- **Firestore Security Rules** - Currently in test mode

### Production Recommendations
1. **Firestore Security Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth.uid == userId;
       }
       match /posts/{postId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update, delete: if request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

2. **Firebase Security**:
   - Add authorized domains in Firebase Console
   - Enable App Check for additional security
   - Set up Firebase Hosting for HTTPS
   - Implement rate limiting

3. **Enhanced Security**:
   - Add email verification
   - Implement password reset functionality
   - Enable two-factor authentication
   - Add CAPTCHA for registration
   - Log security events

## ⚠️ Important Security Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- **Rotate Firebase credentials** if accidentally exposed
- **Update Firestore rules** before production deployment
- **Use Firebase Hosting** for automatic HTTPS

## 🌐 Deployment Options

### Recommended: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Option 2: Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy`
3. Add environment variables in Netlify dashboard

### Option 3: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

**Important:** Add your production domain to Firebase Console → Authentication → Settings → Authorized domains

## 🐛 Troubleshooting

### Posts Not Loading
- Check Firebase configuration in `.env`
- Verify Firestore database is created
- Check browser console for errors
- Ensure internet connection is stable

### Authentication Errors
- Verify Email/Password is enabled in Firebase Console
- Check if email is already registered
- Ensure `.env` file has correct credentials
- Check browser console for error messages

### Environment Variables Not Working
- Make sure you're using a dev server (Vite, Live Server, etc.)
- Verify `.env` file is in the root directory
- Check that variables start with `VITE_`
- Restart the dev server after changing `.env`

### Firebase Connection Failed
- Verify all credentials in `.env` are correct
- Check Firebase project is active
- Ensure billing is enabled (free tier is fine)
- Open browser DevTools → Network tab for details

## 🔮 Future Enhancements

Possible additions:
- **Search & Filter** - Search posts by keywords, filter by budget range
- **Categories** - Business categories (Tech, Food, Fashion, etc.)
- **Messaging System** - Built-in chat between users
- **Email Notifications** - Alert when new matching opportunities appear
- **User Ratings** - Reviews and ratings for users
- **Image Uploads** - Add business logos or investment portfolio images
- **Advanced Profiles** - Detailed investor/business profiles
- **Bookmark Posts** - Save interesting posts for later
- **Analytics Dashboard** - View engagement on your posts
- **Admin Panel** - Moderate posts and manage users

## 📊 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vinayakyeti**
- GitHub: [@Vinayakyeti](https://github.com/Vinayakyeti)

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database
- Google Fonts (Poppins)
- Built with vanilla JavaScript (no frameworks)

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)

---

**Built with 🤝 to connect Investors and Entrepreneurs** | Simple, Secure, Elegant
