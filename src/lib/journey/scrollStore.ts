// Module-level scroll state. Written by the smooth-scroll provider and read
// inside R3F useFrame loops — kept out of React state to avoid re-renders.
export const scrollState = {
  progress: 0, // 0..1 over the whole page
  velocity: 0,
};
