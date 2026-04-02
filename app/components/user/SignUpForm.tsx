import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useSaveUserNickname } from '~/query/user';

const SignUpForm = ({ tempToken }: { tempToken: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: saveUserNickname } = useSaveUserNickname();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm({
    defaultValues: {
      nickname: '',
      tempToken,
    },
  });
  const nickname = watch('nickname');
  const onSubmit = (data: { nickname: string; tempToken: string }) => {
    saveUserNickname(
      { nickname: data.nickname, tempToken: data.tempToken },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['me'] });
          navigate('/');
        },
        onError: (error) => {
          setError('nickname', { message: error.message });
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('tempToken')} />
      <div className="space-y-2">
        <input
          type="text"
          placeholder="ex) 카이조쿠오니"
          maxLength={20}
          disabled={isSubmitting}
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
          <p className="text-muted-foreground text-xs">{nickname.length}/10</p>
          {errors.nickname && <p className="text-xs text-red-500">{errors.nickname.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || nickname.trim().length === 0}
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? '저장 중...' : '시작하기'}
      </button>
    </form>
  );
};

export default SignUpForm;
