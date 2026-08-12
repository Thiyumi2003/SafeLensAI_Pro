import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuitIcon,
  CheckCircle2Icon,
  ImagePlusIcon,
  Loader2Icon,
  MapPinIcon,
  MicIcon,
  QrCodeIcon,
  ShieldQuestionIcon } from
'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button, Label, Select, Textarea } from '../../components/ui/Field';
import { FEATURED_HAZARD_ID, IMAGES } from '../../data/mockData';
import { useApp } from '../../contexts/AppContext';

const AI_STEPS = [
'Uploading evidence',
'Analysing image & description',
'Classifying hazard category',
'Calculating risk score'];


export function ReportHazard() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [stage, setStage] = useState<'form' | 'processing' | 'done'>('form');
  const [step, setStep] = useState(0);
  const [description, setDescription] = useState(
    'Oil spill near the loading bay entrance. Employees are walking through this area.'
  );
  const [category, setCategory] = useState('Slip / Trip');
  const [anonymous, setAnonymous] = useState(false);
  const [imageAdded, setImageAdded] = useState(true);
  const [voiceAdded, setVoiceAdded] = useState(false);

  useEffect(() => {
    if (stage !== 'processing') return;
    if (step >= AI_STEPS.length) {
      const done = window.setTimeout(() => setStage('done'), 500);
      return () => window.clearTimeout(done);
    }
    const timer = window.setTimeout(() => setStep((s) => s + 1), 750);
    return () => window.clearTimeout(timer);
  }, [stage, step]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStage('processing');
    showToast('Hazard Report Submitted Successfully');
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <QrCodeIcon className="h-4 w-4 text-blue-600" />
        QR scan · Hazard reporting
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <MapPinIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-medium text-blue-900/70">Location detected</p>
          <p className="text-base font-bold text-blue-900">Loading Bay – Zone A</p>
        </div>
      </div>

      {stage === 'form' &&
      <Card className="p-5">
          <h1 className="text-xl font-bold text-slate-900">Report a hazard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Takes under a minute. AI will classify and score the risk instantly.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <Label htmlFor="description">What did you see?</Label>
              <Textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the hazard, where it is, and who could be affected"
              required />
            
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
              type="button"
              onClick={() => setImageAdded((v) => !v)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
              imageAdded ?
              'border-blue-500 bg-blue-50/60' :
              'border-dashed border-slate-300 hover:bg-slate-50'}`
              }>
              
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                  <ImagePlusIcon className="h-4 w-4" />
                </span>
                <span className="text-xs">
                  <span className="block font-semibold text-slate-900">
                    {imageAdded ? 'Photo attached' : 'Upload image'}
                  </span>
                  <span className="text-slate-500">
                    {imageAdded ? 'oil-spill-bay3.jpg' : 'JPG or PNG'}
                  </span>
                </span>
              </button>

              <button
              type="button"
              onClick={() => setVoiceAdded((v) => !v)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
              voiceAdded ?
              'border-blue-500 bg-blue-50/60' :
              'border-dashed border-slate-300 hover:bg-slate-50'}`
              }>
              
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                  <MicIcon className="h-4 w-4" />
                </span>
                <span className="text-xs">
                  <span className="block font-semibold text-slate-900">
                    {voiceAdded ? 'Voice note 0:12' : 'Record voice note'}
                  </span>
                  <span className="text-slate-500">Optional</span>
                </span>
              </button>
            </div>

            {imageAdded &&
          <img
            src={IMAGES.oilSpill}
            alt="Uploaded hazard photo showing an oil spill on the loading bay floor"
            className="h-44 w-full rounded-xl object-cover" />

          }

            <div>
              <Label htmlFor="category" hint="Optional">
                Hazard category
              </Label>
              <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              
                <option>Not sure — let AI decide</option>
                <option>Slip / Trip</option>
                <option>Chemical</option>
                <option>Electrical</option>
                <option>Fire / Emergency</option>
                <option>Machinery</option>
                <option>Housekeeping</option>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span className="flex items-center gap-2.5">
                <ShieldQuestionIcon className="h-4 w-4 text-slate-500" />
                <span className="text-sm">
                  <span className="block font-semibold text-slate-900">
                    Report anonymously
                  </span>
                  <span className="text-xs text-slate-500">
                    Your name will be hidden from the report
                  </span>
                </span>
              </span>
              <button
              type="button"
              role="switch"
              aria-checked={anonymous}
              aria-label="Report anonymously"
              onClick={() => setAnonymous((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              anonymous ? 'bg-blue-600' : 'bg-slate-300'}`
              }>
              
                <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                anonymous ? 'left-[22px]' : 'left-0.5'}`
                } />
              
              </button>
            </div>

            <Button type="submit" className="w-full">
              Submit Hazard
            </Button>
          </form>
        </Card>
      }

      {stage !== 'form' &&
      <Card className="p-6 text-center">
          <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
          
            <CheckCircle2Icon className="h-7 w-7" />
          </motion.span>
          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Hazard Report Submitted Successfully
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Reference {FEATURED_HAZARD_ID} · Loading Bay – Zone A
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <BrainCircuitIcon className="h-4 w-4 text-blue-600" />
              SafeLens AI analysis
            </p>
            <ul className="mt-3 space-y-2.5">
              {AI_STEPS.map((label, index) => {
              const complete = index < step;
              const active = index === step && stage === 'processing';
              return (
                <li key={label} className="flex items-center gap-2.5 text-sm">
                    {complete ?
                  <CheckCircle2Icon className="h-4 w-4 text-green-600" /> :
                  active ?
                  <Loader2Icon className="h-4 w-4 animate-spin text-blue-600" /> :

                  <span className="h-4 w-4 rounded-full border-2 border-slate-200" />
                  }
                    <span
                    className={
                    complete || active ? 'text-slate-800' : 'text-slate-400'
                    }>
                    
                      {label}
                    </span>
                  </li>);

            })}
            </ul>
          </div>

          <Button
          className="mt-6 w-full"
          disabled={stage !== 'done'}
          onClick={() => navigate(`/employee/analysis/${FEATURED_HAZARD_ID}`)}>
          
            {stage === 'done' ? 'View AI Analysis' : 'Analysing…'}
          </Button>
        </Card>
      }
    </div>);

}