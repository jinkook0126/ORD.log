import { Camera, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface Unit {
  id: string;
  name: string;
  thumbnail: string;
}

interface ClearFormData {
  unitIds: string[];
  unitCount: number;
  score: number;
  photo: FileList;
  difficulty: '신' | '악몽';
  success: boolean;
}

const ClearsNew = () => {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);
  const [tempSelectedUnits, setTempSelectedUnits] = useState<Unit[]>([]);

  // TODO: API에서 유닛 목록을 가져올 예정
  const mockUnits: Unit[] = [
    {
      id: '1',
      name: '유닛1',
      thumbnail: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Unit1',
    },
    {
      id: '2',
      name: '유닛2',
      thumbnail: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Unit2',
    },
    {
      id: '3',
      name: '유닛3',
      thumbnail: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=Unit3',
    },
  ];

  const filteredUnits = searchTerm
    ? mockUnits.filter((unit) => unit.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ClearFormData>({
    defaultValues: {
      unitIds: [],
      unitCount: 0,
      score: 0,
      difficulty: '신',
      success: true,
    },
  });

  const unitCount = watch('unitCount');
  const score = watch('score');
  const photoFiles = watch('photo');
  const difficulty = watch('difficulty');
  const success = watch('success');

  useEffect(() => {
    const file = photoFiles?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  }, [photoFiles]);

  const handleAddUnit = (unit: Unit) => {
    if (!tempSelectedUnits.find((u) => u.id === unit.id)) {
      setTempSelectedUnits([...tempSelectedUnits, unit]);
    }
  };

  const handleRemoveUnit = (unitId: string) => {
    setSelectedUnits(selectedUnits.filter((u) => u.id !== unitId));
  };

  const handleRemoveTempUnit = (unitId: string) => {
    setTempSelectedUnits(tempSelectedUnits.filter((u) => u.id !== unitId));
  };

  const handleCompleteSelection = () => {
    setSelectedUnits(tempSelectedUnits);
    setIsSearchModalOpen(false);
    setSearchTerm('');
    setTempSelectedUnits([]);
  };

  const handleCancelSelection = () => {
    setIsSearchModalOpen(false);
    setSearchTerm('');
    setTempSelectedUnits([]);
  };

  const onSubmit = async (data: ClearFormData) => {
    // TODO: API 호출 구현
    console.log('Form data:', {
      unitCount: data.unitCount,
      score: data.score,
      photo: data.photo?.[0],
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-8 py-10 md:py-16">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 클리어 저장
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-6">
        {/* 클리어 유닛 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            유닛 <span className="text-red-500">*</span>
          </label>

          {/* 유닛 검색 input */}
          <div className="relative">
            <input
              type="text"
              placeholder="유닛 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setTempSelectedUnits(selectedUnits);
                setIsSearchModalOpen(true);
              }}
              className="border-border/50 bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-2"
            />

            {/* 검색 결과 모달 */}
            {isSearchModalOpen && (
              <div className="border-border/50 bg-background absolute top-full z-50 mt-1 w-full rounded-lg border shadow-lg">
                {/* 검색 결과 목록 */}
                <div className="border-border/50 max-h-96 space-y-2 overflow-y-auto border-b p-4">
                  {filteredUnits.length > 0 ? (
                    filteredUnits.map((unit) => (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => handleAddUnit(unit)}
                        disabled={tempSelectedUnits.some((u) => u.id === unit.id)}
                        className="hover:bg-muted flex w-full items-center gap-3 rounded-md p-2 transition disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <img
                          src={unit.thumbnail}
                          alt={unit.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <span className="flex-1 text-left text-sm">{unit.name}</span>
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

          {/* 선택된 유닛 목록 */}
          {selectedUnits.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
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
                    src={unit.thumbnail}
                    alt={unit.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <p className="text-center text-xs font-medium">{unit.name}</p>
                </div>
              ))}
            </div>
          )}

          {selectedUnits.length === 0 && (
            <p className="text-xs text-red-500">유닛을 선택해주세요</p>
          )}

          <input
            type="hidden"
            {...register('unitIds', {
              required: '유닛을 선택해주세요',
              validate: () => selectedUnits.length > 0 || '유닛을 선택해주세요',
            })}
            value={selectedUnits.map((u) => u.id).join(',')}
          />
        </div>

        {/* 난이도 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            난이도 <span className="text-red-500">*</span>
          </label>
          <div className="border-border/50 bg-muted flex gap-2 rounded-lg border p-1">
            {['신', '악몽'].map((level) => (
              <label key={level} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value={level}
                  {...register('difficulty', {
                    required: '난이도를 선택해주세요',
                  })}
                  className="hidden"
                />
                <div
                  className={`rounded-md px-3 py-2 text-center text-sm font-medium transition ${
                    difficulty === level
                      ? level === '악몽'
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted bg-transparent'
                  }`}
                >
                  {level}
                </div>
              </label>
            ))}
          </div>
          {errors.difficulty && <p className="text-xs text-red-500">{errors.difficulty.message}</p>}
        </div>

        {/* 성공/실패 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            결과 <span className="text-red-500">*</span>
          </label>
          <div className="border-border/50 bg-muted flex gap-2 rounded-lg border p-1">
            {[
              { value: true, label: '성공' },
              { value: false, label: '실패' },
            ].map(({ value, label }) => (
              <label key={label} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value={value ? 'true' : 'false'}
                  {...register('success', {
                    required: '결과를 선택해주세요',
                  })}
                  className="hidden"
                />
                <div
                  className={`rounded-md px-3 py-2 text-center text-sm font-medium transition ${
                    String(success) === String(value)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted bg-transparent'
                  }`}
                >
                  {label}
                </div>
              </label>
            ))}
          </div>
          {errors.success && <p className="text-xs text-red-500">{errors.success.message}</p>}
        </div>

        {/* 유닛 카운트 - 성공 시만 표시 */}
        {success !== 'false' && (
          <div className="space-y-3">
            <label className="text-sm font-medium">
              유닛 카운트 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="유닛 수를 입력하세요"
              disabled={isSubmitting}
              className="border-border/50 bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-2"
              {...register('unitCount', {
                required: success !== 'false' ? '유닛 카운트를 입력해주세요' : false,
                valueAsNumber: true,
              })}
            />
            {errors.unitCount && <p className="text-xs text-red-500">{errors.unitCount.message}</p>}
          </div>
        )}

        {/* 점수 - 성공 시만 표시 */}
        {success !== 'false' && (
          <div className="space-y-3">
            <label className="text-sm font-medium">
              점수 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="점수를 입력하세요"
              disabled={isSubmitting}
              className="border-border/50 bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-2"
              {...register('score', {
                required: success !== 'false' ? '점수를 입력해주세요' : false,
                valueAsNumber: true,
              })}
            />
            {errors.score && <p className="text-xs text-red-500">{errors.score.message}</p>}
          </div>
        )}

        {/* 클리어 사진 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">
            클리어 사진 <span className="text-red-500">*</span>
          </label>

          {/* 파일 입력 */}
          <input
            type="file"
            accept="image/*"
            disabled={isSubmitting}
            className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:px-3 file:py-2"
            {...register('photo', {
              required: '클리어 사진을 선택해주세요',
            })}
          />
          {errors.photo && <p className="text-xs text-red-500">{errors.photo.message}</p>}

          {/* 사진 프리뷰 박스 */}
          <div className="border-border/50 bg-muted relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border">
            {photoPreview ? (
              <img src={photoPreview} alt="Photo preview" className="h-full w-full object-cover" />
            ) : (
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <Camera className="h-8 w-8" />
                <p className="text-sm">사진을 업로드 해주세요.</p>
              </div>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting || !photoFiles?.[0]}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </button>
      </form>
    </main>
  );
};

export default ClearsNew;
