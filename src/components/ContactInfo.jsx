import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { contactInfo } from '../data/contactInfo'

const DETAIL_ROWS = [
  {
    icon: FiMail,
    label: 'Email Address',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: FiPhone,
    label: 'Phone Number',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s+/g, '')}`,
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: contactInfo.location,
    href: null,
  },
]

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-5">
        <div className="space-y-3">
          <h2
            data-contact-reveal
            className="font-display text-3xl text-white sm:text-4xl"
          >
            {contactInfo.heading}
          </h2>
          <div
            data-contact-reveal
            className="h-1.5 w-28 rounded-full bg-[linear-gradient(90deg,_rgba(34,211,238,0.85),_rgba(74,222,128,0.6),_rgba(34,211,238,0.12))]"
          />
          <p data-contact-reveal className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            {contactInfo.intro}
          </p>
        </div>

        <div className="space-y-4">
          {DETAIL_ROWS.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div
                data-contact-reveal
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_10px_30px_rgba(34,211,238,0.12)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.15)] transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                  <Icon size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-white sm:text-base">
                    {value}
                  </span>
                </span>
              </div>
            )

            return href ? (
              <a key={label} href={href} className="block">
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}