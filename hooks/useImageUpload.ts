import { 
    ChangeEventHandler, 
    DragEventHandler,
    MouseEventHandler,
    useRef,
    useState  
} from "react"

export const useImageUpload = () => {
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const [objectURL, setObjectURL] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const resetSelection = () => {
        setSelectedFile(null);
        if (objectURL) {
            window.URL.revokeObjectURL(objectURL);
            setObjectURL("");
        }
    };

    const handleFiles = (files: FileList | null) => {
        resetSelection();
        if (!files || files?.length === 0) return;
        const file = files[0];
        if (!file.type.includes("image/")) {
            if (inputFileRef.current) {
                inputFileRef.current.value = "";
            }
            return;
        }
        setSelectedFile(file);
        const imageContainer = imageContainerRef.current;
        if (!imageContainer) return;
        const objectURL = window.URL.createObjectURL(file);
        setObjectURL(objectURL);
    };

    const openDialog: MouseEventHandler<HTMLDivElement> = () => {
        const inputFile = inputFileRef.current;
        if (!inputFile) return;
        inputFile.click();
    };

    const stopDragEvent: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleFileDialog: ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.currentTarget.files;
        handleFiles(files);
    };

    const handleDroppedFile: DragEventHandler<HTMLDivElement> = (event) => {
        stopDragEvent(event);
        const dataTransfer = event.dataTransfer;
        const files = dataTransfer.files;
        if (inputFileRef.current) {
          inputFileRef.current.files = files;
        }
        handleFiles(files);
    };

    return {
        handleDroppedFile,
        handleFileDialog,
        imageContainerRef,
        inputFileRef,
        openDialog,
        selectedFile,
        objectURL,
        stopDragEvent
    }
}