/**
 * A moiré field of warped vertical lines, generated rather than shipped as an
 * image — public/ is already heavy and this stays a couple of KB.
 *
 * feTurbulence produces smooth noise; feDisplacementMap pushes the straight
 * lines around by it, which is what gives the rippled, topographic look. The
 * strokes use currentColor, so the caller sets the colour and opacity.
 */
export default function WavePattern({
  className,
  height = 160,
  seed = 7,
}: {
  className?: string;
  height?: number;
  seed?: number;
}) {
  // Unique per instance so two on one page don't share filter/pattern ids.
  const uid = `wave-${seed}`;
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox={`0 0 1200 ${height}`}
      // slice, not none: on a narrow viewport "none" squeezes the 1200-wide
      // field into ~390px and the waves collapse into dense striping.
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* Low frequency + high displacement gives broad, topographic sweeps;
            higher frequencies just read as noise at this scale. */}
        <filter id={`${uid}-warp`} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.0012 0.008"
            numOctaves={2}
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={90}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <pattern
          id={`${uid}-lines`}
          width="10"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="-4"
            x2="0"
            y2={height + 4}
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </pattern>
      </defs>
      {/* Overdrawn past the viewBox so the displacement can't expose an edge */}
      <rect
        x="-120"
        y="-60"
        width="1440"
        height={height + 120}
        fill={`url(#${uid}-lines)`}
        filter={`url(#${uid}-warp)`}
      />
    </svg>
  );
}
