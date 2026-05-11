# 💰 Banking App - Angular Fintech Project

Projeto frontend desenvolvido em **Angular**, simulando uma aplicação
bancária com funcionalidades como login, cadastro, transferências,
depósitos, saque e gestão de perfil.

O objetivo é demonstrar domínio de Angular moderno, consumo de APIs,
autenticação via token e boas práticas de arquitetura frontend.

---

## 🚀 Tecnologias utilizadas

- Angular 21
- TypeScript
- Scss
- Angular Material
- Reactive Forms
- RxJS
- HttpClient
- LocalStorage (auth token)

---

## 📁 Estrutura do projeto

    src/app
     ├── core
     │    └── guards
     │    ├── interceptors
     │    ├── interfaces
     │    └── services (auth, client, balance)
     │
     ├── features
     │    ├── auth (login, register, pages)
     │    ├── home (pages, components)
     │    ├── transactions (components/deposit, components/transfer, components/withdraw)
     │    └── profile
     │
     │
     └── app.routes.ts

---

### 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js
- Angular CLI
- API backend em Python (obrigatório para funcionamento completo)

> ⚠️ Importante: o projeto frontend depende diretamente da API em Python para funcionar corretamente.

---

## 🔗 Dependência da API (OBRIGATÓRIO)

Esse projeto consome dados de uma API desenvolvida em Python.

Sem a API rodando:

- As requisições não irão funcionar
- Dados não serão carregados
- Algumas funcionalidades ficarão indisponíveis

### [Link da api](https://github.com/rafascampelo/case_tecnico_py)

### 👉 Para rodar o sistema completo:

1. Siga a documentação da API backend
2. Suba o servidor Python
3. Confirme que ela está rodando (ex: `http://127.0.0.1:8000`)
4. Depois inicie o frontend Angular

---

## ⚙️ Como rodar o Front-end

### Antes de prosseguir, confirme se o Node.js está instalado na sua máquina. Caso contrário, instale-o para continuar a configuração do projeto.

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar aplicação

```bash
ng serve
```

A aplicação estará disponível em:

    http://localhost:4200

---

## 🔐 Autenticação

O sistema utiliza autenticação via **JWT Token**.

Após o login:

- o token é armazenado no `localStorage`
- utilizado em requisições via interceptor HTTP
- protege rotas autenticadas

---

## 📌 Funcionalidades

### 🔑 Autenticação

- Login de usuário
- Registro de conta
- Logout

### 💸 Transações

- Depósito
- Saque
- Transferência entre contas
- Validação de saldo e valores

### 👤 Perfil

- Atualização de dados
- Alteração de senha
- Exclusão de conta

---

## 🧠 Arquitetura

O projeto segue uma arquitetura baseada em **feature modules + services
centralizados**:

- `core/services`: lógica de negócio e integração com API
- `features`: organização por domínio (auth, transactions, profile)
- `inject()` + `constructor` híbrido para DI (migração para Angular
  moderno)

---

## 🔄 Interceptors

O projeto utiliza **HTTP Interceptor** para:

- adicionar token automaticamente em requests
- proteger rotas autenticadas
- evitar repetição de código

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

- boas práticas Angular
- consumo de API REST
- autenticação JWT
- arquitetura escalável
- experiência de usuário (UI com Angular Material)

---

## 📌 Melhorias futuras

- [ ] Implementar validação completa em formulários críticos (login, cadastro, depósito e transações), com feedback claro e orientado ao usuário
- [ ] Validação em tempo real no input de senha (força e critérios)
- [ ] Testes unitários nos principais fluxos da aplicação
- [ ] Implementar extrato de transações
- [ ] Permitir seleção de perfil na busca e redirecionamento para transferência com e-mail já preenchido

---

## 👩‍💻 Autora

Projeto desenvolvido por Rafaela Campelo, baseado em um case técnico proposto.

---
