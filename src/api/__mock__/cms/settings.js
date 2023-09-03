function composeLinks(length) {
  return Array.from(new Array(length), (_, idx) => ({
    label: `Link ${idx + 1}`,
    url: `/link-${idx + 1}`,
  }))
}

const menuPrimary = [
  {
    label: 'Hem',
    url: '/',
    menuItems: composeLinks(5),
  },
  {
    label: 'Kurser',
    url: '/kurser',
    menuItems: composeLinks(5),
  },
  {
    label: 'Artiklar',
    url: '/artiklar',
  },
  {
    label: 'Ordkunskap',
    url: '/ordkunskap',
  },
  {
    label: 'FAQ',
    url: '/faq',
  },
  {
    label: 'Om Oss',
    url: '/om-oss',
  },
]

const menuFooter = [
  {
    label: 'About Maya Delorez',
    menuItems: composeLinks(3),
  },
  {
    label: 'Delivery info',
    menuItems: composeLinks(3),
  },
  {
    label: 'Company info',
    menuItems: composeLinks(6),
  },
]

export default {
  menus: {
    primary: menuPrimary,
    footer: menuFooter,
  },
  socials: ['instagram', 'youtube', 'facebook', 'pinterest', 'tiktok'].map((id) => ({
    id,
    url: `https://www.${id}.com/iciw`,
  })),
  storeMessage: 'lorem ipsum dolor sit amet',
  privacyPolicyPageUrl: '/privacy-policy',
  termsPageUrl: '/terms-and-conditions',
}
