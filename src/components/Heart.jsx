export const HEART_PATH =
  'M12 21C12 21 2 14.5 2 8.6 2 5.5 4.4 3.2 7.4 3.2c2.1 0 3.8 1.2 4.6 2.9.8-1.7 2.5-2.9 4.6-2.9 3 0 5.4 2.3 5.4 5.4C22 14.5 12 21 12 21Z'

export default function Heart({
  size = 16,
  className = '',
  style,
  fill = 'currentColor',
  stroke,
  strokeWidth = 0,
  title,
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d={HEART_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** A soft four-point star used for sparkles. */
export function Sparkle({ size = 14, className = '', style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 1.6c.72 5.9 3 8.2 10.4 10.4-7.4 2.2-9.68 4.5-10.4 10.4-.72-5.9-3-8.2-10.4-10.4C9 9.8 11.28 7.5 12 1.6Z"
        fill="currentColor"
      />
    </svg>
  )
}
