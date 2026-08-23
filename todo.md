# PHASE 1 — AgriSathi Frontend Development

Build the complete frontend for a full-stack agriculture platform called **AgriSathi**.

AgriSathi is a smart farming platform designed for farmers. It should help farmers make better farming decisions using crop recommendations, weather information, mandi prices, crop disease detection, fertilizer guidance, government schemes, farm management and agricultural expert support.

IMPORTANT:

* Do NOT create chatbot functionality.
* Do NOT create the backend yet.
* Do NOT create MongoDB/database code yet.
* Do NOT create fake AI functionality.
* For now, focus only on a clean, functional React frontend.
* Use realistic agricultural content instead of generic placeholder text.
* Keep the design professional, simple and practical rather than overly futuristic or obviously AI-generated.

## Technology

Use:

* React
* Vite
* React Router
* Tailwind CSS
* Recharts where charts are useful
* Lucide React or another lightweight icon library

## Main Pages

Create these pages:

### Public

* Landing Page
* Login
* Register

### Farmer

* Dashboard
* My Farm
* Crop Recommendation
* Disease Detection
* Weather
* Mandi Prices
* Fertilizer Recommendation
* Government Schemes
* Crop Calendar
* Farm Expenses
* Farm Activity Journal
* Expert Consultation
* Notifications
* Profile/Settings

### Admin

* Admin Dashboard
* Manage Farmers
* Manage Experts
* Manage Schemes
* Manage Crop Information
* Manage Reports

## Landing Page

Create a realistic landing page containing:

* AgriSathi logo/name
* Short headline explaining the platform
* Short description
* Get Started button
* Login button
* Main agriculture/farming visual
* Feature section
* How It Works section
* Benefits section
* Footer

Avoid excessive animations.

## Farmer Dashboard

The dashboard should immediately show useful information:

* Current weather
* Current temperature
* Active crops
* Today's mandi prices
* Crop health/status
* Upcoming farming activities
* Government scheme alerts
* Important notifications
* Recent farm expenses

Use cards and small charts where appropriate.

## My Farm

Allow the UI to display:

* Farm location
* Land area
* Soil type
* Soil pH
* Nitrogen
* Phosphorus
* Potassium
* Current crops
* Crop planting dates
* Expected harvest dates

Create an Add Crop / Add Farm UI.

## Crop Recommendation

Create a form with:

* Location
* Soil type
* Nitrogen
* Phosphorus
* Potassium
* pH
* Temperature
* Humidity
* Rainfall
* Season

After submission, show a realistic placeholder recommendation result.

Clearly structure the UI so the real ML API can be connected later.

## Disease Detection

Create:

* Image upload area
* Drag/drop interface
* Image preview
* Analyze button
* Result section

The result section should be designed for future AI integration.

Example:

Disease:
"Prediction will appear here"

Confidence:
"--"

Do not pretend that a real AI prediction exists yet.

## Weather

Create:

* Current weather card
* Temperature
* Humidity
* Wind speed
* Rainfall
* 5–7 day forecast
* Farming alert section

Use realistic mock data for now.

## Mandi Prices

Create:

* Crop selector
* Market selector
* Search
* Current price
* Previous price
* Price change
* Historical price chart
* Multiple market comparison

Use mock data only for the frontend phase.

Clearly separate mock data from components so it can later be replaced with an API.

## Fertilizer Recommendation

Create a form containing:

* Crop
* Soil type
* N
* P
* K
* pH
* Crop growth stage

Create a result section that can later receive recommendations from the backend/ML system.

## Government Schemes

Create:

* Scheme cards
* Search
* State filter
* Category filter
* Eligibility section
* Benefits
* Required documents
* Application information
* Official source button

Use clearly marked mock/sample scheme data for now.

## Crop Calendar

Create a timeline showing:

* Sowing
* Irrigation
* Fertilization
* Growth stages
* Disease monitoring
* Harvest

Allow the user to select a crop.

