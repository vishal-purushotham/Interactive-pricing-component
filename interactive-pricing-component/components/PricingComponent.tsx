import React, { useState, useEffect } from 'react';
import styles from './PricingComponent.module.css';

export default function PricingComponent() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [tierIndex, setTierIndex] = useState<number>(2); // Default to 100K pageviews

  const pricingTiers = [
    { pageviews: 10000, price: 8 },
    { pageviews: 50000, price: 12 },
    { pageviews: 100000, price: 16 },
    { pageviews: 500000, price: 24 },
    { pageviews: 1000000, price: 36 },
  ];

  const handleBillingChange = () => {
    setBilling(billing === 'monthly' ? 'yearly' : 'monthly');
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTierIndex(Number(event.target.value));
  };

  const getPrice = () => {
    const basePrice = pricingTiers[tierIndex].price;
    const monthlyPrice = billing === 'monthly' ? basePrice : basePrice * 0.75;
    const yearlyPrice = monthlyPrice * 12;
    return { monthlyPrice, yearlyPrice };
  };

  const formatPageviews = (views: number) => {
    return views >= 1000000 ? `${views / 1000000}M` : `${views / 1000}K`;
  };

  const [sliderPercentage, setSliderPercentage] = useState(50);

  useEffect(() => {
    setSliderPercentage((tierIndex / 4) * 100);
  }, [tierIndex]);

  return (
    <div className={styles.pricing}>
      <h2 className={styles.pageviews}>
        {formatPageviews(pricingTiers[tierIndex].pageviews)} Pageviews
      </h2>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="4"
          value={tierIndex}
          onChange={handleSliderChange}
          className={styles.slider}
          style={{ 
            background: `linear-gradient(to right, 
              hsl(174, 86%, 45%) 0%, 
              hsl(174, 86%, 45%) ${sliderPercentage}%, 
              var(--slider-bg-color) ${sliderPercentage}%, 
              var(--slider-bg-color) 100%)`
          }}
        />
      </div>
      <div className={styles.price}>
        ${getPrice().monthlyPrice.toFixed(2)} <span className={styles.billingPeriod}>/ month</span>
      </div>
      {billing === 'yearly' && (
        <div className={styles.yearlyTotal}>
          ${getPrice().yearlyPrice.toFixed(2)} billed yearly
        </div>
      )}
      <div className={styles.billingToggle}>
        <span>Monthly Billing</span>
        <label className={styles.switch}>
          <input type="checkbox" checked={billing === 'yearly'} onChange={handleBillingChange} />
          <span className={styles.switchSlider}></span>
        </label>
        <span>Yearly Billing</span>
        <span className={styles.discount}>25% discount</span>
      </div>
      <ul className={styles.features}>
        <li>Unlimited websites</li>
        <li>100% data ownership</li>
        <li>Email reports</li>
      </ul>
      <button className={styles.cta}>Start my trial</button>
    </div>
  );
}