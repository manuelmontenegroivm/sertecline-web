/**
 * SERTECLine — Logo (React + TypeScript)
 * Uso: <Logo variant="primary" className="h-6 w-auto" />
 */
import type { ImgHTMLAttributes } from 'react';

export type LogoVariant = 'primary' | 'dark' | 'light' | 'mono' | 'horizontal' | 'monogram';

const FILES: Record<LogoVariant, { src: string; w: number; h: number }> = {
  primary: { src: '/brand/logo/logo.svg', w: 860, h: 150 },
  dark: { src: '/brand/logo/logo-dark.svg', w: 860, h: 150 },
  light: { src: '/brand/logo/logo-light.svg', w: 860, h: 150 },
  mono: { src: '/brand/logo/logo-mono.svg', w: 860, h: 150 },
  horizontal: { src: '/brand/logo/logo-horizontal.svg', w: 880, h: 200 },
  monogram: { src: '/brand/logo/logo-monogram.svg', w: 512, h: 512 },
};

export interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: LogoVariant;
}

export function Logo({
  variant = 'primary',
  className = 'h-6 w-auto',
  alt = 'SERTECLine',
  ...rest
}: LogoProps) {
  const f = FILES[variant] ?? FILES.primary;
  return (
    <img
      src={f.src}
      width={f.w}
      height={f.h}
      alt={alt}
      className={className}
      decoding="async"
      {...rest}
    />
  );
}

export default Logo;