## Expense Tracker

Create:

* Total expenses
* Monthly expenses
* Expense categories
* Add expense
* Expense history
* Charts
* Estimated revenue
* Estimated profit

## Farm Activity Journal

Allow users to add:

* Date
* Crop
* Activity
* Notes
* Image

Show activities in a timeline.

## Expert Consultation

Create:

* Expert listing
* Expert profile cards
* Expertise
* Experience
* Availability
* Ask for consultation
* Previous queries
* Query details page

Do not implement real chat yet.

## Notifications

Create notification UI for:

* Weather alerts
* Mandi price changes
* Farming reminders
* Scheme updates
* Expert responses

## Navigation

Create a responsive sidebar/dashboard navigation.

Desktop:

* Sidebar
* Main content

Mobile:

* Bottom navigation or collapsible sidebar

## Design

The design should feel like a real agricultural product.

Use:

* White/light backgrounds
* Natural green accents
* Earth/soil-inspired secondary colors
* Clear typography
* Large readable buttons
* Good spacing
* Responsive layouts

Do NOT:

* Use excessive gradients
* Use excessive glassmorphism
* Use huge glowing AI elements
* Use unnecessary animations
* Make every section look like an AI dashboard

The UI should be practical enough that a real farmer could understand it.

## Code Quality

Create reusable components:

* Navbar
* Sidebar
* DashboardCard
* WeatherCard
* CropCard
* PriceCard
* AlertCard
* Form components
* Modal
* Table
* Chart components

Use clean folder organization.

Add proper loading, empty and error states where appropriate.

At the end:

1. Make sure all routes work.
2. Make sure the project runs with npm run dev.
3. Fix console errors.
4. Do not leave broken imports.
5. Do not create backend files.
6. Provide a short summary of the files created and how to run the frontend.
# PHASE 2 — AgriSathi Backend Development

Continue the existing **AgriSathi** project.

The React frontend has already been created. Now build the backend without unnecessarily changing the existing frontend UI.

IMPORTANT:

* Do NOT redesign the frontend.
* Do NOT remove existing frontend functionality.
* Do NOT create chatbot functionality.
* Do NOT create fake AI predictions.
* Build a clean production-style REST API.
* Keep the backend modular and easy to connect with the existing React frontend.

## Technology

Use:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv
* CORS
* Multer where file uploads are required

## Backend Structure

Create:

server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── uploads/
└── server.js

## Authentication

Implement:

* Register
* Login
* Logout
* JWT authentication
* Password hashing
* Protected routes
* Role-based authorization

Roles:

* farmer
* expert
* admin

User fields:

* name
* email
* password
* phone
* role
* location
* profileImage
* createdAt

Never store plain-text passwords.

## MongoDB Models

Create Mongoose models for:

### User

### Farm

### Crop

### Expense

### FarmActivity

### DiseaseScan

### Expert

### ExpertQuery

### GovernmentScheme

### MandiPrice

### Notification

Use proper references between collections.

## Farm APIs

Create:

POST /api/farms
GET /api/farms
GET /api/farms/:id
PUT /api/farms/:id
DELETE /api/farms/:id

## Crop APIs

Create:

POST /api/crops
GET /api/crops
GET /api/crops/:id
PUT /api/crops/:id
DELETE /api/crops/:id

## Expense APIs

Create:

POST /api/expenses
GET /api/expenses
PUT /api/expenses/:id
DELETE /api/expenses/:id

Return useful totals for dashboard analytics.

## Farm Activity APIs

Create:

POST /api/activities
GET /api/activities
PUT /api/activities/:id
DELETE /api/activities/:id

Support optional image uploads.

## Government Scheme APIs

Create:

GET /api/schemes
GET /api/schemes/:id

Support filtering by:

* State
* Category
* Search

Admin should be able to create, update and delete schemes.

## Mandi APIs

Create:

GET /api/mandi
GET /api/mandi/:crop
GET /api/mandi/markets

