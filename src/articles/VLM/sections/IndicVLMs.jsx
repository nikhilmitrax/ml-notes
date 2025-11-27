import React from 'react';

export default function IndicVLMs() {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Indic VLMs for Generation
            </h3>

            <div className="space-y-8">
                {/* Dhenu */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://www.youtube.com/watch?v=vEBR1eS4axE" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Dhenu
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="https://kissan.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">KissanAI</a>'s Dhenu is a series of fine-tuned agricultural VLMs for pest and disease detection and conversation over cure, symptoms, severity and prevention. The Dhenu-vision-lora-0.1 is fine-tuned Qwen-VL-chat, for 3 major crops and 10 diseases, giving 2x performance boost over the base.
                        </li>
                        <li>
                            Tailored specifically for Indian agricultural practices and tackling farming challenges, this bilingual model is trained on 300k instruction sets in English and Hindi, to support English, Hindi, and Hinglish queries from farmers, a notable feature catering directly to farmers' linguistic needs.
                        </li>
                        <li>
                            Trained on synthetic data generated for around 9000 disease images for three major crops, Maize, Rice, and Wheat, for following common disease identifiable from leaves.
                        </li>
                        <li>
                            <a href="https://huggingface.co/KissanAI/Dhenu-vision-lora-0.1" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Hugging Face</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
