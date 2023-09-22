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
} from '@mui/material'
import YouTubePlayer from 'react-youtube'
import { Formit, Form as FormitForm, Field as FormitField } from '@noaignite/formit'
import { useI18n } from '~/contexts'
import { FilesIcon, Html, LessonsIcon, PlayIcon } from '~/components'
import { FormitButton, SanityHtml } from '~/containers'
import { LessonBlockQueryResult } from '~/api/sanity'

const BREAKPOINT_KEY = 'md'

const CourseRoot = styled('section')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
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
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
  gridColumn: 'span 12 / span 12',
  color: theme.palette.common.white,

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    gridColumn: 'span 8 / span 8',
  },
}))

const CourseRightItem = styled('div')(({ theme }) => ({
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
  // paddingLeft: '3rem',
  order: '-9999',
  gridColumn: 'span 12 / span 12',
  color: theme.palette.common.white,

  [theme.breakpoints.up(BREAKPOINT_KEY)]: {
    order: 9999,
    gridColumn: 'span 4 / span 4',
  },
}))

const FormFormitForm = styled(FormitForm)(() => ({
  // display: 'grid',
  // gridGap: theme.spacing(4),
}))

const StyledYouTubePlayer = styled(YouTubePlayer)(() => ({
  width: '100%',
  height: 400,
  iframe: {
    height: '100%',
  },
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
  console.log(`props`, props)
  const { t } = useI18n()

  const [status, setStatus] = React.useState('')
  const [view, setView] = React.useState<number>(0)
  const [activeLesson, setActiveLesson] = React.useState<number>(0)

  const tabs = React.useMemo(
    () => [
      { title: 'About', value: 0 },
      { title: 'Resources', value: 1 },
      { title: 'Quiz', value: 2 },
    ],
    [],
  )

  const onTabSelected = (event: React.SyntheticEvent, newView) => {
    setView(newView)
  }

  const onActiveLessonTabSelected = (event: React.SyntheticEvent, newView) => {
    setActiveLesson(newView)
  }

  const checkElapsedTime = (e) => {
    const duration = e.target.getDuration()
    const currentTime = e.target.getCurrentTime()

    if (currentTime / duration > 0.95) {
      // setModalIsOpen(true)
    }
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
              <StyledYouTubePlayer
                opts={{
                  height: '100%',
                  width: '100%',
                }}
                // className="w-full h-auto"
                videoId={lessons?.[activeLesson].youtubeVideo}
                // It feels slightly anti-climatic to see that now but we're done.
                onStateChange={(e) => checkElapsedTime(e)}
              />
            )}

            <Box sx={{ borderBottom: 2, borderColor: 'rgba(54, 95, 95, 0.5)', mt: 3 }}>
              <Tabs
                value={view}
                onChange={onTabSelected}
                aria-label="Course Tabs"
                sx={{
                  ' .MuiTabs-indicator': {
                    backgroundColor: '#679898',
                    height: '3px',
                  },
                }}
              >
                {tabs?.map((tab, idx) => (
                  <Tab key={idx} label={tab.title} id={`course-tab-${idx}`} value={tab.value} />
                ))}
              </Tabs>
            </Box>

            {lessons?.length > 0 && (
              <>
                <CustomTabPanel value={view} index={0}>
                  <Html
                    sx={{
                      mt: 2,
                    }}
                    dangerouslySetInnerHTML={{ __html: lessons[activeLesson].summary }}
                  />
                </CustomTabPanel>

                <CustomTabPanel value={view} index={1}>
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
                          // @ts-ignore
                          color="textInverted"
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

                <CustomTabPanel value={view} index={2}>
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
                                      control={
                                        <Radio
                                          sx={{
                                            color: 'white',
                                          }}
                                        />
                                      }
                                      label={
                                        <>
                                          <SanityHtml blocks={option.answer} />
                                        </>
                                      }
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
                          <FormitButton
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="textInverted"
                          >
                            {t(__translationGroup)`Send`}
                          </FormitButton>
                        </FormFormitForm>
                      </Formit>
                    )}
                  </Box>
                </CustomTabPanel>
              </>
            )}
          </CourseLeftItem>

          <CourseRightItem>
            <Tabs
              orientation="vertical"
              value={activeLesson}
              onChange={onActiveLessonTabSelected}
              aria-label="Lessons"
              sx={{
                ' .MuiTabs-flexContainer': {
                  alignItems: 'flex-start',
                  '& .MuiTab-root': {
                    // ml: 3,
                  },
                },
                ' .MuiTabs-indicator': {
                  right: 'unset',
                  width: '100%',
                  backgroundColor: 'rgb(255 255 255 / 22%)',
                  borderRadius: (theme) => theme.spacing(1),
                },
              }}
            >
              {lessons?.map((tab, idx) => (
                <Tab
                  key={idx}
                  label={
                    <React.Fragment>
                      <span style={{ flex: 2, textAlign: 'left' }}>{`${idx + 1} . ${
                        tab.title
                      }`}</span>
                      <span>{lessons[activeLesson]?.duration}</span>
                    </React.Fragment>
                  }
                  id={`active-lesson-tab-${idx}`}
                  value={idx}
                  iconPosition="start"
                  icon={
                    <Box width={30} height={30}>
                      {activeLesson === idx && <PlayIcon fontSize="large" />}
                    </Box>
                  }
                  sx={{
                    justifyContent: 'space-between',
                    width: '100%',
                    minHeight: '60px',
                    m: 0,
                    // p: 2,
                    pr: 1,
                  }}
                />
              ))}
            </Tabs>
          </CourseRightItem>
        </CourseGrid>
      </CourseMain>
    </CourseRoot>
  )
}

export default Lesson
