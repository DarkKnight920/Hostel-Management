mkdir hostel-management-system
cd hostel-management-system
npx create-react-app client
mkdir server
cd server
npm init -y
npm install express mongoose cors body-parser jsonwebtoken bcryptjs
npm install jspdf


To Deploy
# Install the Heroku CLI
npm install -g heroku

# Create a Heroku app
heroku create hostel-management-system

# Deploy the server
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a hostel-management-system
git push heroku master

# Ensure your environment variables are set
heroku config:set MONGO_URI=<Your MongoDB URI>
heroku config:set JWT_SECRET=<Your JWT Secret>