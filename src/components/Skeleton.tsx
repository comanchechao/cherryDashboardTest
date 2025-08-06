import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation?: "pulse" | "wave" | "none";
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = "md",
  animation = "pulse",
}) => {
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse",
    none: "",
  };

  return (
    <div
      className={`bg-[var(--color-cherry-burgundy)]/20 ${width} ${height} ${roundedClasses[rounded]} ${animationClasses[animation]} ${className}`}
    />
  );
};

// Predefined skeleton components for common use cases
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({
  columns = 5,
}) => (
  <tr className="border-b border-[var(--color-cherry-burgundy)] border-opacity-20">
    {Array.from({ length: columns }, (_, index) => (
      <td key={index} className="px-4 py-3">
        <Skeleton width="w-16" height="h-4" />
      </td>
    ))}
  </tr>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`bg-[var(--color-cherry-burgundy)]/5 rounded-lg p-3 border border-[var(--color-cherry-burgundy)]/20 ${className}`}
  >
    <div className="flex items-center justify-between mb-2">
      <Skeleton width="w-8" height="h-4" />
      <Skeleton width="w-16" height="h-6" rounded="full" />
    </div>
    <Skeleton width="w-32" height="h-3" className="mb-1" />
    <div className="flex justify-between">
      <Skeleton width="w-20" height="h-3" />
      <Skeleton width="w-16" height="h-3" />
    </div>
  </div>
);

export const HeaderSkeleton: React.FC = () => (
  <div className="bg-black px-4 lg:px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Skeleton width="w-7" height="h-7" rounded="full" />
      <Skeleton width="w-32" height="h-6" />
    </div>
    <Skeleton width="w-24" height="h-4" className="hidden sm:block" />
  </div>
);

export default Skeleton;
