export function ProgressBar({ width, size, variant = "light" }: {
    width: number;
    size: "large" | "small";
    variant?: "light" | "dark";
}) {
    const heightClass = size === "large" ? "h-2" : "h-1.5";

    const trackClass = variant === "dark"
        ? "bg-white/10"
        : "bg-black/10";

    const fillClass = variant === "dark"
        ? "bg-emerald-400"
        : "bg-amber-400";

    const progressBarWidth = width > 100 ? 100 : width;

    return (
        <div className={`w-full rounded-full ${heightClass} ${trackClass}`}>
            <div
                style={{ width: `${progressBarWidth}%` }}
                className={`h-full rounded-full transition-all duration-300 ${fillClass}`}
            />
        </div>
    );
}