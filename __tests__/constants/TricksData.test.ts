import { TRICKS_DATA, type Trick } from '@/constants/TricksData';

const VALID_CATEGORIES = ['Basic Obedience', 'Puppy Tricks', 'Advanced'] as const;
const VALID_DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

describe('TRICKS_DATA', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(TRICKS_DATA)).toBe(true);
    expect(TRICKS_DATA.length).toBeGreaterThan(0);
  });

  it('contains exactly 12 tricks', () => {
    expect(TRICKS_DATA).toHaveLength(12);
  });

  it('every trick has a non-empty id', () => {
    for (const trick of TRICKS_DATA) {
      expect(typeof trick.id).toBe('string');
      expect(trick.id.length).toBeGreaterThan(0);
    }
  });

  it('every trick has a non-empty name', () => {
    for (const trick of TRICKS_DATA) {
      expect(typeof trick.name).toBe('string');
      expect(trick.name.length).toBeGreaterThan(0);
    }
  });

  it('all trick IDs are unique', () => {
    const ids = TRICKS_DATA.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all categories are valid', () => {
    for (const trick of TRICKS_DATA) {
      expect(VALID_CATEGORIES).toContain(trick.category);
    }
  });

  it('all difficulties are valid', () => {
    for (const trick of TRICKS_DATA) {
      expect(VALID_DIFFICULTIES).toContain(trick.difficulty);
    }
  });

  it('every trick has at least one step', () => {
    for (const trick of TRICKS_DATA) {
      expect(Array.isArray(trick.steps)).toBe(true);
      expect(trick.steps.length).toBeGreaterThan(0);
    }
  });

  it('every step is a non-empty string', () => {
    for (const trick of TRICKS_DATA) {
      for (const step of trick.steps) {
        expect(typeof step).toBe('string');
        expect(step.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('contains tricks in every category', () => {
    const categories = new Set(TRICKS_DATA.map((t) => t.category));
    expect(categories).toContain('Basic Obedience');
    expect(categories).toContain('Puppy Tricks');
    expect(categories).toContain('Advanced');
  });

  it('Basic Obedience has 5 tricks', () => {
    const count = TRICKS_DATA.filter((t) => t.category === 'Basic Obedience').length;
    expect(count).toBe(5);
  });

  it('Puppy Tricks has 4 tricks', () => {
    const count = TRICKS_DATA.filter((t) => t.category === 'Puppy Tricks').length;
    expect(count).toBe(4);
  });

  it('Advanced has 3 tricks', () => {
    const count = TRICKS_DATA.filter((t) => t.category === 'Advanced').length;
    expect(count).toBe(3);
  });

  it('contains Easy, Medium and Hard difficulty tricks', () => {
    const difficulties = new Set(TRICKS_DATA.map((t) => t.difficulty));
    expect(difficulties).toContain('Easy');
    expect(difficulties).toContain('Medium');
    expect(difficulties).toContain('Hard');
  });

  describe('well-known tricks', () => {
    it('includes "sit" in Basic Obedience at Easy difficulty', () => {
      const sit = TRICKS_DATA.find((t) => t.id === 'sit');
      expect(sit).toBeDefined();
      expect(sit?.name).toBe('Sit');
      expect(sit?.category).toBe('Basic Obedience');
      expect(sit?.difficulty).toBe('Easy');
    });

    it('includes "shake" in Puppy Tricks', () => {
      const shake = TRICKS_DATA.find((t) => t.id === 'shake');
      expect(shake).toBeDefined();
      expect(shake?.category).toBe('Puppy Tricks');
    });

    it('includes "play-dead" in Advanced at Hard difficulty', () => {
      const playDead = TRICKS_DATA.find((t) => t.id === 'play-dead');
      expect(playDead).toBeDefined();
      expect(playDead?.category).toBe('Advanced');
      expect(playDead?.difficulty).toBe('Hard');
    });
  });
});
