# Deployment Guide

## Vercel Deployment

This Next.js application with MongoDB is ready to deploy on Vercel.

### Prerequisites

- MongoDB instance (MongoDB Atlas recommended)
- Vercel account

### Steps to Deploy

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Set Environment Variables**
   In Vercel project settings, add:
   - `MONGODB_URI`: Your MongoDB connection string
     \`\`\`
     mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
     \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your Next.js application

### API Endpoints

Once deployed, your API will be available at:

- `GET /api` - Health check and endpoint list
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `GET /api/rooms` - List all rooms
- `POST /api/rooms` - Create a new room
- `GET /api/devices` - List all devices
- `POST /api/devices` - Create a new device
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/notifications` - List all notifications
- `POST /api/notifications` - Create a new notification

### Local Development

1. Create `.env.local` file:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Update `MONGODB_URI` with your local or cloud MongoDB connection string

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. API will be available at `http://localhost:3000/api`

### Production Build

\`\`\`bash
npm run build
npm run start
\`\`\`

### Troubleshooting

**MongoDB Connection Error:**
- Verify `MONGODB_URI` is correct in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes Vercel's IP (0.0.0.0/0 for all)
- Ensure database user has proper permissions

**Build Errors:**
- Clear build cache in Vercel dashboard
- Check that all environment variables are set
- Ensure Node.js version compatibility (16+)
