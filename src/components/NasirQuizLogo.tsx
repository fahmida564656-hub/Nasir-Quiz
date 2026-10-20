import React from 'react';

interface NasirQuizLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const NasirQuizLogo: React.FC<NasirQuizLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 'w-9 h-9 text-lg' : size === 'lg' ? 'w-16 h-16 text-3xl' : 'w-11 h-11 text-xl';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl sm:text-2xl';
  const subtitleSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Custom Distinct Nasir Quiz Brand Emblem */}
      <div className="relative shrink-0 select-none">
        <div
          className={`${iconSize} rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-2 ring-amber-300/80 transform hover:scale-105 transition-transform duration-200`}
        >
          {/* Inner Golden Lightning & Crown Composite */}
          <div className="relative flex items-center justify-center">
            <span className="drop-shadow-md">⚡</span>
            <span className="absolute -top-2 -right-2 text-[10px] sm:text-xs">👑</span>
          </div>
        </div>

        {/* Pulsing Star Accent */}
        <span className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900 shadow-xs flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </span>
      </div>

      {/* Typography Lockup */}
      <div className="leading-tight">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`${titleSize} font-black tracking-tight text-slate-900 dark:text-white leading-tight font-bengali drop-shadow-2xs`}
          >
            নাসির কুইজ
          </span>
          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-2xs uppercase tracking-wide">
            PRO
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`${subtitleSize} font-bold text-indigo-600 dark:text-cyan-300 block mt-0.5 tracking-tight`}
          >
            সুপারহিরো কুইজ অ্যাডভেঞ্চার
          </span>
        )}
      </div>
    </div>
  );
};
