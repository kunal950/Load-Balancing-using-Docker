#  Nginx Load Balancing with Node.js and Docker


This project demonstrates how to set up **Nginx load balancing** for multiple **Node.js servers** running inside **Docker containers**.  
It helps understand how Nginx distributes traffic, handles server failures, and restores balance when nodes recover.

---

###  Project Overview

We run:
- 3 Node.js servers (each showing its port)
- 1 Nginx server that load balances between them

Each Node server prints its **port number** in the browser to visualize which server handled the request.

---
###  Prerequisites

Before you start, ensure you have:

- [Docker](https://www.docker.com/get-started) installed  
- [Docker Compose](https://docs.docker.com/compose/) installed  
- Git installed (`git --version`)

---

#  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/kunal950/Load-Balancing-using-Docker.git
cd Load-Balancing
```
### 2. Build and Start Containers

Run all containers in detached mode:
```bash
docker-compose up -d
```
This starts:
- Node containers on ports 3000, 3001, 3002
- Nginx load balancer on port 3003

---

###  Test the Load Balancer
Open your browser and visit:

```bash
http://localhost:3003
```

Refresh the page several times —  
you’ll notice different responses showing:

```bash
Hello from port 3000
Hello from port 3001
Hello from port 3002
```
This confirms Nginx is distributing requests evenly.

--- 

###  Test Fault Tolerance

Stop one Node server (e.g., node2):

```bash
docker stop node2
```
Now, refresh http://localhost:3003 again.  
Nginx will automatically skip the stopped server and continue balancing between the remaining nodes

To restore:
```bash
docker start node2
```
---

###  Run Each Server on Different Machines

If you run servers on different hosts, update your nginx.conf:

```nginx
nginx

upstream backend_servers {
    server <machine1-ip>:3000;
    server <machine2-ip>:3001;
    server <machine3-ip>:3002;
}
```

Then rebuild your Nginx container:

```bash
docker-compose up -d --build nginx
```
---
###  Stop and Clean Up

To stop all containers:

```bash
docker-compose down
```

To rebuild everything fresh:
```bash
docker-compose up -d --build
```
---

###  Learning Goals

- Understand Nginx reverse proxy and load balancing
- Learn Docker networking and container orchestration
- Test fault tolerance and recovery using Nginx

---

### Example Output
when every server is running:
```bash
Hello from port 3000
Hello from port 3001
Hello from port 3002
```

When one server stops:
```bash
Hello from port 3000
Hello from port 3002
```