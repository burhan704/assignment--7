"use client";

import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import type { SocialProvider } from "@/lib/social-providers";

type AuthFormProps = {
  mode: "signin" | "signup";
  callbackURL: string;
  socialError?: string;
  socialProviders: SocialProvider[];
};

export function AuthForm({
  mode,
  callbackURL,
  socialError,
  socialProviders,
}: AuthFormProps) {
  if (mode === "signup") {
    return (
      <SignUpForm
        callbackURL={callbackURL}
        socialError={socialError}
        socialProviders={socialProviders}
      />
    );
  }

  return (
    <SignInForm
      callbackURL={callbackURL}
      socialError={socialError}
      socialProviders={socialProviders}
    />
  );
}
