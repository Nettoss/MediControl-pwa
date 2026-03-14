# 💊 MediControl

**Gerenciador de medicamentos offline-first** — controle seus remédios, horários, estoque, custos e consultas médicas com privacidade total. Todos os dados ficam salvos **apenas no seu dispositivo**, sem servidores ou contas externas.

---

## 🚀 Como usar

### Opção 1 — Abrir direto no navegador
Baixe o arquivo `index.html` e abra diretamente no Chrome, Edge, Firefox ou Safari. Não precisa de servidor ou instalação.

### Opção 2 — GitHub Pages (recomendado para celular)
1. Crie um repositório público no GitHub
2. Faça upload dos 3 arquivos: `index.html`, `sw.js` e `.nojekyll`
3. Vá em **Settings → Pages → Branch: main → Save**
4. Acesse em `https://seu-usuario.github.io/nome-do-repositorio`

### Opção 3 — Instalar como App (PWA)
Com o app aberto via GitHub Pages:
- **Android Chrome:** Menu `⋮` → *Adicionar à tela inicial* ou *Instalar app*
- **iPhone/iPad Safari:** Botão Compartilhar → *Adicionar à tela de início*

---

## 🔐 Primeiro acesso

1. Na tela de login, digite um **nome de usuário** e uma **senha** (mínimo 4 caracteres)
2. Clique em **Criar Nova Conta**
3. Nas próximas visitas, use **Entrar** com as mesmas credenciais

> Os dados são salvos no `localStorage` do navegador — exclusivos ao dispositivo e navegador onde foram criados.

---

## 📋 Funcionalidades

### 📊 Dashboard
Visão geral do dia: doses tomadas vs. prescritas, percentual de aderência, alertas de estoque crítico, próximas doses do dia e gráfico de aderência semanal.

### ⏰ Agenda
Lista de doses organizadas por dia, com botões para marcar cada dose como tomada. Suporta visualização de **hoje**, **7 dias** e **30 dias**.

- **Exportar PDF** — relatório formatado com nome, data, dia da semana, horários, observações, estoque e status
- **Exportar CSV** — planilha com todos os campos para uso em Excel / Google Sheets
- **Compartilhar WhatsApp** — resumo do dia em texto formatado

### 📅 Calendário
Visão mensal com indicadores visuais por dia:
- 🟢 Verde — doses tomadas
- 🟠 Laranja — doses pendentes
- 🔵 Azul — consulta ou exame agendado

Clique em qualquer dia para ver a agenda detalhada de medicamentos e consultas.

**Exportar / Importar .ics**
O formato `.ics` (iCalendar) permite importar a agenda do MediControl no Google Calendar, Outlook, Apple Calendar e outros apps de agenda. O arquivo exportado inclui os medicamentos dos próximos 30 dias e todas as consultas cadastradas.

### 💊 Medicamentos
Cadastro completo de medicamentos com:
- Nome, dosagem, forma farmacêutica e categoria (Contínuo / Temporário / Se necessário)
- Frequência: **diária** (dias da semana), **semanal** (semanas e dia específico) ou **mensal** (dias do mês)
- Horários no formato 24h com seletor visual HH:MM
- Ciclo de repetição (ex: tomar 21 dias, pausar 7 dias)
- Custo mensal e observações

Cada medicamento na lista tem botões de **Ver detalhes**, **Editar** e **Excluir**.

### 📦 Inventário
Controle de estoque com botões +/− para ajuste rápido. Exibe dias estimados restantes com base na frequência de uso. Indica em cores quando o estoque está crítico (menos de 10 unidades).

### 💰 Custos
Custo mensal por medicamento, total mensal e projeção anual. Útil para controle financeiro de tratamentos contínuos.

### 🏥 Consultas Médicas *(módulo separado da Agenda de medicamentos)*
Cadastro de consultas e exames com:
- Nome do médico / profissional e especialidade
- Motivo: Consulta, Exame, Retorno ou Outro
- Local: Consultório, Clínica, Hospital ou Online
- Endereço / instituição
- Data e hora (formato 24h)
- Observações / preparo (ex: jejum, convênio)

