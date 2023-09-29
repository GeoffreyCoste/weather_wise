'use client'

import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';

async function verifyToken(payload) {
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

export const EnterTokenForm = (request) => {

    const [error, setError] = useState();

    const router = useRouter();

    const t = useTranslations('EnterTokenPage');

    async function onVerifyToken(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const payload = {
            token: formData.get('token'),
        };

        const response = await verifyToken(payload);
        console.log(response);


        if (response?.error) {
            console.log(error);
            setError(response.error);
        } else if (response?.redirect) {
            router.push(response.redirect);
        };
        return true;
    };

    const preference = request.searchParams?.preference;

    return (
        <div className="relative flex w-full flex-col rounded-lg px-4 py-14 sm:w-10/12 sm:py-24 md:w-3/4 md:py-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950">
            <form className="lg:w-1/2 lg:mx-auto" onSubmit={onVerifyToken}>
                <h1 className="text-center font-black text-blue-700 dark:text-white lg:text-3xl mb-4">{t('form.title')}</h1>
                <p className="text-center font-medium text-blue-700 dark:text-white lg:text-lg mb-8">{t('form.baseline')}</p>
                { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) }     
                <div className="mb-4 text-black">{t('form.baseline')}&nbsp;{ preference === 'email' ? "email" : "SMS" }.</div>
                <div className="mb-4">
                    <label htmlFor="token" className="block text-gray-700 text-sm font-bold mb-2">Token</label>
                    <input type="token" name="token" id="token" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                </div>
                <input type="submit" value={t('form.button_submit_token')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
            </form>
        </div>
    )
}


export default EnterTokenForm;