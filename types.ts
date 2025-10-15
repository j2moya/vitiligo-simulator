import { BodyPart } from './constants';

export interface UploadedImage {
    url: string;
    base64: string;
    mimeType: string;
}

export interface SimulationParameters {
    bodyPart: BodyPart;
}

export interface GeneratedImage {
    month: number;
    url: string;
    base64: string;
    mimeType: string;
}