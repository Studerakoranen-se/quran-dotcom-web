function composeLinks(length) {
  return Array.from(new Array(length), (_, idx) => ({
    label: `Link ${idx + 1}`,
    url: `/link-${idx + 1}`,
  }))
}

const menuPrimary = [
  {
    label: 'Brands',
    url: '/brands',
    links: composeLinks(5),
  },
  {
    label: 'New arrivals',
    url: '/new-arrivals',
    links: composeLinks(5),
  },
]

const menuFooter = [
  {
    label: 'About Maya Delorez',
    links: composeLinks(3),
  },
  {
    label: 'Delivery info',
    links: composeLinks(3),
  },
  {
    label: 'Company info',
    links: composeLinks(6),
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
