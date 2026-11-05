import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const rawDatabaseURI = process.env.MONGODB_URI;
if (!rawDatabaseURI) {
  throw new Error("MONGODB_URI must be set to connect Better Auth to MongoDB.");
}
const databaseURI = rawDatabaseURI;
const databaseName = process.env.MONGODB_DATABASE || "bazar-dor";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("BETTER_AUTH_SECRET must be set.");
}
if (secret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters.");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_ID || process.env.GITHUB_CLIENT_ID;
const githubClientSecret =
  process.env.GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

// Lazy, pooled MongoClient singleton protected across development HMR
const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(databaseURI, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

const trustedOrigins = [
  baseURL,
  process.env.NEXT_PUBLIC_APP_URL,
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  baseURL,
  secret,
  trustedOrigins,
  logger: {
    level: "warn",
    log(level, message) {
      if (
        process.env.NODE_ENV === "development" &&
        message === "Failed to validate authorization code"
      ) {
        console.error(`[Social OAuth diagnostic]: ${message}`);
        return;
      }

      console[level](`[Better Auth]: ${message}`);
    },
  },
  database: mongodbAdapter(mongoClient.db(databaseName), {
    client: mongoClient,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),
    ...(facebookClientId && facebookClientSecret
      ? {
          facebook: {
            clientId: facebookClientId,
            clientSecret: facebookClientSecret,
          },
        }
      : {}),
    ...(discordClientId && discordClientSecret
      ? {
          discord: {
            clientId: discordClientId,
            clientSecret: discordClientSecret,
          },
        }
      : {}),
  },
});

export async function getCurrentSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("[Better Auth]: Session retrieval failed.", {
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    return null;
  }
}
