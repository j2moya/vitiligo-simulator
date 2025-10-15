import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ParameterSelectors } from './components/ParameterSelectors';
import { TimelineViewer } from './components/TimelineViewer';
import { Disclaimer } from './components/Disclaimer';
import { Spinner } from './components/Spinner';
import { generateImageEvolution } from './services/geminiService';
import type { UploadedImage, SimulationParameters, GeneratedImage } from './types';
import { TIME_POINTS, BodyPart } from './constants';

const App: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [simulationParams, setSimulationParams] = useState<SimulationParameters>({
        bodyPart: BodyPart.HANDS,
    });
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const generatePrompt = (month: number, params: SimulationParameters): string => {
        return `
        **URGENT & CRITICAL TASK: Total Skin Healing Simulation**

        **Primary Directive (Non-Negotiable):**
        Your ONLY goal is to show this person after a 100% successful vitiligo treatment. The final image MUST show perfectly healthy skin.

        **Execution Rules:**
        1.  **COMPLETE SKIN CORRECTION:** You absolutely MUST remove all signs of vitiligo. The skin on the ${params.bodyPart} must be a single, natural, and homogeneous color. It must be perfectly uniform, smooth, and even-toned.
        2.  **ZERO IMPERFECTIONS:** The final image must contain:
            - NO white patches.
            - NO vitiligo spots.
            - NO skin discoloration of any kind.
            - NO blemishes or residual marks.
            The skin must be absolutely clear.
        3.  **NEW PHOTOGRAPH SIMULATION:** This must look like a brand new photo taken 4.5 years later. Subtly change the person's clothing, hairstyle, or the background to create a realistic time jump. DO NOT just edit the original photo.
        4.  **MAINTAIN IDENTITY:** The person must be recognizable. Do not change their core facial features or identity.

        **Final Check:** Before finishing, verify that the skin is 100% clear of any vitiligo. If any spots remain, you have failed the task.
        `;
    };

    const handleGenerate = useCallback(async () => {
        if (!uploadedImage) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);
        
        const originalImage: GeneratedImage = { 
            month: 0, 
            url: uploadedImage.url, 
            base64: uploadedImage.base64, 
            mimeType: uploadedImage.mimeType 
        };

        try {
            const finalMonth = TIME_POINTS[TIME_POINTS.length - 1]; // 54 months
            setLoadingMessage(`Generating ${finalMonth} month simulation...`);
            
            const prompt = generatePrompt(finalMonth, simulationParams);
            const newImageBase64 = await generateImageEvolution(originalImage.base64, originalImage.mimeType, prompt);
            const newMimeType = 'image/png'; // Gemini image generation often returns PNG
            const newImageUrl = `data:${newMimeType};base64,${newImageBase64}`;
            
            const finalImage: GeneratedImage = {
                month: finalMonth,
                url: newImageUrl,
                base64: newImageBase64,
                mimeType: newMimeType,
            };
            
            setGeneratedImages([originalImage, finalImage]);

        } catch (err) {
            console.error(err);
            setError("An error occurred while generating the simulation. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [uploadedImage, simulationParams]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div className="space-y-6">
                            <ImageUploader onImageUpload={setUploadedImage} />
                            <ParameterSelectors
                                params={simulationParams}
                                setParams={setSimulationParams}
                                onGenerate={handleGenerate}
                                isGenerating={isLoading}
                                canGenerate={!!uploadedImage}
                            />
                        </div>
                        <div className="relative min-h-[400px] bg-gray-100 rounded-xl p-4 flex items-center justify-center">
                            {isLoading ? (
                                <div className="text-center">
                                    <Spinner />
                                    <p className="mt-4 text-lg font-semibold text-sky-700">{loadingMessage}</p>
                                    <p className="text-sm text-gray-500">This may take a moment.</p>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-600">
                                    <p className="font-bold">Error</p>
                                    <p>{error}</p>
                                </div>
                            ) : generatedImages.length > 0 ? (
                                <TimelineViewer images={generatedImages} />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <p className="text-lg font-medium">Your simulation will appear here.</p>
                                    <p className="mt-2">Upload an image and set your parameters to begin.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Disclaimer />
            </main>
        </div>
    );
};

export default App;