For now, use clearly separated seed/sample data if a live API is not yet connected.

Do not pretend sample data is live data.

## Expert APIs

Create:

GET /api/experts
GET /api/experts/:id

Farmers should be able to create consultation requests:

POST /api/expert-queries

Experts should be able to view and respond to assigned queries.

## Notification APIs

Create:

GET /api/notifications
PUT /api/notifications/:id/read

## File Uploads

Support secure image uploads for:

* Crop disease images
* Farm activity images
* Profile images

Validate:

* File type
* File size

Keep upload logic separate from controllers.

## Dashboard API

Create:

GET /api/dashboard

Return:

* Farmer information
* Farm summary
* Active crops
* Recent expenses
* Recent activities
* Notifications
* Weather placeholder
* Mandi placeholder

## Error Handling

Implement centralized error handling.

Return consistent JSON:

{
"success": false,
"message": "Something went wrong"
}

Do not expose sensitive server errors to users.

## Environment Variables

Use .env for:

MONGO_URI
JWT_SECRET
PORT
CLIENT_URL

Do not hardcode secrets.

Create a .env.example file.

## Security

Implement:

* JWT authentication
* Password hashing
* Protected routes
* Role-based authorization
* Input validation
* File validation
* CORS configuration

## Frontend Integration

After building the backend:

* Connect existing login/register pages.
* Connect dashboard data.
* Connect farm management.
* Connect crop management.
* Connect expenses.
* Connect farm activities.
* Connect expert queries.
* Connect notifications.

Do not redesign existing pages.

## Testing

Test all major APIs.

Make sure:

* MongoDB connects successfully.
* Server starts without errors.
* Authentication works.
* Protected routes reject unauthenticated users.
* Farmers cannot access admin-only routes.
* CRUD operations work correctly.

At the end, provide:

1. Backend folder structure.
2. Required npm packages.
3. .env.example.
4. Commands to start backend.
5. API endpoint list.
6. Any frontend files that were modified.
# PHASE 3 — AgriSathi Database & Full-Stack Integration

Continue the existing AgriSathi project.

The React frontend and Node/Express backend already exist.

Now properly connect the application to MongoDB and integrate the frontend with the backend.

IMPORTANT:

* Do not redesign the existing UI.
* Do not remove existing features.
* Do not add chatbot functionality.
* Do not create fake AI predictions.
* Do not hardcode user-specific data in React.
* Data shown on the dashboard should come from the backend/database whenever the feature is implemented.

## Database

Use MongoDB with Mongoose.

Make sure the application supports:

User
Farm
Crop
Expense
FarmActivity
DiseaseScan
Expert
ExpertQuery
GovernmentScheme
MandiPrice
Notification

## Relationships

Implement relationships correctly.

Example:

User
→ has multiple Farms

Farm
→ has multiple Crops

Farm
→ has multiple Expenses

Farm
→ has multiple Farm Activities

User
→ has multiple Notifications

User
→ can create Expert Queries

## Authentication Integration

Connect:

Register
→ Backend
→ MongoDB

Login
→ Backend
→ JWT
→ Protected frontend routes

Store authentication securely and implement an auth context/provider.

The frontend should automatically know:

* logged-in user
* role
* token/session state

## Protected Routes

Create separate access:

Farmer:

* Dashboard
* My Farm
* Crops
* Expenses
* Activities
* Disease Detection
* Recommendations
* Expert Consultation

Expert:

* Expert Dashboard
* Assigned Queries
* Responses
* Profile

Admin:

* Admin Dashboard
* Users
* Experts
* Schemes
* Crop information
* Reports

Unauthorized users should not be able to access protected pages.

## API Service Layer

Create a centralized frontend API service.

Do not scatter fetch/axios calls randomly throughout components.

Organize API calls into services such as:

authService
farmService
cropService
expenseService
activityService
schemeService
mandiService
expertService
notificationService

## Dashboard

