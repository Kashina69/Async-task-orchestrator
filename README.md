
# Async Task Orchestrator

Simulates a distributed async job handler with:

- `Worker thread` execution
- Smart deduplication (cancel old jobs on setting change)
- Job queueing (max 4 active workers)
- CLI simulator
- Express API to trigger jobs

## 🧠 Key Features
- Handles **long-running tasks** without blocking the main thread.
- Automatically **cancels** previous jobs if a new one starts.
- **No polling or socket connections** – lightweight, efficient.
- Can scale to microservices and job queues (like Redis, Kafka).

## 🔧 Tech Stack
- Node.js
- Worker Threads
- Express (optional for demo)
- Queue/Job logic abstraction

## 📦 Use Case
Great for async-heavy APIs (AI, image processing, data crunching) where repeated calls should cancel previous work.

## 🏃‍♂️ Start server:

Install Required Packages:

```bash
npm i 
```
Run Server 

```bash
npm run start
```

Run simulator:

```bash
npm run test
```