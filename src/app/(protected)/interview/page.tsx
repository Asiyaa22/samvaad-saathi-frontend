"use client";

import { deleteAnswer, getAnswerBlob, saveAnswerBlob } from "@/lib/idb";
import { useEffect, useMemo, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

type Question = {
  id: string;
  prompt: string;
  category?: string;
};

const InterviewPage = () => {
  const questions: Question[] = useMemo(
    () => [
      {
        id: "q1",
        prompt:
          "What are the four core principles of Object-Oriented Programming (OOP)?",
        category: "Technical question",
      },
      {
        id: "q2",
        prompt: "Explain the Virtual DOM and why React uses it.",
        category: "Technical question",
      },
      {
        id: "q3",
        prompt:
          "Describe the difference between state and props in React, with an example.",
        category: "Technical question",
      },
    ],
    []
  );

  const [showGreeting, setShowGreeting] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState<
    Record<string, string>
  >({});
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const isLast = currentIndex === questions.length - 1;

  // react-voice-visualizer controls
  const recorderControls = useVoiceVisualizer({
    onStartRecording: () => {},
    onStopRecording: () => {},
  });
  const {
    startRecording,
    togglePauseResume,
    stopRecording,
    startAudioPlayback,
    stopAudioPlayback,
    audioSrc,
    recordedBlob,
    isRecordingInProgress,
    isPausedRecording,
    isAvailableRecordedAudio,
    error,
  } = recorderControls;

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Capture library errors if any
  useEffect(() => {
    if (!error) return;
    setMicError(error.message);
  }, [error]);

  // When a recording finishes and blob/src is available, store it against the current question
  useEffect(() => {
    if (!isAvailableRecordedAudio || !audioSrc || !recordedBlob) return;
    const q = questions[currentIndex];
    if (!q) return;
    setRecordedAnswers((prev) => ({ ...prev, [q.id]: audioSrc }));
    // persist to IndexedDB
    saveAnswerBlob(q.id, recordedBlob).catch(() => {});
  }, [
    isAvailableRecordedAudio,
    audioSrc,
    recordedBlob,
    currentIndex,
    questions,
  ]);

  // On question change, try to preload any previously saved blob from IndexedDB
  useEffect(() => {
    const q = questions[currentIndex];
    if (!q) return;
    let cancelled = false;
    getAnswerBlob(q.id)
      .then((blob) => {
        if (cancelled || !blob) return;
        const url = URL.createObjectURL(blob);
        setRecordedAnswers((prev) => ({ ...prev, [q.id]: url }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [currentIndex, questions]);

  const requestMicPermission = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop tracks; we only needed the permission grant here
      stream.getTracks().forEach((t) => t.stop());
      setHasMicPermission(true);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Microphone permission denied";
      setMicError(message);
      setHasMicPermission(false);
    }
  };

  const handleAnswer = () => {
    // Start recording for this question
    startRecording();
  };

  const handleNext = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = () => {
    setShowSkipModal(false);
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const cancelSkip = () => {
    setShowSkipModal(false);
  };

  const handleSubmit = () => {
    // TODO: Replace with API submission
    // console.log({ recordedAnswers });
    alert("Submitted!\n" + JSON.stringify(recordedAnswers, null, 2));
  };

  return (
    <div className="min-h-[calc(100dvh-56px)] py-8 px-4 flex items-start">
      <div className="mx-auto w-full max-w-md">
        {!hasMicPermission ? (
          <div className="mx-auto mt-24 rounded-xl border border-black/10 shadow-sm bg-white/90 backdrop-blur px-4 py-5 text-center">
            <p className="text-sm mb-3">
              We need access to your microphone to proceed.
            </p>
            {micError ? (
              <p className="text-xs text-red-600 mb-2">{micError}</p>
            ) : null}
            <button
              type="button"
              className="px-4 h-9 rounded-md bg-black text-white text-sm"
              onClick={requestMicPermission}
            >
              Enable Microphone
            </button>
          </div>
        ) : showGreeting ? (
          <div className="mx-auto mt-24 rounded-xl border border-yellow-300 shadow-sm bg-white/80 backdrop-blur px-4 py-5 text-center">
            <p className="text-sm">Hi! Lets start your interview 👋</p>
          </div>
        ) : (
          <div className="mx-auto mt-16 rounded-xl border border-black/10 shadow-[0_6px_24px_rgba(0,0,0,0.08)] bg-white/90 backdrop-blur p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded border border-blue-300 text-blue-700 bg-blue-50">
                {questions[currentIndex].category || "Question"}
              </span>
              <span className="text-[10px] text-black/60">
                {currentIndex + 1}/{questions.length}
              </span>
            </div>

            <p className="text-sm leading-5 text-black">
              {questions[currentIndex].prompt}
            </p>

            {/* Recording / Playback UI */}
            {isRecordingInProgress || isPausedRecording ? (
              <div className="mt-4 space-y-3">
                <VoiceVisualizer
                  controls={recorderControls}
                  height={50}
                  //   backgroundColor="#0b1021"
                  mainBarColor="#1F285B"
                  secondaryBarColor="#1F285B"
                  isControlPanelShown={false}
                  isProgressIndicatorShown={false}
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 h-9 rounded-md border text-sm"
                    onClick={togglePauseResume}
                  >
                    {isPausedRecording ? "Resume" : "Reset"}
                  </button>
                  <button
                    type="button"
                    className="px-3 h-9 rounded-md bg-black text-white text-sm"
                    onClick={stopRecording}
                  >
                    Upload
                  </button>
                </div>
              </div>
            ) : recordedAnswers[questions[currentIndex].id] ? (
              <div className="mt-4">
                <div className="text-center text-xs text-black/70 border rounded px-3 py-2">
                  Your Answer has been recorded !
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 h-9 rounded-md border text-sm"
                    onClick={startAudioPlayback}
                  >
                    Play
                  </button>
                  <button
                    type="button"
                    className="px-3 h-9 rounded-md border text-sm"
                    onClick={stopAudioPlayback}
                  >
                    Stop
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="px-4 h-9 rounded-md bg-black text-white text-sm"
                    onClick={() => {
                      const qid = questions[currentIndex].id;
                      setRecordedAnswers((prev) => {
                        const copy = { ...prev };
                        delete copy[qid];
                        return copy;
                      });
                      deleteAnswer(qid).catch(() => {});
                      // allow re-recording immediately
                      setTimeout(() => startRecording(), 0);
                    }}
                  >
                    Redo
                  </button>
                  {isLast ? (
                    <button
                      type="button"
                      className="px-4 h-9 rounded-md bg-indigo-600 text-white text-sm"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="px-4 h-9 rounded-md bg-indigo-600 text-white text-sm"
                      onClick={handleNext}
                    >
                      Next ➜
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  className="px-4 h-9 rounded-md bg-black text-white text-sm"
                  onClick={handleAnswer}
                >
                  Answer
                </button>
                {isLast ? (
                  <button
                    type="button"
                    className="px-4 h-9 rounded-md bg-indigo-600 text-white text-sm"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-3 h-9 rounded-md border text-sm text-black/70"
                    onClick={handleNext}
                    title={"Skip"}
                  >
                    Skip ➜
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skip Confirmation Modal */}
      {showSkipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Skip Question?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to skip this question? You can always come
              back to it later.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                onClick={cancelSkip}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                onClick={confirmSkip}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
