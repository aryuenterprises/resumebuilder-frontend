"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, AlertCircle, Volume2, FileText } from "lucide-react";

function VoiceResumeBuilder() {
  // Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Voice synthesis for prompts
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  // Refs
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if browser supports speech recognition
    //   const SpeechRecognition =
    //     window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; 

      if (!SpeechRecognition) {
        setIsSpeechSupported(false);
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript((prev) => prev + finalTranscript);
        setInterimTranscript(interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setError(
            "Microphone access denied. Please allow microphone access to use voice features.",
          );
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Speak prompt
  const speak = (text: string) => {
    if (!synth) return;
    // Cancel any ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  // Start listening
  const startListening = () => {
    setError(null);
    setTranscript("");
    setInterimTranscript("");

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        speak(
          "I'm listening. Please tell me about your professional experience, skills, education, and any other relevant information for your resume.",
        );
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Render recording step
  const renderRecordingStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <div
            className={`absolute inset-0 rounded-full ${isListening ? "bg-red-500/20 animate-ping" : "bg-gray-200"}`}
          />
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={!isSpeechSupported}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-linear-to-r from-[#5E000B] to-[#C40116] scale-110 shadow-xl"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 text-white animate-pulse" />
            ) : (
              <Mic className="w-10 h-10 text-gray-600" />
            )}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isListening ? "Listening..." : "Ready to Create Your Resume"}
        </h2>

        <p className="text-gray-600 max-w-lg mx-auto">
          {isListening
            ? "Speak clearly about your experience, skills, and education. I'll transcribe it in real-time."
            : "Click the microphone button and start telling me about your professional background."}
        </p>
      </div>

      {/* Live transcript display */}
      {(transcript || interimTranscript) && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#C40116]" />
              <h3 className="font-semibold text-gray-900">Live Transcript</h3>
            </div>

            <div className="min-h-[100px] max-h-[200px] overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap">
                {transcript}
                <span className="text-gray-400">{interimTranscript}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Voice prompts */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
        <button
          onClick={() =>
            speak(
              "Please tell me about yourself, your work experience, skills, education, and any certifications you have.",
            )
          }
          className="flex items-center gap-2 hover:text-[#C40116] transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>Hear prompt</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Voice-Powered Resume Builder
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simply speak about your self, experience, skills, education and
              let our AI create a professional resume for you
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-lg mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Speech not supported warning */}
          {!isSpeechSupported && (
            <div className="max-w-lg mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-700">
                Your browser doesn't support speech recognition. Please use
                Chrome, Edge, or Safari for voice features.
              </p>
            </div>
          )}

          {renderRecordingStep()}
        </div>
      </div>
    </div>
  );
}

export default VoiceResumeBuilder;
