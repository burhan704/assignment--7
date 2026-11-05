import { AuthShell } from "@/components/auth/AuthParts";
import SignUpForm from "@/components/auth/SignUpForm";
import { getSafeCallbackURL } from "@/lib/auth-redirect";
import { getEnabledSocialProviders } from "@/lib/social-providers";
import { getSocialAuthErrorMessage } from "@/lib/social-auth-errors";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; error?: string | string[] }>;
}) {
  const { callbackURL, error } = await searchParams;
  const socialProviders = getEnabledSocialProviders();

  return (
    <AuthShell
      subtitle="বাজারদরের তথ্য পেতে নতুন অ্যাকাউন্ট খুলুন।"
      title="অ্যাকাউন্ট তৈরি করুন"
    >
      <SignUpForm
        callbackURL={getSafeCallbackURL(callbackURL)}
        socialError={error ? getSocialAuthErrorMessage(error) : undefined}
        socialProviders={socialProviders}
      />
    </AuthShell>
  );
}
