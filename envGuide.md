# 🚀 Velora Environment Variables Setup Guide (Step-by-Step)

This guide walks you through configuring every environment variable for both **Local Development** and **Vercel Production Deployment** (`https://velora-psi-ten.vercel.app`).

---

## 📋 Vercel Production Environment Variables (Copy & Paste to Vercel)

Go to **Vercel Dashboard** -> **Your Project (velora)** -> **Settings** -> **Environment Variables** and add:

```env
# 1. Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/velora?retryWrites=true&w=majority

# 2. Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_key_32_characters
BETTER_AUTH_URL=https://velora-psi-ten.vercel.app

# 3. Google OAuth Provider
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# 4. Public Client URLs
NEXT_PUBLIC_APP_URL=https://velora-psi-ten.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://velora-psi-ten.vercel.app
```

---

## 🔑 Google Cloud Console Configuration (Fixes `redirect_uri_mismatch`)

1. Open **[Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)**.
2. Under **OAuth 2.0 Client IDs**, click your client (`Velora Web App`).
3. Under **Authorized JavaScript origins**, add:
   ```text
   http://localhost:3000
   http://127.0.0.1:3000
   https://velora-psi-ten.vercel.app
   ```
4. Under **Authorized redirect URIs**, add:
   ```text
   http://localhost:3000/api/auth/callback/google
   http://127.0.0.1:3000/api/auth/callback/google
   https://velora-psi-ten.vercel.app/api/auth/callback/google
   ```
   *(⚠️ Important: Ensure there is no trailing slash `/` at the end).*
5. Click **SAVE** at the bottom.

---

## 💻 Local Development `.env`

For running locally with `npm run dev`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/velora?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your_better_auth_secret_key_32_characters
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```
