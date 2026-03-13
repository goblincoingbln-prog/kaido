import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../../components/header";
import albums from "../../data/albums";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";

const stripHtml = (str) => str ? str.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';

export default function Home({ album: albumData }) {
  const [index, setIndex] = useState(-1);

  const photos = albumData.pildid
    .map(({ url, alt, name }) => ({ src: url, alt, name }))
    .sort((a, b) => +b.name.replace(/\D/g, "") - +a.name.replace(/\D/g, ""));

  const { asukoht, ehitusaeg, slug } = albumData;
  const pageTitle = `${stripHtml(asukoht) || 'Tehtud tööd'} | DKL Grupp OÜ`;
  const pageUrl = `https://www.vannitubailusaks.ee/tehtud-tood/${slug}`;
  const ogImage = photos.length > 0 ? `https://www.vannitubailusaks.ee${photos[0].src}` : '';

  return (
    <div style={{background:'linear-gradient(135deg, #0f1923 0%, #1a2e42 45%, #1d6b87 100%)', minHeight:'100vh'}}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${stripHtml(asukoht)} — tehtud tööd DKL Grupp OÜ poolt. ${photos.length} pilti.`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="et_EE" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={`${stripHtml(asukoht)} — tehtud tööd DKL Grupp OÜ poolt.`} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:site_name" content="DKL Grupp OÜ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Head>
      <Header />

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <Link href="/#tehtud-tood"><a className="inline-flex items-center gap-2 text-blue-200 hover:text-yellow-400 text-sm font-medium mb-8 transition">
          &#8592; Tagasi
        </a></Link>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-2">DKL Grupp OÜ</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {stripHtml(asukoht) || 'Tehtud tööd'}
            </h1>
          </div>
          <div className="sm:ml-auto flex gap-6 text-right">
            {ehitusaeg && (
              <div>
                <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-0.5">Aeg</p>
                <p className="text-white font-semibold">{ehitusaeg}</p>
              </div>
            )}
            <div>
              <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-0.5">Pildid</p>
              <p className="text-white font-semibold">{photos.length}</p>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div style={{height:'1px', background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent)', marginTop:'24px'}} />
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-xl overflow-hidden group"
              style={{boxShadow:'0 4px 16px rgba(0,0,0,0.3)'}}
              onClick={() => setIndex(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt || ""}
                className="w-full h-[220px] md:h-[260px] object-cover transition-transform duration-300 group-hover:scale-110"
                style={{zIndex: 1}}
              />
            </div>
          ))}
        </div>
        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }}
          close={() => setIndex(-1)}
        />
      </div>

      {/* Contact footer */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.15)'}}>
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row gap-10 md:items-center">
          <div>
            <p className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-2">Kontakt</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Võtke minuga ühendust</h2>
            <p className="text-blue-200 text-sm">Vastame päringutele esimesel võimalusel.</p>
          </div>
          <div className="md:ml-auto flex flex-col gap-4">
            {[
              { icon:"📍", value:"Pärna Vastemõisa Viljandi mk, 71301" },
              { icon:"📞", value:"+372 58047111", href:"tel:+37258047111" },
              { icon:"✉️", value:"kaidolink333@gmail.com", href:"mailto:kaidolink333@gmail.com" },
            ].map(({ icon, value, href }) => (
              <div key={value} className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                {href
                  ? <a href={href} className="text-white font-medium hover:text-yellow-400 transition">{value}</a>
                  : <span className="text-white font-medium">{value}</span>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: albums.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const album = albums.find((a) => a.slug === params.slug);
  return {
    props: {
      album: {
        asukoht: album.asukoht,
        ehitusaeg: album.ehitusaeg,
        slug: album.slug,
        pildid: album.pildid,
      },
    },
  };
}
