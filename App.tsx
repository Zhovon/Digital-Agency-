import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- HOOKS ---
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

const useStickyScale = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const { top, height } = container.getBoundingClientRect();
        
        if (top > window.innerHeight || top + height < 0) {
            setStyle({
                 fontSize: '5vw',
                 lineHeight: '1',
                 opacity: 1,
                 transform: 'translateY(0px)',
                 willChange: 'font-size, opacity, transform',
            });
            return;
        }

        const scrollDistance = height - window.innerHeight;
        if (scrollDistance <= 0) return;

        const scrollProgress = Math.max(0, Math.min(1, -top / scrollDistance));

        const maxFontSize = 20; // vw
        const minFontSize = 5;  // vw
        
        const moveAndScaleEnd = 0.15;
        const scaleDownStart = 0.85;

        let fontSize;
        let opacity;
        let transform;
        const centerOffsetVh = 35;

        if (scrollProgress < moveAndScaleEnd) {
            // Phase 1: Scaling up and moving to center
            const progress = scrollProgress / moveAndScaleEnd;
            fontSize = minFontSize + progress * (maxFontSize - minFontSize);
            transform = `translateY(${progress * centerOffsetVh}vh)`;
            opacity = 1;
        } else if (scrollProgress > scaleDownStart) {
            // Phase 3: Scaling down
            const progress = (scrollProgress - scaleDownStart) / (1 - scaleDownStart);
            fontSize = maxFontSize - progress * (maxFontSize - minFontSize);
            transform = `translateY(${centerOffsetVh}vh)`;
            opacity = 0.1 - (progress * 0.1);
        } else {
            // Phase 2: Hold max font-size and become transparent
            fontSize = maxFontSize;
            transform = `translateY(${centerOffsetVh}vh)`;
            opacity = 0.1;
        }
        
        fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));
        
        setStyle({
            fontSize: `${fontSize}vw`,
            lineHeight: '1',
            opacity,
            transform,
            willChange: 'font-size, opacity, transform',
        });

    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return [containerRef, targetRef, style] as const;
};

const useDraggableScroll = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let isDragging = false;
        let startPos = 0;
        let scrollLeftStart = 0;
        let lastPos = 0;
        let velocity = 0;
        let momentumID: number;

        element.style.cursor = 'grab';

        const getPositionX = (e: MouseEvent | TouchEvent) => {
            return e.type.includes('touch') ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).pageX;
        };

        const onDragStart = (e: MouseEvent | TouchEvent) => {
            isDragging = true;
            element.style.cursor = 'grabbing';
            element.style.userSelect = 'none';
            startPos = getPositionX(e);
            scrollLeftStart = element.scrollLeft;
            lastPos = startPos;
            velocity = 0;
            cancelAnimationFrame(momentumID);
            
            window.addEventListener('mousemove', onDragging);
            window.addEventListener('touchmove', onDragging, { passive: false });
            window.addEventListener('mouseup', onDragEnd, { once: true });
            window.addEventListener('touchend', onDragEnd, { once: true });
        };

        const onDragging = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            if (e.type.includes('touch')) {
                e.preventDefault();
            }

            const currentPos = getPositionX(e);
            const walk = currentPos - startPos;
            element.scrollLeft = scrollLeftStart - walk;

            velocity = currentPos - lastPos;
            lastPos = currentPos;
        };
        
        const onDragEnd = () => {
            isDragging = false;
            element.style.cursor = 'grab';
            element.style.userSelect = 'auto';
            
            window.removeEventListener('mousemove', onDragging);
            window.removeEventListener('touchmove', onDragging);
            
            beginMomentum();
        };
        
        const beginMomentum = () => {
            cancelAnimationFrame(momentumID);
            momentumID = requestAnimationFrame(momentumLoop);
        };
        
        const momentumLoop = () => {
            element.scrollLeft -= velocity;
            velocity *= 0.95; // Damping factor
            if (Math.abs(velocity) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        };

        element.addEventListener('mousedown', onDragStart);
        element.addEventListener('touchstart', onDragStart, { passive: true });

        return () => {
            element.removeEventListener('mousedown', onDragStart);
            element.removeEventListener('touchstart', onDragStart);
            window.removeEventListener('mousemove', onDragging);
            window.removeEventListener('touchmove', onDragging);
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('touchend', onDragEnd);
            cancelAnimationFrame(momentumID);
        };
    }, []);

    return ref;
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
const ArrowDownIcon = () => (
    <svg width="100" height="92" viewBox="0 0 170 157" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white w-16 sm:w-24">
        <path d="M85 156.5L1.5 73L168.5 73L85 156.5Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M85 0V152" stroke="currentColor" strokeWidth="2"/>
    </svg>
);
const HamburgerIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);
const CloseIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const marqueeItems = [
    "Website Design & Development", "Social Media Marketing", "Search Engine Optimization (SEO)", "Meta & Google Ads Management", "Branding & Graphic Design", "Email Marketing", "Content Creation (Reels, Videos, Copy)"
];

