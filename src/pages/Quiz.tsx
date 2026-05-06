/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Wind, Flower, Moon, Sun, Trees, Loader2 } from "lucide-react";
import { storeService } from "../services/storeService";
import { Product } from "../types";

const QUESTIONS = [
  {
    id: "mood",
    question: "How do you want to feel when you wear your scent?",
    options: [
      { id: "mysterious", label: "Mysterious & Deep", icon: <Moon /> },
      { id: "fresh", label: "Clean & Energized", icon: <Wind /> },
      { id: "romantic", label: "Soft & Romantic", icon: <Flower /> },
      { id: "grounded", label: "Grounded & Earthy", icon: <Trees /> },
    ]
  },
  {
    id: "time",
    question: "When is your most sacred time of day?",
    options: [
      { id: "dawn", label: "The Golden Dawn", icon: <Sun /> },
      { id: "noon", label: "The Radiant High Noon", icon: <Sparkles /> },
      { id: "dusk", label: "The Velvet Dusk", icon: <Moon /> },
      { id: "night", label: "The Silent Night", icon: <Moon /> },
    ]
  }
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAnswer = async (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setSaving(true);
      // Logic: If mood is mysterious, recommend Midnight Amethyst (if available)
      const products = await storeService.getProducts();
      const match = products.find(p => 
        newAnswers["mood"] === "mysterious" ? p.name.includes("Midnight") : p.name.includes("Rose")
      ) || products[0];
      
      setRecommendedProduct(match);
      
      if (match) {
        await storeService.saveQuizResult({
          recommendedProductIds: [match.id],
          answers: newAnswers
        });
      }
      
      setSaving(false);
      setShowResult(true);
    }
  };

  if (saving) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-amethyst text-ivory flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-rose animate-spin" />
        <p className="text-xl font-serif italic">Reading your spiritual essence...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-amethyst text-ivory flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose/10 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-verdigris/10 rounded-full blur-[120px] animate-pulse transition-all delay-1000" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[4px] text-rose font-bold">Question {step + 1} of {QUESTIONS.length}</p>
                <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">{QUESTIONS[step].question}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(QUESTIONS[step].id, option.id)}
                    className="group bg-white/5 border border-white/10 p-8 flex flex-col items-center space-y-4 hover:bg-white/10 hover:border-rose transition-all rounded-none"
                  >
                    <div className="text-rose group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    <span className="text-sm uppercase tracking-widest font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : recommendedProduct ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-[4px] text-gold font-bold">The Oracle has Spoken</h4>
                  <p className="text-lg text-ivory/60 italic">Your Numina is...</p>
                  <h2 className="text-6xl md:text-7xl font-serif italic text-white">{recommendedProduct.name}</h2>
                </div>

                <div className="max-w-md mx-auto aspect-square overflow-hidden bg-white/5 border border-white/10 p-4">
                   <img 
                     src={recommendedProduct.images[0] || "https://picsum.photos/seed/numina/800/800"} 
                     alt={recommendedProduct.name} 
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                     referrerPolicy="no-referrer"
                   />
                </div>

                <p className="text-lg text-ivory/80 leading-relaxed max-w-md mx-auto">
                   Based on your sacred rituals, you resonate with {recommendedProduct.subtitle.toLowerCase()}. This scent embodies the essence of your being.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link to={`/product/${recommendedProduct.id}`} className="btn-primary w-full sm:w-auto">Shop Now</Link>
                  <button onClick={() => {setStep(0); setShowResult(false);}} className="text-xs uppercase tracking-widest font-bold hover:text-rose">Start Over</button>
                </div>
            </motion.div>
          ) : (
            <div className="text-center space-y-6">
              <p className="text-xl italic">The universe is silent today. No scent revealed.</p>
              <button onClick={() => {setStep(0); setShowResult(false);}} className="btn-primary">Try Again</button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
