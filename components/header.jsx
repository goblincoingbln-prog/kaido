import { useRouter } from 'next/router'
import Link from 'next/link'

const navigation = [
    { name: 'Esileht', href: '/' },
    { name: 'Tehtud tööd', href: '/#tehtud-tood' },
    { name: 'Minust', href: '/#minust' },
    { name: 'Kontakt', href: '/#kontakt' },
  ]

  export default function Example() {

    const router = useRouter();

    return (
      <header className="border-b" style={{background:'#a8b8c4', boxShadow:'0 4px 12px rgba(0,0,0,0.25)'}}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " aria-label="Top">
          <div className="w-full flex items-center justify-between items-center h-full z-10">
            <Link  href="/">
              <a className="flex flex-col items-center justify-center my-4" >
                    <span className="sr-only">Company logo</span>
                    <img
                      className="h-12 md:h-16 w-auto relative z-[1]"
                      src="/img/company.svg"
                      alt=""
                      style={{filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'}}
                    />
                    <div className="font-extrabold text-gray-900 text-sm md:text-lg tracking-widest mt-1" style={{textShadow:'0 1px 3px rgba(0,0,0,0.3)'}}>DKL GRUPP OÜ</div>
                  </a>
              </Link>
              <div className="hidden ml-10 lg:flex items-center justify-center divide-x divide-gray-300">
                {navigation.map((link) => (
                  <Link key={link.name} href={link.href} >
                    <a className={`${router.asPath === link.href ? "text-blue-500" : "text-gray-900 hover:text-blue-500"} px-6 text-lg font-bold tracking-wide`} style={{textShadow:'0 1px 3px rgba(0,0,0,0.2)'}}>
                      {link.name}
                    </a>
                  </Link>
                ))}
            </div>
            <div className="text-sm sm:text-base">
              <a className="space-x-2 md:space-x-4 mb-1 text-gray-900 font-extrabold flex items-center justify-center text-base md:text-lg hover:text-blue-500 transition" href="tel:+37258047111" style={{textShadow:'0 1px 3px rgba(0,0,0,0.25)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>+372 58047111</div>
              </a>
              <a href="mailto:kaidolink333@gmail.com" className="text-gray-700 font-semibold hover:text-blue-500 transition block text-center" style={{textShadow:'0 1px 3px rgba(0,0,0,0.2)'}}>kaidolink333@gmail.com</a>
            </div>
          </div>
          <div className="py-4 flex flex-wrap justify-center divide-x divide-gray-300 lg:hidden">
            {navigation.map((link) => (
              <Link href={link.href} key={link.name}>
                <a className={`${router.asPath === link.href ? "text-blue-500" : "text-gray-900 hover:text-blue-500"} px-3 md:px-5 text-sm md:text-lg font-bold tracking-wide`} style={{textShadow:'0 1px 3px rgba(0,0,0,0.2)'}}>
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </header>
    )
  }
