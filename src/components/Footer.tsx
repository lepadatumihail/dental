import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { CookieSettings } from '@/components/CookieSettings'
import Image from 'next/image'

import Logo from '../../public/logo-dark.png'

const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'FamilyFund', href: '/work/family-fund' },
      { title: 'Unseal', href: '/work/unseal' },
      { title: 'Phobia', href: '/work/phobia' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

// function Navigation() {
//   return (
//     <nav>
//       <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
//         {navigation.map((section, sectionIndex) => (
//           <li key={sectionIndex}>
//             <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
//               {section.title}
//             </div>
//             <ul role="list" className="mt-4 text-sm text-neutral-700">
//               {section.links.map((link, linkIndex) => (
//                 <li key={linkIndex} className="mt-4">
//                   <Link
//                     href={link.href}
//                     className="transition hover:text-neutral-950"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-12 w-full">
      <FadeIn>
        <div className="mt-6 overflow-hidden rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.0238356449193!2d-4.889272488857869!3d36.50901447991112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73218056e8e6dd%3A0x2df2a27c598cc9fc!2sAv.%20de%20Nabeul%2C%2014%2C%2029601%20Marbella%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1655308001000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Prisma Clinic Marbella Location Map"
          />
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Image
              src={Logo}
              alt="Prisma Clinic Marbella Logo"
              width={150}
              height={150}
            />
          </Link>
          <div className="flex flex-col items-end gap-4 sm:flex-row">
            <CookieSettings />
            <p className="text-sm text-neutral-700">
              © Prisma Clinic Marbella {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
