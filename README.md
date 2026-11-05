This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## বাজারদর সেটআপ

প্রথমে local environment config তৈরি করুন:

```powershell
Copy-Item .env.example .env.local
```

`.env.local`-এ `BETTER_AUTH_SECRET`-এর জন্য অন্তত ৩২ অক্ষরের একটি random secret থাকবে (বা `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` দিয়ে তৈরি করা)। MongoDB চালু রাখুন; `MONGODB_URI`-তে connection URI এবং `MONGODB_DATABASE`-এ database name হিসেবে `bazar-dor` দিন। Google বা GitHub sign-in চালু করতে `.env.example`-এ থাকা সংশ্লিষ্ট provider-এর client ID ও secret পূরণ করুন।

```bash
npm run dev
```

MongoDB-তে auth collection Better Auth নিজে তৈরি করে; আলাদা schema migration নেই। Catalog-এর পণ্য ও বিভাগ BazaarDor API থেকে আসে। Category page public; product details এবং profile page sign-in ছাড়া খোলা যাবে না। Route protection `src/proxy.ts` এবং protected server page-এ করা হয়।
