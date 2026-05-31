/** SVG paths ported from Framer social button (facebook-No3k) */

type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="ig-dot"
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#f63395" />
          <stop offset="1" stopColor="#a436d2" />
        </linearGradient>
        <linearGradient
          id="ig-ring"
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#ffe185" />
          <stop offset="0.19" stopColor="#ffbb36" />
          <stop offset="0.47" stopColor="#f63395" />
          <stop offset="0.76" stopColor="#a436d2" />
          <stop offset="1" stopColor="#5f4eed" />
        </linearGradient>
        <linearGradient
          id="ig-lens"
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#ffbb36" />
          <stop offset="0.51" stopColor="#f63395" />
          <stop offset="0.78" stopColor="#a436d2" />
          <stop offset="1" stopColor="#5f4eed" />
        </linearGradient>
      </defs>
      <path
        d="M31.89 7.358a2.457 2.457 0 1 1-4.914 0 2.457 2.457 0 0 1 4.914 0Z"
        fill="url(#ig-dot)"
      />
      <path
        d="M21.021 10.682a10.347 10.347 0 1 0 0 20.695 10.347 10.347 0 0 0 0-20.695Zm0 16.971a6.624 6.624 0 1 1 0-13.247 6.624 6.624 0 0 1 0 13.247Z"
        fill="url(#ig-lens)"
      />
      <path
        d="M29.394 0H12.621C5.662 0 0 5.662 0 12.621v16.758C0 36.338 5.662 42 12.621 42h16.773C36.338 42 42 36.338 42 29.379V12.621C42 5.662 36.338 0 29.394 0Zm8.653 29.379a8.653 8.653 0 0 1-8.653 8.653H12.621a8.653 8.653 0 0 1-8.668-8.653V12.621a8.668 8.668 0 0 1 8.668-8.668h16.773a8.653 8.653 0 0 1 8.653 8.668v16.758Z"
        fill="url(#ig-ring)"
      />
    </svg>
  );
}

export function InstagramIconSolid({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M31.89 7.358a2.457 2.457 0 1 1-4.914 0 2.457 2.457 0 0 1 4.914 0Z" />
      <path d="M21.021 10.682a10.347 10.347 0 1 0 0 20.695 10.347 10.347 0 0 0 0-20.695Zm0 16.971a6.624 6.624 0 1 1 0-13.247 6.624 6.624 0 0 1 0 13.247Z" />
      <path d="M29.394 0H12.621C5.662 0 0 5.662 0 12.621v16.758C0 36.338 5.662 42 12.621 42h16.773C36.338 42 42 36.338 42 29.379V12.621C42 5.662 36.338 0 29.394 0Zm8.653 29.379a8.653 8.653 0 0 1-8.653 8.653H12.621a8.653 8.653 0 0 1-8.668-8.653V12.621a8.668 8.668 0 0 1 8.668-8.668h16.773a8.653 8.653 0 0 1 8.653 8.668v16.758Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="li-grad" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0" stopColor="#007bb8" />
          <stop offset="1" stopColor="#0044e9" />
        </linearGradient>
      </defs>
      <path
        d="M.596 11.952h7.523V36H.596V11.952ZM4.358 0a4.333 4.333 0 1 1 0 8.667 4.327 4.327 0 0 1 0-8.667Z"
        fill="url(#li-grad)"
      />
      <path
        d="M12.583 11.82h7.205v3.284h.093c1.006-1.886 3.457-3.891 7.112-3.891 7.603 0 9.007 4.973 9.007 11.464v13.192h-7.497V24.167c0-2.797-.053-6.385-3.907-6.385s-4.503 3.034-4.503 6.174v11.899H12.596V11.82Z"
        fill="url(#li-grad)"
      />
    </svg>
  );
}

export function LinkedInIconSolid({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M.596 11.952h7.523V36H.596V11.952ZM4.358 0a4.333 4.333 0 1 1 0 8.667 4.327 4.327 0 0 1 0-8.667Z" />
      <path d="M12.583 11.82h7.205v3.284h.093c1.006-1.886 3.457-3.891 7.112-3.891 7.603 0 9.007 4.973 9.007 11.464v13.192h-7.497V24.167c0-2.797-.053-6.385-3.907-6.385s-4.503 3.034-4.503 6.174v11.899H12.596V11.82Z" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 31 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="pin-grad" x1="1" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#ff4c3c" />
          <stop offset="1" stopColor="#ee023e" />
        </linearGradient>
      </defs>
      <path
        d="M12.787 25.838c-.039.117-.065.208-.091.312-1.45 5.707-1.618 6.965-3.108 9.611-.712 1.258-1.515 2.452-2.395 3.593-.104.13-.194.298-.389.259-.22-.051-.233-.246-.259-.415-.233-1.738-.375-3.476-.31-5.214.077-2.283.362-3.061 3.289-15.409.039-.195 0-.35-.065-.519-.699-1.894-.842-3.826-.233-5.772 1.321-4.216 6.099-4.54 6.928-1.064.518 2.154-.842 4.968-1.891 9.119-.867 3.437 3.173 5.876 6.617 3.359 3.173-2.309 4.416-7.847 4.183-11.764-.466-7.822-9.026-9.508-14.465-6.992-6.228 2.88-7.64 10.624-4.83 14.152.363.454.635.726.518 1.18-.181.713-.336 1.427-.531 2.127-.142.519-.582.714-1.113.493-1.022-.411-1.919-1.081-2.603-1.946-2.383-2.957-3.069-8.82.091-13.788 3.483-5.499 9.984-7.717 15.927-7.043 7.096.805 11.577 5.669 12.419 11.168.388 2.517.103 8.704-3.406 13.075-4.04 5.032-10.606 5.357-13.636 2.27-.233-.234-.414-.519-.647-.792Z"
        fill="url(#pin-grad)"
      />
    </svg>
  );
}

export function PinterestIconSolid({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 31 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12.787 25.838c-.039.117-.065.208-.091.312-1.45 5.707-1.618 6.965-3.108 9.611-.712 1.258-1.515 2.452-2.395 3.593-.104.13-.194.298-.389.259-.22-.051-.233-.246-.259-.415-.233-1.738-.375-3.476-.31-5.214.077-2.283.362-3.061 3.289-15.409.039-.195 0-.35-.065-.519-.699-1.894-.842-3.826-.233-5.772 1.321-4.216 6.099-4.54 6.928-1.064.518 2.154-.842 4.968-1.891 9.119-.867 3.437 3.173 5.876 6.617 3.359 3.173-2.309 4.416-7.847 4.183-11.764-.466-7.822-9.026-9.508-14.465-6.992-6.228 2.88-7.64 10.624-4.83 14.152.363.454.635.726.518 1.18-.181.713-.336 1.427-.531 2.127-.142.519-.582.714-1.113.493-1.022-.411-1.919-1.081-2.603-1.946-2.383-2.957-3.069-8.82.091-13.788 3.483-5.499 9.984-7.717 15.927-7.043 7.096.805 11.577 5.669 12.419 11.168.388 2.517.103 8.704-3.406 13.075-4.04 5.032-10.606 5.357-13.636 2.27-.233-.234-.414-.519-.647-.792Z" />
    </svg>
  );
}
