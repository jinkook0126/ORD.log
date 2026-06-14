function WinRateBar({ wins, total }: { wins: number; total: number }) {
  const winPercentage = total > 0 ? (wins / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-24 overflow-hidden rounded-sm">
        <div
          className="flex h-full items-center justify-start bg-blue-500"
          style={{ width: `${winPercentage}%` }}
        >
          {winPercentage > 25 && (
            <span className="pl-1 text-[9px] font-bold text-white">{wins}승</span>
          )}
        </div>
        <div
          className="flex h-full items-center justify-end bg-red-500"
          style={{ width: `${100 - winPercentage}%` }}
        >
          {100 - winPercentage > 25 && (
            <span className="pr-1 text-[9px] font-bold text-white">{total - wins}패</span>
          )}
        </div>
      </div>
      <span className="text-muted-foreground text-xs font-medium whitespace-nowrap">
        {total > 0 ? Number(((wins / total) * 100).toFixed(1)) : 0}%
      </span>
    </div>
  );
}
export default WinRateBar;
