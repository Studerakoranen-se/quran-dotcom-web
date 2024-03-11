import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '~/store'
import SliceName from '~/store/types/SliceName'

export type IsSidebarNavigationVisible = boolean | 'auto'
export type SidebarNavigation = {
  isVisible: IsSidebarNavigationVisible
  selectedNavigationItem: string
}

export enum NavigationItem {
  Surah = 'surah',
  Juz = 'juz',
  Page = 'page',
  RubElHizb = 'rub_el_hizb',
  Hizb = 'hizb',
}

export const initialSidebarIsVisible = false
const initialState: SidebarNavigation = {
  isVisible: initialSidebarIsVisible,
  selectedNavigationItem: NavigationItem.Surah,
}

export const sidebarNavigationSlice = createSlice({
  name: SliceName.SIDEBAR_NAVIGATION,
  initialState,
  reducers: {
    setIsVisible: (state: SidebarNavigation, action: PayloadAction<boolean>) => ({
      ...state,
      isVisible: action.payload,
    }),
    selectNavigationItem: (state: SidebarNavigation, action: PayloadAction<NavigationItem>) => ({
      ...state,
      selectedNavigationItem: action.payload,
    }),
  },
})

export const { setIsVisible, selectNavigationItem } = sidebarNavigationSlice.actions

export const selectIsSidebarNavigationVisible = (state: IRootState) =>
  state.sidebarNavigation.isVisible

export const selectSelectedNavigationItem = (state: IRootState) =>
  state.sidebarNavigation.selectedNavigationItem

export default sidebarNavigationSlice.reducer
