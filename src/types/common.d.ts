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

interface Media {
  _type: 'media'
  auto?: boolean
  alt?: string
  mediaType?: 'image' | 'video'
  breakpoints?: {
    xs?: {
      image?: {
        asset: Sanity.Asset
        crop?: Sanity.ImageCrop
        hotspot?: Sanity.ImageHotspot
      }
      video?: string
    }
    sm?: {
      image?: {
        asset: Sanity.Asset
        crop?: Sanity.ImageCrop
        hotspot?: Sanity.ImageHotspot
      }
      video?: string
    }
    md?: {
      image?: {
        asset: Sanity.Asset
        crop?: Sanity.ImageCrop
        hotspot?: Sanity.ImageHotspot
      }
      video?: string
    }
    lg?: {
      image?: {
        asset: Sanity.Asset
        crop?: Sanity.ImageCrop
        hotspot?: Sanity.ImageHotspot
      }
      video?: string
    }
    xl?: {
      image?: {
        asset: Sanity.Asset
        crop?: Sanity.ImageCrop
        hotspot?: Sanity.ImageHotspot
      }
      video?: string
    }
  }
  image?: {
    asset: Sanity.Asset
    crop?: Sanity.ImageCrop
    hotspot?: Sanity.ImageHotspot
  }
  video?: string
}
