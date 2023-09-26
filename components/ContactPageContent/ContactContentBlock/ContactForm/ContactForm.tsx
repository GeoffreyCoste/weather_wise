'use client'

import { useTranslations } from "next-intl"

export const ContactForm = () => {

    const t = useTranslations('ContactPage')

    // TODO: Review ARIA
  return (
    <form id="form-contact" className="w-1/2 flex flex-col mx-auto" action="">
      <div>
        <label className="sr-only" htmlFor="name">Name</label>
        <input
          className="w-full rounded-lg focus:outline-none border border-gray-300 hover:border-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-rose-500 invalid:text-rose-600
          focus:invalid:border-rose-500 focus:invalid:ring-rose-500 outline-0 mb-2 p-3 text-sm text-blue-700 font-bold placeholder:font-normal
          dark:bg-[#0F1A3E] dark:border-gray-300 dark:hover:border-gray-400 dark:text-white dark:focus:border-sky-400 dark:focus:invalid:border-rose-500 dark:invalid:text-rose-600"
          placeholder={t('form.input_name_placeholder')}
          type="text"
          id="name"
          required
          aria-required="true"
        />
      </div>
      <div>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            className="w-full rounded-lg focus:outline-none border border-gray-300 hover:border-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-rose-500 invalid:text-rose-600
                        focus:invalid:border-rose-500 focus:invalid:ring-rose-500 outline-0 mb-2 p-3 text-sm text-blue-700 font-bold placeholder:font-normal
                        dark:bg-[#0F1A3E] dark:border-gray-300 dark:hover:border-gray-400 dark:text-white dark:focus:border-sky-400 dark:focus:invalid:border-rose-500 dark:invalid:text-rose-600"
            placeholder={t('form.input_email_placeholder')}
            type="email"
            id="email"
          />
        </div>
      <div>
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea
          className="w-full rounded-lg focus:outline-none border border-gray-300 hover:border-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-rose-500 invalid:text-rose-600
          focus:invalid:border-rose-500 focus:invalid:ring-rose-500 outline-0 mb-2 p-3 text-sm text-blue-700 font-bold placeholder:font-normal
          dark:bg-[#0F1A3E] dark:border-gray-300 dark:hover:border-gray-400 dark:text-white dark:focus:border-sky-400 dark:focus:invalid:border-rose-500 dark:invalid:text-rose-600"
          placeholder={t('form.input_message_placeholder')}
          rows={8}
          id="message"
        ></textarea>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="w-40 font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554]"
        >
          {t('form.button_submit')}
        </button>
      </div>
    </form>
  )
}