Replace frontend mock dashboard data with backend data.

Show:

* Farmer name
* Farm information
* Active crops
* Expense summary
* Recent activities
* Notifications
* Current weather when weather API is added
* Mandi data when mandi API is added

## My Farm

Implement complete CRUD:

Create farm
Read farm
Update farm
Delete farm

Create crop
Update crop
Delete crop

## Expense Tracker

Connect the expense UI to MongoDB.

Implement:

Add Expense
Edit Expense
Delete Expense
Expense History
Total Expense
Category-wise totals
Monthly totals

Update charts dynamically using backend data.

## Farm Activity Journal

Connect:

Add Activity
Edit Activity
Delete Activity
Upload Image
Activity History

## Government Schemes

Connect scheme page to backend.

Implement:

* Search
* State filter
* Category filter
* Scheme details
* Bookmark/save if supported by the model

Admin should be able to manage scheme records.

## Expert Consultation

Implement:

Farmer:
Create query
Upload image if required
View query status
View expert response

Expert:
View assigned queries
Respond
Update status

## Notifications

Create notification system for:

* Expert response
* Important farming alerts
* Scheme updates
* Other system notifications

Implement read/unread state.

## Loading and Error States

Every API-driven page should have:

Loading state
Empty state
Error state
Success feedback

Do not leave blank screens when APIs fail.

## Data Validation

Validate data on both:

* frontend
* backend

Never rely only on frontend validation.

## Testing

Test:

1. New farmer registration.
2. Login.
3. Create farm.
4. Add crop.
5. Add expense.
6. Add farm activity.
7. View dashboard.
8. Create expert query.
9. Admin login.
10. Admin manages schemes.

Fix:

* CORS errors
* MongoDB errors
* Authentication errors
* Broken API URLs
* React console errors
* Missing environment variables

At the end, provide a complete explanation of how:

React → Express → MongoDB

works in this project.
# PHASE 4 — AgriSathi AI/ML Integration

Continue the existing AgriSathi full-stack project.

Now add the AI/ML components without breaking the existing MERN application.

IMPORTANT:

* Do NOT add chatbot functionality.
* Do NOT replace the existing MERN backend.
* Keep ML services separate from Node/Express.
* Do not claim predictions are medically/agronomically guaranteed.
* Show prediction confidence where appropriate.
* Validate inputs.
* Handle model/API failures gracefully.

## AI Architecture

Use:

React
↓
Node/Express
↓
Python ML API
↓
ML Model
↓
Prediction
↓
Node/Express
↓
React

Create a separate:

ml-service/

folder.

Recommended structure:

ml-service/
├── crop_recommendation/
├── disease_detection/
├── fertilizer_recommendation/
├── models/
├── routes/
├── services/
├── utils/
└── app.py

Use Python with FastAPI or Flask.

## AI MODULE 1 — Crop Recommendation

Build a machine learning model using suitable agricultural crop recommendation data.

Input:

* Nitrogen
* Phosphorus
* Potassium
* Temperature
* Humidity
* pH
* Rainfall

Output:

* Recommended crop
* Confidence/probability where appropriate
* Top alternative crops if supported by the model

Use a suitable classification algorithm such as Random Forest.

Do not hardcode the prediction.

Create:

POST /predict/crop

Example input:

{
"nitrogen": 90,
"phosphorus": 42,
"potassium": 43,
"temperature": 25,
"humidity": 80,
"ph": 6.5,
"rainfall": 200
}

Return structured JSON.

Save the trained model so it does not need to retrain for every request.

## AI MODULE 2 — Crop Disease Detection

Create an image classification service.

The user uploads a crop leaf image.

Workflow:

React
↓
Node/Express
↓
Python ML API
↓
Image Model
↓
Disease Prediction
↓
Result

Use a suitable public agricultural image dataset and transfer learning where practical.

The result should include:

* Crop
* Predicted disease
* Confidence
* General information
* Preventive practices

Do not invent treatment recommendations.

