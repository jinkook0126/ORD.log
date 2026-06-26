import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { TUnit } from '~/db/unit';
import type { Difficulty } from '~/lib/prismaClient';
import { useCreateLogMutation } from '~/query/log';
import { useMe } from '~/query/user';

import UnitSearch from './UnitSearch';

export interface ClearFormData {
  unitIds: TUnit[];
  unitCount: number;
  score: number;
  photo: FileList;
  difficulty: Difficulty;
  success: boolean;
}

const GOD_MAX_COUNT = 55;
const NIGHTMARE_MAX_COUNT = 50;
const LogRegisterForm = () => {
  const { data: me } = useMe();
  const navigate = useNavigate();
  const { mutate: createLogMutation } = useCreateLogMutation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);

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
      difficulty: 'GOD',
      success: true,
    },
  });
  const photoFiles = watch('photo');
  const success = watch('success');
  useEffect(() => {
    const file = photoFiles?.[0];
    if (!file) {
      setPhotoPreview(null);
      return;
    }

    const isHeic =
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif');

    if (isHeic) {
      import('heic2any').then(({ default: heic2any }) => {
        heic2any({ blob: file, toType: 'image/webp', quality: 0.8 }).then((converted) => {
          const blob = Array.isArray(converted) ? converted[0] : converted;
          const webpFileName = file.name.replace(/\.(heic|heif)$/i, '.webp');
          const webpFile = new File([blob], webpFileName, { type: 'image/webp' });
          setConvertedFile(webpFile);
          setPhotoPreview(URL.createObjectURL(blob));
        });
      });
    } else {
      setConvertedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [photoFiles]);

  const getMaxScore = (difficulty: Difficulty) => {
    if (difficulty === 'GOD') {
      return GOD_MAX_COUNT;
    }
    return NIGHTMARE_MAX_COUNT;
  };

  const onSubmit = async (data: ClearFormData) => {
    if (!me) {
      toast.error('로그인 후 이용해주세요.');
      navigate('/login');
      return;
    }
    const formData = new FormData();
    if (convertedFile) {
      formData.append('photo', convertedFile);
    }
    formData.append('unitIds', data.unitIds.map((unit) => unit.id).join(','));
    formData.append('score', data.success ? data.score.toString() : '0');
    formData.append(
      'unitCount',
      data.success ? data.unitCount.toString() : getMaxScore(data.difficulty).toString(),
    );
    formData.append('difficulty', data.difficulty);
    formData.append('success', data.success.toString());
    createLogMutation(formData, {
      onSuccess: () => {
        toast.success('로그 등록에 성공하였습니다.');
        navigate('/clears');
      },
      onError: (error) => {
        toast.error(error.message);
      },
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
          render={({ field, fieldState }) => (
            <div className="gap-2">
              <UnitSearch selectedUnits={field.value} onComplete={field.onChange} />

              {fieldState.error && (
                <p className="mt-3 text-xs text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
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
              {['GOD', 'NIGHTMARE'].map((level) => (
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
                  {'GOD' === level ? '신' : '악몽'}
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
          클리어 사진 {success && <span className="text-red-500">*</span>}
        </label>

        {/* 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          disabled={isSubmitting}
          className="file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:px-3 file:py-2"
          {...register('photo', {
            required: success ? '클리어 사진을 선택해주세요' : false,
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
        // disabled={isSubmitting || (success && !photoFiles?.[0])}
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? '저장 중...' : '저장'}
      </button>
    </form>
  );
};

export default LogRegisterForm;
