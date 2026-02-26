export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Trick = {
  id: string;
  name: string;
  category: 'Basic Obedience' | 'Puppy Tricks' | 'Advanced';
  difficulty: Difficulty;
  steps: string[];
};

export const TRICKS_DATA: Trick[] = [
  // Basic Obedience
  {
    id: 'sit',
    name: 'Sit',
    category: 'Basic Obedience',
    difficulty: 'Easy',
    steps: [
      'Hold a treat close to your dog\'s nose.',
      'Move your hand up, allowing their head to follow the treat and causing their bottom to lower.',
      'Once they\'re in a sitting position, say "Sit" clearly.',
      'Give them the treat and praise enthusiastically.',
      'Repeat several times daily until consistent.',
    ],
  },
  {
    id: 'stay',
    name: 'Stay',
    category: 'Basic Obedience',
    difficulty: 'Medium',
    steps: [
      'Ask your dog to sit.',
      'Open the palm of your hand in front of you and say "Stay".',
      'Take a few steps back. If they stay, reward with a treat.',
      'Gradually increase the number of steps before giving the treat.',
      'Always reward them for staying — even if it\'s only for a few seconds.',
    ],
  },
  {
    id: 'come',
    name: 'Come',
    category: 'Basic Obedience',
    difficulty: 'Easy',
    steps: [
      'Put a leash and collar on your dog.',
      'Go down to their level and say "Come" while gently pulling the leash.',
      'When they reach you, reward them with a treat and affection.',
      'Once mastered with a leash, practice in a safe enclosed area off-leash.',
      'Always make coming to you a positive experience.',
    ],
  },
  {
    id: 'down',
    name: 'Down',
    category: 'Basic Obedience',
    difficulty: 'Medium',
    steps: [
      'Find a treat with a strong smell that your dog loves.',
      'Hold the treat in a closed fist near their nose.',
      'Slowly move your hand to the floor so they follow.',
      'Slide your hand along the ground to encourage their body to follow.',
      'Once in the down position, say "Down", give the treat, and praise.',
    ],
  },
  {
    id: 'leave-it',
    name: 'Leave It',
    category: 'Basic Obedience',
    difficulty: 'Hard',
    steps: [
      'Place a treat in both hands.',
      'Show them one closed fist with a treat and say "Leave it".',
      'Ignore the behaviors they use to get the treat (licking, sniffing, pawing).',
      'Once they stop trying, give the treat from the OTHER hand.',
      'Repeat until your dog moves away from the first fist on command.',
      'Only give treats from the other hand — never the "leave it" hand.',
    ],
  },

  // Puppy Tricks
  {
    id: 'shake',
    name: 'Shake Paws',
    category: 'Puppy Tricks',
    difficulty: 'Easy',
    steps: [
      'Ask your dog to sit.',
      'Hold a treat in your closed hand near their paw.',
      'Wait for them to paw at your hand — most dogs will try naturally.',
      'The moment they touch your hand with their paw, say "Shake" and reward.',
      'Practice until they offer a paw as soon as you extend your hand.',
    ],
  },
  {
    id: 'spin',
    name: 'Spin',
    category: 'Puppy Tricks',
    difficulty: 'Easy',
    steps: [
      'Hold a treat near your dog\'s nose.',
      'Slowly lure them in a circle by moving the treat around their body.',
      'As they complete the circle, say "Spin" and give the treat.',
      'After several repetitions, try the hand motion without a treat.',
      'Reward every successful spin with praise and occasional treats.',
    ],
  },
  {
    id: 'roll-over',
    name: 'Roll Over',
    category: 'Puppy Tricks',
    difficulty: 'Medium',
    steps: [
      'Ask your dog to lie down.',
      'Hold a treat near their nose and slowly move it toward their shoulder.',
      'This should cause them to roll onto their side and then their back.',
      'Continue the motion so they complete the full roll.',
      'Say "Roll over" and give them a treat once they\'ve rolled completely.',
      'Break it into stages if needed — reward each partial roll at first.',
    ],
  },
  {
    id: 'high-five',
    name: 'High Five',
    category: 'Puppy Tricks',
    difficulty: 'Medium',
    steps: [
      'Start with your dog knowing "Shake".',
      'Hold your hand up higher, palm facing the dog.',
      'When they raise their paw to meet your palm, say "High five!".',
      'Reward immediately with a treat.',
      'Gradually hold your hand higher until it looks like a true high five.',
    ],
  },

  // Advanced
  {
    id: 'play-dead',
    name: 'Play Dead',
    category: 'Advanced',
    difficulty: 'Hard',
    steps: [
      'Ask your dog to lie down.',
      'Hold a treat near their nose and slowly move it to the side.',
      'Guide them onto their side, then onto their back.',
      'Once on their side/back, say "Bang!" or "Play dead" and reward.',
      'Hold for longer intervals before treating to build duration.',
      'Add a hand gesture (finger gun) for extra flair.',
    ],
  },
  {
    id: 'weave',
    name: 'Weave Through Legs',
    category: 'Advanced',
    difficulty: 'Hard',
    steps: [
      'Stand with your legs apart in a wide stance.',
      'Lure your dog through your legs with a treat from front to back.',
      'Take a step forward and lure them through the other leg.',
      'Say "Weave" as they pass through each leg.',
      'Chain the steps together for a fluid weaving motion.',
      'Slowly reduce the treat lure and rely on the verbal cue.',
    ],
  },
  {
    id: 'fetch',
    name: 'Fetch & Return',
    category: 'Advanced',
    difficulty: 'Medium',
    steps: [
      'Start by getting your dog excited about a specific toy.',
      'Toss the toy a short distance and encourage them to grab it.',
      'Call them back to you using "Come" or "Bring it".',
      'When they return, offer a treat in exchange for the toy.',
      'Gradually increase the distance of the throw.',
      'Practice the "Drop it" command so they release the toy cleanly.',
    ],
  },
];
