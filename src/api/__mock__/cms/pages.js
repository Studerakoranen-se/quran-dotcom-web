import blocks from './blocks'

export default {
  Home: {
    headerMode: 'auto',
    blocks: [
      {
        name: 'Hero',
        props: blocks.Hero,
      },
      {
        name: 'QuranBanner',
        props: blocks.QuranBanner,
      },
      {
        name: 'RecentReading',
        props: blocks.RecentReading,
      },
      {
        name: 'ChapterAndJuzList',
        props: blocks.ChapterAndJuzList,
      },
      {
        name: 'Content',
        props: blocks.Content,
      },
    ],
  },
  Surah: {
    blocks: [
      {
        name: 'Surah',
        props: blocks.Surah,
      },
    ],
  },
  About: {
    blocks: [
      {
        name: 'Editorial',
        props: blocks.Editorial,
      },
      {
        name: 'Editorial',
        props: {
          ...blocks.Editorial,
          layoutReverse: true,
          enablePattern: true,
          mediaProps: {
            component: 'picture',
            breakpoints: {
              xs: { src: '/assets/classes.svg', width: 1280, height: 720 },
            },
          },
          text: `
            <h1>Vad är vårt mål?</h1>
              <p>
                 Vårt mål är att hemsidan ska bli den bästa sidan för koranundervisning. Vi vill
                  att alla svenska muslimer ska ha tillgång till en platform som stödjer varje elev
                  att nå sina mål.
              </p>
               <p>Är det möjligt att studera med dig på plats?</p>
              <p>
                Inte ännu, men i framtiden vill vi vara med och erbjuda Sverige&#39;s moskéer
                kurser och konferenser för alla intresserade av att lära sig koranen och
                arabiskan.
              </p>
          `,
        },
      },
      {
        name: 'Editorial',
        props: {
          ...blocks.Editorial,
          enablePattern: true,
          mediaProps: {
            component: 'picture',
            breakpoints: {
              xs: { src: '/assets/student.svg', width: 1280, height: 720 },
            },
          },
          text: `
            <h1>Vad kommer härnäst?</h1>
              <p>
                Vi vill fortsätta utveckla hemsidan och lansera fler funktioner och tjänster.
              </p>
              <p>
                Likaså vill vi lansera en Koran-app som kommer att fungera som en offlineversion av webbplatsen.
                I appen borde du kunna enkelt läsa och studera Koranen på svenska.
                Det måste också finnas möjligheter att läsa Tafsir (Korantolkning) i samband med varje vers.
              </p>
          `,
        },
      },
    ],
  },
  Course: {
    blocks: [
      {
        name: 'Courses',
        props: blocks.Courses,
      },
    ],
  },
  PrivateCourse: {
    blocks: [
      {
        name: 'CourseHero',
        props: blocks.CourseHero,
      },
      {
        name: 'Steps',
        props: {
          ...blocks.Steps,
          enablePattern: true,
        },
      },
    ],
  },
  Article: {
    blocks: [
      {
        name: 'Editorial',
        props: blocks.Media,
      },
      {
        name: 'Content',
        props: blocks.Content,
      },
    ],
  },
  NotFound: {
    blocks: [
      {
        name: 'ErrorBlock',
        props: blocks.ErrorBlock,
      },
    ],
  },
}
