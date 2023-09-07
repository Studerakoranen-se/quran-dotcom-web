import { faker } from '@faker-js/faker'
import formFields from './formFields'

export default {
  Content: {
    text: `
      <h1>HTML Ipsum Presents</h1>
      <p>
        <strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames
        ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
        ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>
        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi.
        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus
        lacus enim ac dui. <a href="#0">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.
      </p>
      <h2>Header Level 2</h2>
      <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ol>
      <p>
        Curabitur eu lobortis nisi. Sed condimentum diam et sollicitudin commodo. Vestibulum tempus
        ligula ac massa aliquet sodales. Suspendisse vitae quam lobortis, laoreet sem ut, venenatis
        dolor. Sed mattis rutrum eros ac lobortis. Aenean quis lectus dapibus, convallis mi sed,
        rutrum dolor.
      </p>
      <blockquote>
        <p>”Morbi felis dui, tincidunt suscipit consectetur”</p>
      </blockquote>
      <figure>
        <img src="//source.unsplash.com/weekly" alt="" />
        <figcaption>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</figcaption>
      </figure>
      <h3>Header Level 3</h3>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ul>
      <h4>Header Level 4</h4>
      <img src="//source.unsplash.com/daily" alt="" />
      <h5>Header Level 5</h5>
      <h6>Header Level 6</h6>
    `,
  },
  Hero: {
    heading: `Välkommen till <br /> StuderaKoranen!`,
    subheading: `- Studera Koranen online`,
    text: `
     StuderaKoranen är en unik satsning vars syfte är att främja koranundervisning i Sverige.
     Vi erbjuder privatundervisning, kursmaterial, rådgivning, Koran-online och mycket mer!
    `, // prettier-ignore
    ctaLabel: 'Koranen',
    ctaUrl: '/quran',
    ctaLabel2: 'Kurser',
    ctaUrl2: '/course',
  },
  QuranBanner: {
    mediaProps: {
      component: 'picture',
      breakpoints: {
        xs: { src: '/assets/quran-text.png', width: 1280, height: 720 },
      },
    },
  },
  ChapterAndJuzList: {},
  RecentReading: {
    heading: `Senast visade`,
  },
  Media: {
    mediaProps: {
      component: 'picture',
      breakpoints: {
        xs: { src: '//source.unsplash.com/DmD8HVOjy4c/1280x720', width: 1280, height: 720 },
        sm: { src: '//source.unsplash.com/DmD8HVOjy4c/1920x1080', width: 1920, height: 1080 },
      },
    },
  },
  Course: {
    title: `Course 1`,
    uri: `course/1`,
    summary: faker.lorem.paragraphs(2),
    lessons: Array.from(new Array(5), (_, idx) => ({
      id: idx + 1,
      title: ['Introduction', 'Al-Fatihah', 'Al-Baqarah', 'Aali Imran', 'An-Nisa'][idx % 3],
      uri: `${idx + 1}`,
      youtubeVideo: idx % 2 === 0 ? 'wO2DRVC-g9w' : 'gY_BOUVMqxI',
      duration: '2:05',
      summary: faker.lorem.sentences(),
      content: faker.lorem.sentences(),
      // eslint-disable-next-line @typescript-eslint/no-shadow
      resources: Array.from(new Array(7), (_, idx2) => ({
        name: `PDF ${idx2 + 1}`,
        file: 'sample.pdf',
        description: faker.lorem.sentences(),
      })),
      quiz: [
        {
          id: 1,
          question: "What is the Arabic word for 'hello'?",
          answers: ['Marhaba', 'Shukran', 'Sabah al-khair', 'Maa al-salama'],
          correctAnswers: [1],
        },
        {
          id: 2,
          question: "Which of the following means 'thank you' in Arabic?",
          answers: ['Marhaba', 'Shukran', 'Sabah al-khair', 'Maa al-salama'],
          correctAnswers: [2],
        },
        {
          id: 3,
          question: "What is the Arabic word for 'good morning'?",
          answers: ['Marhaba', 'Shukran', 'Sabah al-khair', 'Maa al-salama'],
          correctAnswers: [3],
        },
        {
          id: 4,
          question: "What is the Arabic word for 'book'?",
          answers: ['Qalam', 'Kitaab', 'Burtuqal', 'Sayara'],

          correctAnswers: [2],
        },
        {
          id: 5,
          question: "Which of the following means 'pen' in Arabic?",
          answers: ['Qalam', 'Kitaab', 'Burtuqal', 'Sayara'],
          correctAnswers: [1],
        },
      ],
    })),
  },
  Courses: {
    entries: [
      {
        heading: 'Privatundervisning',
        text: `Här kan du ansöka för att studera under en lärare som skräddarsyr en kurs som matchar dina behov.`,
        ctaLabel: 'Gå vidare',
        ctaUrl: '/course/private',
        mediaProps: {
          component: 'picture',
          breakpoints: {
            xs: { src: '/assets/course-private.svg' },
          },
        },
        width: 100,
        height: 100,
      },
      {
        heading: 'Självstudier',
        text: `Här kan du studera själv och välja bland våra kurser för att studera online i din egen takt.`,
        ctaLabel: 'Gå vidare',
        ctaUrl: '/course/public',
        mediaProps: {
          component: 'picture',
          breakpoints: {
            xs: { src: '/assets/classes.svg' },
          },
          width: 100,
          height: 100,
        },
      },
    ],
  },
  CourseHero: {
    text: `
        <h1>Privatundervisning</h1>
        <ul>
          <li>Här kan man ansöka om privatundervisning med en utbildad koranlärare på distans. Kurserna äger rum via Zoom, Teams eller genom annan plattform efter överenskommelse med läraren.</li>
          <li>StuderaKoranen är endast en medlare mellan lärare och elever. Alla specifika frågor om lektionerna, betalning m.m tas med varje enskild lärare.</li>
          <li>Första lektionen är alltid gratis. Därefter meddelar varje elev sin kursledare om man vill fortsätta eller inte.</li>
        </ul>
`,
    mediaProps: {
      component: 'picture',
      breakpoints: {
        xs: { src: '/assets/course-hero.png', width: 703, height: 410 },
      },
    },
    ctaLabel: 'Skicka förfrågan',
    ctaUrl: '/#private',
    enableHorizontalLine: false,
  },
  CourseList: {
    heading: `Våra Kurser`,
    text: `Våra kurser är specialanpassade för att erbjuda högkvalitativ undervisning, precisionell pedagogik och unikt material. Välj den nivån som passar dig!`,
    entries: Array.from(new Array(6), (_, idx) => ({
      id: idx + 1,
      name: `Course ${idx + 1}`,
      image: 'sample.png',
      description: `Nesciunt ab in consequatur alias perspiciatis officiis unde. Ipsa possimus eum blanditiis beatae fuga. Deserunt veniam ea illo suscipit ratione exercitationem.`,
    })),
  },
  FeatureList: {
    heading: `Varför lära sig Koranen?`,
    text: `Våra kurser är specialanpassade för att erbjuda högkvalitativ undervisning, precisionell pedagogik och unikt material. Välj den nivån som passar dig!`,
    entries: [
      {
        icon: 'brain',
        title: 'INGA FÖRKUNSKAPER KRÄVS',
        txt: 'Du behöver ingen förkunskap. Arabiska center ger dig grunderna och utbildar dig oavsett din nivå!',
      },
      {
        icon: 'computer',
        title: 'LÄR DIG LÄSA KORANEN',
        txt: 'StuderaKoranen hjälper dig att lära dig läsa Koranen med korrekt tajweed.',
      },
      {
        icon: 'computer',
        title: 'VI UTVECKLAR DIN HÖRFÖRSTÅELSE FÖR ATT SKILJA PÅ RÄTT OCH FEL',
        txt: 'Du kommer att kunna öva din hörförståelse genom att lyssna och skilja på rätt och fel.',
      },
      {
        icon: 'computer',
        title: 'UNDERVISNING AV HÖG KVALITET',
        txt: 'Undervisningen präglas av professionalitet, pedagogik och tydlighet.',
      },
      {
        icon: 'certificate',
        title: 'VI HAR ERFARENHET',
        txt: 'StuderaKoranen är slutresultatet av flera års studier och erfarenhet från tidigare kurser, genomförda med hundratals studenter.',
      },
      {
        icon: 'currency',
        title: 'BÖRJA IDAG GRATIS',
        txt: 'Alla kurser, material och tjänster som vi erbjuder är kostnadsfria.',
      },
    ],
  },
  Surah: {},
  Editorial: {
    text: `
    <h1>Vilka är vi?</h1>
      <p>
        <strong>StuderaKoranen</strong> är ett initiativ från Arabiskacentret.se
        Grundaren Mustafa Abu Adam är en student i Islamiska universitet i Al-Madinah.
      </p>
      `,
    mediaProps: {
      component: 'picture',
      breakpoints: {
        xs: { src: '/assets/imam.svg', width: 1280, height: 720 },
      },
    },
  },
  Steps: {
    heading: `<h1>Hur det funkar</h1>`,
    subheading: `<p>Studera Koranen online</p>`,
    text: `
    <h1>Vilka är vi?</h1>
      <p>
        <strong>StuderaKoranen</strong> är ett initiativ från Arabiskacentret.se
        Grundaren Mustafa Abu Adam är en student i Islamiska universitet i Al-Madinah.
      </p>
      `,
    entries: [
      {
        heading: 'Välj din lärare',
        text: `Varje lärare har en registrerad profil på kurssidan, så att du enkelt kan hitta den lärare som passar dig bäst.`,
        icon: `/assets/reading-quran.svg`,
        reverseDirection: false,
      },
      {
        heading: 'Fyll i formuläret och skicka in ansökan',
        text: `Efter en skickad ansökan, så vidarebefordras ansökan till lärarens mejl.`,
        icon: `/assets/document.svg`,
        reverseDirection: true,
      },
      {
        heading: 'Godkännande',
        text: `Målet är att behandla ansökan inom 72 timmar. Läraren läser igenom varje ansökan och återkopplar via mejl. Det finns dock ingen garanti att man blir erbjuden en plats.`,
        icon: `/assets/document-approval.svg`,
        reverseDirection: false,
      },
    ],
  },
  Tutors: {
    heading: `Våra handledare`,
    text: `Här kan du läsa igenom lärarnas profiler för att kunna välja det som passar ditt behov bäst.`,
    entries: [
      {
        id: 1,
        fullname: 'Mr. Scott West',
        sex: 'female',
        age: 26,
        mail: 'Xavier.Ratke@gmail.com',
        phone: '1-821-512-4682',
        image: '/uploads/tutors/sample-tutor.png',
        address: '8405 Bashirian Rapids',
        nationality: 'Hungary',
        description:
          'Ratione in quod vel at sunt quos. Nesciunt laudantium omnis consectetur incidunt dolor rem velit.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 2,
        fullname: 'Lionel Brekke',
        sex: 'female',
        age: 26,
        mail: 'Deangelo21@gmail.com',
        phone: '825-666-0414 x1835',
        image: '/uploads/tutors/sample-tutor.png',
        address: '9249 Geovany Ridge',
        nationality: 'Belarus',
        description: 'Sed unde deleniti. Distinctio harum tempora.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 3,
        fullname: 'Harry Bailey',
        sex: 'female',
        age: 26,
        mail: 'Charlotte4@yahoo.com',
        phone: '503.873.0558 x078',
        image: '/uploads/tutors/sample-tutor.png',
        address: '47533 Schroeder Fork',
        nationality: 'Honduras',
        description:
          'Autem exercitationem corporis magnam veniam assumenda rerum pariatur error quibusdam. Accusantium cupiditate recusandae minus aut dignissimos.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 4,
        fullname: 'Leona Simonis',
        sex: 'male',
        age: 26,
        mail: 'Archibald68@yahoo.com',
        phone: '1-895-753-7852 x6741',
        image: '/uploads/tutors/sample-tutor.png',
        address: '444 Misty Fall',
        nationality: 'Paraguay',
        description:
          'Voluptate suscipit voluptates rem rerum eius laboriosam necessitatibus alias optio. Itaque rerum neque adipisci.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 5,
        fullname: 'Jeanne Batz II',
        sex: 'male',
        age: 26,
        mail: 'Johnny65@yahoo.com',
        phone: '1-610-971-5156',
        image: '/uploads/tutors/sample-tutor.png',
        address: '28932 Creola Drives',
        nationality: 'Tonga',
        description:
          'Nesciunt recusandae impedit. Dignissimos a explicabo autem deleniti sunt quasi inventore ratione.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 6,
        fullname: 'Jan Ward',
        sex: 'female',
        age: 26,
        mail: 'Rigoberto8@yahoo.com',
        phone: '(370) 381-0685 x25091',
        image: '/uploads/tutors/sample-tutor.png',
        address: '07217 Ahmad Avenue',
        nationality: 'French Guiana',
        description: 'Perferendis sit quod laboriosam. Voluptates qui distinctio laboriosam.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 7,
        fullname: 'Belinda Stracke',
        sex: 'male',
        age: 26,
        mail: 'Ulises_Harvey75@gmail.com',
        phone: '863-339-5313 x128',
        image: '/uploads/tutors/sample-tutor.png',
        address: '03902 Skiles Tunnel',
        nationality: 'Puerto Rico',
        description: 'Alias quae pariatur dicta. Suscipit velit enim sint.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
      {
        id: 8,
        fullname: 'Glenn Hettinger',
        sex: 'male',
        age: 26,
        mail: 'Kailee_Maggio@yahoo.com',
        phone: '763-643-7136 x12795',
        image: '/uploads/tutors/sample-tutor.png',
        address: '4242 Ora Square',
        nationality: 'Cayman Islands',
        description:
          'Omnis voluptatibus rerum voluptates deleniti libero incidunt. Ex quod voluptates tempore unde.',
        created_at: '2023-09-02T12:37:04.000Z',
        updated_at: '2023-09-02T12:37:04.000Z',
      },
    ],
  },
  ErrorBlock: {
    subheading: '404',
    heading: 'Page not found',
    text: 'The page you are looking for might have been renamed, removed or might never have existed.',
    ctaLabel: 'Back to homepage',
    ctaUrl: '/',
  },
  Form: {
    endpoint: 'http://localhost:3000/api/v1/mail/send',
    fields: formFields,
    heading: 'Have any questions? Don’t hesitate to reach out.',
    submitLabel: 'Send',
  },
}
