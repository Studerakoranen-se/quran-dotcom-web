import * as React from 'react'
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import { Formit, Form as FormitForm, Field as FormitField } from '@noaignite/formit'
import { useI18n } from '~/contexts'
import { FilesIcon, Html, LessonsIcon, PlayIcon } from '~/components'
import { FormitButton, SanityHtml } from '~/containers'
import { LessonBlockQueryResult } from '~/api/sanity'

const BREAKPOINT_KEY = 'md'

const CourseRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(20, 2, 10),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 2, 10),
  },
}))

const CourseMain = styled('div')(({ theme }) => ({
  ...theme.mixins.contain('lg'),

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    marginBlockStart: theme.spacing(10),
    marginBlockEnd: theme.spacing(3),
  },
}))

const CourseGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  // paddingLeft: '1.25rem',
  // paddingRight: '1.25rem',
  flexGrow: 1,
  gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    marginTop: '2.5rem',
    gap: '3.25rem',
  },
}))

const CourseLeftItem = styled('div')(({ theme }) => ({
  paddingBottom: '2.5rem',
  gridColumn: 'span 12 / span 12',

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    gridColumn: 'span 8 / span 8',
  },
}))

const CourseRightItem = styled('div')(({ theme }) => ({
  ...theme.mixins.scrollable,
  ...theme.mixins.scrollbars,
  maxHeight: 'calc(100vh - var(--cia-header-height))',

  paddingRight: '1rem',
  paddingBottom: '2.5rem',
  // paddingLeft: '3rem',

  gridColumn: 'span 12 / span 12',
  color: theme.palette.common.white,

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    gridColumn: 'span 4 / span 4',
  },
}))

const CourseRightItemTabs = styled(Tabs)(({ theme }) => ({
  ' .MuiTabs-flexContainer': {
    alignItems: 'flex-start',
    '& .MuiTab-root': {
      // ml: 3,
    },
  },
  ' .MuiTabs-indicator': {
    right: 'unset',
    width: '100%',
    backgroundColor: theme.palette.action.disabled,
    borderRadius: theme.spacing(1),
  },
}))

const FormFormitForm = styled(FormitForm)(() => ({
  // display: 'grid',
  // gridGap: theme.spacing(4),
}))

