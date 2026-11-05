# বাজার দর | Bazar Dor

## 📝 Project Description

Bazar Dor is a Bengali-language web application for browsing daily prices of common market products in Bangladesh. It displays price changes and category-based product listings, with market-level price ranges and account features for signed-in users.

The product and category catalog is fetched from the BazaarDor API and revalidated every 60 seconds. Authentication data is stored in MongoDB.

## 🧰 Technologies Used

- **Next.js 16** — App Router and server-rendered pages
- **React 19** and **TypeScript**
- **Tailwind CSS 4** and **DaisyUI 5** — styling and UI components
- **MongoDB** with the MongoDB Node.js driver
- **Better Auth** with its MongoDB adapter — email/password and optional social sign-in
- **Sonner** — user notifications
- **ESLint 9** — linting

## ✨ Key Features

- Bengali interface with localized dates, prices, and numerals.
- Home page sections for products with rising and falling prices, plus the full product catalog.
- Horizontally scrolling ticker showing catalog prices and price changes.
- Category navigation and category-specific product listings.
- Product detail pages with today, yesterday, and last-week prices and market-level minimum/maximum prices.
- Email/password sign-up and sign-in.
- Optional Google, GitHub, Facebook, and Discord sign-in when each provider is configured.
- Protected product details and profile pages with sign-in redirects.
- Profile display, name updates, and sign-out.

## 🗂️ Project Structure

```text
.
├── public/                 # Static assets, including the home-page hero image
├── src/
│   ├── app/                # App Router pages, layouts, loading states, and auth route
│   │   ├── api/auth/       # Better Auth API handler
│   │   ├── category/       # Category product listings
│   │   ├── product/        # Product details
│   │   ├── profile/        # Signed-in profile pages
│   │   ├── signin/         # Sign-in page
│   │   └── signup/         # Sign-up page
│   ├── components/         # Shared UI and authentication components
│   ├── lib/                # Auth setup, API access, formatting, and helpers
│   └── proxy.ts            # Session-cookie route protection
├── .env.example            # Environment variable names and placeholders
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies and npm scripts
```

## 🚀 Installation Instructions

### Prerequisites

- Node.js compatible with the project's Next.js version
- npm
- A MongoDB instance (local or MongoDB Atlas) for authentication

### Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/nafizfuad-web/Assignment--7.git
   cd Assignment--7
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a local environment file:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   On macOS or Linux, use `cp .env.example .env.local`.

4. Configure the required environment variables described below. Social sign-in is optional.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

### Available npm scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server (after building) |
| `npm run lint` | Run ESLint |

## 🔐 Environment Variables Setup

Set these values in `.env.local` for local development and in your hosting provider's environment settings for deployment. Never commit `.env.local` or real credentials.

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection URI used by Better Auth |
| `MONGODB_DATABASE` | No | Authentication database name; defaults to `bazar-dor` |
| `BETTER_AUTH_SECRET` | Yes | Better Auth secret; use a random value of at least 32 characters |
| `BETTER_AUTH_URL` | Recommended | Canonical application URL used by the auth server |
| `NEXT_PUBLIC_APP_URL` | Recommended | Application origin used by the auth client and trusted-origin configuration |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | No | Google OAuth credentials; both are needed to enable Google sign-in |
| `GITHUB_ID` / `GITHUB_SECRET` | No | GitHub OAuth credentials; both are needed to enable GitHub sign-in |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | No | Legacy GitHub credential names; used when the corresponding `GITHUB_ID` / `GITHUB_SECRET` is not set |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | No | Optional Facebook OAuth credentials |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | No | Optional Discord OAuth credentials |

Create a secure Better Auth secret with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

For OAuth, configure each provider's application with the matching site origin and callback URL. The callback pattern is `https://YOUR-DOMAIN/api/auth/callback/{provider}`; for local development, replace the origin with `http://localhost:3000`. Google and GitHub setup details are available in [SOCIAL_LOGIN_SETUP.md](./SOCIAL_LOGIN_SETUP.md).

## 🔌 API Information and Endpoints

The application has one local API route, handled by Better Auth:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET`, `POST` | `/api/auth/[...all]` | Better Auth handler for authentication requests, sessions, and configured provider callbacks |
| `GET` | `/api/auth/callback/{provider}` | OAuth callback handled through the auth route, for a configured provider |

The product catalog is provided by an external API; these are fetched server-side and cached/revalidated for 60 seconds:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `https://api.api-store.workers.dev/api/bazardor/products` | Product prices and market data |
| `GET` | `https://api.api-store.workers.dev/api/bazardor/categories` | Product categories |

There are no separately implemented product or category API routes in this repository. The main application pages are `/`, `/category/{slug}`, `/product/{slug}`, `/signin`, `/signup`, `/profile`, and `/profile/update`. Product details and profile pages require a signed-in user.

## ☁️ Deployment Information

This is a standard Next.js application and can be deployed to Vercel or another host that supports Next.js. For a production deployment:

1. Connect the repository to the hosting provider and use the project's npm build script (`npm run build`).
2. Set the required environment variables in the provider's secure environment settings. Use the production origin for `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL`.
3. Allow the deployed application to connect to the configured MongoDB instance.
4. Add the production OAuth callback URL(s) to each provider that you enable.
5. Deploy and verify the home page, authentication flow, catalog API access, and protected pages.

For a self-managed Node.js deployment, build with `npm run build`, then run `npm run start`.

## 👩‍💻 Developer Information

- **Project:** Bazar Dor (বাজার দর)
- **Repository maintainer:** [nafizfuad-web](https://github.com/nafizfuad-web)
- **Source repository:** [nafizfuad-web/Assignment--7](https://github.com/nafizfuad-web/Assignment--7)
