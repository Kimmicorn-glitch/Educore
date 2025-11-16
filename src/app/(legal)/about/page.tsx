
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Users, Code, School, BookOpen } from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        icon: <Lightbulb className="h-10 w-10 text-primary" />,
        title: "Personalized Learning Paths",
        description: "Our AI analyzes your performance to adjust lesson difficulty in real-time, ensuring you're always challenged but never overwhelmed.",
    },
    {
        icon: <Code className="h-10 w-10 text-primary" />,
        title: "Interactive Exercises",
        description: "Learn by doing with our in-browser code runner and interactive quizzes that provide immediate feedback to solidify your understanding.",
    },
    {
        icon: <School className="h-10 w-10 text-primary" />,
        title: "Multi-Subject Curriculum",
        description: "From Python to Physics, we offer a wide range of subjects designed for different age groups and skill levels.",
    },
    {
        icon: <BookOpen className="h-10 w-10 text-primary" />,
        title: "AI-Powered Assistance",
        description: "Get unstuck with our contextual AI chatbot, available 24/7 to answer your questions and provide helpful hints.",
    }
];

export default function AboutPage() {
    return (
      <div className="not-prose space-y-16">
        {/* Hero Section */}
        <div className="relative h-80 rounded-lg overflow-hidden flex items-center justify-center text-center p-8 bg-black">
            <Image
                src="https://picsum.photos/seed/team-working/1200/400"
                alt="A collaborative team working on computers"
                fill
                className="object-cover opacity-30"
                data-ai-hint="team working"
            />
            <div className="relative z-10 text-white">
                <h1 className="text-5xl md:text-6xl font-extrabold font-headline">About EduCore</h1>
                <p className="mt-4 text-xl md:text-2xl text-neutral-200">
                    Democratizing education through technology and AI.
                </p>
            </div>
        </div>

        {/* Our Mission */}
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-headline mb-4 flex items-center justify-center gap-3"><Target className="h-8 w-8 text-primary"/> Our Mission</h2>
            <p className="text-lg text-muted-foreground">
                Our mission is to make learning accessible, engaging, and personalized for everyone. We believe that education is a lifelong journey, and we aim to empower individuals to master new skills in a way that is tailored to their unique pace and style, breaking down barriers to education for learners of all ages and backgrounds.
            </p>
        </div>

        {/* What We Do Section */}
        <div>
            <h2 className="text-3xl font-bold font-headline text-center mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <CardHeader className="flex flex-col items-center text-center">
                            {feature.icon}
                            <CardTitle className="mt-4">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            {feature.description}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* Meet the Creator Section */}
        <div>
            <h2 className="text-3xl font-bold font-headline text-center mb-8 flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-primary"/> Meet the Creator
            </h2>
            <div className="flex justify-center">
                <div className="text-center flex flex-col items-center">
                    <Image
                        src="https://picsum.photos/seed/kimberley/200/200"
                        alt="Kimberley Bezuidenhout"
                        width={200}
                        height={200}
                        className="rounded-full mb-4 object-cover object-top"
                        data-ai-hint="woman portrait"
                    />
                    <h3 className="font-bold text-xl">Kimberley Bezuidenhout</h3>
                    <p className="text-muted-foreground">1st Year Student at WeThinkCode_</p>
                </div>
            </div>
        </div>
      </div>
    );
}
