# Bigods CRM

Painel administrativo do Bigods Barber.

## Setup

```bash
yarn install
yarn dev
```

Configure a URL da API com:

```env
VITE_API_URL=http://localhost:8000/api
```

Se `VITE_API_URL` nao estiver definida, o painel usa `http://localhost:8000/api`.

## Multi-tenant inicial

O painel usa o usuario autenticado como fonte de tenant. O backend filtra dados pela empresa do token JWT, entao o CRM nao precisa escolher empresa manualmente no fluxo atual.

O nome exibido no topo vem de `user.company_name`, retornado no login. A marca visual fixa da barbearia antiga deve ser substituida gradualmente por dados da empresa logada quando esses campos existirem no backend.
