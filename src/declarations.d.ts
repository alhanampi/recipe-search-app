declare module '@splidejs/react-splide' {
  export { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide/dist/types/index.d.ts';
}

declare module '@splidejs/react-splide/css';

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