Store disease-scan history in MongoDB.

Example:

DiseaseScan:

* userId
* crop
* image
* prediction
* confidence
* createdAt

Create:

POST /predict/disease

## AI MODULE 3 — Fertilizer Recommendation

Create a recommendation model/rule system using agricultural data.

Inputs:

* Crop
* Soil type
* Nitrogen
* Phosphorus
* Potassium
* pH
* Crop growth stage

Output:

* Nutrient status
* General fertilizer guidance
* Soil improvement guidance
* Warnings where data is insufficient

Do not generate unsupported exact fertilizer dosages.

Create:

POST /predict/fertilizer

## Model Evaluation

For each ML model, document:

* Dataset source
* Dataset size
* Features
* Target
* Preprocessing
* Train/test split
* Algorithm
* Accuracy
* Precision
* Recall
* F1-score where appropriate

For the disease image model, also consider:

* confusion matrix
* per-class performance

Do not report fabricated metrics. Calculate them from the actual test set.

## Node Integration

Create services in the Node backend:

cropAIService
diseaseAIService
fertilizerAIService

Node should communicate with the Python ML API.

Do not expose the Python service directly to the public frontend unless there is a strong reason.

## Frontend Integration

Connect:

Crop Recommendation page
→ real ML API

Disease Detection page
→ real image prediction API

Fertilizer Recommendation page
→ real recommendation API

Show:

Loading
Prediction
Confidence
Explanation
Warnings
Retry option

## AI History

Store user prediction history.

Allow the farmer to view:

* Previous crop recommendations
* Previous disease scans
* Previous fertilizer recommendations
* Dates
* Results

## Error Handling

Handle:

* Invalid input
* Missing fields
* Invalid images
* Unsupported image types
* ML server unavailable
* Model unavailable
* Low confidence

If confidence is low, clearly tell the user that the result is uncertain and recommend consulting an agricultural expert.

At the end:

1. Explain how each model works.
2. Explain how Node communicates with Python.
3. Explain how predictions are stored in MongoDB.
4. Provide commands to run the ML service.
5. Provide commands to train the models.
6. Provide model evaluation results based on actual testing.
# PHASE 5 — AgriSathi Final Integration, APIs, Real-Time Features & Deployment

Continue the existing AgriSathi project.

The application now contains:

* React frontend
* Node/Express backend
* MongoDB
* Authentication
* ML services
* Crop recommendation
* Disease detection
* Fertilizer recommendation

Now make the project production-ready for demonstration.

IMPORTANT:

* Do not add chatbot functionality.
* Do not redesign the application completely.
* Do not replace working functionality.
* Do not use fake live data.
* Clearly identify demo/mock data.
* Use official/reliable sources for government scheme information.
* Do not expose API keys or secrets.

# 1. WEATHER API

Integrate a reliable weather API.

Display:

* Current temperature
* Weather condition
* Humidity
* Wind speed
* Rainfall
* Forecast

Use the farmer's selected location.

Create a backend weather service so API keys are not exposed in React.

Add farming alerts such as:

* Heavy rain
* High temperature
* Low temperature
* Strong wind

Keep these as decision-support alerts, not guaranteed agricultural predictions.

# 2. MANDI PRICE DATA

Integrate a suitable reliable mandi/market-price data source.

Allow:

* Crop search
* Market search
* Location filtering
* Current prices
* Historical prices where available
* Price comparison

Display:

Current price
Previous price
Price change
Market
Last updated time

Clearly display when data was last updated.

Do not fabricate live prices.

If a reliable live API is unavailable, create a clean provider interface and use clearly labelled demo data until the API is configured.

# 3. GOVERNMENT SCHEMES

Create a verified scheme information system.

Store:

* Scheme name
* Description
* Eligibility
* Benefits
* Required documents
* State
* Application process
* Official source
* Last verified/updated date

Admin can manage schemes.

Do not allow AI to invent scheme eligibility or benefits.

