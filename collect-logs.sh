#!/bin/bash
# scripts/collect-logs.sh

mkdir -p logs
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

for SERVICE in app prometheus grafana alertmanager node_exporter cadvisor; do
  echo "Collecting logs for $SERVICE..."
  docker compose logs --tail=100 $SERVICE > logs/${SERVICE}_${TIMESTAMP}.log
done

echo "Logs saved to ./logs/"