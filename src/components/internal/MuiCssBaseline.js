const overrides = {
  styleOverrides: (theme) => `
    /* Define :root css variables. */
    :root {
      /* Base */
      --cia-spacing-base: ${theme.spacing(1)};

      /* Components */
      --cia-toolbar-dense-height: 48px;
      --cia-toolbar-height: 56px;
      --cia-toolbar-spacing: ${theme.spacing(2)};

      --cia-header-toolbar-primary-height: 56px;
      --cia-header-toolbar-secondary-height: 22px;
      --cia-header-height: 0px; /* Calculated in AppHeader. */

      --cia-section-spacing: max(${theme.spacing(3)}, 3.7vw);
      --cia-container-spacing: calc(100vw / 24);
    }

    html {
      @font-face {
        font-family: 'Irish Grover';
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/IrishGrover/irish-grover-regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Inter';
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Inter/inter-regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Inter';
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Inter/inter-500.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Inter';
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Inter/inter-700.woff2') format('woff2');
      }

      @font-face {
        font-family: 'El Messiri';
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Elmessiri/el-messiri-regular.woff2') format('woff2');
      }
      @font-face {
        font-family: 'El Messiri';
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/Elmessiri/el-messiri-500.woff2') format('woff2');
      }
      @font-face {
        font-family: 'El Messiri';
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Elmessiri/el-messiri-600.woff2') format('woff2');
      }
      @font-face {
        font-family: 'El Messiri';
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Elmessiri/el-messiri-700.woff2') format('woff2');
      }
    }

    /* Opinionated defaults taken from sanitize.css */
    /* https://github.com/csstools/sanitize.css */
    iframe, img, input, select, textarea {
      height: auto;
      max-width: 100%;
    }
    ol ol, ol ul, ul ol, ul ul {
      margin: 0;
    }
    nav ol, nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    svg:not([fill]) {
      fill: currentColor;
    }
    /* Custom global css */
    [type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }
    [id] {
      scroll-margin-top: var(--cia-header-height);
    }
    a {
      color: inherit;
    }
  `,
}

export default overrides
