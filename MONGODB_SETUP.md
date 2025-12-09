# MongoDB Setup Guide

This guide will help you set up MongoDB for the TruEstate Sales Management System.

## Option 1: Local MongoDB (Recommended for Development)

### Installation

#### Ubuntu/Debian:
```bash
# Import MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Fedora:
```bash
# Create MongoDB repository file
sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo << EOF
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-7.0.asc
EOF

# Install MongoDB
sudo dnf install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### MacOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Windows:
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start automatically as a service

### Verify Installation
```bash
# Check if MongoDB is running
mongosh

# You should see MongoDB shell prompt
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Setup Steps:

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Access**
   - **Database Access:** Create a database user
     - Click "Database Access" in left sidebar
     - Add new user with username and password
     - Grant "Read and write to any database" role
   
   - **Network Access:** Whitelist your IP
     - Click "Network Access" in left sidebar
     - Add IP Address
     - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
     - For production: Add specific IP addresses

4. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

5. **Update .env File**
   ```bash
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/truestate-sales?retryWrites=true&w=majority
   ```
   Replace YOUR_USERNAME, YOUR_PASSWORD, and YOUR_CLUSTER with your actual values

## Migrate Data to MongoDB

Once MongoDB is set up, migrate your data:

```bash
cd backend

# Build the TypeScript files first
npm run build

# Migrate data from JSON to MongoDB
npm run migrate-data

# If you want to clear existing data and reimport:
npm run migrate-data -- --clear
```

## Start the Application

```bash
# Start backend with MongoDB
cd backend
npm run dev

# In another terminal, start frontend
cd frontend
npm start
```

## Verify Everything Works

1. Check backend health:
   ```bash
   curl http://localhost:5000/health
   ```

2. Check sales data:
   ```bash
   curl http://localhost:5000/api/sales
   ```

3. Open frontend in browser:
   ```
   http://localhost:3000
   ```

## Common Issues

### Issue: "MongoServerError: connect ECONNREFUSED"
**Solution:** MongoDB is not running
```bash
# Linux/Mac
sudo systemctl start mongod

# Mac with Homebrew
brew services start mongodb-community
```

### Issue: "MongooseServerSelectionError: Could not connect"
**Solution:** Check your connection string in .env file
- Verify username and password are correct
- Ensure IP is whitelisted in MongoDB Atlas
- Check if MongoDB service is running locally

### Issue: "Database is empty after migration"
**Solution:** Re-run migration script
```bash
npm run migrate-data -- --clear
```

## MongoDB Useful Commands

```bash
# Open MongoDB shell
mongosh

# Switch to your database
use truestate-sales

# View all collections
show collections

# Count documents
db.sales_records.countDocuments()

# Find documents
db.sales_records.find().limit(5).pretty()

# Clear all data (use with caution!)
db.sales_records.deleteMany({})

# Exit shell
exit
```

## Next Steps

- ✅ MongoDB is now your primary database
- ✅ Data persists between server restarts
- ✅ Ready for production deployment
- ✅ Can scale as your data grows

For production deployment, consider:
- Using MongoDB Atlas for managed hosting
- Setting up proper indexes for better performance
- Implementing backup strategies
- Adding data validation rules
