import type { PageServerLoad } from './$types';
import { releases as allReleases } from '$data/releases';
import type { ReleaseNote } from '$data/releases/types';

export const load: PageServerLoad = async () => {
  // Sort releases by date (newest first)
  const releases: ReleaseNote[] = [...allReleases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    releases,
  };
};
