import {access, mkdir, readFile, writeFile} from 'node:fs/promises'
import {resolve, join} from 'node:path'
import {pathToFileURL} from 'node:url'
import process from 'node:process'

/* global URL, console */

const args = process.argv.slice(2)
const rootArg = args.indexOf('--web-root')
const webRoot = resolve(
  rootArg >= 0 ? args[rootArg + 1] : process.env.HEXODUS_WEB_ROOT || '/Users/brayanchan/Documents/HEXODUS2',
)
const output = resolve('migration/generated/hexodus.ndjson')
const readJson = async (name) => JSON.parse(await readFile(join(webRoot, 'src/data', name), 'utf8'))
const [site, memberships, promotions, gallery, seo] = await Promise.all([
  readJson('site.json'), readJson('memberships.json'), readJson('promotions.json'), readJson('gallery.json'), readJson('seo.json'),
])

const assetPath = (publicPath) => join(webRoot, 'public', publicPath.replace(/^\//, ''))
const image = (src, alt, caption) => ({
  _type: 'accessibleImage',
  _sanityAsset: `image@${pathToFileURL(assetPath(src)).href}`,
  alt,
  ...(caption ? {caption} : {}),
})
const video = (src) => ({
  _type: 'file',
  _sanityAsset: `file@${pathToFileURL(assetPath(src)).href}`,
})
const cta = (label, kind, value) => ({
  _type: 'callToAction', label, kind,
  ...(kind === 'internal' ? {internalTarget: value} : {}),
  ...(kind === 'whatsapp' ? {whatsappMessage: value} : {}),
  ...(kind === 'external' ? {externalUrl: value} : {}),
})
const seoObject = (entry, alt) => ({
  _type: 'seo',
  title: entry.title.replace('{name}', site.name),
  description: entry.description.replace('{name}', site.name),
  image: image(entry.image, alt),
})
const keyed = (items, prefix) => items.map((item, index) => ({_key: `${prefix}-${index + 1}`, ...item}))
const waText = (url = '') => new URL(url).searchParams.get('text') || ''

const docs = []
docs.push({
  _id: 'siteSettings', _type: 'siteSettings', name: site.name, city: site.city,
  footerTagline: 'Fuerza, disciplina y comunidad. Hecho para superarte.',
  phoneE164: site.phoneE164, landmark: site.landmark, addressLines: site.addressLines,
  mapsUrl: site.mapsUrl, mapsEmbedUrl: site.mapsEmbedUrl,
  hours: {weekdays: site.hours.weekdays.display, saturday: site.hours.saturday.display, sunday: site.hours.sunday.display},
  headerCta: cta('Inscríbete ahora', 'whatsapp', 'Hola, me gustaría recibir información sobre las membresías de Hexodus.'),
  contentApproval: {phone: site.phoneConfirmed, address: site.addressConfirmed, maps: site.mapsUrlConfirmed, hours: [site.hours.weekdays, site.hours.saturday, site.hours.sunday].every((item) => item.confirmed), membershipPrices: memberships.confirmed},
})

docs.push({
  _id: 'homePage', _type: 'homePage',
  hero: {
    eyebrow: `${site.name} / ${site.city}`, heading: 'Gimnasio', highlight: 'en Campeche.',
    copy: 'Aquí no vienes a improvisar. Vienes a entrenar con estructura, técnica y resultados. Espacio 100% climatizado, equipamiento completo y coaches que te acompañan en cada avance.',
    primaryCta: cta('Ver membresías', 'internal', '#membresias'), secondaryCta: cta('Qué ofrece Hexodus', 'internal', '#beneficios'),
    signature: 'Fuerza / Disciplina / Comunidad', signatureStrong: 'Hecho para superarte.',
  },
  benefits: keyed([
    {title: 'Equipo profesional', subtitle: 'Fuerza y cardio'},
    {title: 'Coaches que te acompañan', subtitle: 'Te acompañamos'},
    {title: 'Clima controlado', subtitle: 'Entrena con comodidad'},
    {title: 'Comunidad real', subtitle: 'Aquí entrenamos juntos'},
  ], 'benefit'),
  experience: {
    label: 'Beneficios Hexodus', heading: '¿Qué obtienes', highlight: 'en Hexodus?', intro: 'Pesas, cardio, un ambiente cómodo y personas que te orientan. Conoce lo que encontrarás al entrenar aquí.',
    cards: keyed([
      {title: 'Equipamiento', description: 'Pesas libres, máquinas y áreas para trabajar fuerza y cardio.', image: image('/assets/free-weights.jpg', 'Zona de pesas libres')},
      {title: 'Orientación', description: 'Entrena con apoyo para mejorar tu técnica y avanzar a tu ritmo.', image: image('/assets/entrenamiento.jpg', 'Entrenamiento acompañado')},
      {title: 'Clima controlado', description: 'Instalaciones climatizadas para entrenar con comodidad.', image: image('/assets/machines-wide.jpg', 'Área de entrenamiento de Hexodus')},
      {title: 'Suplementación', description: 'Pregunta en recepción por los suplementos disponibles.', visualLabel: 'HEX'},
      {title: 'Comunidad', description: 'Comparte el esfuerzo con personas que también quieren avanzar.', image: image('/assets/comunidad.jpeg', 'Comunidad Hexodus')},
    ], 'experience'),
  },
  membershipsIntro: {label: 'Membresías', heading: 'Elige tu', highlight: 'ritmo.', intro: 'Entrena por tu cuenta, en pareja o con precio de estudiante. Consulta los planes y encuentra cómo empezar.'},
  philosophy: {
    label: 'Nosotros / Filosofía', heading: 'La fuerza no', headingSecond: 'se improvisa.', highlight: 'Se construye.',
    copy: 'Constancia, enfoque y disciplina. Cada entrenamiento es una inversión en ti. Aquí no vienes a entrenar por entrenar, vienes a hacer que cada serie tenga un propósito.',
    subcopy: 'Conoce al equipo, nuestras instalaciones y la forma de entrenar que nos une en Hexodus.',
    image: image('/assets/entrenamiento.jpg', 'Entrenamiento y acompañamiento en Hexodus Fitness Center'), badgeLabel: 'Head Coach', badgeText: 'Resiliencia. Técnica. Progreso.', years: 8,
    cta: cta('Conoce Hexodus', 'internal', '#equipo'),
  },
  team: {
    label: 'Tu equipo', heading: 'Detrás de cada avance,', highlight: 'un coach.', intro: 'Técnica, constancia y acompañamiento. Profesionales que te ayudan a entrenar mejor.',
    image: image('/assets/entrenamiento.jpg', 'Entrenamiento acompañado'), cta: cta('Pregunta por tu entrenamiento', 'whatsapp', 'Hola, quiero información sobre entrenamiento personalizado en Hexodus.'),
  },
  galleryIntro: {label: 'Galería', heading: 'Así se vive', highlight: 'entrenar aquí.', intro: 'Una mirada a las áreas de fuerza, maquinaria y ambiente que encontrarás en Hexodus.'},
  community: {label: 'Comunidad Hexodus', heading: 'La comunidad', highlight: 'Hexodus.', intro: 'La experiencia de entrenar también se construye entre personas. Consulta las opiniones publicadas por la comunidad.', cardTitle: 'Tu experiencia inspira a alguien más.', cardCopy: 'Lee las opiniones de la comunidad en Google Maps y comparte la tuya.', buttonLabel: 'Ver reseñas en Google'},
  faq: {
    label: 'Antes de empezar', heading: 'Dudas', highlight: 'rápidas.', intro: 'Estamos para ayudarte a dar el primer paso.', buttonLabel: 'Habla con Hexodus',
    items: keyed([
      {question: '¿Necesito experiencia para entrenar?', answer: 'No. Puedes comenzar desde tu nivel actual y pedir orientación al equipo para usar las áreas y equipos con seguridad.'},
      {question: '¿Qué incluye la membresía?', answer: 'Incluye acceso a las áreas de entrenamiento durante el horario correspondiente. Consulta por WhatsApp las condiciones vigentes de cada plan.'},
      {question: '¿Puedo entrenar solo unos días?', answer: 'Sí. Hay opciones de visita diaria, semana y quincena sujetas a disponibilidad y precios vigentes.'},
      {question: '¿El gimnasio está climatizado?', answer: 'Sí. Las instalaciones cuentan con clima controlado para entrenar con mayor comodidad.'},
      {question: '¿Ofrecen entrenamiento personalizado?', answer: 'Sí. Pregunta por disponibilidad, horarios y costos de entrenamiento personalizado.'},
    ], 'faq'),
  },
  finalCta: {eyebrow: 'Tu turno', heading: 'Hoy', highlight: 'Decides.', copy: 'Tu mejor versión no se construye sola. Entrena donde realmente se nota la diferencia. Da el paso que tu cuerpo está esperando.', primaryCta: cta('Escríbenos por WhatsApp', 'whatsapp', 'Hola, me gustaría recibir información sobre las membresías y horarios de Hexodus Fitness Center.'), secondaryCta: cta('Ver planes', 'internal', '#membresias')},
  seo: seoObject(seo.home, 'Sala principal de Hexodus Fitness Center'),
})

docs.push({
  _id: 'contactPage', _type: 'contactPage',
  hero: {eyebrow: `Contacto · ${site.city}`, heading: 'Hablemos de', highlight: 'tu próxima meta.', intro: '¿Tienes dudas o quieres conocer el gimnasio? Escríbenos o visítanos en Campeche.'},
  contactSection: {label: 'Aquí empieza la conversación', heading: 'Cuéntanos', highlight: 'qué buscas.', intro: 'Resuelve tus dudas sobre membresías, horarios y servicios. Te ayudamos a preparar tu primera visita.', whatsappTitle: 'WhatsApp', whatsappCopy: 'Consulta directamente con el equipo de Hexodus.', whatsappButton: 'Escribir por WhatsApp', locationImage: image('/assets/location-1800.webp', 'Instalaciones de Hexodus en Campeche')},
  mapSection: {label: 'Visítanos en Campeche', heading: 'Tu espacio', highlight: 'para entrenar.', buttonLabel: 'Cómo llegar'},
  seo: seoObject(seo.contacto, 'Ubicación de Hexodus Fitness Center'),
})

docs.push({
  _id: 'galleryPage', _type: 'galleryPage',
  hero: {badge: 'Nuestras instalaciones', heading: 'Hexodus se vive', highlight: 'en cada espacio.', intro: 'Conoce el ambiente donde comenzarás tu transformación. Instalaciones 100% climatizadas, equipo completo de peso libre e integrado y espacio diseñado para entrenar con propósito.', chips: keyed([{value: String(gallery.length), label: 'Fotografías'}, {value: '100%', label: 'Clima controlado'}, {value: '4', label: 'Zonas de entrenamiento'}], 'chip')},
  cta: {eyebrow: 'Tu espacio', heading: 'Tu próxima rutina', highlight: 'puede empezar aquí.', copy: 'Recorre nuestras instalaciones, conoce al equipo y encuentra el espacio donde vas a construir tu mejor versión.', primaryCta: cta('Escríbenos por WhatsApp', 'whatsapp', 'Hola, quiero conocer las instalaciones de Hexodus.'), secondaryCta: cta('Ver membresías', 'internal', '/#membresias')},
  seo: seoObject(seo.galeria, 'Galería de instalaciones de Hexodus'),
})

memberships.plans.forEach((plan, index) => docs.push({
  _id: `membership-${plan.id}`, _type: 'membershipPlan', name: plan.name, sourceKey: {_type: 'slug', current: plan.id}, kind: 'monthly', amount: plan.amount, currency: memberships.currency, unit: plan.unit, ...(plan.tag ? {tag: plan.tag} : {}), features: plan.features, actionLabel: plan.action, whatsappMessage: waText(plan.whatsappUrl), featured: Boolean(plan.featured), status: 'active', order: index,
}))
memberships.passes.forEach((pass, index) => docs.push({
  _id: `membership-${pass.id}`, _type: 'membershipPlan', name: pass.name, sourceKey: {_type: 'slug', current: pass.id}, kind: 'pass', amount: pass.amount, currency: memberships.currency, featured: false, status: 'active', order: memberships.plans.length + index,
}))
docs.push({_id: 'promotion-enrollment', _type: 'promotion', label: promotions.enrollment.label, sourceKey: {_type: 'slug', current: 'enrollment'}, amount: promotions.enrollment.amount, active: true, confirmed: promotions.enrollment.confirmed, termsConfirmed: promotions.enrollment.termsConfirmed})
docs.push(
  {_id: 'coach-walter', _type: 'coach', name: 'Walter', role: 'Nutriólogo y entrenador personalizado', bio: 'Entrenamiento y nutrición con un plan adaptado a tus objetivos.', status: 'active', order: 0},
  {_id: 'coach-david', _type: 'coach', name: 'David', role: 'Entrenador personalizado', bio: 'Fuerza, hipertrofia y acondicionamiento con técnica y progresión.', status: 'active', order: 1},
)

const homeFacilities = [
  ['home-main', 'Sala principal', '/assets/gallery-main-1800.webp', 'Sala principal de Hexodus', 'instalaciones'],
  ['home-strength', 'Zona de fuerza', '/assets/gallery-strength-1800.webp', 'Atleta entrenando en maquinaria Hexodus', 'fuerza'],
  ['home-machines', 'Maquinaria', '/assets/gallery-machines-1800.webp', 'Maquinaria profesional de Hexodus', 'maquinas'],
]
homeFacilities.forEach(([id, title, src, alt, category], index) => docs.push({_id: `facility-${id}`, _type: 'facility', title, sourceKey: {_type: 'slug', current: id}, mediaType: 'image', image: image(src, alt), category, tag: title, placements: ['home'], status: 'active', order: index}))
gallery.forEach((photo, index) => {
  const isVideo = photo.type === 'video' || /\.mp4$/i.test(photo.src)
  docs.push({_id: `facility-${photo.id}`, _type: 'facility', title: photo.alt, sourceKey: {_type: 'slug', current: photo.id}, mediaType: isVideo ? 'video' : 'image', ...(isVideo ? {video: video(photo.src), poster: image(photo.poster, photo.alt)} : {image: image(photo.src, photo.alt)}), category: photo.category, tag: photo.tag, placements: ['gallery'], status: 'active', order: index})
})

for (const doc of docs) {
  const serialized = JSON.stringify(doc)
  const directives = [...serialized.matchAll(/(?:image|file)@(file:[^"}]+)/g)]
  for (const [, uri] of directives) await access(new URL(uri))
}
await mkdir(resolve('migration/generated'), {recursive: true})
await writeFile(output, `${docs.map((doc) => JSON.stringify(doc)).join('\n')}\n`)
console.log(`Generados ${docs.length} documentos en ${output}`)
