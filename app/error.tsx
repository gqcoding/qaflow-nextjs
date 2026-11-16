'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="error-state" role="alert">
      <h2>Something went wrong</h2>
      <p>The workspace could not load this view.</p>
      <button className="primary-button" onClick={() => reset()}>Try again</button>
    </div>
  );
}
