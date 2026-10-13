/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const { primitive, semantic, cssVar, cssVariables, toVarTree, toVarMap, typographyPaths } = require('./theme');

// 모든 값은 CSS 변수(var(--…))로만 연결합니다. Hex 값은 theme.js 의 primitive 에만 존재합니다.
const primitiveColors = toVarTree(primitive.color, 'color');
const semanticColors = toVarTree(semantic.color, 'color');

const sizes = {
  ...toVarMap(primitive.size, 'size'),
  ...toVarMap(semantic.size, 'size'),
};

const fontSize =Object.fromEntries(
  Object.entries(typographyPaths()).map(([name, path]) => [
    name,
    [
      cssVar(`${path}.fontSize`),
      {
        lineHeight: cssVar(`${path}.lineHeight`),
        letterSpacing: cssVar(`${path}.letterSpacing`),
        fontWeight: cssVar(`${path}.fontWeight`),
      },
    ],
  ])
);

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // DS 외 팔레트 사용을 막기 위해 colors 는 extend 하지 않고 대체합니다.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      ...primitiveColors,
      ...semanticColors,
      // primitive overlay(100~400) + semantic overlay(medium/strong)
      overlay: { ...primitiveColors.overlay, ...semanticColors.overlay },
    },
    fontFamily: {
      sans: [cssVar('font.family.ko')],
      ko: [cssVar('font.family.ko')],
    },
    // text-display-xl, text-heading-lg, text-body-md-bold, text-label-sm-medium, text-caption ...
    fontSize,
    // Tailwind 기본 스케일(p-4 = 1rem)을 DS 스케일로 대체: p-16 = 16px, gap-gap-md, px-inline-lg, mt-stack-sm ...
    spacing: {
      px: '1px',
      ...toVarMap(primitive.spacing, 'spacing'),
      ...toVarMap(semantic.spacing, 'spacing'),
    },
    // rounded-8, rounded-md(12px), rounded-full ...
    borderRadius: {
      ...toVarMap(primitive.radius, 'radius'),
      ...toVarMap(semantic.radius, 'radius'),
    },
    // shadow-card, shadow-popover, shadow-float, shadow-raised, shadow-menu, shadow-tooltip
    boxShadow: {
      none: 'none',
      ...toVarMap(semantic.elevation, 'elevation'),
    },
    // border(=1px), border-0, border-2
    borderWidth: {
      DEFAULT: cssVar('border.width.1'),
      ...toVarMap(primitive.border.width, 'border.width'),
    },
    extend: {
      // h-control-md, size-icon-sm, min-w-64(=Size/64) ...
      width: sizes,
      height: sizes,
      minWidth: sizes,
      minHeight: sizes,
      maxHeight: sizes,
      maxWidth: sizes,
      size: sizes,
      fontWeight: toVarTree(primitive.font.weight, 'font.weight'),
      letterSpacing: toVarTree(primitive.font.letterSpacing, 'font.letterSpacing'),
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': cssVariables(),
        body: { fontFamily: cssVar('font.family.ko'), color: cssVar('color.text.primary') },
      });
    }),
  ],
};
