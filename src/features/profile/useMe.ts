import { useCurrentUser, userDisplayName, userInitials } from "../../features/profile/useCurrentUser";

/** The signed-in person's name and initials, as the profile from IAM gives them. */
export function useMe() {
  const query = useCurrentUser();
  const profile = query.data?.data;
  return {
    name: userDisplayName(profile),
    initials: userInitials(profile)
  };
}