const servicesData = [
    { num: "1", title: "Website Development & Hosting", desc: "Custom websites with domain, hosting, SSL, and ongoing support.", img: "https://placehold.co/400x550/212125/444448?text=Service+1" },
    { num: "2", title: "Digital Marketing", desc: "Social media growth, sales strategies, lead generation, and conversion optimization.", img: "https://placehold.co/400x550/212125/444448?text=Service+2" },
    { num: "3", title: "Social Media Management", desc: "Full account handling, daily posting, reels, captions, and audience engagement.", img: "https://placehold.co/400x550/212125/444448?text=Service+3" },
    { num: "4", title: "Paid Advertising (Meta & Google Ads)", desc: "Targeted ad campaigns to boost traffic, sales, and brand visibility.", img: "https://placehold.co/400x550/212125/444448?text=Service+4" },
    { num: "5", title: "Branding & Media Production", desc: "Logo design, brand kits, on-site product shoots, and promotional content creation.", img: "https://placehold.co/400x550/212125/444448?text=Service+5" }
];

const workflowData = [
    { step: "01", title: "Consultation", desc: "Reach out to discuss your goals and requirements." },
    { step: "02", title: "Strategy & Planning", desc: "We create a custom strategy tailored to your business." },
    { step: "03", title: "Execution", desc: "Our team brings the plan to life with precision and speed." },
    { step: "04", title: "Launch & Support", desc: "We launch your project and offer ongoing support." }
];

const portfolioData = [
  { img: "https://placehold.co/800x1000/212125/444448?text=Project+1", title: "AMC – Medical Complex", date: "February 6, 2024" },
  { img: "https://placehold.co/800x600/212125/444448?text=Project+2", title: "Alpha Global MS – (BPO) & Healthcare Administration", date: "February 6, 2024" },
  { img: "https://placehold.co/800x600/212125/444448?text=Project+3", title: "Elevate Work Pro – Automotive Services", date: "February 6, 2024" },
  { img: "https://placehold.co/800x1000/212125/444448?text=Project+4", title: "Helrish – Perfume Brand", date: "February 6, 2024" },
  { img: "https://placehold.co/800x1000/212125/444448?text=Project+5", title: "Tech Innovate", date: "March 15, 2024" },
  { img: "https://placehold.co/800x600/212125/444448?text=Project+6", title: "GreenScape Landscaping", date: "April 22, 2024" },
  { img: "https://placehold.co/800x600/212125/444448?text=Project+7", title: "Quantum Solutions", date: "May 1, 2024" },
  { img: "https://placehold.co/800x1000/212125/444448?text=Project+8", title: "Apex Construction", date: "June 18, 2024" },
];

const testimonialsData = [
    { quote: "Zhovon's team is a game-changer. Their digital marketing strategies doubled our online engagement in just a few months.", author: "Jane Doe", company: "CEO, Innovate Inc." },
    { quote: "The new website is stunning and functional. We've seen a significant increase in conversions since the launch.", author: "John Smith", company: "Marketing Director, Solutions Co." },
    { quote: "Professional, creative, and results-driven. Working with them was a pleasure from start to finish.", author: "Emily White", company: "Founder, Startup Hub" },
    { quote: "The attention to detail and commitment to our brand's vision was outstanding. Highly recommend Zhovon!", author: "Michael Chen", company: "Owner, Artisan Goods" },
    { quote: "Their SEO work put us on the first page of Google. The results speak for themselves.", author: "Sarah Lee", company: "Manager, Local Eats" },
];

