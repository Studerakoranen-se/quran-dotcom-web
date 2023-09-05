import { styled } from '@mui/material'

const RevelationOrderViewRoot = styled('div')(() => ({
  borderRadius: 4,
  paddingBlockStart: 13,
  paddingBlockEnd: 13,
  paddingInlineStart: 13,
  paddingInlineEnd: 13,
  backgroundColor: '#f1f1f1',
  breakInside: 'avoid-column',
}))

const RevelationOrderView = () => {
  return <RevelationOrderViewRoot>RevelationOrderView</RevelationOrderViewRoot>
}

export default RevelationOrderView
