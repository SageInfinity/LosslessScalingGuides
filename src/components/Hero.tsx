import React, { ReactNode } from 'react';

interface HeroProps {
  title: ReactNode;
  imageUrl: string;
}

export default function Hero({ title, imageUrl }: HeroProps) {
  return (
    <div className="hero-container">
      <div className="hero-banner">
        <img 
          src={'img/d1.png'} 
          alt="Hero banner" 
          className="hero-image"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          {title}
        </h1>
      </div>
    </div>
  );
}