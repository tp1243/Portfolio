import { useState } from 'react'

const INITIAL_FORM = { name: '', email: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '', message: '' }

function validate(form) {
  const errors = { ...INITIAL_ERRORS }

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.message.trim()) {
    errors.message = 'Message cannot be empty'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters'
  }

  return errors
}

export function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate(form)
    const hasErrors = Object.values(validationErrors).some(Boolean)
    setErrors(validationErrors)
    if (hasErrors) return

    setStatus('loading')

    try {
      // Swap this block for EmailJS, Formspree, or your own API endpoint.
      // Example (Formspree):
      // const res = await fetch('https://formspree.io/f/your-id', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // })
      // if (!res.ok) throw new Error('Submission failed')

      await new Promise((resolve) => setTimeout(resolve, 1200)) // placeholder delay

      setStatus('success')
      setForm(INITIAL_FORM)
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <form
      data-contact-form
      onSubmit={handleSubmit}
      noValidate
      className="w-full flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
    >
      <Field
        label="Full Name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="John Doe"
      />

      <Field
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="john@example.com"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          className={`min-h-[120px] resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] ${
            errors.message
              ? 'border-red-400/60 focus:border-red-400'
              : 'border-white/10 focus:border-cyan-300/50'
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-400 animate-[fadeIn_0.2s_ease]">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,_#22d3ee,_#4ade80)] px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      {status === 'success' && (
        <p className="text-center text-sm text-emerald-300 animate-[fadeIn_0.3s_ease]">
          ✓ Message sent successfully! I'll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-red-400 animate-[fadeIn_0.3s_ease]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

function Field({ label, name, type, value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] ${
          error ? 'border-red-400/60 focus:border-red-400' : 'border-white/10 focus:border-cyan-300/50'
        }`}
      />
      {error && <p className="text-xs text-red-400 animate-[fadeIn_0.2s_ease]">{error}</p>}
    </div>
  )
}