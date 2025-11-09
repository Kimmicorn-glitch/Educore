
"use client"

import { useState, useEffect } from 'react';

export default function TermsOfServicePage() {
    const [date, setDate] = useState('');

    useEffect(() => {
        setDate(new Date().toLocaleDateString());
    }, []);

    return (
      <div>
        <h1>Terms of Service</h1>
        <p>Last updated: {date}</p>
  
        <h2>1. Agreement to Terms</h2>
        <p>
          By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the services.
        </p>
  
        <h2>2. Description of Service</h2>
        <p>
          EduCore provides an AI-powered adaptive learning platform designed to offer personalized education in various subjects. The service includes lessons, exercises, and performance tracking.
        </p>
  
        <h2>3. User Accounts</h2>
        <p>
          To access most features of the service, you must register for an account. You are responsible for safeguarding your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
        </p>
  
        <h2>4. User Conduct</h2>
        <p>
          You agree not to use the service for any unlawful purpose or to engage in any conduct that could damage, disable, or impair the service.
        </p>
  
        <h2>5. Intellectual Property</h2>
        <p>
          All content provided on the service, including text, graphics, and code, is the property of EduCore and is protected by copyright and other intellectual property laws.
        </p>
  
        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your access to the service at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
  
        <h2>7. Limitation of Liability</h2>
        <p>
          In no event shall EduCore be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
  
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at support@educore.org.
        </p>
      </div>
    );
  }
  