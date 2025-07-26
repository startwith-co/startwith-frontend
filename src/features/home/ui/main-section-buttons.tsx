'use client';

import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  firstSectionButtons,
  secondSectionButtons,
} from '../model/home-button-category';

function MainSectionButtons() {
  const [step, setStep] = useState(0);
  const [solutionCategory, setSolutionCategory] = useState('');
  const router = useRouter();

  const handleFirstSectionClick = (button: string) => {
    const cleanedCategory = button.replace(/\(.*\)$/, '');
    setSolutionCategory(cleanedCategory);
    setStep((prev) => prev + 1);
  };

  const handleSecondSectionClick = (button: string) => {
    router.push(`/search?category=${solutionCategory}&industry=${button}`);
  };

  return (
    <div className="mt-10 grid w-[500px] grid-cols-2 gap-8">
      {step === 0
        ? firstSectionButtons.map((button) => (
            <Button
              key={button}
              variant="textBlue"
              className="h-[110px] w-full rounded-xl whitespace-pre-line shadow-md"
              asChild={false}
              onClick={() => handleFirstSectionClick(button)}
            >
              {button}
            </Button>
          ))
        : secondSectionButtons.map((button) => (
            <Button
              key={button}
              variant="textBlue"
              className="h-[110px] w-full rounded-xl shadow-md"
              asChild={false}
              onClick={() => handleSecondSectionClick(button)}
            >
              {button}
            </Button>
          ))}
    </div>
  );
}

export default MainSectionButtons;
