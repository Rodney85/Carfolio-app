import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface GradientCardProps extends Omit<HTMLMotionProps<"div">, 'color'> {
  /**
   * Main color theme (controls gradient)
   */
  color?: 'primary' | 'secondary' | 'brand' | 'amber' | 'green' | 'indigo' | 'purple' | 'gray';
  
  /**
   * Enable hover animation effects
   */
  hoverEffect?: boolean;
  
  /**
   * Make the card have a glass-like effect with backdrop blur
   */
  glassEffect?: boolean;
  
  /**
   * Make card interactive - uses motion.div with hover animations
   */
  interactive?: boolean;
  
  /**
   * Custom Framer Motion props for interactive cards (any additional motion props)
   */
  motionProps?: Omit<HTMLMotionProps<"div">, keyof GradientCardProps>;
  
  /**
   * Content of the card
   */
  children: React.ReactNode;
}

const getGradientClasses = (color: GradientCardProps['color']): string => {
  switch (color) {
    case 'primary':
      return `from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 
              border-primary-200 dark:border-primary-800/30`;
    case 'secondary':
      return `from-secondary-500/10 to-secondary-600/5 dark:from-secondary-500/20 dark:to-secondary-600/10 
              border-secondary-200 dark:border-secondary-800/30`;
    case 'brand':
      return `from-brand-500/10 to-brand-600/5 dark:from-brand-500/20 dark:to-brand-600/10 
              border-brand-200 dark:border-brand-800/30`;
    case 'amber':
      return `from-amber-500/10 to-amber-600/5 dark:from-amber-500/20 dark:to-amber-600/10 
              border-amber-200 dark:border-amber-800/30`;
    case 'green':
      return `from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10 
              border-green-200 dark:border-green-800/30`;
    case 'indigo':
      return `from-indigo-500/10 to-indigo-600/5 dark:from-indigo-500/20 dark:to-indigo-600/10 
              border-indigo-200 dark:border-indigo-800/30`;
    case 'purple':
      return `from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/10 
              border-purple-200 dark:border-purple-800/30`;
    case 'gray':
    default:
      return `from-gray-300/10 to-gray-400/5 dark:from-gray-700/20 dark:to-gray-800/10 
              border-gray-200 dark:border-gray-800/30`;
  }
};

export const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ 
    color = 'gray', 
    hoverEffect = true, 
    glassEffect = false,
    interactive = true,
    motionProps = {},
    className, 
    children, 
    ...props 
  }, ref) => {
    // Base classes always applied
    const baseClasses = cn(
      'relative overflow-hidden bg-gradient-to-br rounded-xl p-4 border',
      getGradientClasses(color),
      glassEffect && 'backdrop-blur-sm',
      !interactive && 'shadow-card',
      className
    );
    
    // For interactive cards, use motion.div
    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={baseClasses}
          whileHover={hoverEffect ? { 
            scale: 1.02,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
          } : {}}
          transition={{ duration: 0.2 }}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.div>
      );
    }
    
    // For non-interactive cards, use regular div
    return (
      <div
        ref={ref}
        className={baseClasses}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }
);

GradientCard.displayName = 'GradientCard';

export default GradientCard;
