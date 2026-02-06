import React, { useState } from 'react';
import { Cat, Sparkles, AlertCircle, Gavel as GavelIcon } from 'lucide-react';
import { AudioRecorder } from './components/AudioRecorder';
import { VerdictCard } from './components/VerdictCard';
import { judgeConflict } from './services/openaiService';
import { CaseData, LoadingState, Verdict } from './types';
import judgeImage from './OIP-C.webp';

export default function App() {
  const [formData, setFormData] = useState<CaseData>({
    nameA: '',
    nameB: '',
    context: '',
    storyA: '',
    storyB: '',
  });

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof CaseData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameA || !formData.nameB || !formData.context || !formData.storyA || !formData.storyB) {
      setError("请在召唤法官之前诉说你们的委屈！");
      return;
    }
    setError(null);
    setLoadingState(LoadingState.JUDGING);

    try {
      const verdictResult = await judgeConflict(formData);
      setVerdict(verdictResult);
    } catch (err: any) {
      setError(err.message || "审判过程中发生了错误。");
    } finally {
      setLoadingState(LoadingState.IDLE);
    }
  };

  const reset = () => {
    setVerdict(null);
    setFormData({
      nameA: '',
      nameB: '',
      context: '',
      storyA: '',
      storyB: '',
    });
    setError(null);
  };

  if (verdict) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
           <header className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-800 flex items-center justify-center gap-3 mb-2">
              <span className="text-purple-600">猫猫</span> 法官 <Cat className="text-purple-600" />
            </h1>
          </header>
          <VerdictCard
            verdict={verdict}
            nameA={formData.nameA}
            nameB={formData.nameB}
            judgeImage={judgeImage}
            onReset={reset}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 space-y-3">
          <div className="inline-block p-3 bg-white rounded-full shadow-md mb-2">
             <Cat size={48} className="text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">
            猫猫 <span className="text-purple-600">法官</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            情感调解庭 <br/>
            <span className="text-sm opacity-75">告诉猫猫法官你们的委屈，让公正可爱的哈基米来断案。</span>
          </p>
        </header>

        {loadingState === LoadingState.JUDGING ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
             <div className="relative mb-8">
                <GavelIcon size={80} className="text-purple-600 animate-gavel" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">法庭审理中...</h2>
             <p className="text-gray-500">猫猫法官正在查阅卷宗并生成判决书</p>
             <div className="mt-8 flex gap-2">
               <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
               <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
             </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
            {/* Context Section */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-purple-50">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={20} />
                基本情况
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">主角 A 名字</label>
                  <input
                    type="text"
                    value={formData.nameA}
                    onChange={(e) => handleInputChange('nameA', e.target.value)}
                    placeholder="例如：木可"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">主角 B 名字</label>
                  <input
                    type="text"
                    value={formData.nameB}
                    onChange={(e) => handleInputChange('nameB', e.target.value)}
                    placeholder="例如：木尚"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">为什么吵架？</label>
                <textarea
                  value={formData.context}
                  onChange={(e) => handleInputChange('context', e.target.value)}
                  placeholder="简述争吵的起因..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                />
              </div>
            </section>

            {/* Stories Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Person A */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-t-pink-400">
                 <h3 className="text-lg font-bold text-gray-800 mb-2 flex justify-between items-center">
                   <span>{formData.nameA || "主角 A"} 的说法</span>
                   <span className="text-xs font-normal bg-pink-100 text-pink-600 px-2 py-1 rounded-full">原告</span>
                 </h3>
                 <textarea
                    value={formData.storyA}
                    onChange={(e) => handleInputChange('storyA', e.target.value)}
                    placeholder={`${formData.nameA || "主角 A"} 觉得哪里受委屈了？`}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none mb-2"
                  />
                  <AudioRecorder 
                    isTranscribing={loadingState === LoadingState.TRANSCRIBING_A}
                    setTranscribing={(state) => setLoadingState(state ? LoadingState.TRANSCRIBING_A : LoadingState.IDLE)}
                    onTranscriptionComplete={(text) => handleInputChange('storyA', formData.storyA + (formData.storyA ? ' ' : '') + text)}
                  />
              </section>

              {/* Person B */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-t-blue-400">
                 <h3 className="text-lg font-bold text-gray-800 mb-2 flex justify-between items-center">
                   <span>{formData.nameB || "主角 B"} 的说法</span>
                   <span className="text-xs font-normal bg-blue-100 text-blue-600 px-2 py-1 rounded-full">被告</span>
                 </h3>
                 <textarea
                    value={formData.storyB}
                    onChange={(e) => handleInputChange('storyB', e.target.value)}
                    placeholder={`${formData.nameB || "主角 B"} 觉得哪里受委屈了？`}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none mb-2"
                  />
                   <AudioRecorder 
                    isTranscribing={loadingState === LoadingState.TRANSCRIBING_B}
                    setTranscribing={(state) => setLoadingState(state ? LoadingState.TRANSCRIBING_B : LoadingState.IDLE)}
                    onTranscriptionComplete={(text) => handleInputChange('storyB', formData.storyB + (formData.storyB ? ' ' : '') + text)}
                  />
              </section>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingState !== LoadingState.IDLE}
              className={`w-full py-5 rounded-2xl text-xl font-bold shadow-lg shadow-purple-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3
                ${loadingState !== LoadingState.IDLE 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-300'
                }`}
            >
              <GavelIconIcon />
              召唤猫猫法官
            </button>
          </form>
        )}
        
        <footer className="text-center mt-12 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 猫猫法官 - 愿爱无争吵。</p>
        </footer>
      </div>
    </div>
  );
}

function GavelIconIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14.5 12.5-8 8a2.119 2.119 0 0 1-3-3l8-8" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
      <path d="m21 11-8-8" />
    </svg>
  )
}