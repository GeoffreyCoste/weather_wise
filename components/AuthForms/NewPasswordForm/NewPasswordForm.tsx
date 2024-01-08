'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl';

type PayloadType = {
  newPassword: string;
  newPasswordConfirm: string;
}

async function resetPassword(payload: PayloadType) {
    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
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

export const NewPasswordForm = () => {

    type Inputs = z.infer<typeof NewPasswordFormDataSchema>

    const [error, setError] = useState();

    const router = useRouter();

    const t = useTranslations('NewPasswordPage');

    const pswErrListRef = useRef<HTMLUListElement>(null);

    const NewPasswordFormDataSchema = z.object({
        newPassword: z
          .string()
          .min(1, {message: t('form.input_new_password_errors.empty')})
          .refine((value) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(value), {
            message: 'form.input_new_password_errors.combos.items'
          }),
        newPasswordConfirm: z
          .string()
          .min(1, {message: t('form.input_new_password_confirm_errors.empty')})
      })
      .refine((data) => data.newPassword === data.newPasswordConfirm, {
        message: t('form.input_new_password_confirm_errors.noMatch'),
        path: ["newPasswordConfirm"] // path of error
      });

    const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>({
      mode: "onChange",
      resolver: zodResolver(NewPasswordFormDataSchema)
    });

    const onResetPassword = async (data: Inputs) => {

        const response = await resetPassword(data);

        if (response.error) {
          setError(response.error);
        } else if (response.redirect) {
            router.push(`${response.redirect}?message=${response.message}`)
        };

        return true;
    }

    const validateFormData: SubmitHandler<Inputs> = data => {
        onResetPassword(data);
    };

    const newPassword = watch('newPassword');
    const newPasswordConfirm = watch('newPasswordConfirm');

    useEffect(() => {
    
        const list = pswErrListRef?.current;
    
        if (newPassword && newPassword.length > 8) {
          list?.children[0].classList.remove("text-rose-500", "before:content-['x']");
          list?.children[0].classList.add("text-green-500", "before:content-['✔']");
        } else {
          list?.children[0].classList.remove("text-green-500", "before:content-['✔']");
          list?.children[0].classList.add("text-rose-500", "before:content-['x']");
        }
    
        if (newPassword && /^(.*[A-Z].*)$/.test(newPassword) && /^(.*[a-z].*)$/.test(newPassword)) {
          list?.children[1].classList.remove("text-rose-500", "before:content-['x']");
          list?.children[1].classList.add("text-green-500", "before:content-['✔']");
        } else {
          list?.children[1].classList.remove("text-green-500", "before:content-['✔']");
          list?.children[1].classList.add("text-rose-500", "before:content-['x']");
        }
    
        if (newPassword && /^(.*\d.*)$/.test(newPassword)) {
          list?.children[2].classList.remove("text-rose-500", "before:content-['x']");
          list?.children[2].classList.add("text-green-500", "before:content-['✔']");
        } else {
          list?.children[2].classList.remove("text-green-500", "before:content-['✔']");
          list?.children[2].classList.add("text-rose-500", "before:content-['x']");
        }
    
        if (newPassword && /^(.*\W.*)$/.test(newPassword)) {
          list?.children[3].classList.remove("text-rose-500", "before:content-['x']");
          list?.children[3].classList.add("text-green-500", "before:content-['✔']");
        } else {
          list?.children[3].classList.remove("text-green-500", "before:content-['✔']");
          list?.children[3].classList.add("text-rose-500", "before:content-['x']");
        }
      });

    return (
        <div id="container_form_new_password" className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950 z-50">
            <form className="w-full sm:w-3/4 mx-auto" onSubmit={handleSubmit(validateFormData)}>
                <h1 className="text-center font-black text-blue-700 dark:text-white text-3xl mb-4">{t('form.title')}</h1>
                <p className="text-center font-medium text-blue-700 dark:text-white text-lg mb-8">{t('form.baseline')}</p>
                { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-sm font-semibold text-center text-red-700 px-4 py-3 rounded-lg relative">{ error }</div>) }
                <div className="mb-4">
                    <label htmlFor="new_password" className="ml-3 text-sm font-semibold text-gray-800 dark:text-white">{t('form.input_new_password_label')}</label>
                    <input 
                        className={`
                            w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                            dark:text-white dark:bg-[#0F1A3E] border 
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            ${!newPassword && !errors.newPassword?.message && !error
                                ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                                : errors.newPassword?.message || error
                                    ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                                    : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                            }
                        `}
                        type="password" 
                        id="new_password" 
                        placeholder={t('form.input_new_password_placeholder')}
                        {...register("newPassword")}
                    />
                    <div className="w-full min-h-[20px]">
                        {errors.newPassword?.message === 'form.input_new_password_errors.combos.items' ? (
                            <ul ref={pswErrListRef} className="relative ml-3 pt-5 pr-4 text-xs text-rose-500 font-semibold before:content-[attr(aria-label)] before:font-semibold before:text-gray-800 dark:before:text-white before:absolute before:top-0" aria-label={t('form.input_new_password_errors.combos.intro')}>
                              {t.rich(errors.newPassword.message, {
                                item: (chunks) => <li className="pl-4 before:content-['x'] before:absolute before:left-0 before:font-extrabold">{chunks}</li>
                              })}
                            </ul>
                          )
                          :
                          (
                            <p className="text-xs text-rose-500 font-semibold pl-2">{errors.newPassword?.message}</p>
                          )
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="new_password_confirm" className="ml-3 text-sm font-semibold text-gray-800 dark:text-white">{t('form.input_new_password_confirm_label')}</label>
                    <input 
                        className={`
                            w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                            dark:text-white dark:bg-[#0F1A3E] border 
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            ${!newPasswordConfirm || error
                                ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                                : errors.newPasswordConfirm?.message 
                                    ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                                    : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                            }
                        `}
                        type="password" 
                        id="new_password_confirm" 
                        placeholder={t('form.input_new_password_confirm_placeholder')}
                        {...register("newPasswordConfirm")}
                    />
                    <div className="w-full min-h-[20px]">
                      {errors.newPasswordConfirm?.message && (
                        <p className="text-xs text-rose-500 font-semibold pl-2">{errors.newPasswordConfirm.message}</p>
                      )}
                    </div>
                </div>
                <div className="mt-4">
                    <input 
                        type="submit" 
                        className="w-full font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] cursor-pointer"
                        value={t('form.button_submit_change')} 
                    />
                </div>
            </form>
        </div>
    )
}
