import { profile } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col justify-center px-6 md:px-12 lg:px-24">
      <p className="font-ui text-sm text-faint">404</p>
      <h1 className="mt-2 text-[2.65rem] font-semibold leading-tight tracking-[-0.02em] text-fg">Page not found</h1>
      <p className="mt-4 max-w-md">This page doesn’t exist on {profile.name}’s site.</p>
      <a
        href="/"
        className="mt-8 self-start font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
      >
        Go to the home page
      </a>
    </main>
  );
}
