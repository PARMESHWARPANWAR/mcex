interface FeatureToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon: string;
  disabled?: boolean;
}

export const FeatureToggle: React.FC<FeatureToggleProps> = ({ 
  label, 
  description, 
  enabled, 
  onChange, 
  icon, 
  disabled = false 
}) => (
  <div className={`p-4 border-2 rounded-xl transition-all ${
    enabled && !disabled
      ? 'border-blue-500 bg-blue-50'
      : 'border-gray-200 bg-white'
  } ${disabled ? 'opacity-50' : ''}`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <span className="font-semibold text-gray-800">{label}</span>
      </div>
      <button
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          enabled && !disabled ? 'bg-blue-500' : 'bg-gray-300'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
          enabled && !disabled ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
    {disabled && (
      <p className="text-xs text-orange-600 mt-1">Coming Soon!</p>
    )}
  </div>
);