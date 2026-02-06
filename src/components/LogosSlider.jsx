import React from 'react';

const logos = [
  { name: "LinkedIn", url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
  { name: "Naukri.com", url: "https://static.naukimg.com/s/4/100/i/naukri_Logo.png" },
  { name: "Indeed", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Indeed_logo.png" },
  { name: "AngelList", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/AngelList_logo.svg/200px-AngelList_logo.svg.png" }, // Classic AngelList
  { name: "Instahyre", url: "https://instahyre-2.s3-ap-south-1.amazonaws.com/media/CACHE/images/images/profile/base/logo/600x600/e660e5b7bd6a3fa9.png" },
  { name: "Wellfound", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Wellfound_logo.svg/2560px-Wellfound_logo.svg.png" }, // Wellfound
  { name: "IIMJobs", url: "https://iimjobs-static.s3.amazonaws.com/img/iimjobs-logo.png" }, // Better source needed or fallback text
  { name: "Glassdoor", url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Glassdoor_logo.svg" },
  { name: "Monster India", url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Monster.com_Logo_2021.png" },
  { name: "Cutshort", url: "https://cutshort-logos.s3.amazonaws.com/cutshort-logo-black.png" }, 
];

const LogosSlider = () => {
    // Quadruple the logos to ensure gapless coverage on wide screens
    // We animate to -50%, so the first half (2 sets) plays, then it loops back to start.
    const sliderLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <section className="py-20 bg-white border-y border-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 text-center relative z-10">
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Post Once, Reach Everywhere</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    RecruiterAI automatically syncs your job postings across all major platforms
                </p>
            </div>

            {/* Logo Track Wrapper - FIXED HEIGHT */}
            <div className="relative w-full overflow-hidden h-24 md:h-32 flex items-center mask-gradient-x">
                
                {/* 
                   Animation Logic:
                   - animate-infinite-scroll moves translateX from 0 to -50%.
                   - We have 4 sets of logos.
                   - -50% width = 2 sets of logos.
                   - So when it reaches the end, Set 3 replaces Set 1 perfectly.
                   - CRITICAL: Using mx (margin) on items instead of gap on container ensures perfect linear spacing calculation.
                */}
                <div className="flex w-max items-center animate-infinite-scroll hover:[animation-play-state:paused] group">
                    {sliderLogos.map((logo, index) => (
                        <div 
                            key={`${logo.name}-${index}`} 
                            className="flex items-center justify-center shrink-0 w-[140px] md:w-[180px] mx-6 md:mx-12"
                        >
                            <div className="h-8 md:h-10 w-full flex items-center justify-center relative transition-all duration-300 transform md:group-hover:scale-105 cursor-pointer">
                                {/* Use text fallback logic just like before, but cleaner styling */}
                                <img 
                                    src={logo.url} 
                                    alt={logo.name} 
                                    className="h-full w-full object-contain filter grayscale opacity-50 transition-all duration-500 hover:filter-none hover:opacity-100 hover:scale-110"
                                    onError={(e) => {
                                        e.target.style.display = 'none'; 
                                        e.target.parentNode.innerHTML = `<span class="text-xl font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer whitespace-nowrap">${logo.name}</span>`;
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left/Right Fade Gradient for Premium Feel */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </div>
            
            {/* Inline Styles for Animation Duration Adjustment */}
            <style>{`
                .animate-infinite-scroll {
                    animation-duration: 35s; /* Mobile default - slightly faster */
                    animation-timing-function: linear;
                }
                @media (min-width: 768px) {
                    .animate-infinite-scroll {
                        animation-duration: 60s; /* Slower desktop speed for premium feel */
                    }
                }
            `}</style>
        </section>
    );
};

export default LogosSlider;
