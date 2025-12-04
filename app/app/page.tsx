'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Star, Target, Users, TrendingUp, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ValueFirstNicheSelector = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    healthPerfection: 1,
    healthPain: 1,
    healthPassion: 1,
    wealthPerfection: 1,
    wealthPain: 1,
    wealthPassion: 1,
    relationshipPerfection: 1,
    relationshipPain: 1,
    relationshipPassion: 1,
    selectedMarket: '',
    level1: '',
    level2: '',
    level3: '',
    level4: '',
    customerPain: false,
    purchasingPower: false,
    easyToTarget: false,
    marketGrowing: false,
    canPromoteOnline: false,
    canTransactOnline: false,
    canDeliverOnline: false,
    avatarName: '',
    avatarOccupation: '',
    avatarLocation: '',
    avatarPains: '',
    avatarGoals: '',
    avatarOnlineHabits: '',
    avatarBudget: '',
    contentThemes: '',
    valueTopics: ''
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMarketScores = () => {
    const health = formData.healthPerfection + formData.healthPain + formData.healthPassion;
    const wealth = formData.wealthPerfection + formData.wealthPain + formData.wealthPassion;
    const relationships = formData.relationshipPerfection + formData.relationshipPain + formData.relationshipPassion;
    return { health, wealth, relationships };
  };

  const getRecommendedMarket = () => {
    const scores = calculateMarketScores();
    const highest = Math.max(scores.health, scores.wealth, scores.relationships);
    if (scores.health === highest) return 'health';
    if (scores.wealth === highest) return 'wealth';
    return 'relationships';
  };

  const steps = [
    { title: "Your Three P's Assessment", icon: <Star className="w-6 h-6" />, description: "Identify which market aligns with your expertise and passion" },
    { title: "Choose Your Market", icon: <Target className="w-6 h-6" />, description: "Select the evergreen market you'll serve" },
    { title: "Define Your Niche", icon: <TrendingUp className="w-6 h-6" />, description: "Narrow down to a specific audience" },
    { title: "Validate Viability", icon: <CheckCircle2 className="w-6 h-6" />, description: "Ensure your niche is profitable" },
    { title: "Digital Accessibility Check", icon: <Globe className="w-6 h-6" />, description: "Confirm you can reach and serve this audience online" },
    { title: "Ideal Client Profile", icon: <Users className="w-6 h-6" />, description: "Create a detailed avatar" },
    { title: "Your Content Strategy", icon: <Sparkles className="w-6 h-6" />, description: "Plan how you'll provide value and invite them" },
  ];

  const RatingInput = ({ label, value, onChange, description }: { label: string; value: number; onChange: (v: number) => void; description?: string }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">{label}</label>
      {description && <p className="text-xs text-gray-600 mb-3">{description}</p>}
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
              value >= num
                ? 'bg-purple-600 text-white border-purple-600'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );

  const CheckboxInput = ({ label, checked, onChange, description }: { label: string; checked: boolean; onChange: (v: boolean) => void; description?: string }) => (
    <div className="mb-6">
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
        />
        <div>
          <div className="font-medium">{label}</div>
          {description && <div className="text-sm text-gray-600 mt-1">{description}</div>}
        </div>
      </label>
    </div>
  );

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const generatePDF = async () => {
    const element = document.getElementById('pdf-content') as HTMLElement;
    if (!element) return alert('Please complete all steps first!');

    try {
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: 1200
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `ValueFirst-Niche-Strategy-${formData.avatarName || 'Partner'}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Try again or check console for details.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Three P's Assessment
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-900">Welcome Brand Connect Partner!</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This tool helps you discover the <strong>perfect niche</strong> where your experience, credibility, and passion give you an unfair advantage when inviting entrepreneurs to ValueFirst Brand Foundations.
              </p>
              <div className="bg-white p-5 rounded-lg mt-6">
                <p className="font-bold text-purple-800 mb-3">The Three P's Framework:</p>
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-blue-700">Past Perfection:</strong> Achievements & results</li>
                  <li><strong className="text-purple-700">Past Pain:</strong> Struggles you've overcome</li>
                  <li><strong className="text-pink-700">Passion:</strong> Topics that genuinely excite you</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-200">
              <h4 className="text-xl font-bold text-green-700 mb-2">HEALTH Market</h4>
              <RatingInput label="Past Perfection in Health" description="Certifications, transformations, results" value={formData.healthPerfection} onChange={v => updateFormData('healthPerfection', v)} />
              <RatingInput label="Past Pain in Health" description="Struggles you've overcome" value={formData.healthPain} onChange={v => updateFormData('healthPain', v)} />
              <RatingInput label="Passion for Health" description="How excited you are about this topic" value={formData.healthPassion} onChange={v => updateFormData('healthPassion', v)} />
              <div className="mt-4 p-4 bg-green-50 rounded-lg text-lg font-bold">Score: {calculateMarketScores().health}/15</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-yellow-200">
              <h4 className="text-xl font-bold text-yellow-700 mb-2">WEALTH Market</h4>
              <RatingInput label="Past Perfection in Wealth" description="Business wins, revenue milestones" value={formData.wealthPerfection} onChange={v => updateFormData('wealthPerfection', v)} />
              <RatingInput label="Past Pain in Wealth" description="Failures, financial struggles" value={formData.wealthPain} onChange={v => updateFormData('wealthPain', v)} />
              <RatingInput label="Passion for Wealth" description="Excitement for entrepreneurship" value={formData.wealthPassion} onChange={v => updateFormData('wealthPassion', v)} />
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-lg font-bold">Score: {calculateMarketScores().wealth}/15</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-200">
              <h4 className="text-xl font-bold text-pink-700 mb-2">RELATIONSHIPS Market</h4>
              <RatingInput label="Past Perfection in Relationships" description="Successes, communication skills" value={formData.relationshipPerfection} onChange={v => updateFormData('relationshipPerfection', v)} />
              <RatingInput label="Past Pain in Relationships" description="Challenges you've navigated" value={formData.relationshipPain} onChange={v => updateFormData('relationshipPain', v)} />
              <RatingInput label="Passion for Relationships" description="Interest in helping connections" value={formData.relationshipPassion} onChange={v => updateFormData('relationshipPassion', v)} />
              <div className="mt-4 p-4 bg-pink-50 rounded-lg text-lg font-bold">Score: {calculateMarketScores().relationships}/15</div>
            </div>

            <div className="bg-purple-100 p-6 rounded-xl border-2 border-purple-300">
              <h4 className="text-xl font-bold mb-2">Recommended Market:</h4>
              <p className="text-2xl capitalize font-bold text-purple-800">{getRecommendedMarket()}</p>
            </div>
          </div>
        );

      case 1: // Choose Market
        const scores = calculateMarketScores();
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className={`p-6 rounded-xl text-center ${scores.health === Math.max(...Object.values(scores)) ? 'bg-green-200 border-4 border-green-500' : 'bg-gray-100'}`}>
                <div className="font-bold text-lg">Health</div>
                <div className="text-3xl font-bold text-green-700">{scores.health}/15</div>
              </div>
              <div className={`p-6 rounded-xl text-center ${scores.wealth === Math.max(...Object.values(scores)) ? 'bg-yellow-200 border-4 border-yellow-500' : 'bg-gray-100'}`}>
                <div className="font-bold text-lg">Wealth</div>
                <div className="text-3xl font-bold text-yellow-700">{scores.wealth}/15</div>
              </div>
              <div className={`p-6 rounded-xl text-center ${scores.relationships === Math.max(...Object.values(scores)) ? 'bg-pink-200 border-4 border-pink-500' : 'bg-gray-100'}`}>
                <div className="font-bold text-lg">Relationships</div>
                <div className="text-3xl font-bold text-pink-700">{scores.relationships}/15</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Choose Your Primary Market</h3>
              <div className="space-y-4">
                {['health', 'wealth', 'relationships'].map(market => {
                  const score = scores[market as keyof typeof scores];
                  return (
                    <label key={market} className="flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer hover:bg-purple-50 transition">
                      <input
                        type="radio"
                        name="market"
                        value={market}
                        checked={formData.selectedMarket === market}
                        onChange={(e) => updateFormData('selectedMarket', e.target.value)}
                        className="w-5 h-5 text-purple-600"
                      />
                      <div className="flex-1">
                        <div className="text-lg font-semibold capitalize">{market}</div>
                        <div className="text-sm text-gray-600">Score: {score}/15</div>
                        {market === getRecommendedMarket() && (
                          <span className="inline-block mt-2 px-3 py-1 bg-purple-200 text-purple-800 text-xs font-bold rounded-full">RECOMMENDED</span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 2: // Define Niche
        return (
          <div className="space-y-8">
            <div className="bg-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Define Your Hyper-Specific Niche</h3>
              <p className="text-gray-700">The more specific, the easier it is to create resonant content and attract perfect-fit clients.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Level 1: Market</label>
                <input type="text" disabled value={formData.selectedMarket ? formData.selectedMarket.toUpperCase() : 'Choose market first'} className="w-full p-4 bg-gray-100 rounded-lg text-lg font-semibold" />
              </div>
              <div>
                <label className="block font-semibold mb-2">Level 2: General Category</label>
                <input type="text" placeholder="e.g., Business Coaching" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.level2} onChange={e => updateFormData('level2', e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-2">Level 3: Specific Audience</label>
                <input type="text" placeholder="e.g., New online coaches" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.level3} onChange={e => updateFormData('level3', e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-2">Level 4: Ultra-Specific Niche (Your Sweet Spot)</label>
                <input type="text" placeholder="e.g., Life coaches who can't explain their method clearly" className="w-full p-4 border-2 border-purple-300 rounded-lg text-lg focus:border-purple-500" value={formData.level4} onChange={e => updateFormData('level4', e.target.value)} />
              </div>
            </div>

            {formData.level4 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl text-center">
                <h4 className="text-2xl font-bold">Your Niche:</h4>
                <p className="text-xl mt-2">{formData.level4}</p>
              </div>
            )}
          </div>
        );

      case 3: // Viability Check
        const viabilityCount = [formData.customerPain, formData.purchasingPower, formData.easyToTarget, formData.marketGrowing].filter(Boolean).length;
        const viabilityColor = viabilityCount === 4 ? 'bg-green-500' : viabilityCount >= 2 ? 'bg-yellow-500' : 'bg-red-500';
        const viabilityText = viabilityCount === 4 ? 'Perfect! Viable niche.' : viabilityCount >= 2 ? 'Good—refine for better fit.' : 'Consider adjusting.';
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Market Viability Checklist</h3>
            <p className="text-gray-700">All four should be true for a strong niche.</p>
            <CheckboxInput label="They are actively struggling with branding" description="Urgent need for clarity/positioning" checked={formData.customerPain} onChange={v => updateFormData('customerPain', v)} />
            <CheckboxInput label="They have money to invest" description="Budget for business/brand growth" checked={formData.purchasingPower} onChange={v => updateFormData('purchasingPower', v)} />
            <CheckboxInput label="Easy to reach online" description="Active in groups, social media" checked={formData.easyToTarget} onChange={v => updateFormData('easyToTarget', v)} />
            <CheckboxInput label="Market is growing" description="More entrants needing help" checked={formData.marketGrowing} onChange={v => updateFormData('marketGrowing', v)} />

            <div className={`p-6 rounded-xl text-center text-white text-2xl font-bold ${viabilityColor}`}>
              {viabilityCount}/4 Criteria Met
            </div>
            <div className={`p-4 rounded-lg ${viabilityCount === 4 ? 'bg-green-50 text-green-800' : viabilityCount >= 2 ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-medium">{viabilityText}</p>
            </div>
          </div>
        );

      case 4: // Digital Accessibility
        const digitalCount = [formData.canPromoteOnline, formData.canTransactOnline, formData.canDeliverOnline].filter(Boolean).length;
        const digitalColor = digitalCount === 3 ? 'bg-green-500' : 'bg-red-500';
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Digital Accessibility Check</h3>
            <p className="text-gray-700">Confirm this audience is online-ready for ValueFirst.</p>
            <CheckboxInput label="Can promote online" description="They consume social/YouTube content" checked={formData.canPromoteOnline} onChange={v => updateFormData('canPromoteOnline', v)} />
            <CheckboxInput label="They transact online" description="Comfortable with digital offers" checked={formData.canTransactOnline} onChange={v => updateFormData('canTransactOnline', v)} />
            <CheckboxInput label="Can deliver ValueFirst online" description="Benefits from virtual training" checked={formData.canDeliverOnline} onChange={v => updateFormData('canDeliverOnline', v)} />

            <div className={`p-6 rounded-xl text-white text-center text-2xl font-bold ${digitalColor}`}>
              {digitalCount}/3 Digital Ready
            </div>
            <div className={`p-4 rounded-lg ${digitalCount === 3 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-medium">{digitalCount === 3 ? 'Excellent—ready to go!' : 'Pivot to more digital-savvy group.'}</p>
            </div>
          </div>
        );

      case 5: // Client Avatar
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Your Ideal Client Avatar</h3>
            <p className="text-gray-700 mb-6">Build a vivid profile to guide your content.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Name & Title</label>
                <input placeholder="e.g., Sarah - The Confused Coach" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.avatarName} onChange={e => updateFormData('avatarName', e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-2">Occupation & Background</label>
                <textarea rows={2} placeholder="Business type, experience, certifications" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.avatarOccupation} onChange={e => updateFormData('avatarOccupation', e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-2">Location & Demographics</label>
                <input placeholder="e.g., USA, 35-45, early-stage business" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.avatarLocation} onChange={e => updateFormData('avatarLocation', e.target.value)} />
              </div>
              <div>
                <label className="block font-semibold mb-2">Online Habits</label>
                <textarea rows={3} placeholder="Platforms, content consumed" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.avatarOnlineHabits} onChange={e => updateFormData('avatarOnlineHabits', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Biggest Branding Pains</label>
                <textarea rows={3} placeholder="What keeps them stuck? (e.g., 'Can't explain their offer')" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.avatarPains} onChange={e => updateFormData('avatarPains', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2">Goals & Desires</label>
                <textarea rows={3} placeholder="What do they want? (e.g., 'Clear brand that attracts dream clients')" className="w-full p-4 border-2 rounded-lg focus:border-purple-500" value={formData.avatarGoals} onChange={e => updateFormData('avatarGoals', e.target.value)} />
              </div>
            </div>
          </div>
        );

      case 6: // Content Strategy (Final)
        return (
          <div className="space-y-8">
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto text-purple-600 mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Congratulations! Your Niche Strategy Is Complete</h2>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl max-w-2xl mx-auto">
                <p className="text-xl font-bold capitalize mb-4">Market: {formData.selectedMarket}</p>
                <p className="text-lg mb-2">Niche: {formData.level4 || 'Defined above'}</p>
                <p className="text-lg">Avatar: {formData.avatarName || 'Your ideal client'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Value-First Content Plan</h3>
              <div>
                <label className="block font-semibold mb-2">10-15 Content Themes</label>
                <textarea
                  rows={4}
                  placeholder="e.g., 'Why your health coaching sounds generic', '3 branding mistakes killing your client leads'..."
                  className="w-full p-4 border-2 rounded-lg focus:border-purple-500 text-lg"
                  value={formData.contentThemes}
                  onChange={e => updateFormData('contentThemes', e.target.value)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Invitation Framework to ValueFirst</label>
                <textarea
                  rows={4}
                  placeholder="Your script: 'If this resonates, join our free Brand Foundations session to fix it...'"
                  className="w-full p-4 border-2 rounded-lg focus:border-purple-500 text-lg"
                  value={formData.valueTopics}
                  onChange={e => updateFormData('valueTopics', e.target.value)}
                />
              </div>
            </div>

            <div className="text-center py-8">
              <button 
                onClick={generatePDF}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition transform hover:scale-105"
              >
                📄 Download Your Complete Niche Strategy PDF
              </button>
            </div>

            {/* Hidden PDF Content */}
            <div id="pdf-content" className="absolute left-[-9999px] top-0 w-[800px] bg-white p-8 font-sans print-only">
              <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">ValueFirst Brand Connect Niche Strategy</h1>
              <div className="space-y-6 text-base leading-relaxed">
                <div>
                  <strong className="text-xl text-purple-600 block mb-2">Primary Market:</strong>
                  <span className="capitalize text-xl font-semibold">{formData.selectedMarket}</span>
                </div>
                <div>
                  <strong className="text-xl text-purple-600 block mb-2">Your Ultra-Specific Niche:</strong>
                  <span className="text-lg font-semibold">{formData.level4}</span>
                </div>
                <div>
                  <strong className="text-xl text-purple-600 block mb-2">Ideal Client Avatar:</strong>
                  <div className="ml-4 mt-2 space-y-1">
                    <p><strong>Name:</strong> {formData.avatarName || '—'}</p>
                    <p><strong>Occupation:</strong> {formData.avatarOccupation || '—'}</p>
                    <p><strong>Location:</strong> {formData.avatarLocation || '—'}</p>
                    <p><strong>Online Habits:</strong> {formData.avatarOnlineHabits || '—'}</p>
                    <p><strong>Pains:</strong> {formData.avatarPains || '—'}</p>
                    <p><strong>Goals:</strong> {formData.avatarGoals || '—'}</p>
                  </div>
                </div>
                <div>
                  <strong className="text-xl text-purple-600 block mb-2">Content Themes:</strong>
                  <p className="whitespace-pre-wrap mt-2">{formData.contentThemes || '—'}</p>
                </div>
                <div>
                  <strong className="text-xl text-purple-600 block mb-2">ValueFirst Invitation Plan:</strong>
                  <p className="whitespace-pre-wrap mt-2">{formData.valueTopics || '—'}</p>
                </div>
                <div className="text-center mt-8 pt-6 border-t border-gray-200 text-gray-500 text-sm">
                  Generated on {new Date().toLocaleDateString()} | ValueFirst Brand Connect Partner Tool
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => (
              <div key={i} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${i <= currentStep ? 'bg-purple-600' : 'bg-gray-300'}`}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && <div className={`h-1 flex-1 mx-2 ${i < currentStep ? 'bg-purple-600' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${currentStep === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all">
              Next <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={generatePDF} className="px-8 py-3 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition-all">
              Complete & Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return <ValueFirstNicheSelector />;
}
