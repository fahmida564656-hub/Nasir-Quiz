import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types/game';
import { Sparkles, Check, X } from 'lucide-react';

interface CategoryPickerProps {
  isOpen: boolean;
  activeCategoryId: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onClose: () => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  isOpen,
  activeCategoryId,
  onSelectCategory,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 my-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🗺️</span>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                বিষয় নির্বাচন করো
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                কোন বিষয়ে ১০টি প্রশ্ন খেলতে চাও?
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          {CATEGORIES.map(cat => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-200'
                    : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 bg-white'
                }`}
              >
                <span className="text-3xl shrink-0 p-2 rounded-2xl bg-white shadow-2xs border border-slate-100 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {cat.name}
                    </h4>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>💡 প্রতিটি বিষয়ে প্রতি রাউন্ডে ১০টি প্রশ্ন থাকবে</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
