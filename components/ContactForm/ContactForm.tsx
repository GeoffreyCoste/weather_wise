'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'

export const ContactForm = () => {
  
  type Inputs = z.infer<typeof ContactFormDataSchema>
  
  const t = useTranslations('ContactPage');

  const {themeState} = useTheme();

  const ContactFormDataSchema = z.object({
    firstName: z
      .string()
      .nonempty({message: t('form.input_firstname_errors.empty')})
      .min(2, {message:  t('form.input_firstname_errors.min_length')})
      .max(50, {message: t('form.input_firstname_errors.max_length')})
      .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), {message: t('form.input_firstname_errors.only_alphabet')}),
    lastName: z
      .string()
      .nonempty({message: t('form.input_lastname_errors.empty')})
      .min(2, {message: t('form.input_lastname_errors.min_length')})
      .max(50, {message: t('form.input_lastname_errors.max_length')})
      .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value), {message: t('form.input_lastname_errors.only_alphabet')}),
    email: z
      .string()
      .email({message: t('form.input_email_errors.format')})
      .nonempty({message: t('form.input_email_errors.empty')}),
    textarea: z
      .string()
      .nonempty({message: t('form.input_textarea_errors.empty')})
      .max(500, {message: t('form.input_textarea_errors.max_length')})
  });

  const { register, handleSubmit, watch, setError, formState: { errors }} = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(ContactFormDataSchema)
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    textarea
}: Inputs ) => {
      /* try {
          const response = await fetch("/api/signup", {
              method: 'POST',
              body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  textarea: textarea,
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
      } */
  };

  const validateFormData: SubmitHandler<Inputs> = data => {
    onSubmit(data);
  };

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const textarea = watch('textarea');

  return (
    <div id="container_form_contact" className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950 z-50">
        <form className="w-full sm:w-2/3 sm:mx-auto lg:w-1/2" onSubmit={handleSubmit(validateFormData)}>
            <h1 className="text-center font-black text-blue-700 dark:text-white text-3xl mb-4">{t('form.title')}</h1>
            <p className="text-center font-medium text-blue-700 dark:text-white text-lg mb-8">{t('form.baseline')}</p>
            <p className="text-sm text-center italic dark:text-white/75 mb-8">{t.rich("form.rule")}</p>
            <div>
                <label htmlFor="contact-input-firstname" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_firstname_label')}</label>
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
                  id="contact-input-firstname"
                  {...register('firstName')}
                />
                <div className="w-full min-h-[20px]">
                  {errors.firstName?.message && (
                    <p className="text-xs text-rose-500 font-semibold pl-2">{errors.firstName.message}</p>
                  )}
                </div>
            </div>
            <div>
                <label htmlFor="contact-input-lastname" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_lastname_label')}</label>
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
                  id="contact-input-lastname"
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
              <label htmlFor="contact-input-email" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_email_label')}</label>
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
                id="contact-input-email"
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
              <label htmlFor="contact-input-textarea" className="ml-3 text-sm text-gray-800 font-semibold dark:text-white">{t('form.input_textarea_label')}</label>
              <textarea
                className={`
                  w-full rounded-lg mb-1 p-3 pr-12 text-sm font-medium placeholder:font-normal 
                  dark:text-white dark:bg-[#0F1A3E] border 
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  ${!textarea && !errors.textarea?.message
                          ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                          : errors.textarea?.message 
                              ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                              : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                      }
                `}
                placeholder={t('form.input_textarea_placeholder')}
                id="contact-input-textarea"
                rows={8}
                {...register('textarea')}
              />
              <div className="w-full min-h-[20px]">
                {errors.textarea?.message && (
                  <p className="text-xs text-rose-500 font-semibold pl-2">{errors.textarea.message}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <input
                type="submit"
                className="w-full font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554] cursor-pointer"
                value={t('form.button_submit_message')}
              />
            </div>
        </form>
    </div>
  )
}