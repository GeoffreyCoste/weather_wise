'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations, useLocale } from 'next-intl'
import SelectInput, { OptionType } from './SelectInput/SelectInput'
import { UserInfos } from './UserProfileContent'
import { SingleValue } from 'react-select'

export const UserProfileForm = (props: UserInfos) => {
    
    const {userId, userFirstName, userLastName, userLocation} = props;

    const locale = useLocale();

    const {value} = userLocation;
    const label = `${locale === "fr" ? userLocation.labelFr : userLocation.labelEn}`;

    const defaultOption: OptionType = {
      value: value,
      label: label
    };

    const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
    const [selectValue, setSelectValue] = useState<OptionType | SingleValue<OptionType>>(defaultOption);

    const {data, update} = useSession();
    const router = useRouter();

    type Inputs = z.infer<typeof ProfileFormDataSchema>

    const defaultOptions = [
      selectValue
    ];

    const t = useTranslations('UserProfilePage');
  
    const ProfileFormDataSchema = z.object({
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
    });

  const { control, register, handleSubmit, watch, setError, reset, formState: { errors }} = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(ProfileFormDataSchema),
    defaultValues: {
      firstName: userFirstName,
      lastName: userLastName,
      location: defaultOption.value,
    }
  });

  const onSubmit = async ({
    firstName,
    lastName,
    location
}: Inputs ) => {

      try {
          const response = await fetch(`/api/user/${userId}/update-profile`, {
              method: 'PATCH',
              body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  location: selectValue?.value,
              })
          });
          if (response.ok) {
            update({
              firstName: firstName,
              lastName: lastName,
              location: selectValue?.value
            });
            router.refresh();
            setInputsDisabled(true);
          } else {
            const error = await response.json()
            throw (error.message);
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

  const defaultValues = {
    firstName: userFirstName,
    lastName: userLastName,
    location: defaultOption.value
  }

  const handleEditCancel = () => {
    setInputsDisabled(true);
    reset({...defaultValues});
    setSelectValue(defaultOption);
  }

  return (
    <div id="container_form_profile" className={`flex w-full flex-col items-center mt-3 py-12 px-4 z-50 ${!inputsDisabled && 'bg-white dark:bg-blue-950 rounded-lg'}`}>
        <div className="h-20">
          {!inputsDisabled && <h2 className="text-2xl text-center font-extrabold text-blue-700 dark:text-white">{t("form.title")}</h2>}
        </div>
        <form className="w-full max-w-sm sm:w-2/3 sm:mx-auto lg:w-1/2" onSubmit={handleSubmit(validateFormData)}>
            <div>
                <label htmlFor="profile-input-firstname" className="ml-3 text-sm text-blue-700 font-semibold dark:text-white">{t('form.input_firstname_label')}</label>
                <input
                  className={`
                      w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                      dark:text-white dark:bg-[#0F1A3E] border 
                      disabled:bg-transparent disabled:text-blue-700 disabled:border-blue-700 disabled:dark:text-white disabled:dark:border-blue-900 disabled:shadow-none
                      ${!firstName && !errors.firstName?.message
                          ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                          : errors.firstName?.message
                              ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                              : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                      }
                  `}
                  placeholder={t('form.input_firstname_placeholder')}
                  type="text"
                  id="profile-input-firstname"
                  disabled={inputsDisabled}
                  {...register('firstName')}
                />
                <div className="w-full min-h-[20px]">
                  {errors.firstName?.message && (
                    <p className="text-xs text-rose-500 font-semibold pl-2">{errors.firstName.message}</p>
                  )}
                </div>
            </div>
            <div>
                <label htmlFor="profile-input-lastname" className="ml-3 text-sm text-blue-700 font-semibold dark:text-white">{t('form.input_lastname_label')}</label>
                <input
                  className={`
                  w-full rounded-lg mb-1 p-3 text-sm font-medium placeholder:font-normal
                  dark:text-white dark:bg-[#0F1A3E] border 
                  disabled:bg-transparent disabled:text-blue-700 disabled:border-blue-700 disabled:dark:text-white disabled:dark:border-blue-900 disabled:shadow-none
                  ${!lastName && !errors.lastName?.message
                      ? 'border-gray-300 hover:border-gray-400 dark:border-gray-300 dark:hover:border-gray-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:focus:border-sky-400 dark:focus:ring-sky-400'
                      : errors.lastName?.message 
                          ? 'border-rose-500 ring-rose-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:focus:border-rose-500 dark:focus:ring-rose-500'
                          : 'border-green-500 ring-green-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500'
                  }
              `}
                  placeholder={t('form.input_lastname_placeholder')}
                  type="text"
                  id="profile-input-lastname"
                  disabled={inputsDisabled}
                  {...register('lastName')}
                />
                <div className="w-full min-h-[20px]">
                  {errors.lastName?.message && (
                    <p className="text-xs text-rose-500 font-semibold pl-2">{errors.lastName.message}</p>
                  )}
                </div>
            </div>
            <div>
              <label htmlFor="profile-input-location" className="ml-3 text-sm text-blue-700 font-semibold dark:text-white">{t('form.input_location_label')}</label>
              <Controller 
                name="location"
                control={control}
                render={({field, fieldState}) => (
                    <SelectInput 
                      value={selectValue}
                      defaultOptions={defaultOptions} 
                      isDisabled={inputsDisabled} 
                      setValue={setSelectValue}
                      error={fieldState.error} />
                  )
                }
              />
              <div className="w-full min-h-[20px]">
                {errors.location?.message && (
                  <p className="text-xs text-rose-500 font-semibold pl-2">{errors.location.message}</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end mt-12">
                <div className={`w-full flex flex-wrap md:flex-nowrap ${!inputsDisabled ? 'gap-y-4 md:gap-y-0 md:gap-x-4' : ''}`}>
                    <div className="basis-full md:basis-1/2 flex justify-center md:justify-start">
                        {!inputsDisabled && (
                            <input
                                type="submit"
                                className="w-full max-w-[210px] font-semibold rounded-full px-4 py-2 bg-blue-700 text-white dark:bg-sky-400 dark:text-[#172554]  cursor-pointer"
                                value={t('form.button_save')}
                            />
                        )}
                    </div>
                    <div className="basis-full md:basis-1/2 flex justify-center md:justify-start">
                        {inputsDisabled ? (
                            <button 
                                className="w-full max-w-[210px] font-semibold rounded-full px-4 py-2 border-2  border-blue-700 lg:hover:bg-blue-700 text-blue-700 lg:hover:text-white   dark:border-sky-400 dark:text-sky-400 lg:dark:hover:text-[#172554] lg:dark:hover:bg-sky-400 cursor-pointer"
                                type="button" 
                                onClick={() => setInputsDisabled(false)}
                            >
                                {t('form.button_edit')}
                            </button>
                        ) : (
                            <button 
                                className="w-full max-w-[210px] font-semibold rounded-full px-4 py-2 border-2 border-blue-700 lg:hover:bg-blue-700 text-blue-700 lg:hover:text-white  dark:border-sky-400 dark:text-sky-400 lg:dark:hover:text-[#172554] lg:dark:hover:bg-sky-400 cursor-pointer" 
                                type="button" 
                                onClick={handleEditCancel}
                            >
                                {t('form.button_cancel')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}