import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Email from "@/components/Email";
import Spotlight from "@/components/Spotlight";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { about, campusPhoto, experience, profile, projects, type Job, type Project } from "@/content/site";

export default function Home() {
  return (
    <>
      <Spotlight />
      <a
        href="#content"
        className="absolute left-0 top-0 z-50 -translate-y-full bg-accent px-4 py-3 font-ui text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>

      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-8">
          <Sidebar />
          <main id="content" className="pt-24 lg:w-[54%] lg:py-24">
            <Section id="about" label="About" hideTitle>
              <div className="space-y-4">
                {about.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              {campusPhoto && (
                <figure className="mt-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={campusPhoto.src}
                    alt={campusPhoto.alt}
                    className="aspect-[16/7] w-full rounded-lg object-cover opacity-90 grayscale-[20%]"
                  />
                  <figcaption className="mt-2 font-ui text-xs text-faint">{campusPhoto.caption}</figcaption>
                </figure>
              )}
            </Section>

            <Section id="experience" label="Experience">
              <ol className="group/list space-y-12">
                {experience.map((job) => (
                  <li key={job.company}>
                    <Reveal>
                      <JobRow job={job} />
                    </Reveal>
                  </li>
                ))}
              </ol>
              <MoreLink href={profile.resume}>View full résumé</MoreLink>
            </Section>

            <Section id="projects" label="Projects">
              <ol className="group/list space-y-12">
                {projects.map((p) => (
                  <li key={p.title}>
                    <Reveal>
                      <ProjectRow project={p} />
                    </Reveal>
                  </li>
                ))}
              </ol>
              <MoreLink href={profile.github}>More on GitHub</MoreLink>
            </Section>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.headshot}
          alt={profile.name}
          width={160}
          height={160}
          className="mb-8 h-32 w-32 rounded-full object-cover ring-1 ring-line sm:h-40 sm:w-40"
        />
        <h1 className="text-[2.65rem] font-semibold leading-tight tracking-[-0.02em] text-fg">
          <a href="/">{profile.name}</a>
        </h1>
        <h2 className="mt-2 text-xl text-fg">{profile.role}</h2>
        <p className="mt-4 max-w-xs">{profile.tagline}</p>
        <Nav />
      </div>

      <ul className="mt-8 flex items-center gap-5" aria-label="Links">
        <IconLink href={profile.github} label="GitHub">
          <GitHubIcon className="h-5 w-5" />
        </IconLink>
        <IconLink href={profile.linkedin} label="LinkedIn">
          <LinkedInIcon className="h-5 w-5" />
        </IconLink>
        <IconLink href="#contact" label="Email">
          <MailIcon className="h-5 w-5" />
        </IconLink>
        <li>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded border border-accent/40 px-3 py-1.5 font-ui text-xs text-accent transition-colors hover:bg-accent-dim"
          >
            Résumé ↗
          </a>
        </li>
      </ul>
    </header>
  );
}

function Section({
  id,
  label,
  hideTitle,
  children,
}: {
  id: string;
  label: string;
  hideTitle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      {/* Sticky on small screens; a plain heading on desktop (About's is hidden there, the sidebar covers it). */}
      <div
        className={`sticky top-0 z-20 -mx-6 mb-4 w-screen bg-bg/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:static lg:mx-0 lg:mb-10 lg:w-auto lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${
          hideTitle ? "lg:sr-only" : ""
        }`}
      >
        <h2 className="text-[1.45rem] font-semibold tracking-[-0.02em] text-fg">{label}</h2>
      </div>
      {children}
    </section>
  );
}

// Row hover: lift the hovered row, dim its siblings (desktop only).
const rowClass =
  "group relative grid gap-2 transition-opacity sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50";
const rowBg =
  "absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((t) => (
        <li key={t} className="rounded-full bg-accent-dim px-3 py-1 font-ui text-xs text-accent">
          {t}
        </li>
      ))}
    </ul>
  );
}

function JobRow({ job }: { job: Job }) {
  return (
    <div className={rowClass}>
      <div className={rowBg} />
      <p className="z-10 mt-1 font-ui text-sm text-faint sm:col-span-2">{job.period}</p>
      <div className="z-10 sm:col-span-6">
        <h3 className="font-semibold leading-snug text-fg">
          {job.role} <span className="text-faint">·</span> {job.company}
        </h3>
        <p className="mt-2 text-sm">{job.summary}</p>
        <Tags tags={job.tags} />
      </div>
    </div>
  );
}

function ProjectRow({ project: p }: { project: Project }) {
  return (
    <div className={rowClass}>
      <div className={rowBg} />
      <div className="z-10 sm:col-span-8">
        <p className="mb-1 font-ui text-sm text-faint">{p.context}</p>
        <h3 className="font-semibold leading-snug text-fg">
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-baseline hover:text-accent focus-visible:text-accent"
            >
              {/* Stretch the link over the whole row. */}
              <span className="absolute -inset-x-4 -inset-y-4 hidden rounded-md lg:-inset-x-6 lg:block" />
              {p.title}
              <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            p.title
          )}
          {p.inProgress && (
            <span className="ml-2 whitespace-nowrap rounded border border-line px-1.5 py-0.5 align-middle font-ui text-xs text-faint">
              in progress
            </span>
          )}
        </h3>
        <p className="mt-1 font-ui text-sm font-medium text-accent">→ {p.metric}</p>
        <p className="mt-2 text-sm">{p.summary}</p>
        <Tags tags={p.tags} />
      </div>
    </div>
  );
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group mt-12 inline-flex items-center font-medium text-fg"
    >
      <span className="border-b border-transparent pb-px transition group-hover:border-accent">{children}</span>
      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        title={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="block text-muted transition-colors hover:text-fg"
      >
        {children}
      </a>
    </li>
  );
}

function Footer() {
  return (
    <footer id="contact" className="pb-16 sm:pb-0">
      <Reveal>
        <p className="text-[1.45rem] font-semibold tracking-[-0.02em] text-fg">Get in touch</p>
        <Email
          user={profile.emailUser}
          domain={profile.emailDomain}
          className="mt-3 inline-block text-lg text-accent underline decoration-accent/40 underline-offset-4 sm:text-xl"
        />
        <p className="mt-2 text-sm">
          Or find me on{" "}
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-fg hover:text-accent">
            LinkedIn
          </a>
          .
        </p>
      </Reveal>
    </footer>
  );
}
