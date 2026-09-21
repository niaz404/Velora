# 🚀 Velora Environment Variables Setup Guide

This guide walks you through configuring every environment variable for both **Local Development** and **Vercel Production Deployment** (`https://velora-psi-ten.vercel.app`).

---

## 📋 Vercel Production Environment Variables (Copy & Paste to Vercel)

Go to **Vercel Dashboard** -> **Your Project (velora)** -> **Settings** -> **Environment Variables** and add:

```env
# 1. Database Connection
MONGO_URI=mongodb+srv://tanimDb:7cRMoICFj1sRUM04@niazsshowcase.qanzpdr.mongodb.net/velora?retryWrites=true&w=majority

# 2. Better Auth Configuration
BETTER_AUTH_SECRET=A+rfn7ARKv2eeETXIwB1bQwCrbuWwOu2XWk7VI/I67Q=
BETTER_AUTH_URL=https://velora-psi-ten.vercel.app

# 3. Public Client URLs
NEXT_PUBLIC_APP_URL=https://velora-psi-ten.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://velora-psi-ten.vercel.app

# 4. Optional: Custom SMTP Email Provider (Gmail / Resend / Brevo / Mailgun)
# If omitted, password reset links will log securely to server console without error
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=Velora Atelier <no-reply@velora.luxury>
```

---

## 💻 Local Development `.env`

For running locally with `npm run dev`:

```env
MONGO_URI=mongodb+srv://tanimDb:7cRMoICFj1sRUM04@niazsshowcase.qanzpdr.mongodb.net/velora?retryWrites=true&w=majority
BETTER_AUTH_SECRET=A+rfn7ARKv2eeETXIwB1bQwCrbuWwOu2XWk7VI/I67Q=
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Optional SMTP (leave blank to log reset URLs directly in console)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=Velora Atelier <no-reply@velora.luxury>
```
