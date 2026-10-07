'use client'

import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { useCookieConsent } from '@/hooks/useCookieConsent'

/** Optional tools are absent from the page until the visitor opts in. */
export function ConsentedAnalytics() {
  const { preferences } = useCookieConsent()
  if (!preferences?.analytics) return null

  return (
    <>
      <Script id="google-consent">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){window.dataLayer.push(arguments);};
          window.gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: '${preferences.marketing ? 'granted' : 'denied'}',
            ad_user_data: '${preferences.marketing ? 'granted' : 'denied'}',
            ad_personalization: '${preferences.marketing ? 'granted' : 'denied'}'
          });
          window.gtag('js', new Date());
          window.gtag('config', 'G-JHK75NLNSK');
        `}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JHK75NLNSK" />
      {preferences.marketing && (
        <Script id="google-tag-manager">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NH6BS3G8');
          `}
        </Script>
      )}
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="50Zg5u7x92m3eDyxjhSJww"
      />
      <Analytics />
    </>
  )
}
