# OpenDesk Portal

A German government-styled portal for deploying and managing OpenDesk sovereign office solutions via the Codesphere Managed Services API.

## Overview

OpenDesk Portal provides a clean, professional interface for managing OpenDesk deployments - a suite of open-source office tools including video conferencing, wikis, document collaboration, and more.

## Features

- 🏛️ **German Government Aesthetic** - Bundesdesign-inspired UI with official styling
- 📦 **Service Management** - Create, edit, and delete OpenDesk instances
- 🧩 **Module Selection** - Enable/disable individual modules (Jitsi, XWiki, CryptPad, etc.)
- 🔄 **Real-time Status** - Live service status with automatic refresh
- 💾 **Local Caching** - Instant page loads with background updates
- 🔐 **API Authentication** - Secure token-based access to Codesphere API

## Components

| Component            | Description                                     |
| -------------------- | ----------------------------------------------- |
| `Header`             | Navigation with authentication status           |
| `ModuleGrid`         | Main layout with service list and create button |
| `ServiceAccordion`   | Expandable service cards with module tiles      |
| `CreateServiceModal` | Modal for creating/editing OpenDesk services    |
| `DetailsModal`       | View raw service details from API               |

## Modules

The following OpenDesk modules can be enabled per service:

- **Jitsi Meet** - Video conferencing
- **XWiki** - Knowledge base
- **Element** - Matrix chat
- **CryptPad** - Collaborative documents
- **Collabora** - Office suite
- **OX App Suite** - Email & calendar
- **OpenProject** - Project management

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Codesphere API access

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CS_TOKEN=your_api_token_here
NEXT_PUBLIC_CS_TEAM_ID=your_team_id
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Vanilla CSS with CSS Variables
- **State**: React useState/useEffect with localStorage caching
- **API**: Codesphere Managed Services REST API

## API Endpoints Used

- `GET /managed-services/providers` - List available providers
- `GET /managed-services?team={id}` - List deployed services
- `POST /managed-services` - Create new service
- `PATCH /managed-services/{id}` - Update service config
- `DELETE /managed-services/{id}` - Remove service
- `GET /managed-services/{id}/details` - Get service connection details

## License

Demo application for Codesphere GmbH
