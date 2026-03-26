# Visitor Pass MERN Application

## Project Structure

```
visitor-pass-mern/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── VisitorPass.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── visitorPass.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── visitorPassController.js
│   │   └── userController.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md
```

## Models

### User.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
```

### VisitorPass.js
```javascript
const mongoose = require('mongoose');

const visitorPassSchema = new mongoose.Schema({
    visitorName: { type: String, required: true },
    visitDate: { type: Date, required: true },
    host: { type: String, required: true },
});

module.exports = mongoose.model('VisitorPass', visitorPassSchema);
```

## Routes

### auth.js
```javascript
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

### visitorPass.js
```javascript
const express = require('express');
const { createVisitorPass, getVisitorPasses } = require('../controllers/visitorPassController');
const router = express.Router();

router.post('/', createVisitorPass);
router.get('/', getVisitorPasses);

module.exports = router;
```

### user.js
```javascript
const express = require('express');
const { getUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);

module.exports = router;
```

## Middleware

### auth.js
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Authentication required.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
```

## Server Configuration (server.js)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const visitorPassRoutes = require('./routes/visitorPass');
const userRoutes = require('./routes/user');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/visitorPass', authMiddleware, visitorPassRoutes);
app.use('/api/users', authMiddleware, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## package.json
```json
{
  "name": "visitor-pass-mern",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.0",
    "nodemon": "^2.0.15"
  }
}
```