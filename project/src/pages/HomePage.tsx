import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  QuestionMarkCircleIcon, 
  MusicalNoteIcon 
} from '@heroicons/react/24/outline';
import { GameCard } from '../components/GameCard';
import { FadeIn } from '../components/animations/FadeIn';
import { ColorfulTitle } from '../components/animations/ColorfulTitle';

interface Game {
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const games: Game[] = [
  {
    title: 'Undercover',
    description: 'Trouvez l\'imposteur parmi vous ! Un jeu de déduction sociale captivant.',
    path: '/undercover',
    icon: UserGroupIcon,
    color: 'indigo'
  },
  {
    title: 'Quiz',
    description: 'Testez vos connaissances avec des questions variées et amusantes.',
    path: '/quiz',
    icon: QuestionMarkCircleIcon,
    color: 'purple'
  },
  {
    title: 'Blind Test',
    description: 'Devinez les chansons et artistes dans ce jeu musical palpitant !',
    path: '/blind-test',
    icon: MusicalNoteIcon,
    color: 'pink'
  }
];

export const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      <FadeIn>
        <div className="text-center space-y-6">
          <ColorfulTitle className="text-5xl font-extrabold">
            Bienvenue sur koGe
          </ColorfulTitle>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Choisissez votre jeu et commencez à vous amuser !
          </motion.p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <GameCard 
            key={game.path}
            title={game.title}
            description={game.description}
            path={game.path}
            icon={game.icon}
            color={game.color as "orange" | "violet"}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};