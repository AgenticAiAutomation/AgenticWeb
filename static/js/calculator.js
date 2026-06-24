/* ═══════════════════════════════════════════════════════════════
   CALCULATOR.JS — ROI calculator with Indian number formatting
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Indian number formatting ────────────────────────────── */
  function toIndian(num) {
    if (num >= 1e7) return '₹' + (num / 1e7).toFixed(1).replace(/\.0$/, '') + ' Cr';
    if (num >= 1e5) return '₹' + (num / 1e5).toFixed(1).replace(/\.0$/, '') + 'L';
    if (num >= 1e3) return '₹' + (num / 1e3).toFixed(0) + 'K';
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  function toIndianShort(num) {
    if (num >= 1e7) return '₹' + (num / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' Crore';
    if (num >= 1e5) return '₹' + (num / 1e5).toFixed(1).replace(/\.0$/, '') + ' Lakh';
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  /* ── Calculator elements ─────────────────────────────────── */
  const calc = document.getElementById('roiCalculator');
  if (!calc) return;

  const sliderEmployees = document.getElementById('calcEmployees');
  const sliderHours     = document.getElementById('calcHours');
  const sliderSalary    = document.getElementById('calcSalary');
  const sliderTasks     = document.getElementById('calcTasks');

  const valEmployees    = document.getElementById('valEmployees');
  const valHours        = document.getElementById('valHours');
  const valSalary       = document.getElementById('valSalary');
  const valTasks        = document.getElementById('valTasks');

  const resultNum       = document.getElementById('calcResultNum');
  const resultSub       = document.getElementById('calcResultSub');
  const breakTimeSaved  = document.getElementById('breakTimeSaved');
  const breakLaborCost  = document.getElementById('breakLaborCost');
  const breakErrorCost  = document.getElementById('breakErrorCost');
  const breakRevGain    = document.getElementById('breakRevGain');

  const ctaBtn          = document.getElementById('calcCta');

  function compute() {
    const employees  = parseInt(sliderEmployees.value, 10);
    const hoursDay   = parseInt(sliderHours.value, 10);
    const salary     = parseInt(sliderSalary.value, 10);     /* monthly ₹ */
    const tasksPct   = parseInt(sliderTasks.value, 10);      /* % automatable */

    /* Display live values */
    valEmployees.textContent = employees;
    valHours.textContent     = hoursDay + ' hrs/day';
    valSalary.textContent    = toIndian(salary) + '/mo';
    valTasks.textContent     = tasksPct + '%';

    /* Calculation model */
    const workingDays    = 22;
    const hoursPerMonth  = employees * hoursDay * workingDays;
    const autoHours      = hoursPerMonth * (tasksPct / 100);
    const hrCostPerHour  = (salary * employees) / (hoursDay * workingDays);
    const laborSaved     = autoHours * hrCostPerHour;
    const errorReduction = laborSaved * 0.15;
    const revenueGain    = laborSaved * 0.20;
    const totalROI       = laborSaved + errorReduction + revenueGain;

    /* Annual */
    const annualROI = totalROI * 12;

    /* Update display */
    if (resultNum)      resultNum.textContent  = toIndian(annualROI);
    if (resultSub)      resultSub.textContent  = 'Annual ROI from automation (' + toIndian(totalROI) + '/month)';
    if (breakTimeSaved) breakTimeSaved.textContent = Math.round(autoHours) + ' hrs/mo';
    if (breakLaborCost) breakLaborCost.textContent = toIndian(laborSaved);
    if (breakErrorCost) breakErrorCost.textContent = toIndian(errorReduction);
    if (breakRevGain)   breakRevGain.textContent   = toIndian(revenueGain);

    /* Dynamic CTA text */
    if (ctaBtn) {
      if (annualROI >= 1e7) {
        ctaBtn.textContent = 'Get My ' + toIndian(annualROI) + ' ROI Plan →';
      } else {
        ctaBtn.textContent = 'Get My Free Automation Audit →';
      }
    }
  }

  /* ── Bind sliders ───────────────────────────────────────── */
  [sliderEmployees, sliderHours, sliderSalary, sliderTasks].forEach(function (slider) {
    if (!slider) return;
    slider.addEventListener('input', compute);

    /* Style the track fill */
    slider.addEventListener('input', function () {
      updateSliderFill(slider);
    });
  });

  function updateSliderFill(slider) {
    const min = parseFloat(slider.min || 0);
    const max = parseFloat(slider.max || 100);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background =
      'linear-gradient(to right, #18E3FF 0%, #7A5CFF ' + pct + '%, #1c2942 ' + pct + '%)';
  }

  /* ── Init ───────────────────────────────────────────────── */
  compute();

  [sliderEmployees, sliderHours, sliderSalary, sliderTasks].forEach(function (slider) {
    if (slider) updateSliderFill(slider);
  });

})();
