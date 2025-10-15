import React, { useState, useCallback, useRef } from 'react';
import type { UploadedImage } from '../types';
import { fileToBase64 } from '../utils/fileUtils';

interface ImageUploaderProps {
    onImageUpload: (image: UploadedImage | null) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                const imageUrl = URL.createObjectURL(file);
                setPreviewUrl(imageUrl);
                onImageUpload({ url: imageUrl, base64, mimeType: file.type });
            } catch (error) {
                console.error("Error processing file:", error);
                setPreviewUrl(null);
                onImageUpload(null);
            }
        }
    }, [onImageUpload]);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
                fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">1. Upload Image</h2>
            <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-sky-500 transition-colors duration-300 bg-gray-50"
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                />
                {previewUrl ? (
                    <img src={previewUrl} alt="Uploaded preview" className="max-h-48 w-auto mx-auto rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <UploadIcon />
                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold text-sky-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
                    </div>
                )}
            </div>
        </div>
    );
};
