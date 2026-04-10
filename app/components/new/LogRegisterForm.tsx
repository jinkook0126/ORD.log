import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import UnitSearch, { type Unit } from './UnitSearch';

interface ClearFormData {
  unitIds: Unit[];
  unitCount: number;
  score: number;
  photo: FileList;
  difficulty: '신' | '악몽';
  success: boolean;
}
const LogRegisterForm = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<ClearFormData>({
    defaultValues: {
      unitIds: [],
      unitCount: undefined,
      score: undefined,
      difficulty: '신',
      success: true,
    },
  });
  const photoFiles = watch('photo');
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

  const onSubmit = async (data: ClearFormData) => {
    // TODO: API 호출 구현
    console.log('Form data:', {
      success: data.success,
      difficulty: data.difficulty,
      unitIds: data.unitIds,
      unitCount: data.unitCount,
      score: data.score,
      photo: data.photo?.[0],
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-6">
      {/* 클리어 유닛 */}
      <div className="space-y-3">
        <Controller
          name="unitIds"
          control={control}
          rules={{
            required: '유닛을 선택해주세요',
          }}
          render={({ field }) => (
            <UnitSearch selectedUnits={field.value} onComplete={field.onChange} />
          )}
        />
        {/* <UnitSearch /> */}
      </div>

      {/* 난이도 */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          난이도 <span className="text-red-500">*</span>
        </label>
        <Controller
          name="difficulty"
          control={control}
          rules={{
            required: '난이도를 선택해주세요',
          }}
          render={({ field }) => (
            <div className="border-border/50 bg-muted flex gap-2 rounded-lg border p-1">
              {['신', '악몽'].map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => field.onChange(level)}
                  className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition ${
                    field.value === level
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        />
        {errors.difficulty && <p className="text-xs text-red-500">{errors.difficulty.message}</p>}
      </div>

      {/* 성공/실패 */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          결과 <span className="text-red-500">*</span>
        </label>
        <Controller
          name="success"
          control={control}
          rules={{
            required: '결과를 선택해주세요',
          }}
          render={({ field }) => (
            <div className="border-border/50 bg-muted flex gap-2 rounded-lg border p-1">
              {[
                { value: true, label: '성공' },
                { value: false, label: '실패' },
              ].map(({ value, label }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => field.onChange(value)}
                  className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition ${
                    field.value === value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.success && <p className="text-xs text-red-500">{errors.success.message}</p>}
      </div>

      {success && (
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
              required: success ? '유닛 카운트를 입력해주세요' : false,
              valueAsNumber: true,
            })}
          />
          {errors.unitCount && <p className="text-xs text-red-500">{errors.unitCount.message}</p>}
        </div>
      )}

      {/* 점수 - 성공 시만 표시 */}
      {success && (
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
              required: success ? '점수를 입력해주세요' : false,
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
  );
};

export default LogRegisterForm;
