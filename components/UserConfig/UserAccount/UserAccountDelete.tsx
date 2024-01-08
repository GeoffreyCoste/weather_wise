'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEdgeStore } from '@/lib/edgestore'
import { signOut } from 'next-auth/react'

const deleteAccount = async (userId: string) => {
    try {
        const response = await fetch(`/api/user/${userId}/delete-account`, {
            method: 'DELETE'
        });

        if (response.ok) {
            signOut();
        }

    } catch (error) {
        console.log(error);
    }
};

export const UserAccountDelete = () => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const t = useTranslations("UserAccountPage");

    const {data, update} = useSession();

    const userId = data?.user?.id;
    const userImageUrl = data?.user?.image;

    const { edgestore } = useEdgeStore();

    const handleDeleteAccount = async () => {
        try {
            if (userImageUrl) {
                await edgestore.publicImages.delete({
                    url: userImageUrl
                })
            }
            if (userId) {
                await deleteAccount(userId);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col">
            <div className={`w-full ${confirmDelete ? 'h-40 md:h-24 mb-4' : 'h-0'}`}>
                {confirmDelete && (
                    t.rich('details_list.danger_zone.confirmation_title', {
                        p: (chunks) => <p className="text-base">{chunks}</p>,
                        span: (chunks) => <span className="font-bold">{chunks}</span>
                    })
                )}
            </div>
            <div className={`w-full flex flex-wrap md:flex-nowrap ${confirmDelete ? 'gap-y-4 md:gap-y-0 md:gap-x-4' : ''}`}>
                <div className={`${confirmDelete ? "basis-full md:basis-1/2" : "basis-full"} flex justify-center md:justify-start`}>
                    {!confirmDelete ? (
                        <button 
                            id="button-delete-account"
                            className="w-auto font-semibold rounded-full px-4 py-2 bg-transparent lg:hover:bg-blue-700 border-2 border-blue-700 dark:border-sky-400 text-blue-700 lg:hover:text-white dark:text-sky-400 lg:dark:hover:text-[#172554] lg:dark:hover:bg-sky-400 cursor-pointer lg:hover:animate-shake"
                            type="button" 
                            tabIndex={0} 
                            role="button" 
                            aria-label="delete-account"
                            onClick={() => setConfirmDelete(true)}
                        >
                            {t('details_list.danger_zone.button_delete_account')}
                        </button>
                    ) : (
                        <button 
                            className="w-full max-w-[210px] font-semibold rounded-full px-4 py-2 border-2 border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:text-[#172554] dark:hover:bg-sky-400 cursor-pointer" 
                            type="button" 
                            onClick={() => setConfirmDelete(false)}
                        >
                            {t('details_list.danger_zone.button_cancel_delete')}
                        </button>
                    )}
                </div>
                <div className={`${confirmDelete ? 'basis-full md:basis-1/2' : 'basis-0'}`}>
                    {confirmDelete && (
                        <button 
                            className="w-full max-w-[210px] font-semibold rounded-full px-4 py-2 border-2 border-red-600 bg-red-600 hover:border-red-700 hover:bg-red-700 text-white cursor-pointer"
                            type="button" 
                            onClick={() => handleDeleteAccount()}
                        >
                            {t('details_list.danger_zone.button_confirm_delete')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
