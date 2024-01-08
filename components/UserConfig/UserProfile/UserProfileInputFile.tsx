'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useImageUpload } from '@/hooks/useImageUpload'
import ProfileIcon from '../../SvgIcons/ProfileIcon/ProfileIcon'
import CameraIcon from '../../SvgIcons/CameraIcon/CameraIcon'
import { updateUserImage } from '@/actions/userActions'
import { useEdgeStore } from '@/lib/edgestore'

type Props = {
    imageUrl: string | null | undefined;
}

export const UserProfileInputFile = ({imageUrl}: Props) => {

    const [progress, setProgress] = useState(0);

    const {
        handleDroppedFile,
        handleFileDialog,
        imageContainerRef,
        inputFileRef,
        openDialog,
        selectedFile,
        objectURL,
        stopDragEvent
    } = useImageUpload();

    const {data, update} = useSession();

    const userId = data?.user?.id;
    const userImageUrl = data?.user?.image;

    const router = useRouter();

    const { edgestore } = useEdgeStore();

    const uploadFile = async (file: File) => {
        try {
            const imageUploaded = await edgestore.publicImages.upload({
                file,
                options: {
                    replaceTargetUrl: `${userImageUrl ? userImageUrl : null}`
                },
                onProgressChange: (progress) => {
                    // Show progress bar
                    setProgress(progress);
                }
            });

            // run server action to update the database
            const newUserImage = await updateUserImage(userId, imageUploaded.url);

            // update user session
            update({
              image: newUserImage,
            });

            setProgress(0);

            router.refresh();

        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        if (selectedFile) {
            uploadFile(selectedFile);
        }
    }, [selectedFile]);

    useEffect(() => {
        console.log(progress);
    }, [progress]);

    return (
        <div className="relative cursor-pointer" onClick={openDialog}>
            <input 
                className="hidden" 
                id="file"
                type="file" 
                name="file" 
                accept="image/*"
                ref={inputFileRef}
                onChange= {handleFileDialog}
            />
            <div
                className="w-24 h-24 flex justify-center items-center bg-white dark:bg-white/75 rounded-full overflow-hidden"
                ref={imageContainerRef}
                onDragEnter={stopDragEvent}
                onDragOver={stopDragEvent}
                onDrop={handleDroppedFile}
            >
                {selectedFile 
                    ? <Image 
                        width={96}
                        height={96}
                        className=""
                        src={objectURL}
                        alt="Avatar"
                        priority
                    /> 
                    : imageUrl 
                    ? <Image 
                        width={96}
                        height={96}
                        className=""
                        src={imageUrl}
                        alt="Avatar"
                        priority
                    /> 
                    : <ProfileIcon classNames='w-16 h-16' lightThemeColor="#60a5fa" darkThemeColor="#0f1a3e" />
                }
            </div>
            {progress > 0 && progress <= 100 && (
                <div className="h-[6px] w-full mt-2 border border-blue-700 dark:border-white rounded overflow-hidden">
                    <div 
                        className="h-full bg-blue-700 dark:bg-white transition-all duration-150" 
                        style={{
                            width: `${progress}%`
                        }}
                    ></div>
                </div>
            )}
            <div className="w-7 h-7 flex justify-center items-center absolute top-0 right-0 bg-blue-700 dark:bg-sky-400 rounded-full">
              <CameraIcon classNames="w-5 h-5" />
          </div>
        </div>


        
    )
}