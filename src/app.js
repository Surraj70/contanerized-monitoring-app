const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Auto-collect default Node.js metrics (CPU, memory, event loop lag)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Custom counter: track HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Custom histogram: track request duration
const requestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Middleware: record every request
app.use((req, res, next) => {
  const end = requestDuration.startTimer({ method: req.method, route: req.path });
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
    end();
  });
  next();
});

// Main route
app.get('/', (req, res) => {
  res.json({ message: 'Hello! App is running.', timestamp: new Date().toISOString() });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Prometheus metrics endpoint — Prometheus scrapes this
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));