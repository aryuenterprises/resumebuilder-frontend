// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mic, AlertCircle, Volume2, FileText } from "lucide-react";

// function VoiceResumeBuilder() {
//   // Speech recognition state
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [interimTranscript, setInterimTranscript] = useState("");
//   const [isSpeechSupported, setIsSpeechSupported] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Voice synthesis for prompts
//   const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

//   // Refs
//   const recognitionRef = useRef<any>(null);

//   // Initialize speech recognition
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Check if browser supports speech recognition
//     //   const SpeechRecognition =
//     //     window.SpeechRecognition || window.webkitSpeechRecognition;
// const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; 

//       if (!SpeechRecognition) {
//         setIsSpeechSupported(false);
//         return;
//       }

//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = "en-US";

//       recognitionRef.current.onresult = (event: any) => {
//         let finalTranscript = "";
//         let interimTranscript = "";

//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             finalTranscript += transcript + " ";
//           } else {
//             interimTranscript += transcript;
//           }
//         }

//         setTranscript((prev) => prev + finalTranscript);
//         setInterimTranscript(interimTranscript);
//       };

//       recognitionRef.current.onerror = (event: any) => {
//         console.error("Speech recognition error:", event.error);
//         setIsListening(false);
//         if (event.error === "not-allowed") {
//           setError(
//             "Microphone access denied. Please allow microphone access to use voice features.",
//           );
//         }
//       };

//       recognitionRef.current.onend = () => {
//         setIsListening(false);
//       };
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Speak prompt
//   const speak = (text: string) => {
//     if (!synth) return;
//     // Cancel any ongoing speech
//     synth.cancel();
    
//     const utterance = new SpeechSynthesisUtterance(text);
//     synth.speak(utterance);
//   };

//   // Start listening
//   const startListening = () => {
//     setError(null);
//     setTranscript("");
//     setInterimTranscript("");

//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         speak(
//           "I'm listening. Please tell me about your professional experience, skills, education, and any other relevant information for your resume.",
//         );
//       } catch (error) {
//         console.error("Failed to start recognition:", error);
//       }
//     }
//   };

//   // Stop listening
//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   // Render recording step
//   const renderRecordingStep = () => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="text-center"
//     >
//       <div className="mb-8">
//         <div className="w-24 h-24 mx-auto mb-4 relative">
//           <div
//             className={`absolute inset-0 rounded-full ${isListening ? "bg-red-500/20 animate-ping" : "bg-gray-200"}`}
//           />
//           <button
//             onClick={isListening ? stopListening : startListening}
//             disabled={!isSpeechSupported}
//             className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
//               isListening
//                 ? "bg-linear-to-r from-[#5E000B] to-[#C40116] scale-110 shadow-xl"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {isListening ? (
//               <Mic className="w-10 h-10 text-white animate-pulse" />
//             ) : (
//               <Mic className="w-10 h-10 text-gray-600" />
//             )}
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           {isListening ? "Listening..." : "Ready to Create Your Resume"}
//         </h2>

//         <p className="text-gray-600 max-w-lg mx-auto">
//           {isListening
//             ? "Speak clearly about your experience, skills, and education. I'll transcribe it in real-time."
//             : "Click the microphone button and start telling me about your professional background."}
//         </p>
//       </div>

//       {/* Live transcript display */}
//       {(transcript || interimTranscript) && (
//         <div className="max-w-2xl mx-auto mb-6">
//           <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
//             <div className="flex items-center gap-2 mb-3">
//               <FileText className="w-5 h-5 text-[#C40116]" />
//               <h3 className="font-semibold text-gray-900">Live Transcript</h3>
//             </div>

