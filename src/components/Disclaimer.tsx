import React from 'react';

export const Disclaimer: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto mt-8 text-center text-xs text-gray-500 bg-gray-100 p-4 rounded-lg">
            <p className="font-bold mb-1">Ethical & Medical Disclaimer</p>
            <p>
                This tool provides artistic and predictive simulations based on a generative AI model. 
                The generated images are not real photographs and do not represent a guaranteed clinical outcome. 
                This simulation is for informational and illustrative purposes only and should not be considered medical advice. 
                Always consult with a qualified healthcare professional for any medical concerns or treatment decisions.
            </p>
        </div>
    );
};
