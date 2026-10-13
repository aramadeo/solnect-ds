/**
 * Solnect DS design tokens
 * Source: Figma "Solnect DS (260921)" — n41xNRMqjx3b3tRUFchA09
 *
 * - primitive: Figma "Core" collection. Hex 값이 존재하는 유일한 곳입니다.
 * - semantic : Figma "Semantic" collection (Light mode). 값은 모두 `{path}` 참조이며
 *              Figma의 alias 관계를 그대로 따릅니다.
 *
 * 참조 `{color.neutral.900}` 는 CSS 변수 `var(--color-neutral-900)` 로 변환됩니다.
 */

const px = (values) => Object.fromEntries(values.map((n) => [n, `${n}px`]));

const primitive = {
  color: {
    base: { white: '#ffffff', black: '#000000' },
    alpha: { white: '#ffffff00', black: '#00000000' },
    brand: {
      50: '#ecf1ff', 100: '#dde6ff', 200: '#c2d1ff', 300: '#9cb2ff', 400: '#7589ff', 500: '#5662ff',
      600: '#3736f5', 700: '#2e2ad8', 800: '#2725ae', 900: '#262789', 950: '#171650',
    },
    neutral: {
      25: '#fcfcfc', 50: '#f8f9f9', 100: '#f2f3f5', 200: '#ebecef', 300: '#dddee3', 400: '#c2c4cd',
      500: '#a3a6b4', 600: '#828698', 700: '#65697b', 800: '#494c5a', 900: '#2f3139', 950: '#17181b',
    },
    red: {
      50: '#fef2f3', 100: '#fde3e5', 200: '#fcccd0', 300: '#f9a8ae', 400: '#f3767f', 500: '#e63946',
      600: '#d52d3a', 700: '#b3222d', 800: '#942029', 900: '#7b2128', 950: '#430c10',
    },
    orange: {
      50: '#fff9ed', 100: '#fff1d5', 200: '#fedfaa', 300: '#fdc674', 400: '#fba33c', 500: '#f98a1b',
      600: '#ea6c0c', 700: '#c2510c', 800: '#9a4012', 900: '#7c3712', 950: '#431907',
    },
    green: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981',
      600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22',
    },
    blue: {
      50: '#ecf1ff', 100: '#dde6ff', 200: '#c2d1ff', 300: '#9cb2ff', 400: '#7589ff', 500: '#5662ff',
      600: '#3736f5', 700: '#2e2ad8', 800: '#2725ae', 900: '#262789', 950: '#171650',
    },
    sky: {
      50: '#f0faff', 100: '#e0f3fe', 200: '#bbe9fc', 300: '#7ed8fb', 400: '#3ac5f6', 500: '#10b0ea',
      600: '#048cc5', 700: '#0470a0', 800: '#085e84', 900: '#0d4e6d', 950: '#093248',
    },
    purple: {
      50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6',
      600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065',
    },
    orchid: {
      50: '#fef5fe', 100: '#fbebfc', 200: '#f6d6f8', 300: '#f0b6f1', 400: '#e88ae8', 500: '#d85dd8',
      600: '#bb3eb8', 700: '#9b3097', 800: '#7f297a', 900: '#692664', 950: '#440e40',
    },
    overlay: { 100: '#0000001a', 200: '#00000040', 300: '#00000080', 400: '#000000b2' },
  },

  font: {
    family: {
      ko: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
    },
    size: {
      12: '12px', 13: '13px', 14: '14px', 16: '16px', 18: '18px', 20: '20px', 24: '24px', 28: '28px', 64: '64px',
    },
    lineHeight: {
      16: '16px', 18: '18px', 20: '20px', 22: '22px', 24: '24px', 26: '26px', 30: '30px', 34: '34px', 76: '76px',
    },
    weight: { 400: '400', 500: '500', 700: '700' },
    letterSpacing: { default: '-0.4px', label: '-0.2px' },
  },

  // Figma Core: Spacing/*
  spacing: px([0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 60, 64, 72, 80, 96]),

  // Figma Core: Radius/*
  radius: px([0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 999]),

  // Figma Core: Size/*
  size: px([
    4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 58, 60, 64, 80, 100, 104, 120, 160, 180, 184, 320, 360, 420, 720,
  ]),

  // Figma Core: Border/width/*
  border: { width: px([0, 1, 2]) },

  // Figma 이펙트 스타일(Solnect DS/elevation/*)에서 쓰는 그림자 색. Figma 변수에는 없습니다.
  shadow: {
    color: { 'black-8': '#00000014', 'black-10': '#0000001a', 'gray-14': '#acabab24' },
  },
};

