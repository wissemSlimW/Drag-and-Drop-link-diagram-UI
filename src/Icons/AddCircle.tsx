export const AddCircle = ({ width = '24', height = '24',...restProps}: React.SVGProps<SVGSVGElement>) =>

    <svg {...restProps} width={width} height={height}  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke="currentColor"  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path stroke="currentColor"  d="M8 12H16"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path stroke="currentColor"  d="M12 16V8"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>