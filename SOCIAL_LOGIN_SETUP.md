# Google ও GitHub সোশ্যাল লগইন সেটআপ

## Callback URL

বর্তমান Next.js dev server-এর port `3000`; Better Auth callback route `/api/auth/callback/{provider}`।

| Provider | Localhost | Production |
|---|---|---|
| Google | `http://localhost:3000/api/auth/callback/google` | `https://YOUR-DOMAIN/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` | `https://YOUR-DOMAIN/api/auth/callback/github` |

`YOUR-DOMAIN`-এর জায়গায় production domain দিন। OAuth Console-এ callback URL হুবহু মিলতে হবে—scheme, port ও path-সহ।

## Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/)-এ project তৈরি বা নির্বাচন করুন।
2. **Google Auth Platform → Branding/Audience**-এ OAuth consent screen-এর app name, support email ও প্রয়োজনীয় তথ্য দিন। Testing mode-এ থাকলে **Audience → Test users**-এ পরীক্ষা করা Google account যোগ করুন।
3. **Google Auth Platform → Clients → Create client** নির্বাচন করুন; Application type হিসেবে **Web application** দিন।
4. **Authorized JavaScript origins**-এ `http://localhost:3000` ও `https://YOUR-DOMAIN` যোগ করুন।
5. **Authorized redirect URIs**-এ উপরের দুইটি Google callback URL যোগ করুন।
6. Client ID ও Client secret কপি করে যথাক্রমে `GOOGLE_CLIENT_ID` এবং `GOOGLE_CLIENT_SECRET`-এ রাখুন।

## GitHub OAuth App

1. GitHub profile menu → **Settings → Developer settings → OAuth Apps → New OAuth App** খুলুন।
2. Application name দিন। **Homepage URL**-এ `http://localhost:3000` বা `https://YOUR-DOMAIN` দিন।
3. **Authorization callback URL**-এ localhost ও production-এর উপরের GitHub callback URL যোগ করুন। GitHub OAuth App-এ একাধিক callback URL যোগ করা যায়।
4. **Register application** চাপুন; Client ID কপি করে `GITHUB_ID`-এ রাখুন।
5. **Generate a new client secret** চাপুন; secret কপি করে `GITHUB_SECRET`-এ রাখুন।

## Environment variables

Project root-এর `.env.local`-এ values বসান। `.env.local` ও `.env` Git-ignored; `.env.example` শুধু placeholder-এর নমুনা।

```env
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=এখানে_তৈরি_করা_secret_দিন
GOOGLE_CLIENT_ID=Google_Client_ID
GOOGLE_CLIENT_SECRET=Google_Client_Secret
GITHUB_ID=GitHub_Client_ID
GITHUB_SECRET=GitHub_Client_Secret
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DATABASE=bazar-dor
```

`MONGODB_DATABASE`-এ অ্যাপের সঠিক MongoDB database name দিন। এই Atlas সেটআপে এটি `test`; অন্য database ব্যবহার করলে সেই নাম দিন। `sample_mflix` একটি sample database, তাই অ্যাপের database হিসেবে সেটি নির্বাচন না করলে ব্যবহার করবেন না।

Next.js project root-এর `.env.local` ফাইল থেকেই local environment variables load করে। `.env copy.local`-এর মতো backup ফাইল load হয় না; OAuth credentials শুধু `.env.local`-এ রাখুন। Google Client ID ও Client secret একই Google OAuth Web client-এর হতে হবে।

PowerShell-এ Better Auth secret তৈরি করুন:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Production hosting-এর environment settings-এ `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_SECRET`, `MONGODB_URI`, `MONGODB_DATABASE` ও OAuth credentials দিন। `MONGODB_DATABASE` অবশ্যই সেট করতে হবে। দুই URL-ই production origin হবে, যেমন `https://YOUR-DOMAIN`। Secret source control-এ commit করবেন না।

`.env.local` সংরক্ষণের পরে dev server restart করুন (`Ctrl+C`, তারপর `npm run dev`)। Client ID বা Client secret—কোনোটি না থাকলে সংশ্লিষ্ট social login button disabled থাকবে; UI-তে **“এই লগইন পদ্ধতি এখনো সেটআপ করা হয়নি”** দেখা যাবে।

## পরীক্ষা

1. MongoDB চালু রেখে `npm run dev` চালান; `/signin` বা `/signup` খুলুন।
2. Google button চাপুন, Google account দিয়ে অনুমতি দিন, তারপর `/profile` বা নির্দিষ্ট `callbackURL`-এ ফেরা যাচাই করুন।
3. GitHub button দিয়ে একইভাবে login ও redirect পরীক্ষা করুন।
4. আগে থেকে থাকা email/password account-এর email verified না হলে সেটি আগে verify করতে হবে। তারপর একই verified email-সহ Google/GitHub account ব্যবহার করুন। Better Auth account-টি বিদ্যমান user-এর সঙ্গে link করবে; একই email-এর দ্বিতীয় user তৈরি হবে না। আলাদা বা unverified email হলে account link হবে না এবং Bengali error দেখাবে।

## সাধারণ সমস্যা ও সমাধান

| Error | সমাধান |
|---|---|
| `redirect_uri_mismatch` | Provider Console-এর callback URL code-এ ব্যবহৃত URL-এর সঙ্গে হুবহু মিলিয়ে নিন। `http`/`https`, port `3000`, এবং `/api/auth/callback/google` বা `/api/auth/callback/github` path যাচাই করুন। |
| `access_denied` | Login অনুমতি বাতিল হয়েছে। আবার চেষ্টা করুন; Google consent screen Testing mode-এ থাকলে account-টিকে Test users-এ যোগ করুন। |
| `invalid_client` | Google Cloud-এর একই OAuth Web client থেকে Client ID ও Client secret ব্যবহার হচ্ছে কি না দেখুন। Secret invalid হলে সেই client-এর নতুন secret তৈরি করে `.env.local`-এর `GOOGLE_CLIENT_SECRET` আপডেট করুন; client বদলালে `GOOGLE_CLIENT_ID` ও `GOOGLE_CLIENT_SECRET` দুটোই একই client-এর pair দিয়ে বদলান। তারপর dev server restart করুন। |
| `OAuthAccountNotLinked` / `account_not_linked` | আগে থাকা account এবং Google/GitHub—দুই email-ই verified এবং একই কি না দেখুন। ভিন্ন email বা unverified local account স্বয়ংক্রিয়ভাবে link করা হয় না। |
| Button disabled / “এই লগইন পদ্ধতি এখনো সেটআপ করা হয়নি” | সংশ্লিষ্ট provider-এর Client ID ও Client secret দুটোই `.env.local`-এ দিন এবং dev server restart করুন। |
| Network / server error | Internet connection, MongoDB, `BETTER_AUTH_URL`, এবং browser ও server logs যাচাই করুন। |
