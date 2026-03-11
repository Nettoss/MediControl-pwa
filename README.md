# 💊 MediControl PWA

> Gerenciador de medicamentos offline-first. Controle doses, estoque inteligente, custos, agenda, múltiplos pacientes, notificações e farmácias próximas via OpenStreetMap. 100% local, sem servidores.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## 📸 Visão Geral

MediControl é um aplicativo web progressivo (PWA) para gestão pessoal de medicamentos. Funciona completamente offline, não envia dados para nenhum servidor e pode ser instalado como app nativo no Android e iOS.

---

## ✨ Funcionalidades

### 🏠 Dashboard
- Cards de resumo: total de medicamentos, doses do dia, percentual de aderência e estoque crítico
- Gráfico de aderência semanal (7 dias)
- Painel de alertas (estoque zerado, estoque baixo)
- Próximas doses do dia com confirmação rápida

### ⏰ Agenda Diária
- Visualização por **Hoje**, **Esta Semana** ou **Este Mês**
- Confirmação de doses com um toque (toggle undo)
- Exportação em **PDF**, **CSV**, **ICS (.ics)** e compartilhamento via **WhatsApp**

### 📅 Calendário
- Navegação mensal com marcadores de dias com doses registradas
- Detalhamento de doses ao clicar em qualquer dia

### 💊 Medicamentos
- Cadastro completo: nome, dosagem, forma, categoria, horários, custo e observações
- Busca em tempo real
- Cards com barra de progresso de estoque
- Exportação em PDF, CSV e WhatsApp

### 📦 Inventário Inteligente

O sistema diferencia 3 tipos de estoque:

| Tipo | Formas | Comportamento |
|---|---|---|
| **Contagem exata** | Comprimido, Cápsula, Injeção | Subtrai 1 unidade por dose confirmada |
| **Volume** | Líquido | Subtrai mL configurados por dose |
| **Estimado** | Pomada, Inalador, Outro | Pergunta o nível visualmente a cada 7 dias |

### 💰 Custos
- Custo mensal e projeção anual por medicamento
- Total consolidado de todos os medicamentos

### 🏪 Farmácias Próximas
- Mapa interativo via **Leaflet + OpenStreetMap**
- Busca por texto (cidade, bairro) ou GPS
- Raio configurável: 1 km, 2 km, 5 km ou 10 km
- Links diretos para Google Maps e Waze

### 👥 Módulo Cuidar
- Gerenciamento de múltiplos pacientes (familiar, cônjuge, etc.)
- Troca rápida de paciente ativo pelo seletor no menu lateral
- Dados completamente isolados por paciente

### 🔔 Notificações
- Notificações nativas do navegador nos horários exatos dos medicamentos
- Alerta sonoro configurável (Web Audio API)
- Alerta de estoque baixo (< 10 unidades)

### 🔄 Backup & Restauração
- Exportação/importação de backup completo em **JSON**
- Atalho para upload manual no **Google Drive**
- Exportação de agenda para **Google Calendar**, **Apple Calendar** e **Outlook** (.ics)

---

## 📱 PWA — Progressive Web App

| Recurso | Status |
|---|---|
| Instalável (Android/iOS) | ✅ |
| Funcionamento offline | ✅ |
| Service Worker com cache | ✅ |
| Banner de instalação automático | ✅ |
| Atualização automática de versão | ✅ |
| Safe area (notch iPhone) | ✅ |
| Navegação inferior mobile | ✅ |
| Deep links por hash de URL | ✅ |
| Ícones 72px → 512px | ✅ |
| Shortcuts no manifest | ✅ |

---

## 🚀 Como Usar

### Opção 1 — Abrir diretamente no navegador

Basta abrir o arquivo `index.html` num servidor local com HTTPS. O Service Worker exige HTTPS (ou `localhost`).

```bash
# Com Python
python3 -m http.server 8080

# Com Node.js (npx)
npx serve .
```

Acesse `http://localhost:8080` no navegador.

### Opção 2 — Deploy estático (recomendado)

O MediControl pode ser hospedado em qualquer CDN estático com HTTPS:

- **Netlify** — arraste a pasta para [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `vercel deploy`
- **GitHub Pages** — habilite Pages no repositório
- **Cloudflare Pages** — conecte o repositório

### Opção 3 — Instalar como App

Após acessar via HTTPS:
- **Android (Chrome):** Menu → *Instalar app* ou toque no banner que aparece automaticamente
- **iPhone/iPad (Safari):** Compartilhar → *Adicionar à tela de início*

---

## 📁 Estrutura do Projeto

```
medicontrol-pwa/
├── index.html          # App completo (HTML + CSS + JS em arquivo único)
├── sw.js               # Service Worker (cache offline, push notifications)
├── manifest.json       # Manifesto PWA (ícones, nome, shortcuts)
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## 🔒 Privacidade

Todos os dados são armazenados exclusivamente no **localStorage** do dispositivo do usuário. Nenhuma informação é transmitida para servidores externos. Os únicos serviços externos utilizados são:

- **Google Fonts** — carregamento das fontes (pode ser removido para uso 100% offline)
- **OpenStreetMap / Overpass API / Nominatim** — somente na tela de Farmácias, mediante interação do usuário
- **Leaflet (unpkg.com)** — biblioteca de mapas (cacheada pelo Service Worker após primeiro carregamento)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 / CSS3 | Estrutura e estilo |
| JavaScript (ES2020+) | Lógica da aplicação (SPA puro, sem frameworks) |
| Web Storage API | Persistência de dados (localStorage) |
| Service Worker API | Cache offline e notificações push |
| Web Notifications API | Alertas de horário de medicamentos |
| Web Audio API | Sons de confirmação |
| Geolocation API | Localização GPS para busca de farmácias |
| Leaflet.js | Mapas interativos |
| OpenStreetMap + Overpass | Dados de farmácias próximas |
| Nominatim | Geocodificação por texto |
| Google Fonts (DM Sans + Space Mono) | Tipografia |

---

## 🧩 Arquitetura

O app é uma **SPA (Single Page Application)** sem frameworks ou dependências de build. Todo o estado é mantido em memória e persistido via `localStorage`. A troca de painéis é feita por manipulação direta do DOM, com renderização programática via template strings.

```
Estado global (state)
├── user          — usuário logado
├── activePatient — ID do paciente ativo
├── patients[]    — lista de pacientes
├── data{}        — dados por paciente (meds[], doses{})
└── config{}      — notificações, som, alertas

Fluxo de dados
localStorage → load() → state → render*() → DOM
DOM events → state mutations → save() → localStorage
```

---

## 📄 Licença

MIT © MediControl

---

> Feito com ❤️ para ajudar no cuidado diário com a saúde.
