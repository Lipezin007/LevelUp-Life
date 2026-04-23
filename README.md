🚀 LevelUp Life

Aplicação web gamificada para desenvolvimento pessoal baseada em hábitos e skills.

O usuário registra atividades diárias e ganha XP, evoluindo em diferentes áreas da vida como disciplina, inteligência, saúde e produtividade.

🧠 Conceito

O LevelUp Life transforma sua rotina em um sistema de progresso, parecido com um RPG:

🎯 Cada atividade gera XP

📈 Cada skill evolui com o tempo

📅 Quests diárias incentivam consistência

🏆 Sistema de conquistas

🤝 Sistema de amigos

🥇 Ranking global por habilidade

⚙️ Tecnologias

Frontend
HTML5
CSS3
JavaScript (Vanilla)
Canvas API (Radar de skills)
Backend
Node.js
Express
SQLite
JWT (autenticação)
bcryptjs (hash de senha)
Deploy
Render (backend)
GitHub (versionamento)
🔐 Autenticação
Login com email e senha
Token JWT armazenado no browser
Rotas protegidas com middleware
📡 Principais Endpoints
Auth
POST /auth/register
POST /auth/login
GET  /auth/me
Estado do usuário
GET  /api/state
PUT  /api/state
Amigos
GET  /api/friends
GET  /api/friends/requests
POST /api/friends/request
POST /api/friends/respond
Ranking
GET /api/rank/skills
🎮 Funcionalidades
✅ Sistema de XP por atividade
✅ Múltiplas skills (vida real)
✅ Radar visual de progresso
✅ Quests diárias
✅ Sistema de conquistas
✅ Histórico de atividades
✅ Sistema de amigos
✅ Ranking global
🧪 Como rodar localmente
# entrar na pasta do servidor
cd skill-routine/server

# instalar dependências
npm install

# rodar servidor
npm start

Acesse:

http://localhost:3000
🌍 Deploy

Backend hospedado no Render:

https://levelup-life-ncrx.onrender.com
🧩 Roadmap (futuro)

Notificações

App mobile (React Native / Expo)

Sistema de streak (sequência diária)

Dark mode aprimorado

Dashboard analytics

Integração com calendário

👨‍💻 Autor

Desenvolvido por Felippe Pedroso

GitHub: https://github.com/Lipezin007

📄 Licença

Este projeto está sob a licença MIT.
