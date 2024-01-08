'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import { EyeIcon } from '../../SvgIcons/EyeIcon/EyeIcon'
import { EyeSlashIcon } from '../../SvgIcons/EyeSlashIcon/EyeSlashIcon'
import Link from 'next/link'
import SelectInput from './SelectInput/SelectInput'

export const SignupForm = () => {
  
  type Inputs = z.infer<typeof SignupFormDataSchema>

  const [passwordShown, setPasswordShown] = useState(false);

  const { status } = useSession();
  const router = useRouter();
  
  const t = useTranslations('SignupPage');

  const {themeState} = useTheme();

  const pswErrListRef = useRef<HTMLUListElement>(null);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  const SignupFormDataSchema = z.object({
    firstName: z
      .string()
      .min(1, {message: t('form.input_firstname_errors.empty')})
      .min(2, {message:  t('form.input_firstname_errors.min_length')})
      .max(50, {message: t('form.input_firstname_errors.max_length')})
      .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), {message: t('form.input_firstname_errors.only_alphabet')}),
    lastName: z
      .string()
      .min(1, {message: t('form.input_lastname_errors.empty')})
      .min(2, {message: t('form.input_lastname_errors.min_length')})
      .max(50, {message: t('form.input_lastname_errors.max_length')})
      .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), {message: t('form.input_lastname_errors.only_alphabet')}),
    location: z
      .string()
      .min(1, {message: t('form.input_location_errors.empty')}),
    email: z
      .string()
      .email({message: t('form.input_email_errors.format')})
      .min(1, {message: t('form.input_email_errors.empty')}),
    password: z
      .string()
      .min(1, {message: t('form.input_password_errors.empty')})
      .refine((value) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(value), {
        message: 'form.input_password_errors.combos.items'
      })
  });

  const { control, register, handleSubmit, watch, setError, formState: { errors }} = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(SignupFormDataSchema)
  });

  const onSubmit = async ({
    firstName,
    lastName,
    location,
    email,
    password
}: Inputs ) => {
      try {
          const response = await fetch("/api/signup", {
              method: 'POST',
              body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  location: location,
                  email: email,
                  password: password,
              })
          });
          if (response.ok) {
              signIn();
          } else {
            const error = await response.json()
            throw (error);
          }
      } catch(error: any) {
          setError(error.err?.field, {
            type: "manual",
            message: t(error.err?.message)
          })
      }
  };

  const validateFormData: SubmitHandler<Inputs> = data => {
    onSubmit(data);
  };

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
      if (status === "authenticated") {
          router.push("/user/dashboard");
      }
  }, [status, router]);

  useEffect(() => {

    console.log(errors.email);
    console.log(errors.firstName);

    const list = pswErrListRef?.current;

    if (password && password.length > 8) {
      list?.children[0].classList.remove("text-rose-500", "before:content-['x']");
      list?.children[0].classList.add("text-green-500", "before:content-['✔']");
    } else {
      list?.children[0].classList.remove("text-green-500", "before:content-['✔']");
      list?.children[0].classList.add("text-rose-500", "before:content-['x']");
    }

    if (password && /^(.*[A-Z].*)$/.test(password) && /^(.*[a-z].*)$/.test(password)) {
      list?.children[1].classList.remove("text-rose-500", "before:content-['x']");
      list?.children[1].classList.add("text-green-500", "before:content-['✔']");
    } else {
      list?.children[1].classList.remove("text-green-500", "before:content-['✔']");
      list?.children[1].classList.add("text-rose-500", "before:content-['x']");
    }

    if (password && /^(.*\d.*)$/.test(password)) {
      list?.children[2].classList.remove("text-rose-500", "before:content-['x']");
      list?.children[2].classList.add("text-green-500", "before:content-['✔']");
    } else {
      list?.children[2].classList.remove("text-green-500", "before:content-['✔']");
      list?.children[2].classList.add("text-rose-500", "before:content-['x']");
    }

    if (password && /^(.*\W.*)$/.test(password)) {
      list?.children[3].classList.remove("text-rose-500", "before:content-['x']");
      list?.children[3].classList.add("text-green-500", "before:content-['✔']");
    } else {
      list?.children[3].classList.remove("text-green-500", "before:content-['✔']");
      list?.children[3].classList.add("text-rose-500", "before:content-['x']");
    }
  });

  return (
    <div id="container_form_signup" className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950 z-50">
        <form className="w-full sm:w-2/3 sm:mx-auto lg:w-1/2" onSubmit={handleSubmit(validateFormData)}>
            <h1 className="text-center font-black text-blue-700 dark:text-white text-3xl mb-4">{t('form.title')}</h1>
            <p className="text-center font-medium text-blue-700 dark:text-white text-lg mb-8">{t('form.baseline')}</p>
            <p className="text-sm text-center italic dark:text-white/75 mb-8">{t.rich("form.rule")}</p>
            <div>
                <label htmlFor="signup-input-firstname" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_firstname_label')}</label>
                <input
                  className={`
                      w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                      dark:text-white dark:bg-[#0F1A3E] border 
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      ${!firstName && !errors.firstName?.message
                          ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                          : errors.firstName?.message
                              ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                              : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                      }
                  `}
                  placeholder={t('form.input_firstname_placeholder')}
                  type="text"
                  id="signup-input-firstname"
                  {...register('firstName')}
                />
                <div className="w-full min-h-[20px]">
                  {errors.firstName?.message && (
                    <p className="text-xs text-rose-500 font-semibold pl-2">{errors.firstName.message}</p>
                  )}
                </div>
            </div>
            <div>
                <label htmlFor="signup-input-lastname" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_lastname_label')}</label>
                <input
                  className={`
                  w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                  dark:text-white dark:bg-[#0F1A3E] border 
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  ${!lastName && !errors.lastName?.message
                      ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                      : errors.lastName?.message 
                          ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                          : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                  }
              `}
                  placeholder={t('form.input_lastname_placeholder')}
                  type="text"
                  id="signup-input-lastname"
                  {...register('lastName')}
                  /* pattern="/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u" */
                />
                <div className="w-full min-h-[20px]">
                  {errors.lastName?.message && (
                    <p className="text-xs text-rose-500 font-semibold pl-2">{errors.lastName.message}</p>
                  )}
                </div>
            </div>
            <div>
              <label htmlFor="signup-input-location" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_location_label')}</label>
              <Controller 
                name="location"
                control={control}
                render={({field, fieldState}) => (
                  <SelectInput value={field.value} onChange={field.onChange} error={fieldState.error} />
                )}
              />
              <div className="w-full min-h-[20px]">
                {errors.location?.message && (
                  <p className="text-xs text-rose-500 font-semibold pl-2">{errors.location.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="signup-input-email" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_email_label')}</label>
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
                id="signup-input-email"
                {...register('email')}
                /* pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g" */
              />
              <div className="w-full min-h-[20px]">
                {errors.email?.message && (
                  <p className="text-xs text-rose-500 font-semibold pl-2">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="relative">
              <label htmlFor="signup-input-password" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_password_label')}</label>
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
                id="signup-input-password"
                {...register('password')}
              />
              <div className={`absolute top-[34px] right-4 w-6 h-6 cursor-pointer before:w-8 before:h-8 before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 ${ themeState.theme === 'light' ? 'hover:before:bg-yellow-400' : 'hover:before:bg-white'}`} onClick={togglePasswordVisiblity}>
                {passwordShown ? <EyeSlashIcon /> : <EyeIcon />}
              </div>
              <div className="w-full min-h-[20px]">
                {errors.password?.message === 'form.input_password_errors.combos.items' ? (
                    <ul ref={pswErrListRef} className="relative ml-3 pt-5 pr-4 text-xs text-rose-500 font-semibold before:content-[attr(aria-label)] before:font-semibold before:text-gray-800 dark:before:text-white before:absolute before:top-0" aria-label={t('form.input_password_errors.combos.intro')}>
                      {t.rich(errors.password.message, {
                        item: (chunks) => <li className="pl-4 before:content-['x'] before:absolute before:left-0 before:font-extrabold">{chunks}</li>
                      })}
                    </ul>
                  )
                  :
                  (
                    <p className="text-xs text-rose-500 font-semibold pl-2">{errors.password?.message}</p>
                  )
                }
              </div>
            </div>
            <div className="mt-4">
              <input
                type="submit"
                className="w-full font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] cursor-pointer"
                value={t('form.button_submit_signup')}
              />
            </div>
        </form>
        <div className="lg:w-1/2 flex flex-col items-center lg:flex-row lg:justify-center text-sm mt-6 lg:mx-auto">
          <p className="dark:text-white">{t('login_link.text')}&nbsp;</p>
          <Link href="/login" className="relative text-blue-700 dark:text-sky-400 font-semibold hover:underline after:content-['→'] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-5 after:invisible hover:after:visible hover:after:animate-pulse">{t('login_link.link')}</Link>
        </div>
    </div>
  )
}