require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const { connectToServer } = require('./db/conn');
require('./config/passportConfig');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');
const projectRoutes = require('./routes/projects');
const priorityRoutes = require('./routes/priorities');
const swaggerDocs = require('./swagger');
const ensureAuth = require('./middleware/ensureAuth');

const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: 'https://advancedtaskmanager-oauth.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/tasks', ensureAuth, taskRoutes);
app.use('/api/categories', ensureAuth, categoryRoutes);
app.use('/api/projects', ensureAuth, projectRoutes);
app.use('/api/priorities', ensureAuth, priorityRoutes);
swaggerDocs(app);

const port = process.env.PORT || 3000;
connectToServer(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
