import React from 'react';
import Link from 'next/link';

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

interface HeroSectionProps {
  loginHref: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ loginHref }) => (
  <div className="text-center mb-16 md:mb-24">
    <div className="mb-6">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">🌍</span>
      </div>
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
      Your Personal <span className="text-emerald-600">Sustainability</span> Tracker
    </h1>
    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      Transform your daily actions into meaningful contributions to the UN Sustainable Development Goals. 
      Track progress, earn achievements, and make a real impact on our planet.
    </p>
    
    <ButtonLink
      href={loginHref}
      size="lg"
      className="bg-emerald-600 hover:bg-emerald-700"
      data-testid="link-hero-login"
    >
      Start Your Journey
    </ButtonLink>
  </div>
);

export default HeroSection;