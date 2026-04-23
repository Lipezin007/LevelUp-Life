# 🚀 LevelUp Life

> Transforme sua rotina em um sistema de evolução — como um RPG da vida real.

O **LevelUp Life** é uma aplicação web gamificada que ajuda usuários a desenvolver disciplina, foco e consistência através de um sistema de progresso baseado em XP, níveis e conquistas.

---

## ✨ Visão do Produto

A ideia é simples:

> Se jogos conseguem manter pessoas engajadas por horas, por que não aplicar essa lógica na vida real?

O LevelUp Life transforma tarefas do dia a dia em progresso mensurável:

* 🎯 Ações viram XP
* 📈 XP vira evolução
* 🧠 Evolução vira resultado real

---

## 🖥️ Demonstração

🔗 **App online:**
https://levelup-life-ncrx.onrender.com

> ⚠️ O servidor pode demorar alguns segundos para iniciar (Render free tier)

---

## 🧠 Principais Features

* 🔐 **Autenticação segura (JWT)**
* 📊 **Sistema de Skills (nível + XP)**
* 🎮 **Gamificação completa da rotina**
* 📅 **Quests diárias dinâmicas**
* 🏆 **Sistema de conquistas**
* 📈 **Radar visual de progresso (Canvas)**
* 🤝 **Sistema de amigos**
* 🥇 **Ranking global por skill**
* 💾 **Persistência de estado por usuário**

---

## 🏗️ Arquitetura

### Frontend

* HTML + CSS + JavaScript (Vanilla)
* Canvas API (visualização de skills)
* Estrutura modular (dashboard/login separados)

### Backend

* Node.js + Express
* SQLite (persistência leve e eficiente)
* JWT para autenticação
* bcrypt para segurança de senha

### Infra

* Deploy via Render
* Versionamento com GitHub

---

## 📂 Estrutura do Projeto

```
skill-routine/
 ├── server/
 │   ├── src/
 │   │   └── server.js
 │   ├── public/
 │   │   ├── app.html
 │   │   ├── login.html
 │   │   └── assets/
 │   │       ├── css/
 │   │       ├── js/
 │   │       └── img/
 │   └── db.js
```

---

## 🔐 Fluxo de Autenticação

1. Usuário faz login/registro
2. Backend gera JWT
3. Token é armazenado no browser
4. Rotas protegidas usam middleware `auth`
5. Dados do usuário são carregados via `/auth/me`

---

## 📡 API (Resumo)

### Auth

```
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Estado

```
GET  /api/state
PUT  /api/state
```

### Social

```
GET  /api/friends
GET  /api/friends/requests
POST /api/friends/request
POST /api/friends/respond
```

### Ranking

```
GET /api/rank/skills
```

---

## 🎯 Diferenciais do Projeto

* 💡 Aplicação de **gamificação na vida real**
* 🧠 Modelo de progresso baseado em múltiplas habilidades
* ⚡ Backend simples, eficiente e escalável
* 🎨 Visual limpo com feedback imediato (UX focado em motivação)
* 🔄 Estado persistente por usuário

---

## 🧪 Rodando localmente

```bash
cd skill-routine/server
npm install
npm start
```

Acesse:

```
http://localhost:3000
```

---

## 🚧 Roadmap

* [ ] App mobile (React Native / Expo)
* [ ] Sistema de streak (consistência diária)
* [ ] Notificações inteligentes
* [ ] Dashboard de métricas
* [ ] Integração com calendário
* [ ] Sistema de metas personalizadas

---

## 👨‍💻 Autor

**Felippe Pedroso**

🔗 GitHub: https://github.com/Lipezin007

---

## 📄 Licença

MIT License
