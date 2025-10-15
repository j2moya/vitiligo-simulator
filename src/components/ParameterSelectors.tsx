import React from 'react';
import type { SimulationParameters } from '../types';
import { BodyPart } from '../constants';

interface ParameterSelectorsProps {
    params: SimulationParameters;
    setParams: React.Dispatch<React.SetStateAction<SimulationParameters>>;
    onGenerate: () => void;
    isGenerating: boolean;
    canGenerate: boolean;
}

export const ParameterSelectors: React.FC<ParameterSelectorsProps> = ({ params, setParams, onGenerate, isGenerating, canGenerate }) => {
    
    const handleParamChange = <K extends keyof SimulationParameters>(param: K, value: SimulationParameters[K]) => {
        setParams(prev => ({ ...prev, [param]: value }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">2. Set Parameter</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="bodyPart" className="block text-sm font-medium text-gray-700 mb-1">
                            Body Part
                        </label>
                        <select
                            id="bodyPart"
                            value={params.bodyPart}
                            onChange={(e) => handleParamChange('bodyPart', e.target.value as BodyPart)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                        >
                            {Object.values(BodyPart).map(part => (
                                <option key={part} value={part}>{part.charAt(0).toUpperCase() + part.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">3. Generate Evolution</h2>
                 <button
                    onClick={onGenerate}
                    disabled={isGenerating || !canGenerate}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {isGenerating ? 'Generating...' : 'See 4.5 Year Evolution'}
                </button>
            </div>
        </div>
    );
};