'use client'

import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useTranslations } from 'next-intl';

async function resetPassword(payload) {
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

    const [error, setError] = useState();

    const router = useRouter();

    const t = useTranslations('NewPasswordPage');

    async function onResetPassword(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const payload = {
            newPassword: formData.get('new_password'),
            newPasswordConfirm: formData.get('new_password_confirm')
        }

        const response = await resetPassword(payload);

        if (response.error) {
          setError(response.error);
        } else if (response.redirect) {
            router.push(`${response.redirect}?message=${response.message}`)
        }

        return true;
    }

    return (
        <div className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950">
            <form className="lg:w-1/2 lg:mx-auto" onSubmit={onResetPassword}>
                <h1 className="text-center font-black text-blue-700 dark:text-white lg:text-3xl mb-4">{t('form.title')}</h1>
                <p className="text-center font-medium text-blue-700 dark:text-white lg:text-lg mb-8">{t('form.baseline')}</p>
                { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) }
                <div className="mb-4">
                    <label htmlFor="new_password" className="block text-gray-700 text-sm font-bold mb-2">{t('form.input_new_password_label')}</label>
                    <input 
                        type="password" 
                        name="new_password" 
                        id="new_password" 
                        placeholder={t('form.input_new_password_placeholder')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="new_password_confirm" className="block text-gray-700 text-sm font-bold mb-2">{t('form.input_new_password_confirm_label')}</label>
                    <input 
                        type="password" 
                        name="new_password_confirm" 
                        id="new_password_confirm" 
                        placeholder={t('form.input_new_password_confirm_placeholder')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <input type="submit" value={t('form.button_submit_change')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
            </form>
        </div>
    )
}
