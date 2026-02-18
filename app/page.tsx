'use client'

import Link from 'next/link'
import { useEffect, useState, useRef, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUp,
  Check,
  Truck,
  Sun,
  Battery,
  Wrench,
  Ruler,
  Thermometer,
  Droplets,
  Mountain,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Star,
  Users,
  Calendar,
  Hammer,
  Lightbulb,
  Shield,
  Heart,
  Menu,
  X,
  MessageCircle,
  Pencil,
  HardHat,
  PartyPopper,
  ChevronDown,
  Snowflake,
  Flame,
  Wifi,
  BedDouble,
} from 'lucide-react'

// ─── i18n ────────────────────────────────────────────────────────────────────
type Lang = 'fr' | 'en'

const t = {
  nav: {
    models: { fr: 'Modèles', en: 'Models' },
    services: { fr: 'Services', en: 'Services' },
    process: { fr: 'Processus', en: 'Process' },
    realisations: { fr: 'Réalisations', en: 'Portfolio' },
    contact: { fr: 'Contact', en: 'Contact' },
    estimate: { fr: 'Estimer mon projet', en: 'Estimate my project' },
    events: { fr: 'Événements', en: 'Events' },
    faq: { fr: 'FAQ', en: 'FAQ' },
  },
  hero: {
    eyebrow: {
      fr: 'Aménagement de vans & fourgons au Québec',
      en: 'Van & sprinter conversions in Quebec',
    },
    headline1: { fr: 'Votre van,', en: 'Your van,' },
    headline2: { fr: 'votre aventure.', en: 'your adventure.' },
    sub: {
      fr: "Faucon PTR conçoit et réalise des aménagements de vans et fourgons haut de gamme, pensés pour l'autonomie et le confort — été comme hiver.",
      en: 'Faucon PTR designs and builds premium van and sprinter conversions, engineered for autonomy and comfort — summer and winter.',
    },
    cta1: { fr: 'Estimer mon projet', en: 'Estimate my project' },
    cta2: { fr: 'Découvrir nos modèles', en: 'Discover our models' },
    trust1: { fr: 'Consultation gratuite', en: 'Free consultation' },
    trust2: { fr: 'Fabriqué au Québec', en: 'Made in Quebec' },
    trust3: { fr: 'Garantie 3 ans', en: '3-year warranty' },
  },
  stats: {
    projects: { fr: 'Projets réalisés', en: 'Completed projects' },
    experience: { fr: "Années d'expérience", en: 'Years of experience' },
    satisfaction: { fr: 'Satisfaction client', en: 'Client satisfaction' },
    autonomous: { fr: 'Autonomie 4 saisons', en: '4-season autonomy' },
  },
  models: {
    title: { fr: 'Nos modèles', en: 'Our models' },
    sub: {
      fr: 'Chaque aménagement est conçu sur mesure. Voici nos plateformes de base, personnalisables selon vos besoins.',
      en: 'Every build is custom-designed. Here are our base platforms, fully customizable to your needs.',
    },
    discover: { fr: 'Découvrir', en: 'Discover' },
  },
  services: {
    title: { fr: 'Nos services', en: 'Our services' },
    sub: {
      fr: "De la conception à la livraison, on vous accompagne à chaque étape de votre projet d'aménagement.",
      en: 'From design to delivery, we guide you through every step of your conversion project.',
    },
  },
  process: {
    title: { fr: 'Notre processus', en: 'Our process' },
    sub: {
      fr: "De l'idée à la route, voici comment votre projet prend vie.",
      en: 'From idea to the road, here is how your project comes to life.',
    },
  },
  why: {
    title: { fr: 'Pourquoi Faucon PTR', en: 'Why Faucon PTR' },
    sub: {
      fr: "On bâtit des vans qui résistent à l'hiver québécois et qui vous suivent partout.",
      en: 'We build vans that withstand Quebec winters and follow you everywhere.',
    },
  },
  testimonials: {
    title: { fr: 'Ce que nos clients disent', en: 'What our clients say' },
    sub: {
      fr: "Des aventuriers satisfaits d'un océan à l'autre.",
      en: 'Happy adventurers from coast to coast.',
    },
  },
  events: {
    title: { fr: 'Salons & événements', en: 'Shows & events' },
    sub: {
      fr: 'Venez nous rencontrer et visiter nos vans en personne.',
      en: 'Come meet us and visit our vans in person.',
    },
    promo: {
      fr: 'Promotion exclusive de 5 000 $ pour toute réservation faite directement à notre kiosque.',
      en: '$5,000 exclusive promotion for any booking made directly at our booth.',
    },
  },
  faq: {
    title: { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
    sub: {
      fr: "Tout ce que vous devez savoir avant de démarrer votre projet.",
      en: 'Everything you need to know before starting your project.',
    },
  },
  cta: {
    title: {
      fr: 'Prêt à démarrer votre projet?',
      en: 'Ready to start your project?',
    },
    sub: {
      fr: "Que vous en soyez à l'idée ou au choix du véhicule, notre équipe est là pour vous guider.",
      en: "Whether you're at the idea stage or choosing your vehicle, our team is here to guide you.",
    },
    cta1: { fr: 'Demander une estimation', en: 'Request an estimate' },
    cta2: { fr: 'Nous appeler', en: 'Call us' },
  },
  footer: {
    tagline: {
      fr: 'Aménagement de vans et fourgons haut de gamme, conçu et fabriqué au Québec.',
      en: 'Premium van and sprinter conversions, designed and built in Quebec.',
    },
    product: { fr: 'Produit', en: 'Product' },
    company: { fr: 'Entreprise', en: 'Company' },
    legal: { fr: 'Légal', en: 'Legal' },
    privacy: { fr: 'Confidentialité', en: 'Privacy' },
    terms: { fr: "Conditions d'utilisation", en: 'Terms of Service' },
    warranty: { fr: 'Garantie', en: 'Warranty' },
    jobs: { fr: 'Carrières', en: 'Careers' },
    blog: { fr: 'Blogue', en: 'Blog' },
    realisations: { fr: 'Réalisations', en: 'Portfolio' },
  },
} as const

function tx(obj: { fr: string; en: string }, lang: Lang) {
  return obj[lang]
}

// ─── Scroll animation hook ───────────────────────────────────────────────────
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      setCount(Math.min(Math.round(increment * step), value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────
function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/10">
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium text-lg pr-4 group-hover:text-amber-400 transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-amber-500' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────
const models = [
  {
    name: 'Sprinter 170',
    length: "22'",
    sleeps: '2-3',
    tag: { fr: 'Populaire', en: 'Popular' },
    highlights: [
      { icon: BedDouble, text: { fr: 'Lit queen fixe', en: 'Fixed queen bed' } },
      { icon: Snowflake, text: { fr: 'Isolation -30°C', en: '-30°C insulation' } },
      { icon: Sun, text: { fr: '400W solaire', en: '400W solar' } },
    ],
    desc: {
      fr: 'Le classique pour les aventuriers. Grand espace, toit haut, parfait pour la vie à temps plein.',
      en: 'The classic for adventurers. Spacious, high roof, perfect for full-time living.',
    },
  },
  {
    name: 'Sprinter 144',
    length: "19'",
    sleeps: '2',
    tag: { fr: 'Compact', en: 'Compact' },
    highlights: [
      { icon: Ruler, text: { fr: 'Format agile', en: 'Agile format' } },
      { icon: Battery, text: { fr: '200Ah lithium', en: '200Ah lithium' } },
      { icon: Flame, text: { fr: 'Chauffage Webasto', en: 'Webasto heater' } },
    ],
    desc: {
      fr: 'Plus maniable, idéal pour le weekend et les sorties régulières.',
      en: 'More maneuverable, ideal for weekends and regular getaways.',
    },
  },
  {
    name: 'Transit 148',
    length: "20'",
    sleeps: '2-3',
    tag: { fr: 'Meilleur rapport', en: 'Best value' },
    highlights: [
      { icon: Wrench, text: { fr: 'Plateforme Ford', en: 'Ford platform' } },
      { icon: Droplets, text: { fr: 'Douche intégrée', en: 'Built-in shower' } },
      { icon: Wifi, text: { fr: 'Starlink ready', en: 'Starlink ready' } },
    ],
    desc: {
      fr: 'Plateforme Ford robuste, excellent rapport espace/prix.',
      en: 'Robust Ford platform, excellent space-to-price ratio.',
    },
  },
  {
    name: 'ProMaster 159',
    length: "21'",
    sleeps: '2-4',
    tag: { fr: 'Famille', en: 'Family' },
    highlights: [
      { icon: Users, text: { fr: 'Config famille', en: 'Family config' } },
      { icon: Thermometer, text: { fr: 'Le plus large', en: 'Widest van' } },
      { icon: Sun, text: { fr: '600W solaire', en: '600W solar' } },
    ],
    desc: {
      fr: 'Le plus large de sa catégorie. Idéal pour les familles ou le travail mobile.',
      en: 'Widest in its class. Ideal for families or mobile work.',
    },
  },
]

const services = [
  {
    icon: Hammer,
    title: { fr: 'Aménagement complet', en: 'Full conversion' },
    desc: {
      fr: "Du véhicule vide à votre maison sur roues. Structure, isolation, finition — on s'occupe de tout.",
      en: 'From empty vehicle to your home on wheels. Structure, insulation, finishing — we handle everything.',
    },
  },
  {
    icon: Sun,
    title: { fr: 'Système solaire & électrique', en: 'Solar & electrical system' },
    desc: {
      fr: 'Panneaux solaires, batteries lithium, onduleur — autonomie complète hors réseau.',
      en: 'Solar panels, lithium batteries, inverter — complete off-grid autonomy.',
    },
  },
  {
    icon: Thermometer,
    title: { fr: 'Isolation 4 saisons', en: '4-season insulation' },
    desc: {
      fr: "Isolation haute performance conçue pour le climat québécois. Confort garanti jusqu'à -30°C.",
      en: 'High-performance insulation designed for Quebec climate. Comfort guaranteed down to -30°C.',
    },
  },
  {
    icon: Droplets,
    title: { fr: 'Plomberie & eau chaude', en: 'Plumbing & hot water' },
    desc: {
      fr: "Réservoir d'eau, pompe, chauffe-eau — douche et évier fonctionnels pour l'autonomie totale.",
      en: 'Water tank, pump, water heater — functional shower and sink for total autonomy.',
    },
  },
  {
    icon: Lightbulb,
    title: { fr: 'Consultation & design', en: 'Consultation & design' },
    desc: {
      fr: 'Plans 3D, choix de matériaux, optimisation de layout — on co-crée votre vision.',
      en: '3D plans, material selection, layout optimization — we co-create your vision.',
    },
  },
  {
    icon: Wrench,
    title: { fr: 'Entretien & pièces', en: 'Maintenance & parts' },
    desc: {
      fr: 'Service après-vente, pièces de rechange, réparations — on vous accompagne après la livraison.',
      en: 'After-sales service, spare parts, repairs — we support you after delivery.',
    },
  },
]

const processSteps = [
  {
    icon: MessageCircle,
    title: { fr: '1. Consultation', en: '1. Consultation' },
    desc: {
      fr: "On discute de votre projet, vos besoins, votre budget. Appelez-nous ou passez à l'atelier.",
      en: 'We discuss your project, needs, and budget. Call us or visit the workshop.',
    },
  },
  {
    icon: Pencil,
    title: { fr: '2. Design & Plans', en: '2. Design & Plans' },
    desc: {
      fr: 'Plans 3D sur mesure, sélection des matériaux, validation du layout avec vous.',
      en: 'Custom 3D plans, material selection, layout validation with you.',
    },
  },
  {
    icon: HardHat,
    title: { fr: '3. Construction', en: '3. Construction' },
    desc: {
      fr: "Notre équipe construit votre van à la main. Mises à jour photo régulières pendant le build.",
      en: 'Our team hand-builds your van. Regular photo updates during the build.',
    },
  },
  {
    icon: PartyPopper,
    title: { fr: '4. Livraison', en: '4. Delivery' },
    desc: {
      fr: "Formation complète sur tous les systèmes, puis les clés sont à vous. Bonne route!",
      en: 'Complete training on all systems, then the keys are yours. Happy travels!',
    },
  },
]

const whyReasons = [
  {
    icon: Shield,
    title: { fr: 'Qualité artisanale', en: 'Artisan quality' },
    desc: {
      fr: 'Chaque van est construit à la main par notre équipe de menuisiers, électriciens et soudeurs qualifiés.',
      en: 'Every van is hand-built by our team of qualified carpenters, electricians, and welders.',
    },
  },
  {
    icon: Mountain,
    title: { fr: 'Conçu pour le Québec', en: 'Designed for Quebec' },
    desc: {
      fr: "Isolation renforcée, systèmes de chauffage Webasto, matériaux résistants au gel et à l'humidité.",
      en: 'Reinforced insulation, Webasto heating systems, materials resistant to frost and humidity.',
    },
  },
  {
    icon: Battery,
    title: { fr: 'Autonomie réelle', en: 'Real autonomy' },
    desc: {
      fr: 'Systèmes électriques surdimensionnés : 400W+ solaire, 200Ah+ lithium, pour vivre vraiment hors réseau.',
      en: 'Oversized electrical systems: 400W+ solar, 200Ah+ lithium, for truly living off-grid.',
    },
  },
  {
    icon: Heart,
    title: { fr: 'Approche humaine', en: 'Human approach' },
    desc: {
      fr: 'On prend le temps de comprendre votre projet. Chaque build est unique, comme vous.',
      en: 'We take time to understand your project. Every build is unique, just like you.',
    },
  },
]

const testimonials = [
  {
    name: 'Marie-Ève & Simon',
    location: { fr: 'Sprinter 170 — Gaspésie', en: 'Sprinter 170 — Gaspésie' },
    text: {
      fr: "On a fait le tour de la Gaspésie en plein hiver avec notre van Faucon PTR. L'isolation est incroyable, on dormait confortablement à -25°C. L'équipe est passionnée et ça se voit dans chaque détail.",
      en: "We toured the Gaspésie in the middle of winter with our Faucon PTR van. The insulation is incredible — we slept comfortably at -25°C. The team is passionate and it shows in every detail.",
    },
    stars: 5,
  },
  {
    name: 'Alex Tremblay',
    location: { fr: 'Transit 148 — Travail nomade', en: 'Transit 148 — Nomad work' },
    text: {
      fr: "En tant que développeur remote, j'avais besoin d'un bureau mobile fiable. Faucon PTR a créé un espace de travail avec Starlink intégré, double écran et assez de batterie pour 3 jours sans soleil.",
      en: "As a remote developer, I needed a reliable mobile office. Faucon PTR created a workspace with integrated Starlink, dual monitors, and enough battery for 3 days without sun.",
    },
    stars: 5,
  },
  {
    name: 'Les Côté-Bouchard',
    location: { fr: 'ProMaster 159 — Famille', en: 'ProMaster 159 — Family' },
    text: {
      fr: "Avec deux enfants, on pensait que le van life c'était impossible. Faucon PTR a dessiné un layout brillant avec lit superposé, coin repas et rangement pour 4. On part chaque été depuis 2 ans!",
      en: "With two kids, we thought van life was impossible. Faucon PTR designed a brilliant layout with bunk beds, dining area, and storage for 4. We've been hitting the road every summer for 2 years!",
    },
    stars: 5,
  },
]

const events = [
  {
    name: { fr: 'Salon du VR de Drummondville', en: 'Drummondville RV Show' },
    date: { fr: '27 fév — 1er mars 2026', en: 'Feb 27 — Mar 1, 2026' },
    location: 'Centrexpo Cogeco, Drummondville',
  },
  {
    name: { fr: 'Salon du VR de Montréal', en: 'Montreal RV Show' },
    date: { fr: '5 — 8 mars 2026', en: 'Mar 5 — 8, 2026' },
    location: 'Stade olympique, Montréal',
  },
  {
    name: { fr: 'Salon Aventure & Plein Air', en: 'Adventure & Outdoor Show' },
    date: { fr: '28 — 29 mars 2026', en: 'Mar 28 — 29, 2026' },
    location: 'Palais des congrès, Montréal',
  },
  {
    name: { fr: 'Salon du VR de Québec', en: 'Quebec City RV Show' },
    date: { fr: '9 — 12 avril 2026', en: 'Apr 9 — 12, 2026' },
    location: 'ExpoCité, Québec',
  },
]

const faqs = [
  {
    q: { fr: 'Combien de temps dure un aménagement complet?', en: 'How long does a full conversion take?' },
    a: {
      fr: "En moyenne, un aménagement complet prend entre 8 et 14 semaines selon la complexité du projet. On vous tient informé avec des mises à jour photo régulières tout au long du processus.",
      en: 'On average, a full conversion takes 8 to 14 weeks depending on project complexity. We keep you informed with regular photo updates throughout the process.',
    },
  },
  {
    q: { fr: 'Est-ce que je peux fournir mon propre véhicule?', en: 'Can I provide my own vehicle?' },
    a: {
      fr: "Absolument! Vous pouvez nous amener votre véhicule ou on peut vous aider à en trouver un. On travaille principalement avec des Mercedes Sprinter, Ford Transit et Ram ProMaster.",
      en: 'Absolutely! You can bring us your vehicle or we can help you find one. We mainly work with Mercedes Sprinter, Ford Transit, and Ram ProMaster.',
    },
  },
  {
    q: { fr: "L'isolation est-elle vraiment efficace en hiver?", en: 'Is the insulation truly effective in winter?' },
    a: {
      fr: "Oui! Notre système d'isolation multicouche combiné au chauffage Webasto permet de maintenir une température confortable même à -30°C. Plusieurs de nos clients vivent dans leur van à l'année au Québec.",
      en: 'Yes! Our multi-layer insulation system combined with Webasto heating maintains a comfortable temperature even at -30°C. Several of our clients live in their van year-round in Quebec.',
    },
  },
  {
    q: { fr: 'Offrez-vous du financement?', en: 'Do you offer financing?' },
    a: {
      fr: "Oui, nous offrons des options de financement flexibles via nos partenaires. Un dépôt de 30% est requis pour démarrer le projet, et le solde peut être financé sur 12 à 60 mois.",
      en: 'Yes, we offer flexible financing options through our partners. A 30% deposit is required to start the project, and the balance can be financed over 12 to 60 months.',
    },
  },
  {
    q: { fr: 'Quelle garantie offrez-vous?', en: 'What warranty do you offer?' },
    a: {
      fr: "Tous nos aménagements sont couverts par une garantie de 3 ans sur la main-d'œuvre et les composants installés. Les systèmes électriques et la plomberie sont garantis 2 ans. Le chauffage Webasto a sa propre garantie fabricant.",
      en: 'All our conversions are covered by a 3-year warranty on workmanship and installed components. Electrical systems and plumbing are warranted for 2 years. The Webasto heater has its own manufacturer warranty.',
    },
  },
]

// ─── JSON-LD SEO ─────────────────────────────────────────────────────────────
function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Faucon PTR',
    description: 'Aménagement de vans et fourgons haut de gamme au Québec. Isolation 4 saisons, systèmes solaires, autonomie complète.',
    url: 'https://faucon-ptr.com',
    telephone: '+14388724265',
    email: 'H.rostom@faucon-ptr.com',
    address: { '@type': 'PostalAddress', addressRegion: 'QC', addressCountry: 'CA' },
    areaServed: { '@type': 'Province', name: 'Quebec' },
    priceRange: '$$$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLang] = useState<Lang>('fr')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#models', label: tx(t.nav.models, lang) },
    { href: '#services', label: tx(t.nav.services, lang) },
    { href: '#process', label: tx(t.nav.process, lang) },
    { href: '#realisations', label: tx(t.nav.realisations, lang) },
    { href: '#events', label: tx(t.nav.events, lang) },
    { href: '#faq', label: tx(t.nav.faq, lang) },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <JsonLd />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-gray-950" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                FAUCON <span className="text-amber-500">PTR</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-2.5 py-1 rounded border border-white/10 hover:border-white/30"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>

              <a href="tel:+14388724265" className="hidden xl:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                (438) 872-4265
              </a>

              <Link href="#estimate" className="hidden sm:inline-flex items-center gap-2 bg-amber-500 text-gray-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-400 transition-colors">
                {tx(t.nav.estimate, lang)}
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[500px] border-t border-white/10' : 'max-h-0'}`}>
          <div className="px-6 py-4 bg-gray-950/98 backdrop-blur-md space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-gray-300 hover:text-amber-400 transition-colors text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a href="tel:+14388724265" className="flex items-center gap-2 text-gray-400 py-2">
                <Phone className="w-4 h-4" /> (438) 872-4265
              </a>
              <Link
                href="#estimate"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-gray-950 px-6 py-3 rounded-full font-semibold"
              >
                {tx(t.nav.estimate, lang)}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.08),transparent_60%)]" />
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M60 0H0v60\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-amber-400 mb-8">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  {tx(t.hero.eyebrow, lang)}
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
                  {tx(t.hero.headline1, lang)}{' '}
                  <br className="hidden sm:block" />
                  <span className="text-amber-500">{tx(t.hero.headline2, lang)}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed mb-12 max-w-2xl">
                  {tx(t.hero.sub, lang)}
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <Link href="#estimate" className="inline-flex items-center justify-center gap-2 bg-amber-500 text-gray-950 px-8 py-4 rounded-full text-base font-semibold hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    {tx(t.hero.cta1, lang)}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="#models" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-colors">
                    {tx(t.hero.cta2, lang)}
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500">
                  {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((trust, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-500" />
                      {tx(trust, lang)}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Hero visual — feature highlights */}
            <FadeIn delay={300} className="hidden lg:block">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />

                  <div className="relative space-y-4">
                    {[
                      { icon: Snowflake, label: { fr: 'Isolation -30°C', en: '-30°C insulation' } },
                      { icon: Sun, label: { fr: '400W+ panneaux solaires', en: '400W+ solar panels' } },
                      { icon: Battery, label: { fr: '200Ah+ lithium', en: '200Ah+ lithium' } },
                      { icon: Flame, label: { fr: 'Chauffage Webasto', en: 'Webasto heating' } },
                      { icon: Droplets, label: { fr: 'Douche & eau chaude', en: 'Shower & hot water' } },
                      { icon: Wifi, label: { fr: 'Starlink compatible', en: 'Starlink compatible' } },
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                        <feat.icon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{tx(feat.label, lang)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-2xl font-bold text-amber-500 mb-1">150+</p>
                    <p className="text-sm text-gray-400">{tx(t.stats.projects, lang)}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 150, suffix: '+', label: tx(t.stats.projects, lang) },
              { value: 8, suffix: '+', label: tx(t.stats.experience, lang) },
              { value: 98, suffix: '%', label: tx(t.stats.satisfaction, lang) },
              { value: 4, suffix: '', label: tx(t.stats.autonomous, lang), isSeasons: true },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">
                    {'isSeasons' in stat && stat.isSeasons ? '4' : <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Models ─────────────────────────────────────────────────────── */}
      <section id="models" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.models.title, lang)}</h2>
              <p className="text-lg text-gray-400">{tx(t.models.sub, lang)}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/50 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    <Truck className="w-16 h-16 text-gray-700 group-hover:text-amber-500/30 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur text-[11px] text-gray-300 flex items-center gap-1">
                        <Ruler className="w-3 h-3" /> {model.length}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur text-[11px] text-gray-300 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {model.sleeps}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-3 self-start">
                      {tx(model.tag, lang)}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{tx(model.desc, lang)}</p>

                    {/* Feature highlights */}
                    <div className="space-y-2 mb-4 mt-auto">
                      {model.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-gray-500">
                          <h.icon className="w-3.5 h-3.5 text-amber-500/70" />
                          {tx(h.text, lang)}
                        </div>
                      ))}
                    </div>

                    <Link href="#estimate" className="text-sm font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors">
                      {tx(t.models.discover, lang)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.services.title, lang)}</h2>
              <p className="text-lg text-gray-400">{tx(t.services.sub, lang)}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="group p-8 rounded-2xl border border-white/10 bg-gray-950 hover:border-amber-500/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                    <service.icon className="w-6 h-6 text-amber-500 group-hover:text-gray-950 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{tx(service.title, lang)}</h3>
                  <p className="text-gray-400 leading-relaxed">{tx(service.desc, lang)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.process.title, lang)}</h2>
              <p className="text-lg text-gray-400">{tx(t.process.sub, lang)}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0" />

            {processSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 bg-gray-950">
                    <step.icon className="w-7 h-7 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{tx(step.title, lang)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{tx(step.desc, lang)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Faucon PTR ─────────────────────────────────────────────── */}
      <section id="realisations" className="py-24 lg:py-32 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">{tx(t.why.title, lang)}</h2>
                <p className="text-lg text-gray-400 mb-10">{tx(t.why.sub, lang)}</p>

                <div className="space-y-6">
                  {whyReasons.map((reason, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <reason.icon className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{tx(reason.title, lang)}</h4>
                        <p className="text-gray-400 text-sm">{tx(reason.desc, lang)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Snowflake, value: '-30°C', label: { fr: 'Isolation testée', en: 'Tested insulation' } },
                  { icon: Sun, value: '600W', label: { fr: 'Solaire max', en: 'Max solar' } },
                  { icon: Battery, value: '400Ah', label: { fr: 'Lithium max', en: 'Max lithium' } },
                  { icon: Shield, value: '3 ans', label: { fr: 'Garantie', en: 'Warranty' } },
                ].map((card, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/10 bg-gray-950 text-center hover:border-amber-500/30 transition-colors">
                    <card.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-amber-500 mb-1">{card.value}</p>
                    <p className="text-xs text-gray-400">{tx(card.label, lang)}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.testimonials.title, lang)}</h2>
              <p className="text-lg text-gray-400">{tx(t.testimonials.sub, lang)}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/20 transition-colors h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 italic flex-1">
                    &ldquo;{tx(item.text, lang)}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{tx(item.location, lang)}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ─────────────────────────────────────────────────────── */}
      <section id="events" className="py-24 lg:py-32 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.events.title, lang)}</h2>
              <p className="text-lg text-gray-400">{tx(t.events.sub, lang)}</p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-600/5 border border-amber-500/30 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="px-4 py-2 bg-amber-500 text-gray-950 rounded-xl text-2xl font-bold">5 000 $</div>
                <p className="text-gray-300">{tx(t.events.promo, lang)}</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-gray-950 hover:border-amber-500/30 transition-colors">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tx(event.name, lang)}</h3>
                    <p className="text-amber-400 text-sm font-medium">{tx(event.date, lang)}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.faq.title, lang)}</h2>
              <p className="text-lg text-gray-400">{tx(t.faq.sub, lang)}</p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="border-t border-white/10">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={tx(faq.q, lang)}
                  a={tx(faq.a, lang)}
                  open={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="estimate" className="py-24 lg:py-32 bg-gradient-to-b from-gray-950 to-gray-900 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{tx(t.cta.title, lang)}</h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">{tx(t.cta.sub, lang)}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:H.rostom@faucon-ptr.com"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-gray-950 px-8 py-4 rounded-full text-base font-semibold hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {tx(t.cta.cta1, lang)}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+14388724265"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {tx(t.cta.cta2, lang)}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer id="contact" className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-950" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  FAUCON <span className="text-amber-500">PTR</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 max-w-xs mb-4">{tx(t.footer.tagline, lang)}</p>
              <div className="flex items-center gap-3">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 transition-colors" aria-label={Icon.displayName}>
                    <Icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{tx(t.footer.product, lang)}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#models" className="hover:text-white transition-colors">{tx(t.nav.models, lang)}</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">{tx(t.nav.services, lang)}</Link></li>
                <li><Link href="#process" className="hover:text-white transition-colors">{tx(t.nav.process, lang)}</Link></li>
                <li><Link href="#estimate" className="hover:text-white transition-colors">{tx(t.nav.estimate, lang)}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{tx(t.footer.company, lang)}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#realisations" className="hover:text-white transition-colors">{tx(t.footer.realisations, lang)}</Link></li>
                <li><Link href="#events" className="hover:text-white transition-colors">{tx(t.nav.events, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.blog, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.jobs, lang)}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{tx(t.footer.legal, lang)}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.privacy, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.terms, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.warranty, lang)}</Link></li>
                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Faucon PTR.{' '}
              {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <a href="tel:+14388724265" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" /> (438) 872-4265
              </a>
              <a href="mailto:H.rostom@faucon-ptr.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" /> H.rostom@faucon-ptr.com
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Québec, Canada
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Scroll to top ──────────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-amber-500 text-gray-950 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}
