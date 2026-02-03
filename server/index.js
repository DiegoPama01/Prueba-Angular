const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

app.use(cors());
app.use(express.json());

const STATISTICS = [
  { month: 'Enero', quantity: 10, total_sold: 1000 },
  { month: 'Febrero', quantity: 15, total_sold: 1500 },
  { month: 'Marzo', quantity: 20, total_sold: 2000 },
  { month: 'Abril', quantity: 25, total_sold: 2500 },
  { month: 'Mayo', quantity: 10, total_sold: 1000 },
  { month: 'Junio', quantity: 15, total_sold: 1500 },
  { month: 'Julio', quantity: 20, total_sold: 2000 },
  { month: 'Agosto', quantity: 25, total_sold: 2500 },
  { month: 'Septiembre', quantity: 10, total_sold: 1000 },
  { month: 'Octubre', quantity: 15, total_sold: 1500 },
  { month: 'Noviembre', quantity: 20, total_sold: 2000 },
  { month: 'Diciembre', quantity: 25, total_sold: 2500 },
];

let MARKERS = [
  { id: '1', lat: 40.4168, lng: -3.7038, title: 'Madrid' },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/login', (req, res) => {
  const { email, name } = req.body || {};

  if (!email || !name) {
    return res.status(400).json({ error: 'name and email required' });
  }

  const payload = { name, email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/api/statistics', requireAuth, (req, res) => {
  res.json(STATISTICS);
});

app.get('/api/markers', requireAuth, (req, res) => {
  res.json(MARKERS);
});

app.post('/api/markers', requireAuth, (req, res) => {
  const { title, lat, lng } = req.body || {};
  if (lat == null || lng == null) return res.status(400).json({ error: 'lat and lng required' });
  const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  const marker = { id, title: title || 'Nuevo marcador', lat: Number(lat), lng: Number(lng) };
  MARKERS.push(marker);
  res.status(201).json(marker);
});

app.put('/api/markers/:id', requireAuth, (req, res) => {
  const id = req.params.id;
  const { title, lat, lng } = req.body || {};
  const idx = MARKERS.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Marker not found' });
  if (title !== undefined) MARKERS[idx].title = title;
  if (lat !== undefined) MARKERS[idx].lat = Number(lat);
  if (lng !== undefined) MARKERS[idx].lng = Number(lng);
  res.json(MARKERS[idx]);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

