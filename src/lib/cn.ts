import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// DS 커스텀 토큰 클래스(text-heading-lg 등)가 text-color 로 오인되어 병합되지 않도록 등록
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-xl',
            'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'heading-xxs',
            'body-lg-medium', 'body-lg-regular',
            'body-md-bold', 'body-md-medium', 'body-md-regular',
            'body-sm-bold', 'body-sm-medium', 'body-sm-regular',
            'label-lg-bold', 'label-lg-medium', 'label-md-bold', 'label-md-medium',
            'label-sm-medium', 'label-xs-bold', 'label-xs-medium',
            'caption',
          ],
        },
      ],
      rounded: [{ rounded: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] }],
      shadow: [{ shadow: ['card', 'popover', 'float', 'raised', 'menu', 'tooltip'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
