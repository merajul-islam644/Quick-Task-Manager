import { useQuery } from "@tanstack/react-query";
import { blocksClient } from "../../lib/blocks/client";

type SignupSettings = { isSignUpEnable?: boolean; isEmailPasswordSignUpEnabled?: boolean };

export function useSignupEnabled(): boolean {
  const query = useQuery({
    queryFn: () => blocksClient.iam.signupSettings.get() as unknown as Promise<SignupSettings>,
    queryKey: ["iam", "signup-settings"],
    staleTime: 5 * 60_000
  });
  const settings = query.data;
  if (!settings) return false;
  return Boolean(settings.isSignUpEnable || settings.isEmailPasswordSignUpEnabled);
}
