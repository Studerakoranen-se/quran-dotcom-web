interface Props extends Record<string, unknown> {
  children?: Block[]
}

interface Block {
  name?: string
  props?: Props
}

interface Page extends Record<string, unknown> {
  blocks?: Block[]
}

interface Chapter {
  id?: number | string;
  localizedId?: string;
  versesCount: number;
  bismillahPre: boolean;
  revelationOrder: number;
  revelationPlace: string;
  pages: Array<number>;
  nameComplex: string;
  transliteratedName: string;
  nameArabic: string;
  translatedName: {
    name: string;
    languageName: string;
  } | string;
  defaultSlug: {
    slug: string;
    locale: string;
  };
  slug?: string;
  slugs?: {
    slug: string;
    locale: string;
  }[];
}