const brandsData = [
    "https://placehold.co/200x100/ffffff/cccccc?text=Brand+A",
    "https://placehold.co/200x100/ffffff/cccccc?text=Brand+B",
    "https://placehold.co/200x100/ffffff/cccccc?text=Brand+C",
    "https://placehold.co/200x100/ffffff/cccccc?text=Brand+D",
    "https://placehold.co/200x100/ffffff/cccccc?text=Brand+E",
    "https://placehold.co/200x100/ffffff/cccccc?text=Brand+F",
];

const blogData = [
    {img: "https://placehold.co/800x600/212125/444448?text=Blog+1", category: "Digital Marketing", date: "October 4, 2025", title: "How to get more leads with Facebook ads"},
    {img: "https://placehold.co/800x600/212125/444448?text=Blog+2", category: "SEO", date: "October 4, 2025", title: "The ultimate guide to Local SEO services"},
    {img: "https://placehold.co/800x600/212125/444448?text=Blog+3", category: "Social Media", date: "October 4, 2025", title: "Top Instagram marketing tips for new brands"},
];

// --- SECTIONS & LAYOUT COMPONENTS ---
const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
];

const OffCanvasMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 bg-[#212125] z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`flex flex-col md:flex-row h-full transition-all duration-500 ${isOpen ? '' : 'opacity-0'}`}>
                {/* Left Panel */}
                <div className={`w-full md:w-1/3 bg-[#1C1D20] p-8 sm:p-10 md:p-16 flex flex-col justify-between transition-transform duration-700 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div>
                        <a href="#home" onClick={onClose} className="text-white text-3xl font-prata font-bold mb-12 inline-block">ZHOVON</a>
                        <ul className="text-white space-y-6 font-kanit">
                            <li>
                                <p className="text-gray-400 text-sm uppercase">Phone</p>
                                <a href="tel:+1234567890" className="text-xl hover:text-[#F08F42] transition-colors">+1 234 567 890</a>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm uppercase">Email</p>
                                <a href="mailto:info@zhovon.com" className="text-xl hover:text-[#F08F42] transition-colors">info@zhovon.com</a>
                            </li>
                            <li>
                                <p className="text-gray-400 text-sm uppercase">Location</p>
                                <span className="text-lg">123 Creative Ave, Digital City</span>
                            </li>
                        </ul>
                    </div>
                    <p className="text-gray-400 text-sm mt-8">&copy; All rights reserved by Zhovon</p>
                </div>

                {/* Right Panel */}
                <div className={`w-full md:w-2/3 p-8 sm:p-10 md:p-16 flex flex-col justify-center relative transition-transform duration-700 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                     <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#333337] flex items-center justify-center hover:bg-[#F08F42] transition-all duration-300">
                        <CloseIcon />
                    </button>
                    <nav>
                        <ul className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-800 space-y-4">
                            {navLinks.map(item => (
                                <li key={item.name}>
                                    <a href={item.href} onClick={onClose} className="hover:text-white transition-colors duration-300">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const SidebarSocialLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
    <a href={href} className="text-white/50 hover:text-white transition-colors text-sm font-kanit transform -rotate-90 whitespace-nowrap">{children}</a>
);

const Sidebar: React.FC<{ onMenuOpen: () => void }> = ({ onMenuOpen }) => (
    <aside className="fixed top-0 left-0 h-screen w-20 md:w-28 bg-[#121212] z-40 flex flex-col justify-between items-center py-10 border-r border-white/10">
        <a href="#home" className="text-white text-2xl md:text-3xl font-prata font-bold -rotate-90 whitespace-nowrap">ZHOVON</a>
        
        <button onClick={onMenuOpen} className="text-white z-50 p-4 rounded-full hover:bg-white/10 transition-colors">
            <HamburgerIcon />
        </button>
        
        <div className="hidden md:flex flex-col space-y-12">
             <SidebarSocialLink href="#">Facebook</SidebarSocialLink>
             <SidebarSocialLink href="#">Instagram</SidebarSocialLink>
             <SidebarSocialLink href="#">LinkedIn</SidebarSocialLink>
        </div>
    </aside>
);


const Footer = () => {
    return (
        <footer className="bg-[#121212] text-white py-10 px-6 lg:px-20">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-4 md:mb-0">
                    <a href="#home" className="text-white text-4xl font-prata font-bold">ZHOVON</a>
                    <p className="text-gray-400 mt-2 font-kanit">Creative Solutions, Digital Growth.</p>
                </div>
                <div className="text-gray-400 font-kanit">
                    <p>&copy; {new Date().getFullYear()} Zhovon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

// --- MAIN APP ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [workContainerRef, workHeadingRef, workHeadingStyle] = useStickyScale();
    const draggableRef = useDraggableScroll();

    const leftColumnProjects = portfolioData.filter((_, index) => index % 2 === 0);
    const rightColumnProjects = portfolioData.filter((_, index) => index % 2 !== 0);
    
    return (
        <div className="bg-[#f3f3f3]">
            <Sidebar onMenuOpen={() => setIsMenuOpen(true)} />
            <OffCanvasMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            
            <div className="ml-20 md:ml-28">
                <main>
                    {/* Hero Section */}
                    <section id="home" className="bg-black text-white min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-20 relative overflow-hidden">
                        <div className="pt-24 lg:pt-28">
                            <AnimatedFadeIn direction="right" className="w-fit">
                               <a href="#" className="font-kanit text-lg border-b border-white pb-2">Strategy, Design, Solution Development</a>
                            </AnimatedFadeIn>
                        </div>
                        
                        <div className="relative">
                           <AnimatedCharText text="Digital Marketing Agency" className="text-5xl md:text-8xl lg:text-9xl xl:text-[140px] font-prata font-medium leading-none" />
                            <AnimatedFadeIn delay={0.5} className="relative lg:absolute lg:bottom-0 lg:right-0 mt-8 lg:mt-0 lg:translate-y-1/2 max-w-sm text-gray-400 font-kanit text-lg">
                                <p>Our approach combines innovation, technology, and results-driven solutions to help businesses dominate in the online space.</p>
                            </AnimatedFadeIn>
                        </div>

                        <div className="flex justify-between items-end mt-20">
                            <AnimatedFadeIn delay={0.8}>
                                <ArrowDownIcon/>
                            </AnimatedFadeIn>
                            <div className="text-left font-kanit">
                                <Counter target={25} suffix="k+" textClassName="text-4xl sm:text-5xl font-light"/>
                                <p className="text-base sm:text-lg">Projects completed successfully</p>
                            </div>
                        </div>
                    </section>

                    <Marquee items={marqueeItems} />

                    {/* About Section */}
                    <section id="about" className="py-20 px-6 lg:px-20 text-center">
                        <AnimatedCharText text="Get Your Website From Experienced Developers!" className="text-4xl md:text-5xl font-bold font-kanit max-w-4xl mx-auto mb-6" />
                        <AnimatedFadeIn className="max-w-3xl mx-auto text-gray-600 mb-10 text-lg">
                            <p>Welcome to<strong> Zhovon</strong>, your <strong>trusted digital marketing agency</strong> dedicated to transforming brands through innovative digital marketing solutions. Whether you’re a startup looking to build your online presence or an established<strong> business</strong> aiming to scale, we deliver tailored strategies that drive results.</p>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn>
                            <img src="https://placehold.co/1200x600/cccccc/999999?text=About+Us" alt="Digital Marketing Agency" className="mx-auto my-8 max-w-full h-auto" />
                        </AnimatedFadeIn>
                        <AnimatedFadeIn>
                            <a href="#" className="inline-block bg-[#F08F42] text-black font-bold py-4 px-8 rounded-full hover:bg-black hover:text-white transition-colors">CLAIM OFFER !</a>
                        </AnimatedFadeIn>
                    </section>

                    {/* Services Section */}
                    <section id="services" className="bg-black text-white py-20 px-6 lg:px-20">
                        <div className="flex flex-wrap justify-between items-center mb-12">
                            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                                 <AnimatedCharText text="Services" className="text-lg text-gray-400 mb-2"/>
                                 <AnimatedCharText text="Solution we provide" className="text-5xl font-prata"/>
                            </div>
                            <p className="w-full lg:w-1/3 text-gray-400">At Zhovon, we don’t just provide digital services – we build long-term digital success.</p>
                            <div className="w-full lg:w-1/3 text-right mt-6 lg:mt-0">
                                <a href="#" className="btn-circle border border-white rounded-full w-40 h-40 flex items-center justify-center text-center">View<br /> all services</a>
                            </div>
                        </div>
                        <div className="mt-16">
                            {servicesData.map((service, index) => (
                            <AnimatedFadeIn key={index} delay={index * 0.1}>
                                <div className="group axtra-service__item border-t border-gray-700 py-8 flex justify-between items-center relative cursor-pointer">
                                    <span className="text-4xl font-prata">{service.num}</span>
                                    <h3 className="text-3xl lg:text-5xl font-prata flex-1 px-4 sm:px-8">{service.title}</h3>
                                    <p className="text-gray-400 max-w-xs hidden lg:block">{service.desc}</p>
                                    <div className="w-12 h-12 border rounded-full flex items-center justify-center">→</div>
                                    <div className="thumb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 z-10 pointer-events-none">
                                        <img src={service.img} alt={service.title} className="w-full h-full object-cover rounded-lg" />
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
                                <Counter target={25} suffix="K" textClassName="text-5xl sm:text-6xl font-prata" />
                                <p className="text-gray-400 mt-2">Project<br/>completed</p>
                            </AnimatedFadeIn>
                            <AnimatedFadeIn delay={0.1}>
                                <Counter target={8} suffix="K+" textClassName="text-5xl sm:text-6xl font-prata" />
                                <p className="text-gray-400 mt-2">Happy<br/>customers</p>
                            </AnimatedFadeIn>
                            <AnimatedFadeIn delay={0.2}>
                                <Counter target={15} textClassName="text-5xl sm:text-6xl font-prata" />
                                <p className="text-gray-400 mt-2">Years<br/>experiences</p>
                            </AnimatedFadeIn>
                             <AnimatedFadeIn delay={0.3}>
                                <Counter target={98} textClassName="text-5xl sm:text-6xl font-prata" />
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
                                 <AnimatedFadeIn key={index} delay={index * 0.1} className="bg-[#121212] p-8 group transition-all duration-300 hover:bg-[#1C1D20]">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-500 font-kanit">Step {item.step}</span>
                                        <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center bg-black group-hover:bg-[#F08F42] transition-colors duration-300">
                                           <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                    </div>
                                    <h3 className="text-8xl font-prata mb-4">{item.step}</h3>
                                    <h4 className="text-2xl font-prata mb-4 group-hover:text-[#F08F42] transition-colors duration-300">{item.title}</h4>
                                    <p className="text-gray-400">{item.desc}</p>
                                </AnimatedFadeIn>
                            ))}
                         </div>
                    </section>

                    {/* Portfolio Section */}
                    <section id="portfolio" className="bg-black text-white relative">
                        <div ref={workContainerRef} className="h-[350vh]">
                            <div className="sticky top-0 h-screen flex items-start justify-center overflow-hidden pt-20">
                                <div ref={workHeadingRef} style={workHeadingStyle}>
                                    <h2 className="font-prata text-center whitespace-nowrap">Work</h2>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 -mt-[350vh] py-40 px-6 lg:px-20">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-1/2 space-y-8">
                                    {leftColumnProjects.map((item, index) => (
                                        <AnimatedFadeIn key={item.title} delay={index * 0.1}>
                                            <a href="#" className="group block relative overflow-hidden rounded-lg">
                                                <img src={item.img} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/>
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex flex-col justify-end p-8 text-left">
                                                    <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                        <h3 className="text-3xl font-prata text-white">{item.title}</h3>
                                                        <p className="text-gray-300 mt-1">{item.date}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </AnimatedFadeIn>
                                    ))}
                                </div>
                                <div className="w-full md:w-1/2 space-y-8 md:mt-48">
                                    {rightColumnProjects.map((item, index) => (
                                       <AnimatedFadeIn key={item.title} delay={index * 0.1}>
                                            <a href="#" className="group block relative overflow-hidden rounded-lg">
                                                <img src={item.img} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/>
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex flex-col justify-end p-8 text-left">
                                                    <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                        <h3 className="text-3xl font-prata text-white">{item.title}</h3>
                                                        <p className="text-gray-300 mt-1">{item.date}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </AnimatedFadeIn>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center mt-16">
                                <a href="#" className="btn-circle border border-white rounded-full w-40 h-40 flex items-center justify-center text-center mx-auto">View<br /> all projects</a>
                            </div>
                        </div>
                    </section>
                    
                    {/* Testimonials Section */}
                    <section className="bg-black text-white py-20 overflow-hidden">
                        <div className="px-6 lg:px-20 text-center">
                            <AnimatedCharText text="Feedback" className="text-lg text-gray-400 mb-2"/>
                            <AnimatedCharText text="What our client says" className="text-5xl font-prata mb-12"/>
                        </div>
                        <div
                            ref={draggableRef}
                            className="flex overflow-x-scroll pb-10 hide-scrollbar"
                            style={{ scrollSnapType: 'x mandatory', scrollPadding: '0 2rem' }}
                        >
                            <div className="flex pl-[calc(50vw-40vw)] md:pl-[calc(50vw-30vw)]">
                                {testimonialsData.map((testimonial, index) => (
                                    <div key={index} className="flex-shrink-0 w-[80vw] md:w-[60vw] max-w-4xl text-center px-4" style={{ scrollSnapAlign: 'center' }}>
                                        <p className="text-2xl lg:text-3xl font-prata leading-snug">"{testimonial.quote}"</p>
                                        <h4 className="mt-6 text-xl font-bold font-kanit">{testimonial.author}</h4>
                                        <p className="text-gray-400">{testimonial.company}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Blog Section */}
                    <section id="blog" className="bg-[#121212] text-white py-20 px-6 lg:px-20">
                         <AnimatedCharText text="Recent Blog" className="text-lg text-gray-400 mb-2"/>
                         <AnimatedCharText text="News insight" className="text-5xl font-prata mb-12"/>
                         <div className="border-b border-gray-700">
                            {blogData.map((post, index) => (
                                <AnimatedFadeIn key={index} delay={index * 0.1}>
                                     <a href="#" className="group border-t border-gray-700 py-8 flex flex-col md:flex-row justify-between items-start md:items-center relative cursor-pointer w-full">
                                        <div className="flex-1 mb-4 md:mb-0">
                                             <div className="flex justify-between text-sm text-gray-400 mb-2 font-kanit">
                                                <span>{post.category}</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl font-prata group-hover:text-[#F08F42] transition-colors duration-300">{post.title}</h3>
                                        </div>
                                        <div className="w-12 h-12 border border-gray-500 group-hover:border-white rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45 ml-0 md:ml-8 self-end md:self-center">→</div>
                                    </a>
                                </AnimatedFadeIn>
                            ))}
                        </div>
                    </section>
                    
                    {/* Brands Section */}
                    <section className="bg-[#121212] py-20">
                         <div className="w-full overflow-hidden">
                            <div className="flex animate-marquee">
                                {brandsData.concat(brandsData).map((brand, index) => (
                                    <div key={index} className="flex-shrink-0 mx-8">
                                        <img src={brand} alt={`Brand ${index + 1}`} className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>


                     {/* CTA Section */}
                    <section id="contact" className="bg-[#1D1D1D] text-white py-20 px-6 lg:px-20 text-center">
                        <AnimatedCharText text="Work with us" className="text-6xl sm:text-7xl md:text-9xl font-prata"/>
                        <AnimatedCharText text="We would love to hear more about your project" className="text-lg sm:text-2xl text-gray-400 mt-4 max-w-2xl mx-auto"/>
                        <AnimatedFadeIn delay={0.2} className="mt-12">
                             <a href="#" className="btn-circle border border-white rounded-full w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center text-center mx-auto">Let’s<br /> talk us</a>
                        </AnimatedFadeIn>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}