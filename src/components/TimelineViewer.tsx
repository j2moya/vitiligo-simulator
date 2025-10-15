import React from 'react';
import type { GeneratedImage } from '../types';

interface TimelineViewerProps {
    images: GeneratedImage[];
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ImageCard: React.FC<{ image: GeneratedImage, title: string }> = ({ image, title }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image.url;
        link.download = `vitiligo_evolution_${image.month}_months.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-black rounded-lg mb-2 overflow-hidden flex items-center justify-center border border-gray-200">
                <img src={image.url} alt={`Evolution at ${image.month} months`} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-md font-bold text-sky-800">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">{image.month} Months</p>
            <button
                onClick={handleDownload}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-100 rounded-md hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
                <DownloadIcon />
                Download
            </button>
        </div>
    );
};


export const TimelineViewer: React.FC<TimelineViewerProps> = ({ images }) => {
    if (images.length < 2) {
        // Fallback for initial state or error
        return null;
    }

    const originalImage = images[0];
    const finalImage = images[1];

    return (
        <div className="w-full flex flex-col items-center">
             <h2 className="text-xl font-semibold text-gray-700 mb-4">Before & After Simulation</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageCard image={originalImage} title="Original" />
                <ImageCard image={finalImage} title="After 4.5 Years" />
            </div>
        </div>
    );
};