// Figma typography/* 변수 묶음 → Core Font/* 참조
const type = (size, lineHeight, weight, letterSpacing) => ({
  fontFamily: '{font.family.ko}',
  fontSize: `{font.size.${size}}`,
  lineHeight: `{font.lineHeight.${lineHeight}}`,
  fontWeight: `{font.weight.${weight}}`,
  letterSpacing: `{font.letterSpacing.${letterSpacing}}`,
});

const semantic = {
  color: {
    surface: {
      default: '{color.base.white}',
      subtlest: '{color.neutral.25}',
      subtle: '{color.neutral.100}',
      muted: '{color.neutral.200}',
      brand: '{color.brand.50}',
      positive: '{color.green.100}',
      negative: '{color.red.100}',
      caution: '{color.orange.100}',
      'transparent-white': '{color.alpha.white}',
    },
    text: {
      primary: '{color.neutral.900}',
      secondary: '{color.neutral.700}',
      tertiary: '{color.neutral.500}',
      disabled: '{color.neutral.400}',
      inverse: '{color.base.white}',
      positive: '{color.green.600}',
      negative: '{color.red.600}',
      caution: '{color.orange.600}',
      brand: { default: '{color.brand.500}', hover: '{color.brand.600}' },
    },
    icon: {
      primary: '{color.neutral.900}',
      secondary: '{color.neutral.700}',
      tertiary: '{color.neutral.500}',
      disabled: '{color.neutral.400}',
      inverse: '{color.base.white}',
      positive: '{color.green.500}',
      negative: '{color.red.500}',
      brand: { default: '{color.brand.500}', hover: '{color.brand.600}' },
    },
    action: {
      primary: {
        default: '{color.brand.500}',
        hover: '{color.brand.600}',
        subtle: '{color.brand.50}',
        'subtle-hover': '{color.brand.100}',
      },
      secondary: { default: '{color.neutral.800}', hover: '{color.neutral.900}' },
      tertiary: { default: '{color.neutral.50}', hover: '{color.neutral.100}' },
      'tertiary-strong': { default: '{color.neutral.100}', hover: '{color.neutral.200}' },
      danger: {
        default: '{color.red.500}',
        hover: '{color.red.600}',
        subtle: '{color.red.50}',
        'subtle-hover': '{color.red.100}',
      },
      disabled: '{color.neutral.100}',
    },
    border: {
      default: '{color.neutral.100}',
      subtle: '{color.neutral.50}',
      disabled: '{color.neutral.100}',
      positive: '{color.green.200}',
      negative: '{color.red.200}',
      input: { default: '{color.neutral.200}', focus: '{color.neutral.600}' },
      tertiary: { default: '{color.neutral.300}', hover: '{color.neutral.400}' },
      brand: {
        default: '{color.brand.500}',
        hover: '{color.brand.600}',
        subtle: '{color.brand.100}',
        'subtle-hover': '{color.brand.200}',
      },
      danger: {
        default: '{color.red.500}',
        hover: '{color.red.600}',
        subtle: '{color.red.100}',
        'subtle-hover': '{color.red.200}',
      },
    },
    overlay: { medium: '{color.overlay.200}', strong: '{color.overlay.300}' },
  },

  // Figma 텍스트 스타일 "Solnect DS/*" 와 1:1
  typography: {
    display: { xl: type(64, 76, 700, 'default') },
    heading: {
      lg: type(28, 34, 700, 'default'),
      md: type(24, 30, 700, 'default'),
      sm: type(20, 26, 700, 'default'),
      xs: type(18, 24, 700, 'default'),
      xxs: type(16, 20, 700, 'default'),
    },
    body: {
      lg: { medium: type(16, 24, 500, 'default'), regular: type(16, 24, 400, 'default') },
      md: {
        bold: type(14, 22, 700, 'default'),
        medium: type(14, 22, 500, 'default'),
        regular: type(14, 22, 400, 'default'),
      },
      sm: {
        bold: type(12, 20, 700, 'default'),
        medium: type(12, 20, 500, 'default'),
        regular: type(12, 20, 400, 'default'),
      },
    },
    label: {
      lg: { bold: type(16, 20, 700, 'label'), medium: type(16, 20, 500, 'label') },
      md: { bold: type(14, 18, 700, 'label'), medium: type(14, 18, 500, 'label') },
      sm: { medium: type(13, 16, 500, 'label') },
      xs: { bold: type(12, 16, 700, 'label'), medium: type(12, 16, 500, 'label') },
    },
    caption: type(12, 16, 400, 'default'),
  },

  spacing: {
    inline: {
      none: '{spacing.0}',
      xxs: '{spacing.2}',
      xs: '{spacing.4}',
      sm: '{spacing.8}',
      md: '{spacing.12}',
      lg: '{spacing.16}',
      xl: '{spacing.20}',
      xxl: '{spacing.24}',
      xxxl: '{spacing.28}',
    },
    stack: {
      none: '{spacing.0}',
      xxs: '{spacing.2}',
      xs: '{spacing.4}',
      sm: '{spacing.8}',
      md: '{spacing.12}',
      lg: '{spacing.16}',
      xl: '{spacing.24}',
      xxl: '{spacing.32}',
    },
    gap: {
      none: '{spacing.0}',
      xxs: '{spacing.2}',
      xs: '{spacing.4}',
      sm: '{spacing.8}',
      md: '{spacing.12}',
      lg: '{spacing.16}',
      xl: '{spacing.24}',
      xxl: '{spacing.32}',
    },
  },

  radius: {
    none: '{radius.0}',
    xxs: '{radius.4}',
    xs: '{radius.6}',
    sm: '{radius.8}',
    md: '{radius.12}',
    lg: '{radius.16}',
    xl: '{radius.24}',
    full: '{radius.999}',
  },

  size: {
    icon: {
      xxs: '{size.8}',
      xs: '{size.12}',
      sm: '{size.16}',
      md: '{size.20}',
      lg: '{size.24}',
      xl: '{size.32}',
      xxl: '{size.48}',
      xxxl: '{size.80}',
    },
    control: {
      xxxs: '{size.20}',
      xxs: '{size.24}',
      xs: '{size.28}',
      sm: '{size.32}',
      md: '{size.36}',
      lg: '{size.44}',
    },
  },

  // Figma 이펙트 스타일 "Solnect DS/elevation/*"
  elevation: {
    card: '0 6px 16px 0 {shadow.color.black-8}',
    popover: '0 4px 48px 0 {shadow.color.black-8}',
    float: '0 0 10px 0 {shadow.color.black-10}',
    raised: '0 4px 13px 0 {shadow.color.gray-14}',
    menu: '0 4px 6px -1px {shadow.color.black-10}, 0 2px 4px -2px {shadow.color.black-10}',
    tooltip: '0 2px 6px 0 {shadow.color.black-10}, 0 0 4px 0 {shadow.color.black-10}',
  },
};

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const TYPE_PROPS = ['fontFamily', 'fontSize', 'lineHeight', 'fontWeight', 'letterSpacing'];
const kebab = (s) => String(s).replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const toVarName = (path) => `--${path.split('.').map(kebab).join('-')}`;
const cssVar = (path) => `var(${toVarName(path)})`;
// `{path}` 참조를 값 안 어디에 있든 var(--path) 로 치환 (예: elevation 의 그림자 색)
const resolveRef = (value) =>
  typeof value === 'string' ? value.replace(/\{([^}]+)\}/g, (_, path) => cssVar(path)) : value;

