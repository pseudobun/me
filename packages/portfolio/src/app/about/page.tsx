import AboutMe from '@/components/AboutMe';

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className="flex flex-1 justify-center text-2xl">
      <AboutMe />
    </div>
  );
}
