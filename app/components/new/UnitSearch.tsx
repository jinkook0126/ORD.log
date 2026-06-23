import Fuse from 'fuse.js';
import { X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import type { TUnit } from '~/db/unit';
import { searchUnits } from '~/lib/searchUnits';
import { getTierStyle } from '~/lib/utils';
import { useGetUnitsQuery } from '~/query/unit';

const UnitSearch = ({
  selectedUnits,
  onComplete,
}: {
  selectedUnits: TUnit[];
  onComplete: (units: TUnit[]) => void;
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelectedUnits, setTempSelectedUnits] = useState<TUnit[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { data: units = [] } = useGetUnitsQuery();

  const fuse = useMemo(() => {
    return new Fuse<TUnit>(units, {
      keys: ['name'],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }, [units]);

  const filteredUnits = useMemo(() => {
    if (!searchTerm) {
      return [];
    }

    return searchUnits(units, searchTerm, fuse);
  }, [units, searchTerm, fuse]);

  const handleAddUnit = (unit: TUnit) => {
    if (!tempSelectedUnits.find((u) => u.id === unit.id)) {
      setTempSelectedUnits([...tempSelectedUnits, unit]);
    }
  };

  const handleRemoveUnit = (unitId: number) => {
    onComplete(selectedUnits.filter((u) => u.id !== unitId));
  };
  const handleCompleteSelection = () => {
    onComplete(tempSelectedUnits);
    setIsSearchModalOpen(false);
    setSearchTerm('');
    setTempSelectedUnits([]);
  };

  const handleCancelSelection = () => {
    setIsSearchModalOpen(false);
    setSearchTerm('');
    setTempSelectedUnits([]);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key === 'Process') {
      return;
    }
    if (e.key === 'ArrowDown' && isSearchModalOpen && filteredUnits.length > 0) {
      e.preventDefault();
      listRefs.current[0]?.focus();
    }
  };

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
    unit: TUnit,
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      listRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        inputRef.current?.focus();
      } else {
        listRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const updated = tempSelectedUnits.find((u) => u.id === unit.id)
        ? tempSelectedUnits
        : [...tempSelectedUnits, unit];
      onComplete(updated);
      setIsSearchModalOpen(false);
      setSearchTerm('');
      setTempSelectedUnits([]);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium">
        유닛 <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="유닛 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setTempSelectedUnits(selectedUnits);
            setIsSearchModalOpen(true);
          }}
          onKeyDown={handleInputKeyDown}
          className="border-border/50 bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-2"
        />

        {/* 검색 결과 모달 */}
        {isSearchModalOpen && (
          <div className="border-border/50 bg-background absolute top-full z-50 mt-1 w-full rounded-lg border shadow-lg">
            {/* 검색 결과 목록 */}
            <div className="border-border/50 max-h-96 space-y-2 overflow-y-auto border-b p-4">
              {filteredUnits.length > 0 ? (
                filteredUnits.map((unit: TUnit, index: number) => (
                  <button
                    key={unit.id}
                    ref={(el) => {
                      listRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handleAddUnit(unit)}
                    onKeyDown={(e) => handleItemKeyDown(e, index, unit)}
                    disabled={tempSelectedUnits.some((u) => u.id === unit.id)}
                    className="hover:bg-muted focus:bg-muted flex w-full items-center gap-3 rounded-md p-2 transition outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <img
                      src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.thumbnailUrl}`}
                      alt={unit.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="flex-1 text-left text-sm">{unit.name}</span>
                      <span
                        className={`w-fit shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${getTierStyle(unit.grade.rank)}`}
                      >
                        {unit.grade.name}
                      </span>
                    </div>

                    {tempSelectedUnits.some((u) => u.id === unit.id) && (
                      <span className="text-primary text-xs font-medium">선택됨</span>
                    )}
                  </button>
                ))
              ) : (
                <p className="text-muted-foreground py-4 text-center text-xs">
                  검색 결과가 없습니다
                </p>
              )}
            </div>

            {/* 모달 버튼 */}
            <div className="flex gap-3 p-4">
              <button
                type="button"
                onClick={handleCancelSelection}
                className="border-border/50 text-foreground hover:bg-muted flex-1 rounded-lg border px-4 py-3 font-semibold transition"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleCompleteSelection}
                disabled={tempSelectedUnits.length === 0}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 cursor-pointer rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedUnits.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {selectedUnits.map((unit) => (
            <div
              key={unit.id}
              className="border-border/50 bg-muted relative flex flex-col items-center gap-2 rounded-lg border p-3"
            >
              <button
                type="button"
                onClick={() => handleRemoveUnit(unit.id)}
                className="hover:bg-background/50 absolute top-1 right-1 rounded-md p-1 transition"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={`${import.meta.env.VITE_SUPABASE_STORAGE_URL}${unit.thumbnailUrl}`}
                alt={unit.name}
                className="h-16 w-16 rounded object-cover"
              />
              <p className="text-center text-xs font-medium">{unit.name}</p>
              <p className="text-muted-foreground text-center text-xs">
                <span
                  className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${getTierStyle(unit.grade.rank)}`}
                >
                  {unit.grade.name}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitSearch;
