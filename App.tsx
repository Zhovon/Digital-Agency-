
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- HOOKS ---
// FIX: Updated the `useInView` hook to correctly handle a `triggerOnce` property. This resolves TypeScript errors where the property was being passed without being in the type definition.
const useInView = (options?: IntersectionObserverInit & { triggerOnce?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const { triggerOnce = true, ...observerOptions } = options || {};
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                if (triggerOnce && ref.current) {
                    observer.unobserve(ref.current);
                }
            } else {
                if (!triggerOnce) {
                    setIsInView(false);
                }
            }
        }, observerOptions);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, isInView] as const;
};

const useAnimatedCounter = (target: number, duration = 2000, startInView: boolean) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!startInView) return;
        
        let start = 0;
        const startTime = Date.now();
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                setCount(Math.floor(target * progress));
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration, startInView]);

    return count;
};


// --- REUSABLE COMPONENTS ---

interface AnimatedCharTextProps {
    text: string;
    className?: string;
    stagger?: number;
    once?: boolean;
}
const AnimatedCharText: React.FC<AnimatedCharTextProps> = ({ text, className, stagger = 0.02, once=true }) => {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: once });
    return (
        <div ref={ref} className={className} aria-label={text}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="inline-block"
                    style={{
                        transition: `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                        transitionDelay: `${isInView ? index * stagger : 0}s`,
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};


interface AnimatedFadeInProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    className?: string;
}

const AnimatedFadeIn: React.FC<AnimatedFadeInProps> = ({ children, direction = 'up', delay = 0, className = '' }) => {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    
    const getTransform = (dir: string) => {
        if (isInView) return 'translate(0, 0)';
        switch (dir) {
            case 'up': return 'translateY(50px)';
            case 'down': return 'translateY(-50px)';
            case 'left': return 'translateX(50px)';
            case 'right': return 'translateX(-50px)';
            default: return 'translateY(50px)';
        }
    };

    return (
        <div 
            ref={ref}
            className={className}
            style={{
                transition: `opacity 1.5s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)`,
                transitionDelay: `${delay}s`,
                opacity: isInView ? 1 : 0,
                transform: getTransform(direction),
            }}
        >
            {children}
        </div>
    );
};


const Counter: React.FC<{ target: number; suffix?: string; className?: string; textClassName?: string }> = ({ target, suffix, className, textClassName }) => {
    const [ref, isInView] = useInView({ threshold: 0.5, triggerOnce: true });
    const count = useAnimatedCounter(target, 2000, isInView);
    return (
        <div ref={ref} className={className}>
            <span className={textClassName}>{count}{suffix}</span>
        </div>
    );
};

const Marquee: React.FC<{ items: string[] }> = ({ items }) => {
    const marqueeContent = items.map((item, i) => (
        <div key={i} className="flex items-center shrink-0">
            <span className="text-2xl font-medium uppercase mx-6">{item}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#000" /></svg>
        </div>
    ));
    return (
        <div className="w-full overflow-hidden bg-[#F08F42] py-6 text-black">
            <div className="flex animate-marquee">
                {marqueeContent}
                {marqueeContent}
            </div>
        </div>
    );
};


// --- DATA & ICONS ---
const ArrowDownIcon = () => <img decoding="async" width="170" height="157" src="https://retrosdigitals.com/wp-content/uploads/2023/12/arrow-down-big.png" alt="" />;
const HamburgerIcon = () => <img src="https://retrosdigitals.com/wp-content/uploads/2023/12/hamburger-icon.png" alt="menu" className="w-6 h-auto" />;
const CloseIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const marqueeItems = [
    "Website Design & Development", "Social Media Marketing", "Search Engine Optimization (SEO)", "Meta & Google Ads Management", "Branding & Graphic Design", "Email Marketing", "Content Creation (Reels, Videos, Copy)"
];

const servicesData = [
    { num: "1", title: "Website Development & Hosting", desc: "Custom websites with domain, hosting, SSL, and ongoing support.", img: "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-15.webp" },
    { num: "2", title: "Digital Marketing", desc: "Social media growth, sales strategies, lead generation, and conversion optimization.", img: "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-14.webp" },
    { num: "3", title: "Social Media Management", desc: "Full account handling, daily posting, reels, captions, and audience engagement.", img: "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-13.webp" },
    { num: "4", title: "Paid Advertising (Meta & Google Ads)", desc: "Targeted ad campaigns to boost traffic, sales, and brand visibility.", img: "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-12.webp" },
    { num: "5", title: "Branding & Media Production", desc: "Logo design, brand kits, on-site product shoots, and promotional content creation.", img: "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-11.webp" }
];

const workflowData = [
    { step: "01", title: "Consultation", desc: "Reach out to discuss your goals and requirements." },
    { step: "02", title: "Strategy & Planning", desc: "We create a custom strategy tailored to your business." },
    { step: "03", title: "Execution", desc: "Our team brings the plan to life with precision and speed." },
    { step: "04", title: "Launch & Support", desc: "We launch your project and offer ongoing support." }
];

const portfolioData = [
  { img: "https://retrosdigitals.com/wp-content/uploads/2024/02/Untitled-design-2025-07-09T061336.019.png", title: "AMC – Medical Complex", date: "February 6, 2024" },
  { img: "https://retrosdigitals.com/wp-content/uploads/2024/02/Untitled-17.webp", title: "Alpha Global MS – (BPO) & Healthcare Administration", date: "February 6, 2024" },
  { img: "https://retrosdigitals.com/wp-content/uploads/2024/02/Untitled-18-1.webp", title: "Elevate Work Pro – Automotive Services & Inspection Reports", date: "February 6, 2024" },
  { img: "https://retrosdigitals.com/wp-content/uploads/2024/02/Untitled-20.webp", title: "Helrish – Perfume Brand", date: "February 6, 2024" },
];

const blogData = [
    {img: "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-29.webp", category: "How to get more leads with Facebook ads in Pakistan", date: "October 4, 2025", title: "How to get more leads with Facebook ads in Pakistan"},
    {img: "https://retrosdigitals.com/wp-content/uploads/2025/09/programming-background-with-person-working-with-codes-computer-scaled.webp", category: "Uncategorized", date: "October 4, 2025", title: "Local SEO services in Lahore/Karachi/Islamabad"},
    {img: "https://retrosdigitals.com/wp-content/uploads/2025/09/medium-shot-man-holding-smartphone-scaled.webp", category: "Instagram marketing tips for Pakistani brands", date: "October 4, 2025", title: "Instagram marketing tips for Pakistani brands"},
];

const brands = [
    "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-design-2025-03-06T091450.216-e1741281372456.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/cropped-Untitled-design-2025-03-03T003149.404.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-8.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-design-2025-03-01T114533.463.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/cropped-R.EX-Final-Logo.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/logo-1.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/Black-and-Blue-Early-Bird-Conpany-Logo-1-e1745098676528.webp",
    "https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled_design_-_2025-07-09T053453.689-removebg-preview.png",
];


// --- SECTIONS & LAYOUT COMPONENTS ---

const OffCanvasMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 bg-[#212125] z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`flex h-full transition-all duration-500 ${isOpen ? '' : 'opacity-0'}`}>
                {/* Left Panel */}
                <div className={`w-1/3 bg-[#1C1D20] p-10 md:p-16 flex flex-col justify-between transition-transform duration-700 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div>
                        <img src="https://retrosdigitals.com/wp-content/uploads/2023/12/admin-ajax-removebg-preview.png" alt="Logo" className="w-32 mb-12" />
                        <ul className="text-white space-y-6 font-kanit">
                            <li>
                                <p className="text-gray-400 text-sm uppercase">Phone</p>
                                <a href="tel:+923700608049" className="text-xl hover:text-[#F08F42] transition-colors">+92 3700 608049</a>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm uppercase">Email</p>
                                <a href="mailto:info@retrosdigitals.com" className="text-xl hover:text-[#F08F42] transition-colors">info@retrosdigitals.com</a>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm uppercase">Location</p>
                                <span className="text-lg">Hassan block, Nishter Colony, Lahore, 54950, Pakistan</span>
                            </li>
                        </ul>
                    </div>
                    <p className="text-gray-400 text-sm">&copy; Alrights reserved by Retros Digitals</p>
                </div>

                {/* Right Panel */}
                <div className={`w-2/3 p-10 md:p-16 flex flex-col justify-center relative transition-transform duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                     <button onClick={onClose} className="absolute top-8 right-8 text-white w-20 h-20 rounded-full bg-[#333337] flex items-center justify-center hover:bg-[#F08F42] transition-all duration-300">
                        <CloseIcon />
                    </button>
                    <nav>
                        <ul className="text-5xl lg:text-7xl font-bold text-gray-800 space-y-4">
                            {['Home', 'Portfolio', 'Our Services', 'About Us', 'Contact Us'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-white transition-colors duration-300">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Header: React.FC<{ onMenuOpen: () => void }> = ({ onMenuOpen }) => {
    return (
        <header className="fixed top-0 left-0 h-screen w-24 bg-transparent z-30 flex flex-col items-center justify-between py-10 border-r border-white/20 mix-blend-exclusion max-lg:hidden">
            <a href="#">
                <img src="https://retrosdigitals.com/wp-content/uploads/2023/12/WhatsApp-Image-2025-07-05-at-1.32.30-AM-e1751662169888.jpeg" alt="Logo" className="w-16 h-16 transform -rotate-90"/>
            </a>
            <button onClick={onMenuOpen} className="text-white">
                <HamburgerIcon />
            </button>
            <div className="transform -rotate-90 whitespace-nowrap text-white/50">
                <span className="mr-8">Support center</span>
                <span className="text-white font-semibold">+92 3700 608049</span>
            </div>
        </header>
    );
};

const MobileHeader: React.FC<{ onMenuOpen: () => void }> = ({ onMenuOpen }) => {
    return (
        <header className="fixed top-0 left-0 w-full bg-black z-30 flex items-center justify-between p-4 lg:hidden">
             <a href="#">
                <img src="https://retrosdigitals.com/wp-content/uploads/2023/12/admin-ajax-removebg-preview.png" alt="Logo" className="w-24 h-auto"/>
            </a>
            <button onClick={onMenuOpen} className="text-white">
                <HamburgerIcon />
            </button>
        </header>
    )
}

// --- MAIN APP ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <div className="bg-[#f3f3f3]">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            <MobileHeader onMenuOpen={() => setIsMenuOpen(true)} />
            <OffCanvasMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <main className="lg:ml-24">
                {/* Hero Section */}
                <section className="bg-black text-white min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-20 relative" style={{backgroundImage: "url('https://retrosdigitals.com/wp-content/uploads/2024/03/bg-img.webp')", backgroundSize: 'contain', backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat'}}>
                    <div className="pt-20 lg:pt-0">
                        <AnimatedFadeIn direction="right" className="w-fit">
                           <a href="#" className="font-kanit text-lg border-b border-white pb-2">Strategy, Design, Solution Development</a>
                        </AnimatedFadeIn>
                    </div>
                    
                    <div className="relative">
                        <AnimatedCharText text="Digital Marketing Agency" className="text-5xl md:text-8xl lg:text-9xl xl:text-[140px] font-prata font-medium leading-none" />
                        <AnimatedFadeIn delay={0.5} className="max-w-sm text-gray-400 absolute bottom-0 right-0 translate-y-full lg:translate-y-1/2 font-kanit text-lg">
                            <p>As a trusted digital marketing agency in Pakistan, our approach combines innovation, technology, and results-driven solutions to help businesses dominate in the online space.</p>
                        </AnimatedFadeIn>
                    </div>

                    <div className="flex justify-between items-end mt-20">
                        <AnimatedFadeIn delay={0.8}>
                            <ArrowDownIcon/>
                        </AnimatedFadeIn>
                        <div className="text-left font-kanit">
                            <Counter target={25} suffix="k+" textClassName="text-5xl font-light"/>
                            <p className="text-lg">Projects completed successfully</p>
                        </div>
                    </div>
                </section>

                <Marquee items={marqueeItems} />

                {/* About Section */}
                <section className="py-20 px-6 lg:px-20 text-center">
                    <AnimatedCharText text="Get Your Website From Pakistani Experienced Developers !" className="text-4xl md:text-5xl font-bold font-kanit max-w-4xl mx-auto mb-6" />
                    <AnimatedFadeIn className="max-w-3xl mx-auto text-gray-600 mb-10 text-lg">
                        <p>Welcome to<strong> Retros Digitals</strong>, your <strong>trusted digital marketing agency in Pakistan</strong> dedicated to transforming brands through innovative digital marketing solutions. Whether you’re a startup looking to build your online presence or an established<strong> business</strong> aiming to scale, we deliver tailored strategies that drive results.</p>
                    </AnimatedFadeIn>
                    <AnimatedFadeIn>
                        <img src="https://retrosdigitals.com/wp-content/uploads/2025/07/Untitled-44.webp" alt="Digital Marketing Agency in Pakistan" className="mx-auto my-8 max-w-full h-auto" />
                    </AnimatedFadeIn>
                    <AnimatedFadeIn>
                        <a href="#" className="inline-block bg-[#F08F42] text-black font-bold py-4 px-8 rounded-full hover:bg-black hover:text-white transition-colors">CLAIM OFFER !</a>
                    </AnimatedFadeIn>
                </section>

                {/* Services Section */}
                <section className="bg-black text-white py-20 px-6 lg:px-20">
                    <div className="flex flex-wrap justify-between items-center mb-12">
                        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                             <AnimatedCharText text="Services" className="text-lg text-gray-400 mb-2"/>
                             <AnimatedCharText text="Solution we provide" className="text-5xl font-prata"/>
                        </div>
                        <p className="w-full lg:w-1/3 text-gray-400">At Retros Digitals, we don’t just provide digital services – we build long-term digital success.</p>
                        <div className="w-full lg:w-1/3 text-right mt-6 lg:mt-0">
                            <a href="#" className="btn-circle border border-white rounded-full w-40 h-40 flex items-center justify-center text-center">View<br /> all services</a>
                        </div>
                    </div>
                    <div className="mt-16">
                        {servicesData.map((service, index) => (
                        <AnimatedFadeIn key={index} delay={index * 0.1}>
                            <div className="group axtra-service__item border-t border-gray-700 py-8 flex justify-between items-center relative cursor-pointer">
                                <span className="text-4xl font-prata">{service.num}</span>
                                <h3 className="text-3xl lg:text-5xl font-prata flex-1 px-8">{service.title}</h3>
                                <p className="text-gray-400 max-w-xs hidden lg:block">{service.desc}</p>
                                <div className="w-12 h-12 border rounded-full flex items-center justify-center">→</div>
                                <div className="thumb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 z-10 pointer-events-none">
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </AnimatedFadeIn>
                        ))}
                    </div>
                </section>
                
                {/* Stats Section */}
                <section className="bg-black text-white py-20 px-6 lg:px-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <AnimatedFadeIn>
                            <Counter target={25} suffix="K" textClassName="text-6xl font-prata" />
                            <p className="text-gray-400 mt-2">Project<br/>completed</p>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn delay={0.1}>
                            <Counter target={8} suffix="K+" textClassName="text-6xl font-prata" />
                            <p className="text-gray-400 mt-2">Happy<br/>customers</p>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn delay={0.2}>
                            <Counter target={15} textClassName="text-6xl font-prata" />
                            <p className="text-gray-400 mt-2">Years<br/>experiences</p>
                        </AnimatedFadeIn>
                         <AnimatedFadeIn delay={0.3}>
                            <Counter target={98} textClassName="text-6xl font-prata" />
                            <p className="text-gray-400 mt-2">Awards<br/>achievement</p>
                        </AnimatedFadeIn>
                    </div>
                </section>
                
                {/* Workflow Section */}
                <section className="bg-[#121212] text-white py-20 px-6 lg:px-20">
                     <AnimatedCharText text="Workflow" className="text-lg text-gray-400 mb-2"/>
                     <AnimatedCharText text="How we work" className="text-5xl font-prata mb-12"/>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-700">
                        {workflowData.map((item, index) => (
                             <AnimatedFadeIn key={index} delay={index * 0.1} className="bg-[#121212] p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-500 font-kanit">Step {item.step}</span>
                                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center bg-black">
                                      <img src="https://retrosdigitals.com/wp-content/uploads/2024/02/animation-circle.png" alt="circle" className="w-4 h-4"/>
                                    </div>
                                </div>
                                <h3 className="text-8xl font-prata mb-4">{item.step}</h3>
                                <h4 className="text-2xl font-prata mb-4">{item.title}</h4>
                                <p className="text-gray-400">{item.desc}</p>
                            </AnimatedFadeIn>
                        ))}
                     </div>
                </section>

                {/* Portfolio Section */}
                <section className="bg-black text-white py-20 px-6 lg:px-20">
                    <h2 className="text-8xl md:text-9xl font-prata mb-12">Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {portfolioData.map((item, index) => (
                            <AnimatedFadeIn key={index} delay={index * 0.1}>
                                <div className="group">
                                    <div className="overflow-hidden">
                                        <img src={item.img} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-2xl font-prata">{item.title}</h3>
                                        <p className="text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                            </AnimatedFadeIn>
                        ))}
                    </div>
                     <div className="text-center mt-16">
                        <a href="#" className="btn-circle border border-white rounded-full w-40 h-40 flex items-center justify-center text-center mx-auto">View<br /> all projects</a>
                    </div>
                </section>
                
                {/* Brands Section */}
                <section className="bg-black text-white py-20 px-6 lg:px-20 border-t border-b border-gray-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center">
                        {brands.slice(0, 4).map((brand, i) => <AnimatedFadeIn key={i} delay={i*0.1}><img src={brand} alt={`brand ${i}`} className="mx-auto max-h-20 object-contain"/></AnimatedFadeIn>)}
                    </div>
                </section>
                
                {/* Blog Section */}
                <section className="bg-[#121212] text-white py-20 px-6 lg:px-20">
                     <AnimatedCharText text="Recent Blog" className="text-lg text-gray-400 mb-2"/>
                     <AnimatedCharText text="News insight" className="text-5xl font-prata mb-12"/>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogData.map((post, i) => (
                             <AnimatedFadeIn key={i} delay={i*0.1}>
                                <div className="group">
                                    <div className="overflow-hidden"><img src={post.img} alt={post.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"/></div>
                                    <div className="py-4">
                                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                                            <span>{post.category}</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-prata hover:text-[#F08F42] transition-colors">{post.title}</h3>
                                    </div>
                                </div>
                            </AnimatedFadeIn>
                        ))}
                     </div>
                </section>

                 {/* CTA Section */}
                <section className="bg-[#1D1D1D] text-white py-20 px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <AnimatedCharText text="Work with us" className="text-7xl md:text-9xl font-prata"/>
                        <AnimatedCharText text="We would love to hear more about your project" className="text-2xl text-gray-400 mt-4 max-w-md"/>
                    </div>
                    <AnimatedFadeIn delay={0.2}>
                         <a href="#" className="btn-circle border border-white rounded-full w-48 h-48 flex items-center justify-center text-center">Let’s<br /> talk us</a>
                    </AnimatedFadeIn>
                </section>
            </main>
        </div>
    );
}