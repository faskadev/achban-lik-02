# 🚀 Quick Start Guide - Achban-Lik

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Seed the Database
```bash
npm run seed
```

You should see:
```
✅ Database synced
✅ Admin user created
✅ Regular users created
✅ 20 restaurants created
✅ Sample reviews created
🎉 Database seeding completed successfully!
```

### Step 3: Start Backend Server
```bash
npm run dev
```

Server should start on `http://localhost:3000`

### Step 4: Install Frontend Dependencies (New Terminal)
```bash
cd frontend
npm install
```

### Step 5: Configure API URL

**IMPORTANT**: Edit `frontend/config/api.js`

**For iOS Simulator or Web:**
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

**For Android Emulator:**
```javascript
const API_BASE_URL = 'http://10.0.2.2:3000/api';
```

**For Physical Device:**
1. Find your computer's IP address:
   - Windows: `ipconfig` → Look for IPv4 Address
   - Mac/Linux: `ifconfig` → Look for inet
2. Update the URL:
```javascript
const API_BASE_URL = 'http://YOUR_IP:3000/api';
// Example: 'http://192.168.1.100:3000/api'
```

### Step 6: Start Frontend
```bash
npm start
```

### Step 7: Run on Device
- Scan QR code with Expo Go app
- Or press 'a' for Android emulator
- Or press 'i' for iOS simulator
- Or press 'w' for web

## 🔑 Login Credentials

### Admin Account
- **Email**: admin@achbanlik.com
- **Password**: admin123

### Regular User
- **Email**: ahmed@example.com  
- **Password**: password123

## 📱 Test the App

1. **User Flow**:
   - Login with regular user credentials
   - Browse the 20 seeded restaurants
   - Click on a restaurant to view details
   - Add a review (try all the star ratings!)
   - Go to "Mes Avis" to see your reviews
   - Edit or delete your review

2. **Admin Flow**:
   - Logout and login as admin
   - Click "Gestion Admin" button
   - Add a new restaurant
   - Edit an existing restaurant
   - Delete a restaurant (careful - this will delete all reviews!)

3. **Business Rules to Test**:
   - Try adding 2 reviews to the same restaurant → Should fail
   - Check that you can only edit/delete your own reviews
   - Verify that ratings update when you add/edit reviews

## 🐛 Common Issues

### "Network request failed"
- Backend is not running → Start it with `npm run dev`
- Wrong API URL → Check `frontend/config/api.js`
- Firewall blocking → Allow Node.js through firewall

### "Cannot connect to localhost"
- On physical device, use your computer's IP address
- On Android emulator, use `10.0.2.2` instead of localhost

### Backend crashes on seed
- Delete `database.sqlite` file
- Run `npm run seed` again

### Images not loading
- Check that `backend/uploads/restaurants/` folder exists
- Images are placeholders in seed data - they won't show real images
- When adding a restaurant as admin, upload a real image

## 📊 What's in the Seeded Database?

- **1 Admin User**: admin@achbanlik.com
- **3 Regular Users**: ahmed, fatima, youssef
- **20 Restaurants**: Mix of Moroccan and international cuisine
- **8 Sample Reviews**: Distributed across different restaurants
- **Cities**: Marrakech, Casablanca, Fès

## 💡 Pro Tips

1. **Hot Reload**: Save any file to see changes instantly
2. **Debug**: Shake your device or press Cmd+D (iOS) / Cmd+M (Android)
3. **Clear Cache**: Delete `node_modules/.cache` if something breaks
4. **Reset Database**: Delete `backend/database.sqlite` and run seed again
5. **View Logs**: Check terminal where backend is running for API logs

## 🎯 Learning Path

Suggested order to explore the code:

1. **Backend Models** → `backend/models/` - See database structure
2. **Backend Routes** → `backend/routes/` - Understand API endpoints
3. **Frontend Screens** → `frontend/app/` - Study UI components
4. **API Integration** → `frontend/config/api.js` - Learn HTTP calls
5. **State Management** → `frontend/store/authStore.js` - See Zustand

## 📖 Next Steps

- Read the main README.md for detailed documentation
- Explore the code and add your own features
- Try implementing new features like:
  - Restaurant categories/types
  - User profiles with avatars
  - Search functionality
  - Favorite restaurants
  - Photo galleries for restaurants

## ✅ Checklist

- [ ] Backend dependencies installed
- [ ] Database seeded successfully
- [ ] Backend server running on port 3000
- [ ] Frontend dependencies installed
- [ ] API URL configured correctly
- [ ] Frontend running in Expo
- [ ] Logged in successfully
- [ ] Can browse restaurants
- [ ] Can add a review
- [ ] Can view "Mes Avis"
- [ ] Admin can access restaurant management

---

**Need help?** Check the main README.md or the troubleshooting sections in frontend/README.md and backend/README.md

**Ready to code?** Start exploring the files and making changes! 🎨
