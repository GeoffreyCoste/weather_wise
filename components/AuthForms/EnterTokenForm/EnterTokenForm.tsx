'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl';

type PayloadType = {
    token: string;
  }

async function verifyToken(payload: PayloadType) {
    try {
        const response = await fetch('/api/verify-token', { 
            method: 'POST', 
            body: JSON.stringify(payload) 
        });
    
        if (!response.ok) return undefined
        return response.json()
    } catch (e) {
        console.log(e);
    }
}

export const EnterTokenForm = () => {

    type Inputs = z.infer<typeof EnterTokenFormDataSchema>

    const [error, setError] = useState();

    const searchParams = useSearchParams();
    const preference = searchParams?.get('preference');

    const router = useRouter();

    const t = useTranslations('EnterTokenPage');

    const EnterTokenFormDataSchema = z.object({
        token: z
          .string()
          .min(1, {message: t('form.input_token_errors.empty')})
          .regex(/^[0-9]{6}$/, {message: t('form.input_token_errors.format')})
      });
    
      const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>({
        mode: "onChange",
        resolver: zodResolver(EnterTokenFormDataSchema)
      });

    const onVerifyToken = async (data: Inputs) => {

        const response = await verifyToken(data);

        if (response?.error) {
            console.log(error);
            setError(response.error);
        } else if (response?.redirect) {
            router.push(response.redirect);
        };

        return true;
    };

    const validateFormData: SubmitHandler<Inputs> = data => {
        onVerifyToken(data);
      };
    
    const token = watch('token');

    return (
        <div id="container_form_enter_token" className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950 z-50">
            <form className="w-full sm:w-3/4 mx-auto" onSubmit={handleSubmit(validateFormData)}>
                <h1 className="text-center font-black text-blue-700 dark:text-white text-3xl mb-4">{t('form.title')}</h1>
                <p className="text-center font-medium text-blue-700 dark:text-white text-lg mb-8">{t('form.baseline')}&nbsp;{ preference === "email" ? "email" : "SMS" }.</p>
                <p className="text-sm text-center italic dark:text-white/75 mb-8">{t('form.rule')}&nbsp;{ preference === "email" ? "email" : "SMS" }.</p>
                { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-sm font-semibold text-center text-red-700 px-4 py-3 rounded-lg relative">{ t(error) }</div>) }     
                <div className="mb-4">
                    <label htmlFor="token" className="ml-3 text-sm font-semibold text-gray-800 dark:text-white">{t("form.input_token_label")}</label>
                    <input 
                        className={`
                            w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                            dark:text-white dark:bg-[#0F1A3E] border 
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            ${!token 
                                ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                                : errors.token?.message || error 
                                    ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                                    : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                            }
                        `}
                        type="token" 
                        placeholder={t("form.input_token_placeholder")} 
                        id="token" 
                        {...register('token')}
                    />
                    <div className="w-full min-h-[20px]">
                      {errors.token?.message && (
                        <p className="text-xs text-rose-500 font-semibold pl-2">{errors.token.message}</p>
                      )}
                    </div>
                </div>
                <div className="mt-4">
                    <input 
                        type="submit" 
                        className="w-full font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] cursor-pointer"
                        value={t('form.button_submit_token')} 
                    />
                </div>
            </form>
            <div className="lg:w-1/2 flex justify-center text-sm mt-6 lg:mx-auto">
              <Link href="/forgot-password" className="relative font-semibold text-blue-700 dark:text-sky-400 hover:underline after:content-['→'] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-5 after:invisible hover:after:visible hover:after:animate-pulse">{t('forgot_password_link')}</Link>
            </div>
        </div>
    )
}


export default EnterTokenForm;