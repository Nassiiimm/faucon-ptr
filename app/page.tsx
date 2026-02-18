'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
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
} from 'lucide-react'

// ─── i18n ────────────────────────────────────────────────────────────────────
type Lang = 'fr' | 'en'

const t = {
  nav: {
    models: { fr: 'Modèles', en: 'Models' },
    services: { fr: 'Services', en: 'Services' },
    realisations: { fr: 'Réalisations', en: 'Portfolio' },
    contact: { fr: 'Contact', en: 'Contact' },
    estimate: { fr: 'Estimer mon projet', en: 'Estimate my project' },
    events: { fr: 'Événements', en: 'Events' },
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
    from: { fr: 'À partir de', en: 'Starting at' },
  },
  services: {
    title: { fr: 'Nos services', en: 'Our services' },
    sub: {
      fr: "De la conception à la livraison, on vous accompagne à chaque étape de votre projet d'aménagement.",
      en: 'From design to delivery, we guide you through every step of your conversion project.',
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
    faq: { fr: 'FAQ', en: 'FAQ' },
    realisations: { fr: 'Réalisations', en: 'Portfolio' },
  },
} as const

function tx(obj: { fr: string; en: string }, lang: Lang) {
  return obj[lang]
}

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
  }, [value])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────
const models = [
  {
    name: 'Sprinter 170',
    image: '/models/sprinter-170.jpg',
    length: "22'",
    sleeps: '2-3',
    price: '85 000 $',
    tag: { fr: 'Populaire', en: 'Popular' },
    desc: {
      fr: 'Le classique pour les aventuriers. Grand espace, toit haut, parfait pour la vie à temps plein.',
      en: 'The classic for adventurers. Spacious, high roof, perfect for full-time living.',
    },
  },
  {
    name: 'Sprinter 144',
    image: '/models/sprinter-144.jpg',
    length: "19'",
    sleeps: '2',
    price: '72 000 $',
    tag: { fr: 'Compact', en: 'Compact' },
    desc: {
      fr: 'Plus maniable, idéal pour le weekend et les sorties régulières.',
      en: 'More maneuverable, ideal for weekends and regular getaways.',
    },
  },
  {
    name: 'Transit 148',
    image: '/models/transit-148.jpg',
    length: "20'",
    sleeps: '2-3',
    price: '68 000 $',
    tag: { fr: 'Rapport qualité-prix', en: 'Best value' },
    desc: {
      fr: 'Plateforme Ford robuste, excellent rapport espace/prix.',
      en: 'Robust Ford platform, excellent space-to-price ratio.',
    },
  },
  {
    name: 'ProMaster 159',
    image: '/models/promaster-159.jpg',
    length: "21'",
    sleeps: '2-4',
    price: '65 000 $',
    tag: { fr: 'Famille', en: 'Family' },
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLang] = useState<Lang>('fr')

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-white/10">
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

            <div className="hidden md:flex items-center gap-8">
              <Link href="#models" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tx(t.nav.models, lang)}
              </Link>
              <Link href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tx(t.nav.services, lang)}
              </Link>
              <Link href="#realisations" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tx(t.nav.realisations, lang)}
              </Link>
              <Link href="#events" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tx(t.nav.events, lang)}
              </Link>
              <Link href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tx(t.nav.contact, lang)}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/30"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>

              <a
                href="tel:+14501234567"
                className="hidden lg:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (450) 123-4567
              </a>

              <Link
                href="#estimate"
                className="hidden sm:inline-flex items-center gap-2 bg-amber-500 text-gray-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-400 transition-colors"
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-amber-400 mb-8">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              {tx(t.hero.eyebrow, lang)}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
              {tx(t.hero.headline1, lang)}{' '}
              <br className="hidden sm:block" />
              <span className="text-amber-500">{tx(t.hero.headline2, lang)}</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed mb-12 max-w-2xl">
              {tx(t.hero.sub, lang)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="#estimate"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-gray-950 px-8 py-4 rounded-full text-base font-semibold hover:bg-amber-400 transition-colors"
              >
                {tx(t.hero.cta1, lang)}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#models"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-colors"
              >
                {tx(t.hero.cta2, lang)}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                {tx(t.hero.trust1, lang)}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                {tx(t.hero.trust2, lang)}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-500" />
                {tx(t.hero.trust3, lang)}
              </div>
            </div>
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
              <div key={i} className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">
                  {'isSeasons' in stat && stat.isSeasons ? (
                    '4'
                  ) : (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Models ─────────────────────────────────────────────────────── */}
      <section id="models" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.models.title, lang)}</h2>
            <p className="text-lg text-gray-400">{tx(t.models.sub, lang)}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/50 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* Image placeholder — replace with real photos */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Truck className="w-16 h-16 text-gray-700 group-hover:text-amber-500/30 transition-colors" />
                </div>

                <div className="p-6">
                  <div className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-3">
                    {tx(model.tag, lang)}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{tx(model.desc, lang)}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5" />
                      {model.length}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {model.sleeps}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {tx(t.models.from, lang)}{' '}
                      <span className="text-amber-500 font-semibold">{model.price}</span>
                    </span>
                    <Link
                      href="#estimate"
                      className="text-sm font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                    >
                      {tx(t.models.discover, lang)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.services.title, lang)}</h2>
            <p className="text-lg text-gray-400">{tx(t.services.sub, lang)}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border border-white/10 bg-gray-950 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <service.icon className="w-6 h-6 text-amber-500 group-hover:text-gray-950 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{tx(service.title, lang)}</h3>
                <p className="text-gray-400 leading-relaxed">{tx(service.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Faucon PTR ─────────────────────────────────────────────── */}
      <section id="realisations" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 border border-white/10">
                <div className="h-full border border-white/10 rounded-2xl bg-gray-800/50 p-6 flex flex-col items-center justify-center text-center gap-6">
                  <Mountain className="w-20 h-20 text-amber-500/40" />
                  <div>
                    <p className="text-2xl font-bold mb-2">
                      {lang === 'fr' ? "Vivez l'aventure" : 'Live the adventure'}
                    </p>
                    <p className="text-gray-400">
                      {lang === 'fr'
                        ? 'Été comme hiver, votre van vous attend.'
                        : 'Summer or winter, your van awaits.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.testimonials.title, lang)}</h2>
            <p className="text-lg text-gray-400">{tx(t.testimonials.sub, lang)}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-gray-950">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  &ldquo;{tx(item.text, lang)}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{tx(item.location, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ─────────────────────────────────────────────────────── */}
      <section id="events" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tx(t.events.title, lang)}</h2>
            <p className="text-lg text-gray-400">{tx(t.events.sub, lang)}</p>
          </div>

          <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-4xl font-bold text-amber-500">5 000 $</div>
              <p className="text-gray-300">{tx(t.events.promo, lang)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/30 transition-colors"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="estimate" className="py-24 lg:py-32 bg-gradient-to-b from-gray-950 to-gray-900 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{tx(t.cta.title, lang)}</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">{tx(t.cta.sub, lang)}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@faucon-ptr.com"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-gray-950 px-8 py-4 rounded-full text-base font-semibold hover:bg-amber-400 transition-colors"
            >
              {tx(t.cta.cta1, lang)}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+14501234567"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {tx(t.cta.cta2, lang)}
            </a>
          </div>
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
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500/20 transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{tx(t.footer.product, lang)}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#models" className="hover:text-white transition-colors">{tx(t.nav.models, lang)}</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">{tx(t.nav.services, lang)}</Link></li>
                <li><Link href="#estimate" className="hover:text-white transition-colors">{tx(t.nav.estimate, lang)}</Link></li>
                <li><Link href="#events" className="hover:text-white transition-colors">{tx(t.nav.events, lang)}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{tx(t.footer.company, lang)}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#realisations" className="hover:text-white transition-colors">{tx(t.footer.realisations, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.blog, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.jobs, lang)}</Link></li>
                <li><a href="mailto:info@faucon-ptr.com" className="hover:text-white transition-colors">{tx(t.nav.contact, lang)}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{tx(t.footer.legal, lang)}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.privacy, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.terms, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.warranty, lang)}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{tx(t.footer.faq, lang)}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Faucon PTR.{' '}
              {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <a href="tel:+14501234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
                (450) 123-4567
              </a>
              <a href="mailto:info@faucon-ptr.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" />
                info@faucon-ptr.com
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Québec, Canada
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
