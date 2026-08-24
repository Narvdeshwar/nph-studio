'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabSwitcherProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  layoutId?: string;
}

export function TabSwitcher({ tabs, activeTab, onChange, layoutId = 'tab-pill' }: TabSwitcherProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-surface border border-border rounded-full w-fit">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${
              isActive ? 'text-background' : 'text-foreground hover:text-primary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-foreground rounded-full z-0"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
