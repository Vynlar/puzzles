export function track(event: string, data?: object) {
  if (import.meta.env.PROD) {
    (window as any).umami?.trackEvent(event, data);
  } else {
    console.log("Skipping track event: ", event, data);
  }
}

export function trackSolve(puzzle: string) {
  track(`successful_solve_${puzzle}`);
}
