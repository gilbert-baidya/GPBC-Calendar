#!/bin/bash

# Start local development servers for GPBC Calendar
# This runs both the CMS proxy and web server

echo "Starting Netlify CMS Proxy Server on port 8081..."
npx netlify-cms-proxy-server &
PROXY_PID=$!

echo "Starting Web Server on port 8080..."
python3 -m http.server 8080 &
WEB_PID=$!

echo ""
echo "✅ Servers are running!"
echo "📝 Admin Panel: http://localhost:8080/admin/"
echo "🌐 Website: http://localhost:8080/"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $PROXY_PID $WEB_PID; exit" INT
wait
