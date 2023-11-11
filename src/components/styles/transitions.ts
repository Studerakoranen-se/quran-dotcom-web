interface Duration {
  shortest: number
  shorter: number
  short: number
  standard: number
  complex: number
  enteringScreen: number
  leavingScreen: number
}

interface Easing {
  easeInOut: number[]
  easeOut: number[]
  easeIn: number[]
  sharp: number[]
}

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easingValues: Easing = {
  // This is the most common easing curve.
  easeInOut: [0.4, 0, 0.2, 1],
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: [0.0, 0, 0.2, 1],
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: [0.4, 0, 1, 1],
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: [0.4, 0, 0.6, 1],
}

export const easing = Object.entries(easingValues).reduce((acc: any, [key, val]) => {
  acc[key] = `cubic-bezier(${val.join(', ')})`
  return acc
}, {})

// Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export const duration: Duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
}

export const durationInS = Object.entries(duration).reduce((acc: any, [key, val]) => {
  acc[key] = val / 1000
  return acc
}, {} as Record<string, string>)

interface StaggerVariantsTypes {
  delayChildren?: number
  queueIndex?: number
  staggerChildren?: number
}

export function createStaggerVariants(options: StaggerVariantsTypes = {}) {
  const {
    delayChildren: delayChildrenOption = durationInS.short,
    queueIndex = 0,
    staggerChildren = 0.15,
  } = options

  const delayChildren = delayChildrenOption * queueIndex

  return {
    animate: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }
}
