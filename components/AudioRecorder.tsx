import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { transcribeAudio } from '../services/openaiService';

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  isTranscribing: boolean;
  setTranscribing: (state: boolean) => void;
  disabled?: boolean;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onTranscriptionComplete, 
  isTranscribing, 
  setTranscribing,
  disabled 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const startRecording = async () => {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        handleTranscription(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setPermissionError("无法访问麦克风");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscription = async (blob: Blob) => {
    setTranscribing(true);
    try {
      const text = await transcribeAudio(blob);
      onTranscriptionComplete(text);
    } catch (error) {
      console.error(error);
      setPermissionError("转录失败");
    } finally {
      setTranscribing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      {isRecording ? (
        <button
          type="button"
          onClick={stopRecording}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors text-sm font-medium animate-pulse"
        >
          <Square size={16} />
          停止录音
        </button>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          disabled={disabled || isTranscribing}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            disabled || isTranscribing
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
          }`}
        >
          {isTranscribing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Mic size={16} />
          )}
          {isTranscribing ? '正在转录...' : '语音输入'}
        </button>
      )}
      
      {permissionError && (
        <span className="text-xs text-red-500">{permissionError}</span>
      )}
    </div>
  );
};