const RumblePlayer = styled('iframe')(() => ({
  width: '100%',
  height: 400,
  borderStyle: 'none',
  margin: 'auto 0 !important',
  // display: 'grid',
  // gridGap: theme.spacing(4),
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

interface LessonProps extends LessonBlockQueryResult {
  renderIndex: number
}

function Lesson(props: LessonProps) {
  const { title, description, lessons, renderIndex = 0 } = props

  const { t } = useI18n()
  // @ts-ignore
  const isBreakpointUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const [status, setStatus] = React.useState('')
  const [view, setView] = React.useState<number>(0)
  const [activeLesson, setActiveLesson] = React.useState<number>(0)

  const tabs = React.useMemo(
    () => [
      { title: 'Lessons', value: 0, isHidden: !isBreakpointUp },
      { title: 'About', value: 1, isHidden: true },
      { title: 'Resources', value: 2, isHidden: true },
      { title: 'Quiz', value: 3, isHidden: true },
    ],
    [isBreakpointUp],
  )

  const renderLessons = React.useMemo(() => {
    return lessons.map((lesson, idx) => {
      return (
        <Tab
          key={idx}
          label={
            <React.Fragment>
              <span style={{ flex: 2, textAlign: 'left' }}>{`${idx + 1} . ${lesson.title}`}</span>
              <span>{lessons[activeLesson]?.duration}</span>
            </React.Fragment>
          }
          id={`active-lesson-tab-${idx}`}
          value={idx}
          iconPosition="start"
          // icon={
          //   <Box width={30} height={30}>
          //     <PlayIcon
          //       fontSize="large"
          //       sx={{
          //         transition: (theme) =>
          //           theme.transitions.create(['all'], {
          //             duration: theme.transitions.duration.short, // Same as MuiButton.
          //           }),
          //         opacity: activeLesson === idx ? 1 : 0,
          //         // color: (theme) => theme.palette.common.white,
          //       }}
          //     />
          //   </Box>
          // }
          sx={{
            justifyContent: 'space-between',
            width: '100%',
            minHeight: '60px',
            m: 0,
            px: 2,
          }}
        />
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson])

  const onTabSelected = (event: React.SyntheticEvent, newView) => {
    setView(newView)
  }

  const onActiveLessonTabSelected = (event: React.SyntheticEvent, newView) => {
    setActiveLesson(newView)
  }

  const handleSubmit = React.useCallback(
    async (values, { setSubmitting }) => {
      setSubmitting(true)

      /* [Start] If one of the fake fields are filled then the form will not be submitted */
      // @ts-ignore
      if (document.getElementById(`name-${renderIndex}`)?.value) {
        setStatus('success')
        return
      }
      /* [End] If one of the fake fields are filled then the form will not be submitted */

      const urlSearchParams = new URLSearchParams({
        ...values,
      })

      try {
        const response = await fetch('/api/questions', {
          body: urlSearchParams,
          method: 'POST',
        })

        if (response.ok) {
          //   gtmEvent({
          //     event: 'form_submit',
          //     parameter1: id,
          //     parameter2: heading,
          //   })
        }

        setStatus(response.ok ? 'success' : 'error')
      } catch (err) {
        console.error(err)
        setStatus('error')
      }

      setSubmitting(false)
    },
    [renderIndex],
  )

  return (
    <CourseRoot>
      <CourseMain>
        <CourseGrid>
          <CourseLeftItem>
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
            {description && (
              <Html
                sx={{
                  mt: 2,
                  mb: 4,
                }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {lessons?.[activeLesson].youtubeVideo && (
              <RumblePlayer src={lessons?.[activeLesson].youtubeVideo} />
            )}

            <Box sx={{ borderBottom: 1, borderColor: 'text.secondary', mt: 3 }}>
              <Tabs value={view} onChange={onTabSelected} aria-label="Course Tabs">
                {tabs?.map((tab, idx) => {
                  if (!tab.isHidden) return null
                  return (
                    <Tab key={idx} label={tab.title} id={`course-tab-${idx}`} value={tab.value} />
                  )
                })}
              </Tabs>
            </Box>

            {lessons?.length > 0 && (
              <React.Fragment>
                {!isBreakpointUp && (
                  <CustomTabPanel value={view} index={0}>
                    <CourseRightItemTabs
                      sx={{ mt: 2 }}
                      orientation="vertical"
                      value={activeLesson}
                      onChange={onActiveLessonTabSelected}
                      aria-label="Lessons"
                    >
                      {renderLessons}
                    </CourseRightItemTabs>
                  </CustomTabPanel>
                )}
                <CustomTabPanel value={view} index={1}>
                  <Html
                    sx={{
                      mt: 2,
                    }}
                    dangerouslySetInnerHTML={{ __html: lessons[activeLesson].summary }}
                  />
                </CustomTabPanel>

                <CustomTabPanel value={view} index={2}>
                  <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 2 }}>
                    Course Summary
                  </Typography>
                  <Html
                    sx={{
                      mt: 2,
                    }}
                    dangerouslySetInnerHTML={{ __html: lessons[activeLesson].summary }}
                  />
                  <Box sx={{ my: 5 }} display="flex">
                    {lessons && (
                      <Box mr={10} display="flex" alignItems="center">
                        <LessonsIcon sx={{ mr: 1 }} />
                        <span> {lessons.length} Lessons</span>
                      </Box>
                    )}
                    {lessons[activeLesson]?.resources && (
                      <Box display="flex" alignItems="center">
                        <FilesIcon sx={{ mr: 1 }} />
                        <span>{lessons[activeLesson]?.resources.length} Files</span>
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Download Summary
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={2}>
                      {lessons[activeLesson]?.resources?.map((file: any, i: number) => (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: 'rgb(255 255 255 / 22%)', color: 'white' }}
                        >
                          <span style={{ flex: 2, textAlign: 'left' }}>
                            {`${i + 1} . ${file.title}`}
                          </span>
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </CustomTabPanel>

                <CustomTabPanel value={view} index={3}>
                  <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 2 }}>
                    Quiz
                  </Typography>

                  <Box sx={{ my: 5 }} display="flex">
                    {lessons[activeLesson]?.questions && (
                      <Formit
                        // initialValues={}
                        onSubmit={handleSubmit}
                      >
                        <FormFormitForm>
                          {status === 'error' && (
                            <Alert severity="error" sx={{ mb: 4 }}>
                              {t(__translationGroup)`Oops, something went wrong!`}
                            </Alert>
                          )}

                          {status === 'success' ? (
                            <Alert severity="success">{t(__translationGroup)`Success`}</Alert>
                          ) : (
                            lessons[activeLesson]?.questions?.map((question: any, idx: number) => (
                              <Box key={idx} display="flex" flexDirection="column" mb={4}>
                                {question.question && <SanityHtml blocks={question.question} />}
                                {/* <Typography variant="body2" sx={{ mb: 1 }}> */}
                                {/* {`${idx + 1}. ${question.question}`} */}
                                {/* </Typography> */}

                                <FormitField
                                  component={RadioGroup}
                                  key={idx}
                                  id={`form-field-${question.question[0]?.children[0]?.text}`} // Makes `label` and `helperText` accessible for screen readers.
                                  name={question.question[0]?.children[0]?.text}
                                  // helperText={}
                                >
                                  {question?.answers?.map((option, idx2) => (
                                    <FormControlLabel
                                      key={idx2}
                                      control={<Radio />}
                                      label={<SanityHtml blocks={option.answer} />}
                                      value={option.answer[0]?.children[0]?.text}
                                      sx={(theme) => ({
                                        '.MuiFormControlLabel-label': {
                                          ...theme.typography.caption,
                                        },
                                      })}
                                    />
                                  ))}
                                </FormitField>
                              </Box>
                            ))
                          )}

                          {/* @ts-ignore */}
                          <FormitButton variant="contained" type="submit" fullWidth>
                            {t(__translationGroup)`Send`}
                          </FormitButton>
                        </FormFormitForm>
                      </Formit>
                    )}
                  </Box>
                </CustomTabPanel>
              </React.Fragment>
            )}
          </CourseLeftItem>

          {isBreakpointUp && (
            <CourseRightItem>
              <CourseRightItemTabs
                orientation="vertical"
                value={activeLesson}
                onChange={onActiveLessonTabSelected}
                aria-label="Lessons"
              >
                {renderLessons}
              </CourseRightItemTabs>
            </CourseRightItem>
          )}
        </CourseGrid>
      </CourseMain>
    </CourseRoot>
  )
}

export default Lesson
