import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { compressImageFile } from '~/lib/cropImage';
import { useMe, useUpdateProfile } from '~/query/user';

import { Spinner } from '../ui/spinner';

interface ProfileFormData {
  nickname: string;
  thumbnail: FileList;
}

const ProfileEditForm = () => {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [preview, setPreview] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ProfileFormData>({
    values: {
      nickname: me?.nickname ?? '',
      thumbnail: undefined as unknown as FileList,
    },
  });

  const nickname = watch('nickname');
  const thumbnailFiles = watch('thumbnail');

  useEffect(() => {
    const file = thumbnailFiles?.[0];
    if (!file) {
      return;
    }
    compressImageFile(file).then((compressed) => {
      setConvertedFile(compressed);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(compressed);
    });
  }, [thumbnailFiles]);

  const onSubmit = (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    if (convertedFile) {
      formData.append('thumbnail', convertedFile);
    }
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('내 정보가 수정되었습니다.');
        navigate(`/user/${data.nickname}`);
      },
      onError: (error: Error) => {
        setError('nickname', { message: error.message });
      },
    });
  };

  if (!me) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-md space-y-8">
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="border-border/50 bg-muted size-24 overflow-hidden rounded-full border sm:size-28">
            <img
              src={preview ?? me.thumbnailUrl}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
          <label
            htmlFor="thumbnail"
            className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full transition"
          >
            <Camera className="size-4" />
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            disabled={isPending}
            className="hidden"
            {...register('thumbnail')}
          />
        </div>
        <p className="text-muted-foreground text-center text-xs">
          카메라 아이콘을 눌러 프로필 이미지를 변경하세요.
        </p>
      </div>

      {/* 닉네임 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">닉네임</label>
        <input
          type="text"
          placeholder="ex) 카이조쿠오니"
          maxLength={10}
          disabled={isPending}
          className="border-border/50 bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-2"
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            minLength: {
              value: 1,
              message: '닉네임은 최소 1자 이상이어야 합니다',
            },
            maxLength: {
              value: 10,
              message: '닉네임은 최대 10자입니다',
            },
          })}
        />
        <div className="flex justify-between">
          <p className="text-muted-foreground text-xs">{nickname?.length ?? 0}/10</p>
          {errors.nickname && <p className="text-xs text-red-500">{errors.nickname.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || !nickname || nickname.trim().length === 0}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Spinner className="size-4" />
            저장 중...
          </>
        ) : (
          '저장'
        )}
      </button>
    </form>
  );
};

export default ProfileEditForm;
