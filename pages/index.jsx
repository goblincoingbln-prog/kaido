import Header from '../components/header'
import Head from "next/head";
import albums from '../data/albums'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

let _evulLoaded = false

const hero = {
  images:["/img/FotoJet.webp","/img/FotoJet1.webp"],
  title:"Vannitubade ehitus- ja remonditööd Viljandis ja Viljandimaal",
  secTitle:`Kas plaanite vannitoa uuendamist ja soovite kindlat ning professionaalset teostust? DKL Grupp OÜ pakub kvaliteetset tööd, täpset planeerimist ja hoolikat viimistlust. Kliendikeskne lähenemine tähendab selget suhtlust igas etapis, läbipaistvat tööprotsessi, kokkulepetest kinnipidamist ning lahendusi, mis arvestavad teie soovide ja eelarvega. Võtke ühendust, et arutada oma vannitoa ümberehitust.`
}

export default function Home({albums}) {

  const router = useRouter()
  const allImages = albums.flatMap(({ slug, pildid }) => (pildid || []).map(img => ({ ...img, slug })))

  // Marquee animation
  const trackRef = useRef(null)
  const scrollPxRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)
  const [currentGroup, setCurrentGroup] = useState(0)

  const SLIDE_WIDTH = 296 // 280px image + 16px gap
  const groupStarts = albums.map((_, i) =>
    albums.slice(0, i).reduce((acc, a) => acc + (a.pildid || []).length, 0) * SLIDE_WIDTH
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalHalf = track.scrollWidth / 2
    const animate = () => {
      if (!pausedRef.current) {
        scrollPxRef.current += 0.3
        if (scrollPxRef.current >= totalHalf) scrollPxRef.current -= totalHalf
        track.style.transform = `translateX(-${scrollPxRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    if (_evulLoaded) return
    _evulLoaded = true
    if (!document.getElementById('ssb.pistik.dns-prefetch')) {
      const link = document.createElement('link')
      link.id = 'ssb.pistik.dns-prefetch'
      link.href = 'https://pistik.ssb.ee'
      link.rel = 'dns-prefetch'
      document.head.appendChild(link)
    }
    if (!document.getElementById('ssb.pistik.loader')) {
      const script = document.createElement('script')
      script.id = 'ssb.pistik.loader'
      script.type = 'text/javascript'
      script.src = 'https://pistik.ssb.ee/app/public/js/main.js'
      document.head.appendChild(script)
    }
    const load = () => {
      document.dispatchEvent(new CustomEvent('ssb.pistik.loader.load', {
        detail: {
          feature: 'evul-stamp',
          element: document.getElementById('ssb-evul-stamp'),
          options: { reg_code: '12094510', size: 200 }
        }
      }))
    }
    if (document.ssbPistikLoaderReady) {
      load()
    } else {
      document.addEventListener('ssb.pistik.loader.ready', load, { once: true })
    }
  }, [])

  const goToGroup = (idx) => {
    scrollPxRef.current = groupStarts[idx]
    setCurrentGroup(idx)
  }
  const goToPrev = () => goToGroup((currentGroup - 1 + albums.length) % albums.length)
  const goToNext = () => goToGroup((currentGroup + 1) % albums.length)

  const [coopIndex, setCoopIndex] = useState(0)
  const [coopLightbox, setCoopLightbox] = useState(-1)
  const coopImages = Array.from({length: 30}, (_, i) => `/img/coop-kanakula/100000${3589 + i}.jpg`)
  const coopSlides = coopImages.map(src => ({ src }))

  useEffect(() => {
    const timer = setInterval(() => {
      setCoopIndex(prev => (prev + 1) % coopImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const [sendMessage, toggleSendMessage] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const sendMail = (e) => {
    e.preventDefault();
    console.log('Sending')

    let data = {
      name,
      email,
      phone,
      subject,
      message
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setName('')
        setEmail('')
        setPhone('')
        setSubject('')
        setMessage('')
        toggleSendMessage(true)
        setTimeout(() => {
          toggleSendMessage(false)
        }, 6000);
      }
    })
  }

    return (
        <div>
            <Head>
              <title>{hero.title}</title>
              <meta name="description" content="DKL Grupp OÜ — vannitubade ehitus- ja remonditööd Viljandis ja Viljandimaal. Plaatimine, sanitaartehnika, torustik, kodumasinate paigaldus. 25+ aastat kogemust." />
              <link rel="icon" href="/favicon.ico" />
              <link rel="canonical" href="https://www.vannitubailusaks.ee/" />
              {/* Open Graph */}
              <meta property="og:type" content="website" />
              <meta property="og:locale" content="et_EE" />
              <meta property="og:url" content="https://www.vannitubailusaks.ee/" />
              <meta property="og:title" content="DKL Grupp OÜ — Vannitubade ehitus Viljandis" />
              <meta property="og:description" content="Professionaalsed vannitubade ehitus- ja remonditööd Viljandis ja Viljandimaal. 25+ aastat kogemust." />
              <meta property="og:image" content="https://www.vannitubailusaks.ee/img/FotoJet.webp" />
              <meta property="og:site_name" content="DKL Grupp OÜ" />
              {/* Twitter */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="DKL Grupp OÜ — Vannitubade ehitus Viljandis" />
              <meta name="twitter:description" content="Professionaalsed vannitubade ehitus- ja remonditööd Viljandis ja Viljandimaal." />
              <meta name="twitter:image" content="https://www.vannitubailusaks.ee/img/FotoJet.webp" />
              {/* JSON-LD */}
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "DKL Grupp OÜ",
                "description": "Vannitubade ehitus- ja remonditööd Viljandis ja Viljandimaal",
                "url": "https://www.vannitubailusaks.ee",
                "telephone": "+37258047111",
                "email": "kaidolink333@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Pärna Vastemõisa",
                  "addressLocality": "Viljandi maakond",
                  "postalCode": "71301",
                  "addressCountry": "EE"
                },
                "areaServed": "Viljandi maakond",
                "priceRange": "€€",
                "image": "https://www.vannitubailusaks.ee/img/FotoJet.webp"
              })}} />
            </Head>
            <Header />
            {/* Hero — 2 column */}
            <section className="flex flex-col lg:flex-row min-h-[520px]" style={{background:'linear-gradient(135deg, #0f1923 0%, #1a2e42 45%, #1d6b87 100%)'}}>
              {/* LEFT: text + CTAs */}
              <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-16 md:pl-24 lg:pl-32">
                <p className="text-white font-bold tracking-widest text-xs uppercase mb-3" style={{textShadow:'0 1px 4px rgba(0,0,0,0.4)'}}>DKL Grupp OÜ · Viljandi</p>
                <div style={{borderLeft:'4px solid rgba(255,255,255,0.6)', paddingLeft:'16px', marginBottom:'24px'}}>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-snug text-white" style={{textShadow:'0 2px 12px rgba(0,0,0,0.7), 0 4px 24px rgba(0,0,0,0.4)', letterSpacing:'-0.5px'}}>
                    Vannitubade ehitus-<br />ja remonditööd<br />Viljandis ja Viljandimaal
                  </h1>
                </div>
                <p className="text-blue-100 text-base lg:text-lg leading-relaxed mb-10 max-w-xl" style={{marginLeft:'50px'}}>
                  {hero.secTitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#tehtud-tood" className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-md shadow-lg transition">
                    Tehtud tööd
                  </a>
                  <a href="#kontakt" className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#1d6b87] font-bold rounded-md transition">
                    Kontakt
                  </a>
                </div>
              </div>
              {/* RIGHT: EVUL trust stamp */}
              <div className="lg:w-[420px] flex-shrink-0 flex flex-col items-center justify-center px-10 py-14 gap-6" style={{background:'rgba(0,0,0,0.15)'}}>
                <p className="text-sm font-bold tracking-widest text-yellow-400 uppercase text-center">Usaldusmärgis</p>
                <div id="ssb-evul-stamp" />
                <p className="text-sm text-blue-200 font-medium text-center leading-relaxed max-w-[280px]">
                  Eesti Võlausaldajate Liidu liige · reaalajas kontrolli all
                </p>
              </div>
            </section>

            {/* Services section */}
            <section style={{background:'linear-gradient(to bottom, #a8b8c4 0%, #a8b8c4 70%, #ffffff 100%)'}}>
              {/* Header */}
              <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 flex flex-col sm:flex-row sm:items-end gap-4">
                <div>
                  <p className="text-[#1d6b87] font-bold tracking-widest text-xs uppercase mb-2">DKL Grupp OÜ</p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1923] leading-tight">Ehitusteenused</h2>
                </div>
                <div className="sm:ml-auto text-center sm:text-right">
                  <p className="text-5xl font-extrabold text-[#1d6b87] leading-none">25+</p>
                  <p className="text-gray-500 text-sm font-medium mt-1">aastat kogemust</p>
                </div>
              </div>

              {/* Cards grid */}
              <div className="max-w-7xl mx-auto px-6 pb-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { emoji: "🧱", title: "Vannitoa ehitus ja viimistlus", items: ["Plaatimine","Kipsitööd","Elektritööd","Ventilatsioonitööd"] },
                  { emoji: "🚿", title: "Sanitaartehnika paigaldus", items: ["Sanitaartehnika paigaldus","Segistite paigaldus","WC-pottide paigaldus","Duši ja dušikabiinide paigaldus","Boilerite paigaldus ja vahetus","Veeautomaatide (hüdrofoor) paigaldus"] },
                  { emoji: "🔧", title: "Torustik ja küttesüsteemid", items: ["Tarbeveetorustiku paigaldamine","Torustiku (vesi, kanalisatsioon, vesiküte) ehitus ja vahetus","Püstikute vahetus ja remont","Kanalisatsioonitööd","Vesikütte radiaatorite paigaldus ja vahetus","Radiaatorite paigaldamine","Põrandakütte paigaldus"] },
                  { emoji: "🚨", title: "Remont ja avariitööd", items: ["Santehnilised avariid","Torustiku remont","Püstikute remont","Sanitaartehnika vahetus","Kanalisatsiooni ummistuste likvideerimine"] },
                  { emoji: "🏗️", title: "Üldehitus ja lisateenused", items: ["Väiksemad üldehitustööd","Köögi ehitus ja remont","Koridori remont","Tubade väiksemad ehitustööd","Viimistlustööd erinevates ruumides"] },
                ].map(({ emoji, title, items }) => (
                  <div key={title} style={{background:'#1a2e42', boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}} className="rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{emoji}</span>
                      <h3 className="font-bold text-white text-base md:text-lg leading-snug">{title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {items.map(tekst => (
                        <li className="flex items-start gap-2" key={tekst}>
                          <span className="text-yellow-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-blue-100 text-sm">{tekst}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Kodumasinate transport ja paigaldus */}
            <section style={{background:'linear-gradient(135deg, #1d6b87 0%, #1a2e42 55%, #0f1923 100%)'}}>
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[420px]">
                {/* LEFT: text + service list */}
                <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-14">
                  <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-3">Lisateenus</p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                    Kodumasinate transport<br/>ja paigaldus
                  </h2>
                  <ul className="space-y-3 mb-8">
                    {["Pesumasina transport ja paigaldus",
                      "Nõudepesumasina transport ja paigaldus",
                      "Kuivati transport ja paigaldus",
                      "Külmkapi transport ja paigaldus",
                      "Pliidi ja ahju transport ja paigaldus"
                    ].map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-yellow-400 font-bold mt-0.5">✓</span>
                        <span className="text-blue-100 text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#kontakt" className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-md shadow-lg transition w-fit">
                    Võta ühendust
                  </a>
                </div>

                {/* RIGHT: käru.png image */}
                <div className="lg:w-[500px] flex-shrink-0 flex items-center justify-center p-10">
                  <img
                    src="/img/käru.png"
                    alt="Kodumasinate transport"
                    className="max-h-[440px] w-auto object-contain relative z-[1] drop-shadow-2xl"
                  />
                </div>
              </div>
            </section>

            {/* Tehtud tööd section */}
            <section id="tehtud-tood" style={{background:'linear-gradient(to bottom, #a8b8c4 0%, #a8b8c4 70%, #ffffff 100%)'}}>

              {/* Header */}
              <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 flex flex-col sm:flex-row sm:items-end gap-4">
                <div>
                  <p className="text-[#1d6b87] font-bold tracking-widest text-xs uppercase mb-2">DKL Grupp OÜ</p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1923] leading-tight">Tehtud tööd</h2>
                </div>
                <p className="text-gray-500 text-sm sm:ml-auto sm:text-right max-w-xs leading-relaxed">Hover pildil — vaata lähemalt. Kliki — ava projekt.</p>
              </div>

              {/* 2-column body */}
              <div className="max-w-7xl mx-auto px-6 pb-14 flex flex-col lg:flex-row gap-6">

                {/* LEFT: marquee carousel */}
                <div className="flex-1 relative min-w-0 overflow-hidden flex items-center">
                  <button
                    onClick={goToPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full w-10 h-10 shadow-lg flex items-center justify-center font-bold text-lg transition-colors"
                    style={{background:'#1a2e42', color:'#fff', border:'none'}}
                  >
                    &#8592;
                  </button>
                  <div className="overflow-x-clip w-full">
                    <div
                      ref={trackRef}
                      className="flex gap-4"
                      style={{ width: 'max-content' }}
                      onMouseEnter={() => { pausedRef.current = true }}
                      onMouseLeave={() => { pausedRef.current = false }}
                    >
                      {[...allImages, ...allImages].map(({ url, alt, slug }, id) => (
                        <div
                          key={id}
                          className="flex-shrink-0 w-[280px] cursor-pointer relative hover:z-10 group"
                          onClick={() => router.push(`/tehtud-tood/${slug}`)}
                        >
                          <div className="rounded-xl overflow-hidden" style={{boxShadow:'0 8px 24px rgba(0,0,0,0.4)'}}>
                            <img
                              src={url}
                              alt={alt}
                              className="w-full h-[420px] object-cover transition-transform duration-300 group-hover:scale-[2]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full w-10 h-10 shadow-lg flex items-center justify-center font-bold text-lg transition-colors"
                    style={{background:'#1a2e42', color:'#fff', border:'none'}}
                  >
                    &#8594;
                  </button>
                </div>

                {/* RIGHT: Kanaküla Coop featured project */}
                <div className="lg:w-[460px] flex-shrink-0 rounded-2xl overflow-hidden relative" style={{background:'linear-gradient(135deg, #0f1923 0%, #1a2e42 100%)', boxShadow:'0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)', border:'2px solid rgba(234,179,8,0.3)'}}>
                  {/* Gold verified badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{background:'rgba(234,179,8,0.15)', backdropFilter:'blur(8px)', zIndex: 10, border:'1px solid rgba(234,179,8,0.3)'}}>
                    <span className="text-yellow-400 text-sm">&#9733;</span>
                    <span className="text-yellow-400 text-xs font-bold tracking-wider uppercase">Tõendatud</span>
                  </div>
                  <div className="relative h-[420px] overflow-hidden cursor-pointer" onClick={() => setCoopLightbox(coopIndex)}>
                    <img
                      src={coopImages[coopIndex]}
                      alt="Kanaküla Coop"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                      style={{zIndex: 1}}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-32" style={{background:'linear-gradient(transparent, #1a2e42)', zIndex: 2}} />
                    {/* Image counter */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', zIndex: 10}}>
                      {coopIndex + 1} / {coopImages.length}
                    </div>
                  </div>
                  <div className="p-6 pt-2">
                    <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-1">Suurim projekt</p>
                    <h3 className="text-2xl font-extrabold text-white mb-1">Kanaküla Coop</h3>
                    <p className="text-blue-200 text-sm mb-4">Täielik kaupluse siseehitus ja viimistlus</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <p className="text-2xl font-extrabold text-yellow-400 leading-none">30</p>
                        <p className="text-blue-300 text-xs mt-0.5">pilti</p>
                      </div>
                      <div style={{width:'1px', height:'32px', background:'rgba(255,255,255,0.15)'}} />
                      <div>
                        <p className="text-2xl font-extrabold text-yellow-400 leading-none">100%</p>
                        <p className="text-blue-300 text-xs mt-0.5">valminud</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {coopImages.filter((_, i) => i % 5 === 0).map((_, i) => (
                        <button key={i} onClick={() => setCoopIndex(i * 5)}
                          className={`w-2.5 h-2.5 rounded-full transition ${coopIndex >= i*5 && coopIndex < (i+1)*5 ? 'bg-yellow-400 scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
              <Lightbox
                slides={coopSlides}
                open={coopLightbox >= 0}
                index={coopLightbox}
                plugins={[Zoom]}
                zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }}
                close={() => setCoopLightbox(-1)}
              />
            </section>

            {/* Minust section */}
            <section id="minust" className="overflow-hidden" style={{background:'linear-gradient(135deg, #0f1923 0%, #1a2e42 45%, #1d6b87 100%)'}}>
              <div className="flex flex-col lg:flex-row min-h-[620px]">

                {/* Left: content */}
                <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-16 relative">
                  {/* Large decorative quote mark */}
                  <span className="absolute top-8 left-10 text-[120px] font-serif leading-none select-none pointer-events-none" style={{color:'rgba(255,255,255,0.06)'}}>&ldquo;</span>

                  <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-3 relative z-10">DKL Grupp OÜ</p>
                  <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-none relative z-10">
                    Minu<br/><span className="text-yellow-400">lugu</span>
                  </h2>

                  <div className="space-y-4 text-blue-100 text-base md:text-lg leading-relaxed mb-10 relative z-10 max-w-2xl">
                    <p>Käsitöö ja looming on mind paelunud juba varasest noorusest ning just sellest huvist lähtudes valisin oma elukutseks ehituse. Omandasin erialased oskused kursuste kaudu, keskendudes plaatimistöödele, vee- ja elektrisüsteemide paigaldusele ning potsepatööle.</p>
                    <p>Aastate jooksul olen oma teadmisi ja oskusi järjepidevalt täiendanud, töötades nii tavapärastel kui ka tehniliselt keerukatel objektidel. Praktiline kogemus, täpsus ja vastutustunne on kujunenud minu töö alustaladeks.</p>
                    <p>Tänaseks on mul ehitusvaldkonnas kogemust juba üle 25 aasta ning pakun klientidele kvaliteetseid ja läbimõeldud lahendusi, milles on ühendatud oskused, kogemus ja pühendumus oma tööle.</p>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-10 pt-8 border-t relative z-10" style={{borderColor:'rgba(255,255,255,0.15)'}}>
                    <div>
                      <p className="text-5xl font-extrabold text-yellow-400 leading-none">25+</p>
                      <p className="text-blue-200 text-sm mt-1 font-medium tracking-wide">aastat kogemust</p>
                    </div>
                    <div>
                      <p className="text-5xl font-extrabold text-yellow-400 leading-none">100%</p>
                      <p className="text-blue-200 text-sm mt-1 font-medium tracking-wide">pühendumus</p>
                    </div>
                    <div>
                      <p className="text-5xl font-extrabold text-yellow-400 leading-none">Viljandi</p>
                      <p className="text-blue-200 text-sm mt-1 font-medium tracking-wide">piirkond</p>
                    </div>
                  </div>
                </div>

                {/* Right: image panel */}
                <div className="lg:w-[440px] flex-shrink-0 flex items-end justify-center overflow-hidden min-h-[380px] relative" style={{background:'radial-gradient(ellipse 90% 80% at 50% 58%, #d0e4ee 0%, #8ab4c8 25%, #3a6070 60%, #1a2e42 100%)'}}>
                  <span className="absolute bottom-0 right-2 text-[260px] font-extrabold leading-none select-none pointer-events-none" style={{color:'rgba(255,255,255,0.04)'}}>K</span>
                  <img
                    src="/img/kaido.png"
                    alt="Kaido"
                    className="w-full object-contain relative z-[1]"
                  />
                </div>

              </div>
            </section>

            {/* Kontakt section */}
            <section id="kontakt" style={{background:'linear-gradient(135deg, #0f1923 0%, #1a2e42 45%, #1d6b87 100%)'}}>
              <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-14">

                {/* LEFT: contact info */}
                <div className="lg:w-[380px] flex-shrink-0 flex flex-col justify-center">
                  <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-3">Kontakt</p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">Võtke minuga<br/><span className="text-yellow-400">ühendust!</span></h2>
                  <p className="text-blue-200 text-base mb-10 leading-relaxed">Vastame päringutele esimesel võimalusel. Helistage või kirjutage — leiame teie vannitoale parima lahenduse.</p>

                  <div className="space-y-5">
                    {[
                      { icon:"📍", label:"Aadress", value:"Pärna Vastemõisa Viljandi mk, 71301" },
                      { icon:"📞", label:"Telefon", value:"+372 58047111", href:"tel:+37258047111" },
                      { icon:"✉️", label:"Email", value:"kaidolink333@gmail.com", href:"mailto:kaidolink333@gmail.com" },
                      { icon:"🏢", label:"Reg nr", value:"12094510" },
                    ].map(({ icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <span className="text-xl mt-0.5">{icon}</span>
                        <div>
                          <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-0.5">{label}</p>
                          {href
                            ? <a href={href} className="text-white font-medium hover:text-yellow-400 transition">{value}</a>
                            : <p className="text-white font-medium">{value}</p>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: form */}
                <form onSubmit={sendMail} id="myForm" className="flex-1 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text" name="name" id="name" required placeholder="Nimi"
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-blue-300 font-medium outline-none focus:ring-2 focus:ring-yellow-400"
                      style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)'}}
                      value={name} onChange={(e)=>setName(e.target.value)}
                    />
                    <input
                      type="text" name="phone" id="phone" required placeholder="Telefon"
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-blue-300 font-medium outline-none focus:ring-2 focus:ring-yellow-400"
                      style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)'}}
                      value={phone} onChange={(e)=>setPhone(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text" name="subject" id="subject" required placeholder="Teema"
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-blue-300 font-medium outline-none focus:ring-2 focus:ring-yellow-400"
                      style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)'}}
                      value={subject} onChange={(e)=>setSubject(e.target.value)}
                    />
                    <input
                      type="text" name="email" id="email" required placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-blue-300 font-medium outline-none focus:ring-2 focus:ring-yellow-400"
                      style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)'}}
                      value={email} onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <textarea
                    id="message" name="message" rows={6} required placeholder="Sõnum"
                    className="w-full px-4 py-3 rounded-lg text-white placeholder-blue-300 font-medium outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                    style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)'}}
                    value={message} onChange={(e)=>setMessage(e.target.value)}
                  />
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <button type="submit" className="px-10 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-lg shadow-lg transition text-base">
                      Saada sõnum
                    </button>
                    {sendMessage && <p className="text-yellow-400 font-semibold">✓ Aitäh! Sõnum edukalt saadetud.</p>}
                  </div>
                </form>

              </div>
            </section>
        </div>
    );
}

export async function getStaticProps() {
  return {
    props: {
      albums: albums.map(({ slug, pildid }) => ({
        slug,
        pildid: pildid.map(({ url, alt }) => ({ url, alt })),
      })),
    },
  };
}
