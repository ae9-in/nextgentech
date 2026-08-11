'use client';

import React from 'react';
import { Hero as MainHero } from '../Hero';

interface HeroProps {
  onExplorePrograms?: () => void;
  onStartJourney?: () => void;
  onBookSlot?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePrograms, onStartJourney, onBookSlot }) => {
  return <MainHero onExplorePrograms={onExplorePrograms} onBookSlot={onBookSlot || onStartJourney} />;
};