/** Flatten a token tree into [path, value] pairs. */
function flatten(tree, prefix = '') {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object' ? flatten(value, path) : [[path, value]];
  });
}

/** `{ '--color-neutral-900': '#2f3139', '--color-text-primary': 'var(--color-neutral-900)', ... }` */
function cssVariables() {
  return Object.fromEntries(
    [...flatten(primitive), ...flatten(semantic)].map(([path, value]) => [toVarName(path), resolveRef(value)])
  );
}

/** theme.css 내용 */
function toCss(selector = ':root') {
  const body = Object.entries(cssVariables())
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
  return `/* Generated from theme.js — do not edit by hand. */\n${selector} {\n${body}\n}\n`;
}

/** Replace every leaf in a tree with `var(--<base>.<path>)`. */
function toVarTree(tree, base) {
  return Object.fromEntries(
    Object.entries(tree).map(([key, value]) => {
      const path = `${base}.${key}`;
      return [key, value && typeof value === 'object' ? toVarTree(value, path) : cssVar(path)];
    })
  );
}

/** Flat dash-keyed var map: `toVarMap(semantic.spacing, 'spacing')` → `{ 'inline-md': 'var(--spacing-inline-md)', ... }` */
function toVarMap(tree, base) {
  return Object.fromEntries(
    flatten(tree).map(([path]) => [path.replace(/\./g, '-'), cssVar(`${base}.${path}`)])
  );
}

/** Typography leaves: `{ 'heading-lg': 'typography.heading.lg', 'body-md-bold': ... }` */
function typographyPaths(tree = semantic.typography, prefix = 'typography') {
  return Object.entries(tree).reduce((acc, [key, value]) => {
    const path = `${prefix}.${key}`;
    if (TYPE_PROPS.every((p) => p in value)) acc[path.replace(/^typography\./, '').replace(/\./g, '-')] = path;
    else Object.assign(acc, typographyPaths(value, path));
    return acc;
  }, {});
}

module.exports = {
  primitive,
  semantic,
  cssVar,
  toVarName,
  cssVariables,
  toCss,
  toVarTree,
  toVarMap,
  typographyPaths,
};