//             <div className="min-h-[100px] max-h-[200px] overflow-y-auto">
//               <p className="text-gray-700 whitespace-pre-wrap">
//                 {transcript}
//                 <span className="text-gray-400">{interimTranscript}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Voice prompts */}
//       <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
//         <button
//           onClick={() =>
//             speak(
//               "Please tell me about yourself, your work experience, skills, education, and any certifications you have.",
//             )
//           }
//           className="flex items-center gap-2 hover:text-[#C40116] transition-colors"
//         >
//           <Volume2 className="w-4 h-4" />
//           <span>Hear prompt</span>
//         </button>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Main content */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//               Voice-Powered Resume Builder
//             </h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Simply speak about your self, experience, skills, education and
//               let our AI create a professional resume for you
//             </p>
//           </div>

//           <AnimatePresence>
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="max-w-lg mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
//               >
//                 <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
//                 <p className="text-sm text-red-600">{error}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Speech not supported warning */}
//           {!isSpeechSupported && (
//             <div className="max-w-lg mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
//               <p className="text-sm text-yellow-700">
//                 Your browser doesn't support speech recognition. Please use
//                 Chrome, Edge, or Safari for voice features.
//               </p>
//             </div>
//           )}

//           {renderRecordingStep()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VoiceResumeBuilder;





















// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  AlertCircle, 
  Volume2, 
  Download, 
  Trash2,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Shield,
  Edit3,
  FileText
} from "lucide-react";