Use official government sources as the source of truth.

# 4. VOICE NAVIGATION

Implement voice input for navigation/search where supported by the browser.

Example:

"Show weather"

→ Weather page

"Show mandi prices"

→ Mandi page

"Crop recommendation"

→ Crop Recommendation page

"Open my farm"

→ My Farm page

Do not create conversational chatbot functionality.

Provide a visible microphone button and fallback text input.

# 5. REAL-TIME NOTIFICATIONS

Use Socket.IO where appropriate.

Implement real-time notifications for:

* Expert response
* New consultation request
* Important system alerts
* Admin announcements

Show unread notification count.

# 6. EXPERT CONSULTATION

Complete the expert workflow.

Farmer:

Create query
→ Add description
→ Upload image
→ Submit

Expert:

Receive query
→ Review
→ Respond
→ Mark resolved

Farmer:

Receive real-time notification
→ View response
→ Close query

# 7. ADMIN DASHBOARD

Create useful analytics:

* Total farmers
* Total experts
* Active crops
* Total consultations
* Disease scans
* Most requested crops
* Popular schemes
* Monthly expenses
* User registrations

Use Recharts for visualizations.

Admin should be able to:

* Manage users
* Manage experts
* Manage schemes
* Manage crop information
* Review reported content

# 8. SECURITY

Review the complete project.

Implement:

* JWT authentication
* Password hashing
* Role-based authorization
* Input validation
* File validation
* API rate limiting where appropriate
* CORS restrictions
* Secure environment variables
* Proper error handling

Never commit:

.env
API keys
JWT secrets
database passwords

Create:

.env.example

# 9. PERFORMANCE

Improve:

* API response handling
* Image size
* Lazy loading
* Pagination
* Database indexes
* Repeated API calls

Do not optimize unnecessarily at the cost of readability.

# 10. RESPONSIVE DESIGN

Test:

Desktop
Tablet
Mobile

Make sure:

* Navigation works
* Tables are usable
* Forms fit the screen
* Charts don't overflow
* Image upload works
* Dashboard cards adapt correctly

# 11. TESTING

Test complete user journeys.

### Farmer Journey

Register
→ Login
→ Add farm
→ Add crop
→ View weather
→ View mandi prices
→ Get crop recommendation
→ Upload disease image
→ Get prediction
→ Check fertilizer guidance
→ Track expenses
→ View schemes
→ Contact expert

### Expert Journey

Login
→ Expert dashboard
→ View query
→ Respond
→ Mark resolved

### Admin Journey

Login
→ Dashboard
→ Manage farmers
→ Manage experts
→ Manage schemes
→ View analytics

Fix all:

* Console errors
* API errors
* Broken routes
* Authentication problems
* MongoDB errors
* ML API errors
* CORS issues
* Missing environment variables

# 12. README

Create a professional README containing:

Project name
Project description
Features
Technology stack
Architecture
Folder structure
Installation
Environment variables
How to run frontend
How to run backend
How to run ML service
Database setup
API documentation
ML model information
Screenshots section
Future improvements

# 13. FINAL PROJECT CHECK

Before finishing, verify:

✓ Frontend works
✓ Backend works
✓ MongoDB works
✓ Authentication works
✓ Role-based access works
✓ Weather works
✓ Mandi integration works or is clearly marked demo
✓ Schemes work
✓ Crop recommendation works
✓ Disease detection works
✓ Fertilizer recommendation works
✓ Expense tracker works
✓ Farm management works
✓ Expert consultation works
✓ Notifications work
✓ Admin dashboard works
✓ Mobile responsive
✓ No hardcoded secrets
✓ No chatbot functionality
✓ No fake AI predictions
✓ No fabricated live data

Finally, provide:

1. Complete project structure.
2. All commands required to run the project.
3. Environment variables required.
4. API list.
5. ML model explanation.
6. Database schema explanation.
7. Final testing checklist.
8. Deployment instructions.