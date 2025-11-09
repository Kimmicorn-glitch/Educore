
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProgress } from '@/lib/types';
import { ArrowLeft, ArrowRight, BookCopy, LayoutDashboard, Swords, User as UserIcon, Award, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const tutorialSteps = [
  {
    icon: LayoutDashboard,
    title: 'Welcome to Your Dashboard',
    description: 'This is your mission control. Here, you can get a quick overview of your overall progress, see how you are doing in different subjects, and get personalized advice from our AI Learning Advisor.',
  },
  {
    icon: BookCopy,
    title: 'Explore the Courses',
    description: 'Head to the "Courses" section to dive into lessons on Python, English, Maths, and Physics. Each lesson is designed to build your skills step by step.',
  },
  {
    icon: Swords,
    title: 'Test Your Skills with Challenges',
    description: 'Ready to apply what you\'ve learned? The "Challenges" section contains a series of coding problems that get progressively harder. Put your knowledge to the test!',
  },
  {
    icon: UserIcon,
    title: 'Manage Your Profile',
    description: 'In the "Profile" section, you can update your personal information, view the badges you\'ve earned, and customize accessibility settings like theme and font size.',
  },
  {
    icon: Award,
    title: 'You\'re Ready to Go!',
    description: 'You\'ve completed the tour! You can now start your learning journey. Good luck!',
  },
];

const defaultProgress: UserProgress = {
    lessonCompletions: [],
    exerciseAttempts: [],
    badges: [],
    challengeProgress: [],
    hasCompletedTutorial: false,
}

export default function OnboardingTutorial() {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const progressDocRef = useMemoFirebase(() => (user ? doc(firestore, 'users', user.uid, 'progress', 'main') : null), [user, firestore]);
  const { data: userProgress } = useDoc<UserProgress>(progressDocRef);

  const progress = userProgress || defaultProgress;

  useEffect(() => {
    // Show tutorial if user is logged in and hasn't completed it
    if (user && progress && progress.hasCompletedTutorial === false) {
      setIsOpen(true);
    }
  }, [user, progress]);

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    if (!progressDocRef) return;
    try {
      await updateDocumentNonBlocking(progressDocRef, {
        hasCompletedTutorial: true,
      });
      toast({
        title: 'Tutorial Complete!',
        description: 'You can now start your learning journey.',
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save tutorial progress:", error);
      toast({
          variant: "destructive",
          title: "Error",
          description: "Could not save your progress. Please try again.",
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const currentStep = tutorialSteps[step];
  const Icon = currentStep.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center items-center">
          <div className="bg-primary/10 text-primary rounded-full p-3 w-fit">
            <Icon className="h-8 w-8" />
          </div>
          <DialogTitle className="text-2xl font-headline mt-2">{currentStep.title}</DialogTitle>
          <DialogDescription className="text-center px-4">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center space-x-2 my-4">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === step ? 'w-6 bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {step === tutorialSteps.length - 1 ? (
                <Button onClick={handleFinish}>
                    <Check className="mr-2 h-4 w-4" /> Finish
                </Button>
            ) : (
                <Button onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