function VoiceResumeBuilder() {
  // Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Editor state
  const [resumeContent, setResumeContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // Voice synthesis
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const recognitionRef = useRef<any>(null);
  const isStartingRef = useRef(false);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
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
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText + " ";
          } else {
            interimTranscript += transcriptText;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
          // Only add user's speech to resume content, never prompts
          setResumeContent((prev) => prev + finalTranscript);
        }
        setInterimTranscript(interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setError("Microphone access denied. Please allow microphone access to use voice features.");
        } else if (event.error === "no-speech") {
          setError("No speech detected. Please try again.");
          setTimeout(() => setError(null), 3000);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        isStartingRef.current = false;
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synth) {
        synth.cancel();
      }
    };
  }, []);

  // Speak prompt - ONLY audio, NEVER adds to transcript
  const speak = (text: string) => {
    if (!synth) return;
    // Cancel any ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => {
      // Do nothing - just ensure no text is added
      console.log("Prompt finished speaking");
    };
    synth.speak(utterance);
  };

  // Start listening - NO text is added automatically
  const startListening = () => {
    if (isStartingRef.current) return;
    
    setError(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        isStartingRef.current = true;
        // This is PURELY audio - it will NEVER add any text to transcript or resume
        speak("I'm listening. Please tell me about your professional experience, skills, education, and any other relevant information for your resume.");
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
      isStartingRef.current = false;
      // This is ONLY audio feedback - no text added
      speak("Recording stopped. You can now edit your text.");
    }
  };

  // Clear all user content
  const clearAll = () => {
    if (confirm("Are you sure you want to clear all your spoken content?")) {
      setTranscript("");
      setInterimTranscript("");
      setResumeContent("");
      setError(null);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (resumeContent) {
      await navigator.clipboard.writeText(resumeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Export resume
  const exportResume = () => {
    if (!resumeContent.trim()) {
      setError("No content to export. Please speak or type some content first.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    speak("Your resume has been exported successfully!");
  };

  // Start editing
  const startEditing = () => {
    setEditValue(resumeContent);
    setIsEditing(true);
  };

  // Save edited content
  const saveEdit = () => {
    setResumeContent(editValue);
    setTranscript(editValue);
    setIsEditing(false);
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue("");
  };

  // Format text
  const formatText = () => {
    let formatted = resumeContent
      .replace(/\s+/g, ' ')
      .replace(/\.\s+/g, '.\n\n')
      .replace(/\bi\b/g, 'I')
      .replace(/\bi'm\b/g, "I'm")
      .replace(/\bi'll\b/g, "I'll")
      .replace(/\bi've\b/g, "I've")
      .trim();
    
    setResumeContent(formatted);
    setTranscript(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VoxResume
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportResume}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Resume
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Voice-Powered Resume Builder</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Speak.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Edit. Perfect.
            </span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Simply speak about your experience, and watch your words appear. Edit, format, and export your professional resume instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Recording Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className={`absolute inset-0 rounded-full ${isListening ? "animate-ping bg-indigo-400" : ""}`} />
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSpeechSupported}
                  className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 scale-110 shadow-2xl"
                      : "bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300"
                  }`}
                >
                  {isListening ? (
                    <Mic className="w-12 h-12 text-white animate-pulse" />
                  ) : (
                    <Mic className="w-12 h-12 text-slate-600" />
                  )}
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-4">
                {isListening ? "Listening..." : "Ready to Record"}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {isListening ? "Speak clearly about your experience" : "Click the mic and start speaking"}
              </p>
            </div>

            {/* Voice Controls */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => speak("Please tell me about your work experience, skills, education, and any achievements. Start with your most recent role.")}
                className="px-4 py-2 text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm border border-slate-200 rounded-lg hover:border-indigo-300"
              >
                <Volume2 className="w-4 h-4" />
                Hear Prompt (Audio Only)
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 text-slate-600 hover:text-red-600 transition-colors flex items-center gap-2 text-sm border border-slate-200 rounded-lg hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {/* Live Transcript - Shows ONLY user's speech */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-900">Live Transcript</h3>
                  {isListening && <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />}
                </div>
                {(transcript || interimTranscript) && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(transcript + interimTranscript);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-slate-500 hover:text-indigo-600 transition-colors"
                    title="Copy transcript"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="min-h-[200px] max-h-[300px] overflow-y-auto">
                <div className="space-y-2">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {transcript}
                    <span className="text-indigo-400 italic">{interimTranscript}</span>
                    {!transcript && !interimTranscript && (
                      <span className="text-slate-400">
                        {isListening ? "👂 Listening... start speaking..." : "🎤 Click the microphone button and start speaking. Your words will appear here."}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Voice prompts are audio-only and will never appear in your transcript or resume.
              </p>
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Browser Support */}
            {!isSpeechSupported && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-700">
                  Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari for voice features.
                </p>
              </div>
            )}
          </motion.div>

          {/* Editable Resume Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col"
          >
            <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-semibold text-slate-900">Your Resume Editor</h2>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={formatText}
                        disabled={!resumeContent}
                        className="px-3 py-1 text-sm text-slate-600 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Format
                      </button>
                      <button
                        onClick={startEditing}
                        disabled={!resumeContent && !isEditing}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Edit Text
                      </button>
                      <button
                        onClick={copyToClipboard}
                        disabled={!resumeContent}
                        className="px-3 py-1 text-slate-600 hover:text-indigo-600 transition-colors text-sm disabled:opacity-50"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 flex-1">
              {isEditing ? (
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full h-[500px] p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-none"
                  placeholder="Type or edit your resume content here..."
                  autoFocus
                />
              ) : (
                <div className="min-h-[500px] max-h-[500px] overflow-y-auto">
                  {resumeContent ? (
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                        {resumeContent.split('\n').map((paragraph, idx) => (
                          paragraph.trim() && <p key={idx} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Mic className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-700 mb-2">No content yet</h3>
                      <p className="text-slate-500 text-sm max-w-sm">
                        Click the microphone button and start speaking.<br />
                        Your words will appear here automatically.
                      </p>
                      <p className="text-slate-400 text-xs mt-3">
                        Voice prompts are audio-only and won't be added to your resume.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tips Footer */}
            <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <span>Your data stays private - never stored on servers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💡 Click "Edit Text" to manually edit your resume</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center gap-4"
        >
          <button
            onClick={() => {
              if (resumeContent) {
                speak(resumeContent.substring(0, 200));
              } else {
                speak("No content to read. Please add some content by speaking first.");
              }
            }}
            disabled={!resumeContent}
            className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Volume2 className="w-4 h-4" />
            Read My Resume
          </button>
          <button
            onClick={exportResume}
            disabled={!resumeContent}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default VoiceResumeBuilder;