import { useState } from 'react';
import { Button } from '../components/Button';
import { cn } from '../lib/cn';
import { useCssVars } from './useCssVar';

const palettes = ['brand', 'neutral', 'red', 'orange', 'green', 'sky', 'purple', 'orchid'] as const;
const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

const semanticColors = [
  { group: 'Text', tokens: ['text-primary', 'text-secondary', 'text-tertiary', 'text-disabled', 'text-brand-default', 'text-negative'] },
  { group: 'Surface', tokens: ['surface-default', 'surface-subtlest', 'surface-subtle', 'surface-muted', 'surface-brand', 'surface-positive'] },
  { group: 'Action', tokens: ['action-primary-default', 'action-primary-hover', 'action-secondary-default', 'action-tertiary-strong-default', 'action-danger-default', 'action-disabled'] },
  { group: 'Border', tokens: ['border-default', 'border-input-default', 'border-input-focus', 'border-tertiary-default', 'border-brand-default', 'border-danger-default'] },
];

// Tailwind 가 클래스를 찾을 수 있도록 리터럴로 나열
const typeScale = [
  { name: 'display-xl', className: 'text-display-xl' },
  { name: 'heading-lg', className: 'text-heading-lg' },
  { name: 'heading-md', className: 'text-heading-md' },
  { name: 'heading-sm', className: 'text-heading-sm' },
  { name: 'heading-xs', className: 'text-heading-xs' },
  { name: 'body-lg-regular', className: 'text-body-lg-regular' },
  { name: 'body-md-regular', className: 'text-body-md-regular' },
  { name: 'label-md-medium', className: 'text-label-md-medium' },
  { name: 'caption', className: 'text-caption' },
];

const spacingScale = ['2', '4', '8', '12', '16', '24', '32', '48', '64', '96'];
const radiusScale = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
const elevations = [
  { name: 'raised', className: 'shadow-raised' },
  { name: 'float', className: 'shadow-float' },
  { name: 'card', className: 'shadow-card' },
  { name: 'menu', className: 'shadow-menu' },
  { name: 'tooltip', className: 'shadow-tooltip' },
  { name: 'popover', className: 'shadow-popover' },
];

const tabs = [
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing · Radius' },
  { id: 'elevation', label: 'Elevation' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function Foundations() {
  const [tab, setTab] = useState<TabId>('color');

  return (
    <div className="flex flex-col gap-gap-xl">
      <div role="tablist" aria-label="Foundations" className="flex flex-wrap gap-gap-sm">
        {tabs.map((t) => (
          <Button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            variant="secondary"
            appearance={tab === t.id ? 'solid' : 'outlined'}
            label={t.label}
            onClick={() => setTab(t.id)}
          />
        ))}
      </div>
      <div role="tabpanel" className="rounded-lg border border-border-default bg-surface-default p-24 sm:p-32">
        {tab === 'color' && <ColorPanel />}
        {tab === 'typography' && <TypographyPanel />}
        {tab === 'spacing' && <SpacingPanel />}
        {tab === 'elevation' && <ElevationPanel />}
      </div>
    </div>
  );
}

function ColorPanel() {
  const vars = useCssVars(palettes.flatMap((p) => steps.map((s) => `--color-${p}-${s}`)));
  return (
    <div className="flex flex-col gap-gap-xl">
      <div className="flex flex-col gap-gap-md overflow-x-auto">
        {palettes.map((p) => (
          <div key={p} className="flex min-w-[640px] items-center gap-gap-md">
            <span className="w-64 shrink-0 text-label-md-medium capitalize text-text-secondary">{p}</span>
            <div className="grid flex-1 grid-cols-11 gap-gap-xs">
              {steps.map((s) => (
                <div key={s} className="group flex flex-col gap-gap-xs">
                  <div
                    className="h-40 rounded-xs ring-1 ring-inset ring-border-default transition-transform group-hover:-translate-y-2"
                    style={{ background: `var(--color-${p}-${s})` }}
                    title={`color/${p}/${s} ${vars[`--color-${p}-${s}`] ?? ''}`}
                  />
                  <span className="text-caption text-text-tertiary">{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-gap-lg sm:grid-cols-2 lg:grid-cols-4">
        {semanticColors.map(({ group, tokens }) => (
          <div key={group} className="flex flex-col gap-gap-sm">
            <h4 className="text-label-md-bold text-text-primary">{group}</h4>
            {tokens.map((t) => (
              <div key={t} className="flex items-center gap-gap-sm">
                <span
                  className="size-20 shrink-0 rounded-xxs ring-1 ring-inset ring-border-input-default"
                  style={{ background: `var(--color-${t})` }}
                />
                <code className="truncate text-caption text-text-secondary">--color-{t}</code>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographyPanel() {
  const vars = useCssVars(
    typeScale.flatMap(({ name }) => [`--typography-${name}-font-size`, `--typography-${name}-line-height`])
  );
  return (
    <div className="flex flex-col divide-y divide-border-default">
      {typeScale.map(({ name, className }) => (
        <div key={name} className="flex flex-col gap-gap-xs py-16 first:pt-0 last:pb-0 md:flex-row md:items-baseline md:gap-gap-xl">
          <div className="flex w-160 shrink-0 flex-col">
            <code className="text-label-sm-medium text-text-brand-default">{name}</code>
            <span className="text-caption text-text-tertiary">
              {vars[`--typography-${name}-font-size`]} / {vars[`--typography-${name}-line-height`]}
            </span>
          </div>
          <p className={cn('min-w-0 truncate text-text-primary', className)}>디자인 시스템 Design System</p>
        </div>
      ))}
    </div>
  );
}

function SpacingPanel() {
  return (
    <div className="grid gap-gap-xxl lg:grid-cols-2">
      <div className="flex flex-col gap-gap-sm">
        <h4 className="text-label-md-bold text-text-primary">Spacing</h4>
        {spacingScale.map((s) => (
          <div key={s} className="flex items-center gap-gap-md">
            <code className="w-40 shrink-0 text-caption text-text-tertiary">{s}</code>
            <span className="h-12 rounded-xxs bg-brand-300" style={{ width: `var(--spacing-${s})` }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-gap-sm">
        <h4 className="text-label-md-bold text-text-primary">Radius</h4>
        <div className="grid grid-cols-4 gap-gap-lg">
          {radiusScale.map((r) => (
            <div key={r} className="flex flex-col items-center gap-gap-xs">
              <span
                className="size-56 border-2 border-brand-400 bg-brand-50"
                style={{ borderRadius: `var(--radius-${r})` }}
              />
              <code className="text-caption text-text-tertiary">{r}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ElevationPanel() {
  return (
    <div className="grid grid-cols-2 gap-gap-xl rounded-md bg-surface-subtle p-24 md:grid-cols-3">
      {elevations.map((e) => (
        <div
          key={e.name}
          className={cn('flex h-100 flex-col justify-end rounded-md bg-surface-default p-16', e.className)}
        >
          <code className="text-label-md-medium text-text-primary">{e.name}</code>
          <span className="text-caption text-text-tertiary">elevation/{e.name}</span>
        </div>
      ))}
    </div>
  );
}
