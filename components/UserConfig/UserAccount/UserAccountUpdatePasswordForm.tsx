'use client'

import { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {
  userId: string | undefined;
}

type PayloadType = {
  currentPassword: string;
  newPassword: string;
}

async function updatePassword(userId: string, payload: PayloadType) {
  try {
      const response = await fetch(`/api/user/${userId}/update-password`, {
          method: 'PATCH',
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
          return undefined
      }

      return response.json();
  } catch (e) {
      console.log(e);
  };
};

export const UserAccountUpdatePasswordForm = ({userId}: Props) => {

  type Inputs = z.infer<typeof UpdatePasswordFormDataSchema>

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations('UserAccountPage');

  const UpdatePasswordFormDataSchema = z.object({
    currentPassword: z
      .string()
      .min(1, {message: t('details_list.update_password.form.input_current_password_errors.empty')})
      .refine((value) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(value), {
        message: 'details_list.update_password.form.input_current_password_errors.combos.items'
      }),
    newPassword: z
      .string()
      .min(1, {message: t('details_list.update_password.form.input_new_password_errors.empty')})
      .refine((value) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(value), {
        message: 'details_list.update_password.form.input_new_password_errors.combos.items'
      })
  })

  const { register, handleSubmit, watch, reset, formState: { errors, isDirty, isValid  }} =   useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(UpdatePasswordFormDataSchema)
  });

  const onChangePassword = async (data: Inputs) => {

    if (userId) {
      const response = await updatePassword(userId, data);

      if (response.error) {
        setError(response.error.message);
      } else {
        setSuccess(response.message);
        reset();
      };
    }

    return true;
  };

  const onInputFocus = () => {
    if (error) {
      setError(null);
    }
  }

  const validateFormData: SubmitHandler<Inputs> = data => {
    onChangePassword(data);
  };

  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');


  const currPswErrListRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      if (currentPassword && /^(.*[A-Z].*)$/.test(currentPassword) && /^(.*[a-z].*)$/.test(currentPassword)) {
        node?.children[1].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[1].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[1].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[1].classList.add("text-rose-500", "before:content-['x']");
      }
  
      if (currentPassword && /^(.*\d.*)$/.test(currentPassword)) {
        node?.children[2].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[2].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[2].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[2].classList.add("text-rose-500", "before:content-['x']");
      }
  
      if (currentPassword && /^(.*\W.*)$/.test(currentPassword)) {
        node?.children[3].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[3].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[3].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[3].classList.add("text-rose-500", "before:content-['x']");
      }
  
      if (currentPassword && currentPassword.length >= 8) {
        node?.children[0].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[0].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[0].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[0].classList.add("text-rose-500", "before:content-['x']");
      }
    }
  }, [currentPassword]);

  const newPswErrListRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      if (newPassword && /^(.*[A-Z].*)$/.test(newPassword) && /^(.*[a-z].*)$/.test(currentPassword)) {
        node?.children[1].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[1].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[1].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[1].classList.add("text-rose-500", "before:content-['x']");
      }
  
      if (newPassword && /^(.*\d.*)$/.test(newPassword)) {
        node?.children[2].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[2].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[2].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[2].classList.add("text-rose-500", "before:content-['x']");
      }
  
      if (newPassword && /^(.*\W.*)$/.test(newPassword)) {
        node?.children[3].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[3].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[3].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[3].classList.add("text-rose-500", "before:content-['x']");
      }
  
      if (newPassword && newPassword.length >= 8) {
        node?.children[0].classList.remove("text-rose-500", "before:content-['x']");
        node?.children[0].classList.add("text-green-500", "before:content-['✔']");
      } else {
        node?.children[0].classList.remove("text-green-500", "before:content-['✔']");
        node?.children[0].classList.add("text-rose-500", "before:content-['x']");
      }
    }
  }, [newPassword]);

  useEffect(() => {
    // remove success message after 2s
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000)
    }
  });

  return (
    <form className="w-full flex flex-col items-center relative rounded-lg bg-white dark:bg-blue-950 py-14" onSubmit={handleSubmit(validateFormData)}>
      <div className="w-10/12 absolute -top-2 left-1/2 -translate-x-1/2">
        { error && ( <div className="bg-red-100 border border-red-400 text-sm font-semibold text-center text-red-700 px-4 py-3 rounded-lg relative">{t(`details_list.update_password.${error}`)}</div>) }
        { success && ( <div className="bg-green-100 border border-green-400 text-sm font-semibold text-center text-green-700 px-4 py-3 rounded-lg relative">{t(`details_list.update_password.${success}`)}</div>) }
      </div>
      <div className="w-10/12 mb-4">
        <label htmlFor="current_password" className="ml-3 text-sm font-medium text-blue-700 dark:text-white">{t('details_list.update_password.form.input_current_password_label')}</label>
        <input 
          className={`
            w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal dark:text-white dark:bg-[#0F1A3E] border disabled:bg-slate-50 disabled:text-sl disabled:border-slate-200 disabled:shadow-none
            ${!currentPassword && !errors.currentPassword?.message && !error
            ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
            : errors.currentPassword?.message || error
            ? 'border-rose-500 ring-rose-500 focus:outline-none  focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
            : 'border-green-500 ring-green-500 focus:outline-none  focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'}
          `}
          type="password" 
          id="current_password" 
          placeholder={t('details_list.update_password.form.input_current_password_placeholder')}
          onFocus={onInputFocus}
          {...register("currentPassword")}
        />
        <div className="w-10/12 min-h-[20px]">
            {errors.currentPassword?.message === 'details_list.update_password.form.input_current_password_errors.combos.items' ? (
                <ul ref={currPswErrListRef} className="relative ml-3 pt-5 pr-4 text-xs text-rose-500 font-semibold before:content-[attr(aria-label)] before:font-semibold before:text-gray-800 dark:before:text-white before:absolute before:top-0"  aria-label={t('details_list.update_password.form.input_current_password_errors.combos.intro')}>
                  {t.rich(errors.currentPassword.message, {
                    item: (chunks) => <li className="pl-4 before:content-['x'] before:absolute before:left-0 before:font-extrabold"> {chunks}</li>
                  })}
                </ul>
              )
              :
              (
                <p className="text-xs text-rose-500 font-semibold pl-2"> {errors.currentPassword?.message}</p>
              )
            }
        </div>
      </div>
      <div className="w-10/12 mb-4">
          <label htmlFor="new_password" className="ml-3 text-sm font-medium text-blue-700 dark:text-white">{t('details_list.update_password.form.input_new_password_label')}</label>
          <input 
              className={`
                w-full rounded-lg mb-1 p-3 text-sm  font-medium placeholder:font-normal
                dark:text-white dark:bg-[#0F1A3E] border 
                disabled:bg-slate-50 disabled:text-sl disabled:border-slate-200 disabled:shadow-none
                ${!newPassword && !errors.newPassword?.message && !error
                ? 'border-gray-300 hover:border-gray-400  dark:border-gray-300   dark:hover:border-gray-400  focus:outline-none focus:border-blue-700   focus:ring-1 focus:ring-blue-700  dark:focus:border-sky-400  dark:focus:ring-sky-400'
                : errors.newPassword?.message || error
                ? 'border-rose-500 ring-rose-500  focus:outline-none  focus:border-rose-500  focus:ring-1 focus:ring-rose-500   dark:focus:border-rose-500  dark:focus:ring-rose-500'
                : 'border-green-500 ring-green-500  focus:outline-none  focus:border-green-500   focus:ring-1 focus:ring-green-500   dark:focus:border-green-500   dark:focus:ring-green-500'}
              `}
              type="password" 
              id="new_password" 
              placeholder={t('details_list.update_password.form.input_new_password_placeholder')}
              onFocus={onInputFocus}
              {...register("newPassword")}
          />
          <div className="w-full min-h-[20px]">
            {errors.newPassword?.message === 'details_list.update_password.form.input_new_password_errors.combos.items' ? (
                <ul ref={newPswErrListRef} className="relative ml-3 pt-5 pr-4 text-xs text-rose-500 font-semibold before:content-[attr(aria-label)] before:font-semibold before:text-gray-800 dark:before:text-white before:absolute before:top-0"  aria-label={t('details_list.update_password.form.input_new_password_errors.combos.intro')}>
                  {t.rich(errors.newPassword.message, {
                    item: (chunks) => <li className="pl-4 before:content-['x'] before:absolute before:left-0 before:font-extrabold"> {chunks}</li>
                  })}
                </ul>
              )
              :
              (
                <p className="text-xs text-rose-500 font-semibold pl-2"> {errors.newPassword?.message}</p>
              )
            }
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-start">
          <input 
              type="submit" 
              className="w-auto font-semibold rounded-full md:ml-11 px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] cursor-pointer disabled:bg-blue-700/25 disabled:dark:bg-sky-400/25 disabled:dark:text-gray-400 disabled:cursor-default"
              value={t('details_list.update_password.form.button_submit_change')} 
              disabled={!isDirty || !isValid}
          />
      </div>
    </form>
  )
}