Lista agrupada em **Próximas** e **Passadas**, com botões Editar e Excluir. As consultas aparecem no Calendário com ponto azul e são incluídas no detalhe de cada dia.

- **Exportar PDF** — relatório formatado de todas as consultas
- **Exportar .ics** — arquivo de calendário para importar no Google Calendar, Outlook etc.

### 🏪 Farmácias
Busca de farmácias próximas via **OpenStreetMap** (gratuito, sem necessidade de chave de API). Suporta busca por cidade/bairro ou por localização GPS. Exibe mapa interativo com marcadores e distância em metros.

### 👥 Módulo Cuidar
Gerenciamento de medicamentos para múltiplos pacientes (familiar, cônjuge, filho, pai/mãe etc.). Cada paciente tem sua própria lista de medicamentos, doses e histórico. Troca rápida entre pacientes pelo seletor no topo da barra lateral.

### ⚙️ Configurações
- Notificações do navegador nos horários de medicação
- Alerta sonoro (beep)
- Alerta de estoque baixo

### 🔄 Backup / Importação
- **Exportar JSON** — salva todos os dados (medicamentos, doses, consultas, pacientes, configurações) em arquivo local
- **Importar JSON** — restaura a partir de um backup (substitui dados atuais)
- **Zona de perigo** — limpar dados do paciente ativo ou apagar tudo

---

## 📱 Compatibilidade

| Plataforma | Navegador | Status |
|---|---|---|
| Android | Chrome | ✅ Completo + instalável |
| Android | Firefox | ✅ Funcional |
| iPhone / iPad | Safari | ✅ Completo + instalável |
| Windows / Mac | Chrome / Edge | ✅ Completo + instalável |
| Windows / Mac | Firefox | ✅ Funcional |

> **Nota:** Service Worker (cache offline e instalação como app) só funciona via HTTPS (GitHub Pages, servidor) — não funciona ao abrir o arquivo `index.html` diretamente. As demais funcionalidades funcionam normalmente no modo `file://`.

---

## 🗂️ Estrutura de arquivos

```
MEDICONTROL-v7/
├── index.html     # App completo — todo o HTML, CSS e JavaScript em um único arquivo
├── sw.js          # Service Worker — habilita modo offline e instalação como PWA
└── .nojekyll      # Necessário para GitHub Pages processar corretamente os arquivos
```

---

## 🔒 Privacidade

- **Zero servidores** — nenhum dado é transmitido pela internet
- **Zero rastreamento** — sem analytics, sem cookies de terceiros, sem anúncios
- **Armazenamento local** — dados ficam no `localStorage` do navegador no seu dispositivo
- **Código aberto** — todo o código está visível no `index.html`, auditável por qualquer pessoa

---

## 💾 Formato do Backup (JSON)

```json
{
  "version": "7.1",
  "exportedAt": "2026-03-14T...",
  "patients": [...],
  "data": {
    "p_usuario": {
      "meds": [...],
      "doses": { "2026-03-14_m_123_08:00": "2026-03-14T08:03:00Z" }
    }
  },
  "consultas": [...],
  "config": { "notif": false, "sound": false, "stockAlert": true }
}
```

---

## 🛠️ Tecnologias

- **HTML5 / CSS3 / JavaScript** puro — sem frameworks, sem dependências externas de runtime
- **LocalStorage** — persistência de dados local
- **Service Worker API** — modo offline e instalação PWA
- **Notification API** — lembretes de horário
- **Web Audio API** — alerta sonoro
- **Leaflet.js** (carregado sob demanda) — mapas para busca de farmácias
- **OpenStreetMap + Nominatim + Overpass API** — dados de localização e farmácias, gratuitos

---

## 📄 Licença

Uso pessoal livre. Projeto desenvolvido para fins de saúde pessoal e familiar.

---

*MediControl v7 — Desenvolvido com foco em privacidade, simplicidade e uso offline-first.*
