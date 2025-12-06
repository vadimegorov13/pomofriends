interface ReleaseItem {
  id: string;
  title: string;
  items?: { id: string; text: string }[];
}

export interface ReleaseNote {
  id: string;
  version: string;
  shortTitle: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  features: ReleaseItem[];
  improvements: ReleaseItem[];
  bugFixes: ReleaseItem[];
}
