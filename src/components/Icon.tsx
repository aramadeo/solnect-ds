import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { cn } from '../lib/cn';
import iconArea from '../assets/icons/icon-area.svg';
import arrowRight from '../assets/icons/arrow-right.svg';
import check from '../assets/icons/check.svg';
import chevronDown from '../assets/icons/chevron-down.svg';
import close from '../assets/icons/close.svg';
import copy from '../assets/icons/copy.svg';
import search from '../assets/icons/search.svg';

// Figma "Icon/Basic" 컴포넌트 세트의 변형 이름과 동일
export const icons = {
  iconArea,
  'arrow-right': arrowRight,
  check,
  'chevron-down': chevronDown,
  close,
  copy,
  search,
} as const;

export type IconName = keyof typeof icons;

// Figma size/icon/*
const sizeClass = {
  xxs: 'size-icon-xxs',
  xs: 'size-icon-xs',
  sm: 'size-icon-sm',
  md: 'size-icon-md',
  lg: 'size-icon-lg',
  xl: 'size-icon-xl',
} as const;

export type IconSize = keyof typeof sizeClass;

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: IconSize;
}

/**
 * SVG 원본을 mask 로 사용하고 `currentColor` 로 칠합니다.
 * 색은 부모(또는 className)의 `text-icon-*` 토큰으로 지정하세요.
 */
export function Icon({ name, size = 'lg', className, style, ...props }: IconProps) {
  const url = `url("${icons[name]}")`;
  const mask: CSSProperties = {
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  };
  return (
    <span
      aria-hidden
      data-slot="icon"
      className={cn('inline-block shrink-0 bg-current', sizeClass[size], className)}
      style={{ ...mask, ...style }}
      {...props}
    />
  );
}

/** 컴포넌트의 icon prop: DS 아이콘 이름 또는 직접 만든 아이콘 엘리먼트 */
export type IconProp = IconName | ReactElement;

export function renderIcon(icon: IconProp, size: IconSize, className?: string) {
  if (typeof icon === 'string') return <Icon name={icon} size={size} className={className} />;
  return (
    <span aria-hidden data-slot="icon" className={cn('inline-flex shrink-0', sizeClass[size], className)}>
      {icon}
    </span>
  );
}
