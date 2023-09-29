'use client'

import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useTranslations } from 'next-intl';

async function sendToken(payload) {
    try {
        const response = await fetch('/api/send-token', {
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

export const ForgotPasswordForm = () => {

    const [error, setError] = useState();

    const router = useRouter();

    const t = useTranslations('ForgotPasswordPage');

    async function onForgotPassword(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const payload = {
            email: formData.get('email'),
            mobile: formData.get('mobile')
        }

        const response = await sendToken(payload);

        if (response.error) {
          setError(response.error);
        } else if (response.redirect) {
            router.push(`${response.redirect}?preference=${response.preference}`)
        }

        return true;
    }

    return (
        <div className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950">
            <form className="lg:w-1/2 lg:mx-auto" onSubmit={onForgotPassword}>
                <h1 className="text-center font-black text-blue-700 dark:text-white lg:text-3xl mb-4">{t('form.title')}</h1>
                <p className="text-center font-medium text-blue-700 dark:text-white lg:text-lg mb-8">{t('form.baseline')}</p>
                { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) } 
                <div className="mb-4 text-black">Please use the same email address or phone number that you used to <a href="/new-user">create your user</a>.</div>    
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{t('form.input_email_label')}</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder={t('form.input_email_placeholder')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4 text-black">- or -</div>
                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">{t('form.input_mobile_label')}</label>
                    <input 
                        type="text" 
                        name="mobile" 
                        id="mobile" 
                        placeholder={t('form.input_mobile_placeholder')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <input type="submit" value={t('form.button_submit_reset')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
            </form>
            <div className="lg:w-1/2 flex flex-col items-center text-sm mt-6 lg:mx-auto">
              <Link href="/login" className="relative font-semibold text-blue-700 dark:text-sky-400 hover:underline after:content-['→'] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-5 after:invisible hover:after:visible hover:after:animate-pulse">{t('login_link')}</Link>
            </div>
        </div>
    )
}
