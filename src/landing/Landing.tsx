import { useState, type ReactNode } from 'react';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Input } from '../components/Input';
import { SearchInput } from '../components/SearchInput';
import { Select } from '../components/Select';
import { TextArea } from '../components/TextArea';
import { Icon } from '../components/Icon';
import { cn } from '../lib/cn';
import { Foundations } from './Foundations';
import { Logo } from './Logo';

const nav = [
  { href: '#foundations', label: 'Foundations' },
  { href: '#components', label: 'Components' },
  { href: '#start', label: '시작하기' },
];

const stats = [
  { value: '425', label: 'Design tokens', desc: 'Figma 변수 → CSS 변수' },
  { value: '22', label: 'Text styles', desc: 'Pretendard 타입 스케일' },
  { value: '6', label: 'Elevations', desc: '용도별 그림자 단계' },
  { value: '7', label: 'Components', desc: '베리언트 Props 지원' },
];

const teams = [
  { value: 'design', label: '디자인' },
  { value: 'frontend', label: '프론트엔드' },
  { value: 'platform', label: '플랫폼' },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-surface-default text-text-primary">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Section
          id="foundations"
          eyebrow="Foundations"
          title="Figma 변수와 같은 이름, 같은 값"
          desc="색상·타이포그래피·간격·모서리·그림자는 모두 CSS 변수로 연결됩니다. 시맨틱 토큰은 프리미티브를 참조하므로 값은 한 곳에서만 바뀝니다."
        >
          <Foundations />
        </Section>
        <Section
          id="components"
          eyebrow="Components"
          title="상태까지 맞춘 컴포넌트"
          desc="Figma 컴포넌트의 프로퍼티를 그대로 Props 로 옮겼습니다. Hover · Focus · Disabled 상태는 직접 조작해 보세요."
          className="bg-surface-subtlest"
        >
          <ComponentGrid />
        </Section>
        <Section
          id="start"
          eyebrow="Get started"
          title="세 단계로 시작하기"
          desc="토큰을 Tailwind 에 연결하고 컴포넌트를 가져오면 바로 쓸 수 있습니다."
        >
          <GetStarted />
        </Section>
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-16 md:px-24', className)}>{children}</div>;
}

function Section({
  id,
  eyebrow,
  title,
  desc,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-64 py-64 md:py-96', className)}>
      <Container className="flex flex-col gap-gap-xxl">
        <header className="flex max-w-720 flex-col gap-gap-sm">
          <span className="text-label-md-bold text-text-brand-default">{eyebrow}</span>
          <h2 className="text-heading-lg text-text-primary">{title}</h2>
          <p className="text-body-lg-regular text-text-secondary">{desc}</p>
        </header>
        {children}
      </Container>
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-default bg-[color-mix(in_srgb,var(--color-surface-default)_88%,transparent)] backdrop-blur">
      <Container className="flex h-64 items-center justify-between gap-gap-lg">
        <a href="#top" aria-label="Solnect DS 홈">
          <Logo />
        </a>
        <nav className="hidden items-center gap-gap-xs md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-xs px-inline-md py-stack-xs text-label-md-medium text-text-secondary transition-colors hover:bg-action-tertiary-hover hover:text-text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Button
          size="small"
          variant="secondary"
          appearance="outlined"
          label="Playground"
          trailingIcon="arrow-right"
          onClick={() => (location.hash = '#/playground')}
        />
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(60%_60%_at_80%_20%,var(--color-brand-100),transparent_70%),radial-gradient(50%_50%_at_10%_90%,var(--color-sky-50),transparent_70%)]"
    >
      <Container className="grid items-center gap-gap-xxl py-64 md:py-96 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-gap-xl">
          <span className="inline-flex items-center gap-gap-xs rounded-full border border-border-brand-subtle bg-surface-brand px-inline-md py-stack-xxs text-label-sm-medium text-text-brand-default">
            <span className="size-icon-xxs rounded-full bg-brand-500" />
            Solnect DS · v0.1
          </span>
          <h1 className="text-heading-lg text-text-primary sm:text-display-xl">
            디자인과 코드가
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-sky-500 bg-clip-text text-transparent">같은 언어</span>로
            말하도록
          </h1>
          <p className="max-w-[520px] text-body-lg-regular text-text-secondary">
            Solnect 디자인 시스템은 Figma 변수에서 추출한 토큰과 React 컴포넌트로 구성됩니다. 헥스 코드 없이 변수만으로
            연결되어, 디자인이 바뀌면 코드도 함께 바뀝니다.
          </p>
          <div className="flex flex-wrap gap-gap-sm">
            <Button
              size="large"
              label="시작하기"
              trailingIcon="arrow-right"
              onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <Button
              size="large"
              variant="secondary"
              appearance="outlined"
              label="컴포넌트 보기"
              onClick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </div>
        <HeroPreview />
      </Container>
    </section>
  );
}

