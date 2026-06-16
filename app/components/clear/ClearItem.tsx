import { Link, useNavigate } from 'react-router';

import type { TClearItem } from '~/db/clear';
import { formatTimeAgo, getLabelWithDifficulty, getModeBadgeVariant } from '~/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

const MAX_VISIBLE_UNITS = 5;

function ClearCard({ item }: { item: TClearItem }) {
  const visibleUnits = item.units.slice(0, MAX_VISIBLE_UNITS);
  const remaining = item.units.length - MAX_VISIBLE_UNITS;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/user/${item.user.nickname}`)}
      className="group border-border bg-card hover:border-primary/40 hover:shadow-primary/10 cursor-pointer overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/screen/${item.imageUrl}`}
          alt={item.imageUrl ?? ''}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="from-background/80 absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge
            variant={getModeBadgeVariant(item.difficulty)}
            className="px-2 py-0.5 text-[10px] shadow-sm"
          >
            {getLabelWithDifficulty(item.difficulty)}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/user/${item.user.nickname}`}
            className="text-foreground hover:text-primary truncate text-sm font-semibold transition-colors"
          >
            {item.user.nickname}
          </Link>
          <span className="border-border bg-secondary text-muted-foreground shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium">
            {formatTimeAgo(String(item.createdAt))}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border-border bg-secondary/40 rounded-md border px-3 py-2">
            <p className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Unit Count
            </p>
            <p className="text-primary mt-1 font-mono text-sm font-semibold">{item.unitCount}</p>
          </div>
          <div className="border-border bg-secondary/40 rounded-md border px-3 py-2">
            <p className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
              Score
            </p>
            <p className="text-foreground mt-1 font-mono text-sm font-semibold">
              {item.score.toLocaleString()}점
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 pt-1">
          {visibleUnits.map((unit) => (
            <Avatar key={unit.unit.id} className="border-border bg-background h-7 w-7 border">
              <AvatarImage
                src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.unit.thumbnailUrl}`}
                alt={unit.unit.name}
              />
              <AvatarFallback className="bg-secondary text-[12px]">
                {unit.unit.name[0]}
              </AvatarFallback>
            </Avatar>
          ))}
          {remaining > 0 && (
            <span className="border-border bg-secondary text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-medium">
              +{remaining}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default ClearCard;
