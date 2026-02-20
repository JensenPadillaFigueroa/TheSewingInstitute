export default function SewingIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21V9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6" />
      <path d="M3 15h4" />
      <circle cx="10" cy="18" r="2" />
      <path d="M18 6V3" />
      <path d="M18 3l-3 3" />
      <path d="M18 3l3 3" />
      <path d="M14 12h4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
