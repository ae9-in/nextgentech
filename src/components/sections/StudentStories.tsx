'use client';

import React from 'react';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';

const testimonialsData = [
  {
    author: {
      name: "Rahul K.",
      handle: "B.Tech CSE • Full Stack 1-Day Experience",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    },
    text: "I built my first React & Node project in a single day. The step-by-step guidance and live mentor debugging were incredible!",
  },
  {
    author: {
      name: "Priya M.",
      handle: "B.Tech IT • Developer Internship Track",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The internship felt like an actual tech company project. Working with GitHub PRs, Jira tasks, and standups gave me real confidence.",
  },
  {
    author: {
      name: "Ananya S.",
      handle: "BCA • AI Agent Builder 1-Day",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "The 1-Day AI Agent workshop was insane! Deployed my bot live on Vercel before 5 PM. Highly recommend NextGen Tech!",
  },
  {
    author: {
      name: "Vikram R.",
      handle: "BE ECE • Web Dev Bootcamp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "Positioned my resume way ahead of my peers during campus placements. Having verified shippable projects made all the difference.",
  },
  {
    author: {
      name: "Sneha Reddy",
      handle: "B.Tech AI&DS • Data Analytics Sprint",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    },
    text: "From zero Python knowledge to creating interactive dashboards in one weekend. The mentors answer every doubt instantly!",
  },
];

export const StudentStories: React.FC = () => {
  return (
    <div id="testimonials">
      <TestimonialsSection
        title="What Students Say"
        description="Real feedback from college students who built and deployed production code in our workshops and internships."
        testimonials={testimonialsData}
      />
    </div>
  );
};
