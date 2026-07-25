export function applySeo({
  title,
  description,
  image = '/favicon.svg',
  url = window.location.href,
}) {
  document.title = title

  const upsertMeta = (selector, attribute, value, content) => {
    let element = document.head.querySelector(selector)

    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, value)
      document.head.appendChild(element)
    }

    element.setAttribute('content', content)
  }

  upsertMeta('meta[name="description"]', 'name', 'description', description)
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
  upsertMeta(
    'meta[property="og:description"]',
    'property',
    'og:description',
    description,
  )
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', image)
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
}
