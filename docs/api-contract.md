# AgoraMesh API Contract

## Authentication

POST /auth/login

POST /auth/register

POST /auth/logout

GET /auth/me

---

## Marketplace

GET /agents

GET /agents/{id}

POST /agents

PUT /agents/{id}

DELETE /agents/{id}

---

## Categories

GET /categories

---

## Search

GET /search

---

## Execute

POST /execute

---

## Payments

POST /payments/initiate

POST /payments/verify

---

## Wallet

GET /wallet

POST /wallet/connect

---

## Trust

GET /trust/{agent_id}

---

## Analytics

GET /dashboard

GET /transactions