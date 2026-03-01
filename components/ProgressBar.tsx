import { View } from 'react-native';

type Props = {
  /** Progress value between 0 and 1 (clamped automatically). */
  value: number;
  className?: string;
};

export function ProgressBar({ value, className = '' }: Props) {
  const pct = `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%`;

  return (
    <View
      testID="progress-bar-track"
      className={`bg-slate-200 rounded-full overflow-hidden h-2 ${className}`}
    >
      <View
        testID="progress-bar-fill"
        className="bg-cyan-500 h-full rounded-full"
        style={{ width: pct }}
      />
    </View>
  );
}
