'use client';

import Script from 'next/script';

/**
 * Tawk.to Live Chat Widget
 *
 * This component integrates the free Tawk.to live chat popup
 * into the NextGen Tech website. It loads after the page becomes
 * interactive so it doesn't block initial rendering.
 *
 * HOW TO SET UP:
 * 1. Go to https://www.tawk.to and create a free account.
 * 2. Create a new "Property" for your NextGen Tech website.
 * 3. Go to Administration → Channels → Chat Widget.
 * 4. Copy your Property ID and Widget ID from the embed code URL:
 *    https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
 * 5. Replace the values below.
 *
 * CUSTOMIZING THE AI ASSISTANT:
 * - In your Tawk.to dashboard, go to Administration → AI Assist
 * - Add your website URL so the AI can crawl and learn your content
 * - Add custom knowledge base articles about:
 *   • 1-Day Experience programs (Web Dev, HR, BDE, Sales, Marketing, Services)
 *   • Bootcamps (pricing, duration, curriculum)
 *   • Internship tracks (6 domains, duration, certificates)
 *   • Pricing & registration process
 *   • Contact information
 */

// ============================================================
// ⚠️ REPLACE THESE WITH YOUR ACTUAL TAWK.TO CREDENTIALS
// ============================================================
const TAWK_PROPERTY_ID = '6a7c320656f59a1d4aa773d6';
const TAWK_WIDGET_ID = '1jvqi6qqn';
// ============================================================

export function TawkChat() {
  return (
    <Script
      id="tawk-chat-widget"
      strategy="afterInteractive"
    >
      {`
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();

        // Customize widget appearance to match NextGen Tech branding
        Tawk_API.customStyle = {
          visibility: {
            desktop: { position: 'br', xOffset: 20, yOffset: 20 },
            mobile:  { position: 'br', xOffset: 10, yOffset: 10 },
          },
        };

        // Pre-fill visitor info if available
        Tawk_API.onLoad = function() {
          // You can set visitor attributes here if needed
          // Tawk_API.setAttributes({ name: 'Visitor', email: '' });
        };

        (function(){
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
