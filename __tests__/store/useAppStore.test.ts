import { useAppStore } from '@/store/useAppStore';

// Reset the store to its initial state before every test
beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
});

describe('useAppStore — streak', () => {
  it('starts at 0', () => {
    expect(useAppStore.getState().streak).toBe(0);
  });

  it('increments streak by 1', () => {
    useAppStore.getState().incrementStreak();
    expect(useAppStore.getState().streak).toBe(1);
  });

  it('increments multiple times', () => {
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    expect(useAppStore.getState().streak).toBe(3);
  });

  it('resets streak to 0', () => {
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    useAppStore.getState().resetStreak();
    expect(useAppStore.getState().streak).toBe(0);
  });

  it('reset on an already-zero streak stays 0', () => {
    useAppStore.getState().resetStreak();
    expect(useAppStore.getState().streak).toBe(0);
  });
});

describe('useAppStore — masteredTricks', () => {
  it('starts as an empty array', () => {
    expect(useAppStore.getState().masteredTricks).toEqual([]);
  });

  it('adds a trick when toggled for the first time', () => {
    useAppStore.getState().toggleMastered('sit');
    expect(useAppStore.getState().masteredTricks).toContain('sit');
  });

  it('removes a trick when toggled a second time', () => {
    useAppStore.getState().toggleMastered('sit');
    useAppStore.getState().toggleMastered('sit');
    expect(useAppStore.getState().masteredTricks).not.toContain('sit');
  });

  it('toggling off does not affect other mastered tricks', () => {
    useAppStore.getState().toggleMastered('sit');
    useAppStore.getState().toggleMastered('stay');
    useAppStore.getState().toggleMastered('sit'); // remove sit
    expect(useAppStore.getState().masteredTricks).not.toContain('sit');
    expect(useAppStore.getState().masteredTricks).toContain('stay');
  });

  it('can master multiple tricks independently', () => {
    useAppStore.getState().toggleMastered('sit');
    useAppStore.getState().toggleMastered('stay');
    useAppStore.getState().toggleMastered('come');
    expect(useAppStore.getState().masteredTricks).toHaveLength(3);
  });

  it('does not add duplicate entries', () => {
    useAppStore.getState().toggleMastered('sit');
    useAppStore.getState().toggleMastered('sit'); // toggle off
    useAppStore.getState().toggleMastered('sit'); // toggle on again
    const mastered = useAppStore.getState().masteredTricks;
    expect(mastered.filter((id) => id === 'sit')).toHaveLength(1);
  });
});

describe('useAppStore — dogProfile', () => {
  it('starts with empty name and breed', () => {
    expect(useAppStore.getState().dogProfile).toEqual({ name: '', breed: '' });
  });

  it('sets the dog name', () => {
    useAppStore.getState().setDogProfile({ name: 'Buddy' });
    expect(useAppStore.getState().dogProfile.name).toBe('Buddy');
  });

  it('sets the dog breed', () => {
    useAppStore.getState().setDogProfile({ breed: 'Golden Retriever' });
    expect(useAppStore.getState().dogProfile.breed).toBe('Golden Retriever');
  });

  it('partial update preserves the other field', () => {
    useAppStore.getState().setDogProfile({ name: 'Max', breed: 'Labrador' });
    useAppStore.getState().setDogProfile({ name: 'Rex' });
    expect(useAppStore.getState().dogProfile).toEqual({
      name: 'Rex',
      breed: 'Labrador',
    });
  });

  it('can update both fields at once', () => {
    useAppStore.getState().setDogProfile({ name: 'Luna', breed: 'Poodle' });
    expect(useAppStore.getState().dogProfile).toEqual({
      name: 'Luna',
      breed: 'Poodle',
    });
  });

  it('overwrites previously set values', () => {
    useAppStore.getState().setDogProfile({ name: 'Buddy' });
    useAppStore.getState().setDogProfile({ name: 'Max' });
    expect(useAppStore.getState().dogProfile.name).toBe('Max');
  });
});
