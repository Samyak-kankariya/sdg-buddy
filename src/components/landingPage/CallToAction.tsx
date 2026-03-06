import React from "react";
import Link from "next/link";

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  size?: 'lg' | 'default';
  'data-testid'?: string;
}

const ButtonLink = ({ href, className, size, children, ...props }: ButtonLinkProps) => {
  const sizeClasses = size === 'lg' ? 'text-lg px-8 py-3' : 'px-4 py-2';
  return (
    <Link
      href={href}
      className={`inline-block rounded-md text-white font-semibold transition-colors ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

interface CallToActionSectionProps {
  loginHref: string;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ loginHref }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">
      Ready to Make a Difference?
    </h2>
    <p className="text-lg md:text-xl text-gray-600 mb-8">
      Join the movement towards a sustainable future. Start tracking your impact today.
    </p>

    <ButtonLink
      href={loginHref}
      size="lg"
      className="bg-emerald-600 hover:bg-emerald-700"
      data-testid="link-cta-login"
    >
      Begin Tracking
    </ButtonLink>
  </div>
);

export default CallToActionSection;