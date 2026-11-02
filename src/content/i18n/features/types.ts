/**
 * The copy of one /features/<slug> page. Every page shares one layout
 * (FeatureDetailPage); icons, links and colours stay in the page file, the
 * words live here. Arrays that line up with icons in the page (panel items,
 * audiences, mock rows) must keep the same length and order in every language.
 */
export interface FeaturePageCopy {
  meta: {
    /** <= 60 characters with " | TajirPoint" when it fits. */
    title: string;
    /** 140-160 characters in English; Urdu/Arabic aim for 120-160. */
    description: string;
  };
  /** Breadcrumb name of this page. */
  breadcrumb: string;
  badge: string;
  /** Headline, split over two lines on wide screens. */
  headline: [string, string];
  sub: string;
  /** The small always-dark device mock in the hero. */
  mock: { title: string; rows: Array<{ label: string; value: string }> };
  problem: { title: string; body: string };
  solution: {
    title: string;
    points: string[];
    /** Optional amber note under the list (scope note or reassurance). */
    note?: string;
  };
  /** The card beside the list: a heading and three short items. */
  panel: { title: string; items: Array<{ title: string; body: string }> };
  /** Labels of the "Who this helps most" links, in the page's order. */
  audiences: string[];
  faqs: Array<{ question: string; answer: string }>;
  cta: { headline: string; body?: string; secondary: string };
}

/** Words every feature page shares. */
export interface FeatureCommonCopy {
  allBusinesses: string;
  startFree: string;
  bookDemo: string;
  problemEyebrow: string;
  solutionEyebrow: string;
  whoHelps: string;
  questions: string;
}
