import React from 'react';
import { Verdict } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Cat, Gavel, HeartHandshake, Sparkles, RefreshCcw } from 'lucide-react';

interface VerdictCardProps {
  verdict: Verdict;
  nameA: string;
  nameB: string;
  judgeImage?: string;
  onReset: () => void;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ verdict, nameA, nameB, judgeImage, onReset }) => {
  const data = [
    { name: nameA, value: verdict.blameA },
    { name: nameB, value: verdict.blameB },
  ];

  const COLORS = ['#F472B6', '#60A5FA']; // Pink and Blue

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 animate-fade-in">
      {/* Header / Judge Image */}
      <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        {judgeImage ? (
          <img src={judgeImage} alt="Cat Judge" className="w-full h-full object-cover" />
        ) : (
           <div className="flex flex-col items-center text-gray-400">
             <Cat size={64} className="mb-2" />
             <p>猫猫法官画像生成中...</p>
           </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h2 className="text-3xl font-black text-white flex items-center gap-2">
              <Gavel className="text-yellow-400" />
              判决已下达
            </h2>
            <p className="text-white/90 font-medium">猫猫法官已经做出了公正的裁决。</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* Responsibility Chart */}
        <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span> 责任分布图
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 text-center mt-2">
             <div>
               <p className="text-sm text-gray-500">{nameA} 的责任</p>
               <p className="text-2xl font-bold text-pink-500">{verdict.blameA}%</p>
             </div>
             <div>
               <p className="text-sm text-gray-500">{nameB} 的责任</p>
               <p className="text-2xl font-bold text-blue-500">{verdict.blameB}%</p>
             </div>
          </div>
        </section>

        {/* Analysis */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Cat className="text-purple-600" />
            法官分析
          </h3>
          <div 
            className="prose prose-purple max-w-none text-gray-700 bg-purple-50/50 p-6 rounded-2xl border border-purple-100"
            dangerouslySetInnerHTML={{ __html: verdict.analysis }}
          />
        </section>

        {/* Advice */}
        <section className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <HeartHandshake className="text-green-600" />
            和解建议
          </h3>
           <div 
            className="prose prose-green max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: verdict.advice }}
          />
        </section>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <RefreshCcw size={18} />
            审理下一个案件
          </button>
        </div>

      </div>
    </div>
  );
};