import React, { useState, useEffect } from 'react';
import styles from './PricingComponent.module.css';

// Email validation regex
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function PricingComponent() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [tierIndex, setTierIndex] = useState<number>(2);
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
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
          style={{ background: `linear-gradient(to right, hsl(174, 86%, 45%) 0%, hsl(174, 86%, 45%) ${sliderPercentage}%, hsl(224, 65%, 95%) ${sliderPercentage}%, hsl(224, 65%, 95%) 100%)` }}
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
        <span className={styles.billingOption}>Monthly Billing</span>
        <label className={styles.switch}>
          <input 
            type="checkbox" 
            checked={billing === 'yearly'} 
            onChange={handleBillingChange} 
          />
          <span className={styles.switchSlider}></span>
        </label>
        <span className={styles.billingOption}>Yearly Billing</span>
        <span className={styles.discount}>25% discount</span>
      </div>
      <ul className={styles.features}>
        <li>✔ Unlimited websites</li>
        <li>✔ 100% data ownership</li>
        <li>✔ Email reports</li>
      </ul>
      <div className={styles.emailContainer}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={`${styles.emailInput} ${!isEmailValid && email ? styles.invalidEmail : ''}`}
        />
        {!isEmailValid && email && <span className={styles.errorMessage}>Please enter a valid email address</span>}
      </div>
      <button className={styles.cta} disabled={!isEmailValid || !email}>Start my trial</button>
    </div>
  );
}