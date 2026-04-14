import { createGlobalStyle } from 'styled-components';
import bgImage from './assets/6091826.jpg';
import bgDark from './assets/dark-background.jpg';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Greens */
    --color-green-light:       #d1fae5;
    --color-green-light-text:  #065f46;
    --color-green-dark:        #bbf7d0;
    --color-green-dark-text:   #14532d;

    /* Yellows */
    --color-yellow-light:      #fef9c3;
    --color-yellow-light-text: #713f12;

    /* Blues */
    --color-blue-light:        #dbeafe;
    --color-blue-light-text:   #1e3a8a;
    --color-cyan-light:        #cffafe;
    --color-cyan-light-text:   #164e63;

    /* Purples */
    --color-purple-light:      #ede9fe;
    --color-purple-light-text: #4c1d95;

    /* Reds / Oranges */
    --color-orange-light:      #ffedd5;
    --color-orange-light-text: #7c2d12;
    --color-red-light:         #fee2e2;
    --color-red-light-text:    #7f1d1d;

    /* Pinks */
    --color-pink-light:        #fce7f3;
    --color-pink-light-text:   #831843;

    /* Theme - Light */
    --color-neutral-light:       #f3f4f6;
    --color-neutral-light-text:  #111827;
    --color-neutral-border:      #e5e7eb;
    --color-text-muted:          #6b7280;
    --color-card-bg:             #fafbfd;
    --color-header-bg:           #ffffff;
    --color-text-primary:        #111827;
    --color-footer-bg:           #ffffff;
    --bg-image:                  url(${bgImage});
  }

  [data-theme='dark'] {
    --color-neutral-light:       #1f2937;
    --color-neutral-light-text:  #f9fafb;
    --color-neutral-border:      #374151;
    --color-text-muted:          #9ca3af;
    --color-card-bg:             #1e2433;
    --color-header-bg:           #111827;
    --color-text-primary:        #f9fafb;
    --color-footer-bg:           #111827;
    --bg-image:                  url(${bgDark});

    /* Pills - dark variants */
    --color-green-light:         #065f46;
    --color-green-light-text:    #f9fafb;
    --color-green-dark:          #14532d;
    --color-green-dark-text:     #f9fafb;
    --color-yellow-light:        #713f12;
    --color-yellow-light-text:   #f9fafb;
    --color-blue-light:          #1e3a8a;
    --color-blue-light-text:     #f9fafb;
    --color-cyan-light:          #164e63;
    --color-cyan-light-text:     #f9fafb;
    --color-purple-light:        #4c1d95;
    --color-purple-light-text:   #f9fafb;
    --color-orange-light:        #7c2d12;
    --color-orange-light-text:   #f9fafb;
    --color-red-light:           #7f1d1d;
    --color-red-light-text:      #f9fafb;
    --color-pink-light:          #831843;
    --color-pink-light-text:     #f9fafb;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    overflow-x: hidden;
  }

  #root {
    padding: 0 2rem;
    @media (max-width: 600px) {
      padding: 0 1rem;
    }
  }

  body {
    font-family: 'Miranda Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--color-text-primary);
    background-color: var(--color-neutral-light);
    min-height: 100vh;
    transition: color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6, p, span, li {
    color: var(--color-text-primary);
    font-family: 'Red Hat Display', sans-serif;
  }

  h1 {
    font-family: 'Carattere', cursive;
  }
`;



export default GlobalStyles;
