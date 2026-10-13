# Order Tracking Portal — API-Driven Frontend Migration

Modular ES6 frontend using Webpack, Yarn workspaces, Axios, Redux Toolkit, REST API calls, and Jest. A mock Express-free REST adapter is included so the app runs locally without a real backend; swap the adapter for your service by setting `VITE_API_BASE_URL`.

## Requirements
- Node.js 18+ and Yarn (Classic or modern)

## Run on Windows PowerShell
```powershell
yarn install
yarn dev
```
Open the URL printed by Vite (normally http://localhost:5173).

## Test and production build
```powershell
yarn test
yarn build
```

## Architecture
- `packages/api-client`: Axios instance, request/response interceptors, mock API adapter.
- `packages/app`: React UI, Redux Toolkit slice/store, reusable order components.
- Root Yarn workspace and Webpack configuration for production bundling and code splitting.

## Notes
The demo uses deterministic local mock order data and simulated API latency. It does not establish the resume metrics (18 endpoints, 1,200 users, failure-rate changes, bundle sizes, coverage or peer-review counts); validate those against real test and deployment records.
