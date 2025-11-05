# 🌉 Bridge Between Investor and Business People

A simple web platform connecting investors and entrepreneurs built using HTML, CSS, JavaScript, and Firebase.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

## ✨ Features

### 👥 Dual User System
- **Separate Registration** - Different accounts for Investors and Business People
- **Role-Based Access** - Customized dashboard based on user type
- **User Profiles** - Store name, email, and account type
- **Persistent Login** - LocalStorage session management with MongoDB

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
├── script.js       # App logic & MongoDB operations (215 lines)
├── firebase.js     # MongoDB configuration (36 lines)
└── README.md       # Documentation
```

## 🚀 Setup Instructions

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new project (e.g., "InvestorBridge")

### 2. Create a Cluster
1. Click "Build a Database"
2. Choose **FREE** shared cluster (M0)
3. Select a cloud provider and region
4. Click "Create Cluster" (takes 3-5 minutes)

### 3. Configure Network Access
1. Go to **Security → Network Access**
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 4. Enable Data API
1. Go to **Services → Data API**
2. Click "Enable the Data API"
3. Copy the **Data API URL** (looks like: `https://data.mongodb-api.com/app/data-xxxxx/endpoint`)
4. Click "Create API Key"
5. Name it (e.g., "WebAppKey")
6. Copy the **API Key** (save it securely!)

### 5. Create Database and Collections
1. Go to **Database → Browse Collections**
2. Click "Add My Own Data"
3. Database name: `investor_business`
4. Collection name: `users`
5. Click "Create"
6. Add another collection: `posts`

### 6. Configure the App
Open `firebase.js` and replace the config:

```javascript
const MONGODB_CONFIG = {
    API_URL: 'https://data.mongodb-api.com/app/data-xxxxx/endpoint',
    API_KEY: 'your-api-key-here',
    DATABASE: 'investor_business',
    COLLECTIONS: {
        USERS: 'users',
        POSTS: 'posts'
    }
};
```

### 7. Run the App
1. Open `index.html` in a web browser
2. Or use Live Server extension in VS Code
3. Register an account and start using!

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
- **Email/Password** authentication with password hashing
- User sessions stored in **localStorage**
- Password hashed using simple hash function
- Session persists across page reloads

### MongoDB Database Structure

**Users Collection:**
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "userType": "investor",
  "createdAt": 1234567890
}
```

**Posts Collection:**
```json
{
  "_id": ObjectId("..."),
  "title": "Tech Startup Investment",
  "description": "Looking to invest...",
  "budget": "$100,000",
  "contact": "john@example.com",
  "authorId": "user_id",
  "authorName": "John Doe",
  "userType": "investor",
  "createdAt": 1234567890
}
```

### Key Functions

**Authentication:**
- `hashPassword()` - Hash user passwords
- Custom login/register with MongoDB queries
- `localStorage` for session management
- Email uniqueness validation

**Database Operations (MongoDB Data API):**
- `insertOne` - Create new user/post
- `findOne` - Find user by email
- `find` - Fetch all posts with sorting
- HTTP POST requests with API key authentication

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

### Current Setup (Development)
- **Simple password hashing** (client-side)
- **Open Data API access** (API key exposed in frontend)
- **localStorage** for session management

### Production Recommendations
1. **Use Backend Server**:
   - Create Node.js/Express backend
   - Keep MongoDB credentials on server
   - Use bcrypt for password hashing
   - Implement JWT tokens for sessions

2. **MongoDB Atlas Security**:
   - Restrict IP addresses in Network Access
   - Use more secure API keys
   - Enable MongoDB Atlas App Services for authentication
   - Implement role-based access control

3. **Data Validation**:
   - Add input sanitization
   - Implement rate limiting
   - Add CAPTCHA for registration
   - Validate email format server-side
   - Set password strength requirements

4. **Enhanced Security**:
   - Use HTTPS only
   - Implement email verification
   - Add password reset functionality
   - Enable two-factor authentication
   - Log security events

## 🌐 Deployment Options

### Option 1: Netlify
1. Drag and drop folder to [Netlify](https://app.netlify.com/)
2. Or connect GitHub repo for auto-deploy

### Option 2: Vercel
1. Sign up at [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Deploy automatically

### Option 3: GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Save and get URL

**Note:** For any deployment, ensure your MongoDB Data API allows requests from your domain.

## 🐛 Troubleshooting

### Posts Not Loading
- Verify MongoDB Data API is enabled
- Check API URL and API key in `firebase.js`
- Ensure collections `users` and `posts` exist
- Check browser console for CORS errors
- Verify network access allows all IPs (0.0.0.0/0)

### Authentication Errors
- Check if user exists in MongoDB (try registering)
- Verify email is not already registered
- Check browser console for error messages
- Ensure MongoDB connection is active

### MongoDB Connection Failed
- Verify Data API URL is correct
- Check API Key is valid and active
- Ensure cluster is running (not paused)
- Check Network Access settings
- Open browser DevTools → Network tab for details

### UI Not Updating
- Hard refresh browser (Ctrl+F5)
- Clear browser cache
- Check JavaScript console for errors
- Verify Firebase imports are correct

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

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [MongoDB Data API Guide](https://www.mongodb.com/docs/atlas/api/data-api/)
- [MongoDB Atlas Tutorial](https://www.mongodb.com/docs/atlas/getting-started/)
- [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)

---

**Built with 🤝 to connect Investors and Entrepreneurs** | Simple, Functional, Elegant
