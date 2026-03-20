import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { currentWeek, Note, Goal } from '../data/mockData';
import { generateWeeklyReviewInsights } from '../services/aiService';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, ArrowRight, Loader2, Sparkles, BrainCircuit, Target, BookOpen } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

type Step = 'welcome' | 'review' | 'insights' | 'plan' | 'done';

export function WeeklyReview() {
  const [step, setStep] = useState<Step>('welcome');
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newGoals, setNewGoals] = useState<string[]>(['']);

  const handleGenerateInsights = async () => {
    setStep('insights');
    setIsGenerating(true);
    const insights = await generateWeeklyReviewInsights();
    setAiInsights(insights);
    setIsGenerating(false);
  };

  const handleAddGoal = () => {
    setNewGoals([...newGoals, '']);
  };

  const handleGoalChange = (index: number, value: string) => {
    const updated = [...newGoals];
    updated[index] = value;
    setNewGoals(updated);
  };

  const renderWelcome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-[60vh] text-center max-w-lg mx-auto"
    >
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
        <BrainCircuit className="w-8 h-8 text-stone-700" />
      </div>
      <h1 className="text-4xl font-serif font-medium tracking-tight text-stone-900 mb-4">
        Sunday Review
      </h1>
      <p className="text-lg text-stone-500 mb-8">
        It's time to close out the week, reflect on your progress, and set intentions for the days ahead.
      </p>
      <Button size="lg" onClick={() => setStep('review')} className="w-full sm:w-auto">
        Start Review <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );

  const renderReview = () => {
    const wins = currentWeek.notes.filter(n => n.type === 'win');
    const concerns = currentWeek.notes.filter(n => n.type === 'concern');
    const notes = currentWeek.notes.filter(n => n.type === 'note');

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-3xl mx-auto py-12"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-medium text-stone-900">The Week's Dump</h2>
          <p className="text-stone-500 mt-2">Here's what you captured this week.</p>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-medium flex items-center mb-4 text-emerald-700">
              <Sparkles className="w-5 h-5 mr-2" /> Wins
            </h3>
            <div className="grid gap-3">
              {wins.map(win => (
                <Card key={win.id} className="bg-emerald-50/50 border-emerald-100">
                  <CardContent className="p-4 flex justify-between items-start">
                    <p className="text-stone-800">{win.content}</p>
                    <span className="text-xs text-emerald-600/70 font-mono">{format(new Date(win.date), 'EEE')}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium flex items-center mb-4 text-rose-700">
              <Target className="w-5 h-5 mr-2" /> Concerns & Blockers
            </h3>
            <div className="grid gap-3">
              {concerns.map(concern => (
                <Card key={concern.id} className="bg-rose-50/50 border-rose-100">
                  <CardContent className="p-4 flex justify-between items-start">
                    <p className="text-stone-800">{concern.content}</p>
                    <span className="text-xs text-rose-600/70 font-mono">{format(new Date(concern.date), 'EEE')}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium flex items-center mb-4 text-blue-700">
              <BookOpen className="w-5 h-5 mr-2" /> Notes
            </h3>
            <div className="grid gap-3">
              {notes.map(note => (
                <Card key={note.id} className="bg-blue-50/50 border-blue-100">
                  <CardContent className="p-4 flex justify-between items-start">
                    <p className="text-stone-800">{note.content}</p>
                    <span className="text-xs text-blue-600/70 font-mono">{format(new Date(note.date), 'EEE')}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-4 text-stone-900">Goal Progress</h3>
            <div className="space-y-2">
              {currentWeek.goals.map(goal => (
                <div key={goal.id} className="flex items-center p-3 rounded-xl border border-stone-200 bg-white">
                  {goal.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300 mr-3" />
                  )}
                  <span className={cn("text-stone-800", goal.status === 'completed' && "line-through text-stone-400")}>
                    {goal.content}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-end">
          <Button size="lg" onClick={handleGenerateInsights}>
            Get Coach Insights <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderInsights = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto py-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-medium text-stone-900 flex items-center">
          <BrainCircuit className="w-8 h-8 mr-3 text-indigo-600" />
          Coach Insights
        </h2>
        <p className="text-stone-500 mt-2">Synthesizing patterns from your past weeks...</p>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-stone-500 font-mono text-sm animate-pulse">Analyzing patterns & goals...</p>
        </div>
      ) : (
        <div className="prose prose-stone prose-headings:font-serif prose-headings:font-medium prose-h3:text-indigo-900 prose-p:leading-relaxed max-w-none bg-indigo-50/30 p-8 rounded-3xl border border-indigo-100/50">
          <div className="markdown-body">
            <Markdown>{aiInsights || ''}</Markdown>
          </div>
        </div>
      )}

      {!isGenerating && (
        <div className="mt-12 flex justify-between items-center">
          <Button variant="ghost" onClick={() => setStep('review')}>
            Back to Dump
          </Button>
          <Button size="lg" onClick={() => setStep('plan')} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Plan Next Week <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );

  const renderPlan = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto py-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-medium text-stone-900">Plan Next Week</h2>
        <p className="text-stone-500 mt-2">Based on your insights, what are your core focuses?</p>
      </div>

      <div className="space-y-4">
        {newGoals.map((goal, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <Circle className="w-5 h-5 text-stone-300 shrink-0" />
            <input
              type="text"
              value={goal}
              onChange={(e) => handleGoalChange(idx, e.target.value)}
              placeholder="Enter a goal or intention..."
              className="flex-1 bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors text-stone-800 placeholder:text-stone-400"
              autoFocus={idx === newGoals.length - 1}
            />
          </div>
        ))}
        <Button variant="ghost" onClick={handleAddGoal} className="mt-4 text-stone-500">
          + Add another goal
        </Button>
      </div>

      <div className="mt-16 flex justify-between items-center pt-8 border-t border-stone-100">
        <Button variant="ghost" onClick={() => setStep('insights')}>
          Back to Insights
        </Button>
        <Button size="lg" onClick={() => setStep('done')}>
          Complete Review <CheckCircle2 className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );

  const handleExport = () => {
    const markdown = `# Weekly Review: ${format(new Date(currentWeek.startDate), 'MMM d')} - ${format(new Date(currentWeek.endDate), 'MMM d, yyyy')}

## The Week's Dump
### Wins
${currentWeek.notes.filter(n => n.type === 'win').map(n => `- ${n.content}`).join('\n')}

### Concerns & Blockers
${currentWeek.notes.filter(n => n.type === 'concern').map(n => `- ${n.content}`).join('\n')}

### Notes
${currentWeek.notes.filter(n => n.type === 'note').map(n => `- ${n.content}`).join('\n')}

## Coach Insights
${aiInsights}

## Plan for Next Week
${newGoals.filter(g => g.trim() !== '').map(g => `- [ ] ${g}`).join('\n')}
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly-review-${format(new Date(currentWeek.startDate), 'yyyy-MM-dd')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderDone = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-[60vh] text-center max-w-lg mx-auto"
    >
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
      </div>
      <h2 className="text-3xl font-serif font-medium text-stone-900 mb-4">Review Complete</h2>
      <p className="text-stone-500 mb-8">
        You're all set for the week ahead. Have a great one!
      </p>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={() => setStep('welcome')}>
          Back to Start
        </Button>
        <Button onClick={handleExport}>
          Export as Markdown
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-indigo-100">
      <header className="border-b border-stone-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-stone-700" />
            <span className="font-serif font-medium text-lg tracking-tight">Sunday Review</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-stone-500 font-mono">
            <span>{format(new Date(currentWeek.startDate), 'MMM d')} - {format(new Date(currentWeek.endDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </header>

      <main className="px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 'welcome' && <div key="welcome">{renderWelcome()}</div>}
          {step === 'review' && <div key="review">{renderReview()}</div>}
          {step === 'insights' && <div key="insights">{renderInsights()}</div>}
          {step === 'plan' && <div key="plan">{renderPlan()}</div>}
          {step === 'done' && <div key="done">{renderDone()}</div>}
        </AnimatePresence>
      </main>
    </div>
  );
}
