import React from 'react'
import dynamic from 'next/dynamic'
import {
  IsSidebarNavigationVisible,
  NavigationItem,
} from '~/store/slices/QuranReader/sidebarNavigation'
import QuranDrawerSelectionSkeleton from './QuranDrawerSelectionSkeleton'

// const PageSelection = dynamic(() => import('./PageSelection'), {
//   loading: SidebarSelectionSkeleton,
// });
const SurahSelection = dynamic(() => import('./SurahSelection'), {
  loading: QuranDrawerSelectionSkeleton,
})
const JuzSelection = dynamic(() => import('./JuzSelection'), {
  loading: QuranDrawerSelectionSkeleton,
})
const HizbSelection = dynamic(() => import('./HizbSelection'), {
  loading: QuranDrawerSelectionSkeleton,
})

type Props = {
  isVisible: IsSidebarNavigationVisible
  selectedNavigationItem: string
  locale: string
}

const SidebarNavigationSelections: React.FC<Props> = ({
  locale,
  isVisible,
  selectedNavigationItem,
}) => {
  // we skip requesting any selection list if the drawer is not open.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isVisible) return <React.Fragment />

  if (selectedNavigationItem === NavigationItem.Surah) return <SurahSelection locale={locale} />
  if (selectedNavigationItem === NavigationItem.Juz) return <JuzSelection locale={locale} />
  if (selectedNavigationItem === NavigationItem.Hizb) return <HizbSelection locale={locale} />

  return <p>Page</p>
  // return <PageSelection />;
}

export default SidebarNavigationSelections
