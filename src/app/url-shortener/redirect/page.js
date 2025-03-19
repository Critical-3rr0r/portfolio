"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function RedirectComponent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("to");

  useEffect(() => {
    if (destination) {
      window.location.href = destination;
    }
  }, [destination]);

  return (
    <div>
      <h1>Redirecting...</h1>
      {destination ? (
        <p>If you are not redirected, <a href={destination}>click here</a>.</p>
      ) : (
        <p>Invalid redirect URL.</p>
      )}
    </div>
  );
}

export default function RedirectPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RedirectComponent />
    </Suspense>
  );
}