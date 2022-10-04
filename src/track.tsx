export function track(event: string, data?: object) {
  (window as any).umami?.trackEvent(event, data);
}

export function trackSolve(puzzle: string) {
  track(`successful_solve_${puzzle}`);
}
