'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import { EyeIcon } from '../EyeIcon/EyeIcon'
import { EyeSlashIcon } from '../EyeSlashIcon/EyeSlashIcon'
import Link from 'next/link'

export const LoginForm = () => {

  type Inputs = z.infer<typeof LoginFormDataSchema>

  const [passwordShown, setPasswordShown] = useState(false);

  const searchParams = useSearchParams();
  // Get reset password success message
  const message = searchParams.get('message');

  const { data, status } = useSession();
  const router = useRouter();

  const t = useTranslations('LoginPage');

  const {themeState} = useTheme();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const LoginFormDataSchema = z.object({
    email: z
      .string()
      .email({message: t('form.input_email_errors.format')})
      .nonempty({message: t('form.input_email_errors.empty')}),
    password: z
      .string()
      .nonempty({message: t('form.input_password_errors.empty')})
  });

  const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(LoginFormDataSchema)
  });

  const onSubmit = async ({
    email,
    password
}: Inputs) => {
      try {
          const response = await fetch("/api/login", {
              method: 'POST',
              body: JSON.stringify({
                  email: email,
                  password: password,
              })
          });
          if (response.ok) {
              signIn('credentials', {email, password, callbackUrl: `${window.location.origin}/user/dashboard`});
          }
      } catch(error) {
          console.log(error);
      }
  };

  const validateFormData: SubmitHandler<Inputs> = data => {
    onSubmit(data);
  };

  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
      if (status === "authenticated") {
          router.push("/user/dashboard");
      }
  }, [status, router]);

  return (
    <div id="container_form_signin" className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950">
        {message && (<div className="absolute -top-16 left-1/2 -translate-x-1/2 mb-4 bg-green-100 border border-green-400 text-sm font-semibold text-green-700 px-4 py-3 rounded-lg">{ t(message) }</div>)}
        <form className="w-full sm:w-2/3 sm:mx-auto lg:w-1/2" onSubmit={handleSubmit(validateFormData)}>
          <h1 className="text-center font-black text-blue-700 dark:text-white text-3xl mb-4">{t('form.title')}</h1>
          <p className="text-center font-medium text-blue-700 dark:text-white text-lg mb-8">{t('form.baseline')}</p>
          <p className="text-sm text-center italic dark:text-white/75 mb-8">{t("form.rule")}</p>
          <div>
              <label htmlFor="login-input-email" className="ml-3 text-sm font-semibold text-gray-800 dark:text-white">{t('form.input_email_label')}</label>
              <input
                className={`
                    w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                    dark:text-white dark:bg-[#0F1A3E] border 
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    ${!email && !errors.email?.message
                        ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                        : errors.email?.message 
                            ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                            : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                    }
                `}
                placeholder={t('form.input_email_placeholder')}
                type="email"
                id="login-input-email"
                {...register('email')}
              />
              <div className="w-full h-5">
                {errors.email?.message && (
                  <p className="text-xs text-rose-500 font-semibold pl-2">{errors.email.message}</p>
                )}
              </div>
          </div>
          <div className="relative">
            <div className="absolute -top-5 right-6 text-sm mt-6">
              <Link href="/forgot-password" className="relative font-semibold text-blue-700 dark:text-sky-400 hover:underline after:content-['→'] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-5 after:invisible hover:after:visible hover:after:animate-pulse">{t('form.forgot_password_link')}</Link>
            </div>
            <label htmlFor="login-input-password" className="ml-3 text-sm font-semibold text-gray-800 dark:text-white">{t('form.input_password_label')}</label>
            <input
              className={`
                w-full rounded-lg mb-1 p-3 pr-12 text-sm font-medium placeholder:font-normal
                dark:text-white dark:bg-[#0F1A3E] border 
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                ${!password && !errors.password?.message
                        ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                        : errors.password?.message 
                            ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                            : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                    }
              `}
              placeholder={t('form.input_password_placeholder')}
              type={passwordShown ? "text" : "password"}
              id="login-input-password"
              {...register('password')}
              /* pattern="/(?=.*[_!@#$%§^&*-])(?=.*\d)(?!.*[.\n])(?=.*[a-z])(?=.*[A-Z])^.{8,}$/" */
            />
            <div className={`absolute top-[34px] right-4 w-6 h-6 cursor-pointer before:w-8 before:h-8 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 ${ themeState.theme === 'light' ? 'hover:before:bg-yellow-400' : 'hover:before:bg-white'}`} onClick={togglePasswordVisiblity}>
              {passwordShown ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
            <div className="w-full h-5">
              {errors.password?.message && (
                <p className="text-xs text-rose-500 font-semibold pl-2">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <input
              type="submit"
              className="w-full font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] cursor-pointer"
              value={t('form.button_submit_login')}
            />
          </div>
        </form>
        <div className="lg:w-1/2 flex flex-col items-center text-sm text-center mt-6 lg:mx-auto">
          <p className="dark:text-white">{t('signup_link.text')}</p>
          <Link href="/signup" className="relative font-semibold text-blue-700 dark:text-sky-400 hover:underline after:content-['→'] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-5 after:invisible hover:after:visible hover:after:animate-pulse">{t('signup_link.link')}</Link>
        </div>
    </div>
  )
}
