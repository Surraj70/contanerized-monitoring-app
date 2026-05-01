# 🐳 Containerized App with Monitoring & Alerting

A Node.js application fully containerized with Docker and deployed on **AWS EC2**, with a complete monitoring and alerting stack using **Prometheus, Grafana, and Alertmanager**.

---

## 📌 What This Project Does

- 🚀 Runs a Node.js REST API inside a Docker container that tracks custom metrics like request count and response time
- 📊 Collects host-level metrics (CPU, memory, disk) and container-level metrics automatically
- 📈 Displays everything on live Grafana dashboards
- 🔔 Sends a Slack alert automatically when CPU goes above 80% or memory goes above 85%

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Application | Node.js + Express |
| Containerization | Docker + Docker Compose |
| Metrics Collection | Prometheus |
| Visualization | Grafana |
| Host Metrics | Node Exporter |
| Container Metrics | cAdvisor |
| Alerting | Alertmanager + Slack Webhook |
| Cloud | AWS EC2 (Ubuntu 22.04) |

---

## 🏗️ Architecture

```
HTTP Requests
      │
      ▼
 Node.js App (port 3000)
      │ exposes /metrics
      ▼
 Prometheus (port 9090) ◄── Node Exporter (host CPU/RAM)
      │                 ◄── cAdvisor (container stats)
      ├──► Grafana (port 3001) → Dashboards
      │
      └──► Alertmanager (port 9093) → Slack Alerts
```

---

## 📁 Project Structure

```
├── src/
│   └── app.js                  # Node.js app with /metrics endpoint
├── prometheus/
│   ├── prometheus.yml          # Scrape config
│   └── alert_rules.yml         # CPU and memory alert rules
├── alertmanager/
│   └── alertmanager.yml        # Slack routing config
├── Dockerfile                  # App container build
├── docker-compose.yml          # All 6 services wired together
└── .gitignore
```

---

## ▶️ How to Run Locally

Make sure you have **Docker** and **Docker Compose** installed.

```bash
git clone https://github.com/YOUR_USERNAME/containerized-monitoring-app.git
cd containerized-monitoring-app
docker compose up -d
```

Then open:

| Service | URL |
|---|---|
| 🟢 Node.js App | http://localhost:3000 |
| 🟠 Prometheus | http://localhost:9090 |
| 🟣 Grafana | http://localhost:3001 |
| 🔴 Alertmanager | http://localhost:9093 |

> Grafana login: `admin` / `admin123`

---

## 📊 Grafana Dashboards

Import these community dashboards after connecting Prometheus as a data source:

| Dashboard | ID | What it shows |
|---|---|---|
| Node Exporter Full | `1860` | Host CPU, memory, disk, network |
| cAdvisor | `14282` | Per-container resource usage |

---

## 🚨 Alert Rules

| Alert | Condition | Severity |
|---|---|---|
| High CPU | CPU > 80% for 2 minutes | ⚠️ Warning |
| High Memory | Memory > 85% for 2 minutes | 🔴 Critical |
| App Down | App unreachable for 1 minute | 🔴 Critical |

---

## 📸 Screenshots

<img width="600" alt="1775378188591" src="https://github.com/user-attachments/assets/f54a7094-b3df-462b-a7f9-2f35214c277a" />
<img width="600" alt="1775378188717" src="https://github.com/user-attachments/assets/6fd1880c-8929-4338-a3af-d09091db1065" />
<img width="600" alt="1775378187860" src="https://github.com/user-attachments/assets/2ee4b5ef-08c3-4882-bd20-7a283fc165b2" />
<img width="600" alt="1775378188304" src="https://github.com/user-attachments/assets/2d71b6d3-7e3a-4feb-8945-5a294540f9db" />


---

## 💡 What I Learned

- 🔧 How to expose custom metrics from a Node.js app using `prom-client`
- 📡 How Prometheus scrapes and stores time-series data
- 📊 How to build Grafana dashboards from scratch and using community imports
- 📝 How to write PromQL alert expressions
- 💬 How to route alerts to Slack using Alertmanager webhooks
- ☁️ How to deploy a multi-container setup on a cloud VM using Docker Compose

---

## 🤝 Connect with Me

If you found this helpful or want to discuss the project, feel free to reach out on [LinkedIn](https://linkedin.com/in/Surraj70)!

⭐ Star this repo if it helped you build something similar!
