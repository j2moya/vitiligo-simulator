
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-5 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-sky-800">Vitiligo AI Evolution Simulator</h1>
                <p className="mt-2 text-md md:text-lg text-gray-600">Visualize potential repigmentation over time</p>
            </div>
        </header>
    );
};
