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
  ErrorBlock: {
    subheading: '404',
    heading: 'Page not found',
    text: 'The page you are looking for might have been renamed, removed or might never have existed.',
    ctaLabel: 'Back to homepage',
    ctaUrl: '/',
  },
}