function HeroPreview() {
  const [team, setTeam] = useState<string>('design');
  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:mr-0">
      <div className="relative z-10 flex flex-col gap-gap-lg rounded-lg border border-border-default bg-surface-default p-24 shadow-popover">
        <div className="flex items-center justify-between">
          <h3 className="text-heading-xs text-text-primary">새 프로젝트</h3>
          <IconButton icon="close" variant="secondary" appearance="ghost" size="small" aria-label="닫기" />
        </div>
        <Input label="프로젝트 이름" defaultValue="Solnect Insight" helpText="팀원에게 보이는 이름입니다." />
        <Select label="담당 팀" options={teams} value={team} onChange={setTeam} />
        <div className="flex justify-end gap-gap-sm pt-8">
          <Button variant="tertiary" label="취소" />
          <Button label="만들기" leadingIcon="check" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -right-16 -top-24 z-0 flex gap-gap-xs rounded-md bg-surface-default p-8 shadow-card"
      >
        {['bg-brand-500', 'bg-sky-400', 'bg-green-500', 'bg-orange-400', 'bg-red-500'].map((c) => (
          <span key={c} className={cn('size-24 rounded-xs', c)} />
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="border-y border-border-default bg-surface-default">
      <Container className="grid grid-cols-2 divide-border-default md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-gap-xxs px-16 py-32 md:px-24">
            <span className="text-heading-lg text-text-primary">{s.value}</span>
            <span className="text-label-md-bold text-text-primary">{s.label}</span>
            <span className="text-body-sm-regular text-text-tertiary">{s.desc}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ComponentCard({
  name,
  desc,
  props,
  className,
  children,
}: {
  name: string;
  desc: string;
  props: string[];
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-border-default bg-surface-default transition-shadow hover:shadow-card',
        className
      )}
    >
      <div className="flex min-h-180 flex-1 flex-wrap items-center justify-center gap-gap-sm border-b border-border-default bg-[radial-gradient(var(--color-neutral-200)_1px,transparent_1px)] bg-[length:16px_16px] p-24">
        {children}
      </div>
      <div className="flex flex-col gap-gap-sm p-24">
        <h3 className="text-heading-xs text-text-primary">{name}</h3>
        <p className="text-body-md-regular text-text-secondary">{desc}</p>
        <div className="flex flex-wrap gap-gap-xs pt-4">
          {props.map((p) => (
            <code key={p} className="rounded-xxs bg-surface-subtle px-inline-xs py-stack-xxs text-caption text-text-secondary">
              {p}
            </code>
          ))}
        </div>
      </div>
    </article>
  );
}

function ComponentGrid() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid gap-gap-lg md:grid-cols-2 lg:grid-cols-3">
      <ComponentCard
        name="Button"
        desc="4가지 Variant와 Solid · Outlined · Ghost, 세 가지 크기를 지원합니다."
        props={['label', 'leadingIcon', 'trailingIcon', 'variant', 'appearance', 'size', 'disabled']}
        className="lg:col-span-2"
      >
        <Button label="Primary" leadingIcon="check" />
        <Button variant="secondary" label="Secondary" />
        <Button variant="tertiary" label="Tertiary" />
        <Button variant="danger" appearance="outlined" label="Danger" />
        <Button variant="secondary" appearance="ghost" label="Ghost" trailingIcon="arrow-right" />
        <Button
          label={loading ? '저장 중…' : '눌러보세요'}
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1200);
          }}
        />
      </ComponentCard>

      <ComponentCard
        name="Icon Button"
        desc="XSmall부터 Large까지, Rounded와 Circular 모서리를 고를 수 있습니다."
        props={['icon', 'radius', 'size', 'aria-label']}
      >
        <IconButton icon="search" aria-label="검색" />
        <IconButton icon="copy" variant="secondary" appearance="outlined" aria-label="복사" />
        <IconButton icon="close" variant="tertiary" radius="circular" aria-label="닫기" />
        <IconButton icon="check" appearance="outlined" radius="circular" size="large" aria-label="확인" />
      </ComponentCard>

      <ComponentCard
        name="Input"
        desc="라벨과 안내 문구를 갖춘 입력 필드. 포커스 상태에서 지우기 버튼이 나타납니다."
        props={['label', 'helpText', 'size', 'clearable', 'disabled']}
      >
        <Input label="이메일" placeholder="name@solnect.com" helpText="회사 이메일을 입력하세요." className="w-full max-w-320" />
      </ComponentCard>

      <ComponentCard
        name="Search Input"
        desc="검색 아이콘과 지우기 버튼이 포함된 검색 전용 필드입니다."
        props={['helpText', 'clearable', 'disabled']}
      >
        <SearchInput defaultValue="토큰" className="w-full max-w-320" />
      </ComponentCard>

      <ComponentCard
        name="Select"
        desc="키보드로 탐색할 수 있는 드롭다운. 카테고리로 묶은 옵션도 지원합니다."
        props={['options', 'value', 'onChange', 'size', 'disabled']}
      >
        <Select label="담당 팀" options={teams} className="w-full max-w-320" />
      </ComponentCard>

      <ComponentCard
        name="TextArea"
        desc="글자 수 카운터가 있는 여러 줄 입력. maxLength 를 넘기면 제한이 표시됩니다."
        props={['label', 'helpText', 'showCount', 'maxLength']}
        className="md:col-span-2 lg:col-span-3"
      >
        <TextArea label="설명" placeholder="프로젝트를 소개해 주세요." maxLength={200} className="w-full max-w-720" />
      </ComponentCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const steps = [
  {
    title: '의존성 설치',
    desc: 'React, Tailwind CSS 와 변형 유틸리티를 설치합니다.',
    code: 'npm i class-variance-authority clsx tailwind-merge\nnpm i -D tailwindcss@3 postcss autoprefixer',
  },
  {
    title: '토큰 연결',
    desc: 'theme.js 의 토큰이 tailwind.config.js 를 통해 CSS 변수로 주입됩니다.',
    code: "// tailwind.config.js\nconst { cssVariables } = require('./theme');\n// :root { --color-text-primary: var(--color-neutral-900); … }",
  },
  {
    title: '컴포넌트 사용',
    desc: 'Figma 프로퍼티와 같은 이름의 Props 로 베리언트를 고릅니다.',
    code: "import { Button } from 'solnect-ds';\n\n<Button label=\"저장\" leadingIcon=\"check\" />",
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-md bg-neutral-950">
      <pre className="overflow-x-auto p-16 pr-56 text-body-sm-regular text-neutral-100">
        <code>{code}</code>
      </pre>
      <IconButton
        icon={copied ? 'check' : 'copy'}
        size="small"
        variant="secondary"
        appearance="solid"
        aria-label={copied ? '복사됨' : '코드 복사'}
        className="absolute right-8 top-8"
        onClick={() => {
          navigator.clipboard?.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      />
    </div>
  );
}

function GetStarted() {
  return (
    <ol className="grid gap-gap-lg lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="flex min-w-0 flex-col gap-gap-md">
          <div className="flex items-center gap-gap-sm">
            <span className="flex size-28 items-center justify-center rounded-full bg-surface-brand text-label-md-bold text-text-brand-default">
              {i + 1}
            </span>
            <h3 className="text-heading-xs text-text-primary">{s.title}</h3>
          </div>
          <p className="text-body-md-regular text-text-secondary">{s.desc}</p>
          <CodeBlock code={s.code} />
        </li>
      ))}
    </ol>
  );
}

function Cta() {
  return (
    <section className="pb-64 md:pb-96">
      <Container>
        <div className="flex flex-col items-start gap-gap-lg rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-32 md:flex-row md:items-center md:justify-between md:p-56">
          <div className="flex flex-col gap-gap-sm">
            <h2 className="text-heading-lg text-text-inverse">모든 상태를 직접 확인해 보세요</h2>
            <p className="text-body-lg-regular text-brand-100">
              Playground 에서 Variant · Size · Disabled 조합을 한눈에 볼 수 있습니다.
            </p>
          </div>
          <Button
            size="large"
            variant="tertiary"
            label="Playground 열기"
            trailingIcon="arrow-right"
            onClick={() => (location.hash = '#/playground')}
          />
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-default">
      <Container className="flex flex-col gap-gap-md py-32 md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="flex items-center gap-gap-xs text-body-sm-regular text-text-tertiary">
          Figma <Icon name="arrow-right" size="xs" className="text-icon-tertiary" /> Tokens{' '}
          <Icon name="arrow-right" size="xs" className="text-icon-tertiary" /> Code · © 2026 Solnect
        </p>
      </Container>
    </footer>
  );
}
