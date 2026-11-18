import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import capturedCSS from "../styles/site.css?raw";
import portCrmDupes from "@/assets/Hubspot_CRM.png.asset.json";
import portDealTest from "@/assets/Hubspot_port_3.jpg.asset.json";
import portDealTracking from "@/assets/Hubspot_port_2.jpg.asset.json";
import portAsspDrip from "@/assets/Hubspot_port.jpg.asset.json";
import portB2bDrip from "@/assets/Hubspot_port_4.jpg.asset.json";
import portLifecycle from "@/assets/Hubspot_lifecycle.png.asset.json";
import portNoShow from "@/assets/No-Show-Follow-up-Workflow-Automation.png.asset.json";
import portraitMain from "@/assets/diamond-azoro-portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diamond Azoro — CRM & Email Marketing Specialist" },
      { name: "description", content: "Diamond Azoro helps businesses automate lead generation, nurturing and sales with HubSpot CRM, email marketing and marketing automation." },
      { property: "og:title", content: "Diamond Azoro — CRM & Email Marketing Specialist" },
      { property: "og:description", content: "HubSpot CRM setup, workflow automation and email marketing that turn contact lists into revenue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "data-site-import-popup-incomplete": "document-menu-ownership" } } },
  component: Index,
});

function Index() {
  const [activeTab0, setActiveTab0] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxReturnRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const reviewCount = 3;
  const goReview = useCallback((n: number) => setActiveTab0(((n % reviewCount) + reviewCount) % reviewCount), []);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Active nav link follows the section in view
  useEffect(() => {
    const onScroll = () => {
      let cur = "";
      document.querySelectorAll<HTMLElement>("section[id]").forEach((sec) => {
        if (sec.offsetParent !== null && window.scrollY >= sec.offsetTop - 90) cur = sec.id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape closes, focus moves in and back out
  useEffect(() => {
    if (!menuOpen) return;
    mobileCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  const closeMenu = () => { setMenuOpen(false); hamburgerRef.current?.focus({ preventScroll: true }); };

  // Lightbox: Escape closes, body scroll locked while open
  useEffect(() => {
    if (!lightboxSrc) return;
    document.body.style.overflow = "hidden";
    lightboxCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightboxSrc]);
  const openLightbox = (src: string, from: HTMLElement) => { lightboxReturnRef.current = from; setLightboxSrc(src); };
  const closeLightbox = () => { setLightboxSrc(null); lightboxReturnRef.current?.focus({ preventScroll: true }); };

  const navColor = (id: string) => (activeSection === id ? { color: "var(--gold)" } : undefined);
  return (
    <>
      <style>{capturedCSS}</style>
      <nav className="items-center flex h-[68px] [backdrop-filter:blur(20px)] [background:rgba(20,5,11,.88)] [border-bottom:1px_solid_var(--border2)]">
        <div className="nav-inner items-center flex justify-between max-w-[1160px]">
          <a className="nav-logo no-underline [font-size:22px] [font-weight:700] [letter-spacing:.02em]" href="#hero">Diamond<span className="[color:var(--gold)]">Azoro</span></a>
          <div className="nav-links items-center gap-[30px]"><a className="no-underline [font-size:13px] [font-weight:500]" style={navColor("about")} href="#about">About</a><a className="no-underline [font-size:13px] [font-weight:500]" style={navColor("services")} href="#services">Services</a><a className="no-underline [font-size:13px] [font-weight:500]" style={navColor("portfolio")} href="#portfolio">Portfolio</a><a className="no-underline [font-size:13px] [font-weight:500]" style={navColor("skills")} href="#skills">Skills</a><a className="no-underline [font-size:13px] [font-weight:500]" style={navColor("testimonials")} href="#testimonials">Reviews</a><a className={"btn btn-gold nav-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:500] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Hire Me</a></div>
          <button ref={hamburgerRef} className="hamburger [cursor:pointer]" aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobileNav" onClick={() => setMenuOpen((o) => !o)}>
            <span className="block h-[1.5px] [background:var(--gold)] [transition:.3s]" />
            <span className="block h-[1.5px] [background:var(--gold)] [transition:.3s]" />
            <span className="block h-[1.5px] [background:var(--gold)] [transition:.3s]" />
          </button>
        </div>
      </nav>
      <div className={["items-center flex-col gap-[28px] justify-center [backdrop-filter:blur(20px)] [background:rgba(20,5,11,.98)]", menuOpen ? "flex" : "hidden"].join(" ")} id="mobileNav" role="dialog" aria-modal="true" aria-label="Menu"><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} href="#hero">Home</a><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} href="#about">About</a><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} href="#services">Services</a><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} href="#portfolio">Portfolio</a><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} href="#skills">Skills</a><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} href="#testimonials">Reviews</a><a className="no-underline [font-size:28px] [font-weight:600] [transition:color_.2s]" onClick={() => setMenuOpen(false)} style={{ color: "var(--gold)" }} href="#contact">Hire Me ✦</a><button ref={mobileCloseRef} type="button" aria-label="Close menu" onClick={closeMenu} className="[font-size:26px] [cursor:pointer]" style={{ background: "none", borderWidth: "medium", borderStyle: "none", borderColor: "currentcolor", borderImage: "none", color: "var(--muted)", marginTop: "8px" } as CSSProperties}>✕</button></div>
      <IntroSection />
      <ImportedSectionHubSpotCRMEmailMarketingSpecialist />
      <ImportedSection />
      <ImportedSectionBuildingSystemsThatGenerate onOpenLightbox={openLightbox} />
      <ImportedSectionServicesDesignedToGrowYour />
      <ImportedSectionRecentProjectsCaseStudies onOpenLightbox={openLightbox} />
      <ImportedSectionToolsTechnologies />
      <ImportedSectionTheExpertDifference />
      <section className="[background:var(--dark2)] [scroll-margin-top:68px]" id="testimonials">
        <div className={"\x63ontainer max-w-[1160px]"}>
          <div className={"reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease] text-center max-w-[780px]"} style={{ margin: "0px auto" }}>
            <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em] inline-flex">Client Reviews</div>
            <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Don't Take It From Me,<br /><span className="[color:var(--gold)]">Take It From My Clients</span></h2>
            <p className="section-sub max-w-[560px]" style={{ margin: "0px auto" }}>Verified 5-star reviews from real clients on Upwork.</p>
          </div>
          <div className={"tcar reveal \x76isible text-center [transition:opacity_.65s_ease,transform_.65s_ease]"} id="tcar" onKeyDown={(e) => { if (e.key === "ArrowLeft") goReview(activeTab0 - 1); if (e.key === "ArrowRight") goReview(activeTab0 + 1); }} onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={(e) => { if (touchX.current === null) return; const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current; if (Math.abs(dx) > 50) goReview(activeTab0 + (dx < 0 ? 1 : -1)); touchX.current = null; }}>
            <div className="tcar-avatars items-center flex justify-center" role="tablist" aria-label="Choose a review">
              <button aria-selected={activeTab0 === 0} className={["tcar-av items-center flex justify-center [cursor:pointer]", (activeTab0 === 0) && "active"].filter(Boolean).join(" ")} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveTab0(0); }} tabIndex={activeTab0 === 0 ? 0 : -1} role="tab" aria-label="Email Automation review" data-i="0">✉</button>
              <button aria-selected={activeTab0 === 1} className={["tcar-av items-center flex justify-center [cursor:pointer]", (activeTab0 === 1) && "active"].filter(Boolean).join(" ")} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveTab0(1); }} tabIndex={activeTab0 === 1 ? 0 : -1} role="tab" aria-label="HubSpot Automation review" data-i="1">⚡</button>
              <button aria-selected={activeTab0 === 2} className={["tcar-av items-center flex justify-center [cursor:pointer]", (activeTab0 === 2) && "active"].filter(Boolean).join(" ")} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveTab0(2); }} tabIndex={activeTab0 === 2 ? 0 : -1} role="tab" aria-label="HubSpot Email Setup review" data-i="2">◈</button>
            </div>
            <div className="tcar-stage grid max-w-[780px]">
              <figure className={["tcar-slide [grid-area:1/1]", (activeTab0 === 0) && "active"].filter(Boolean).join(" ")} role="tabpanel" aria-hidden={activeTab0 !== 0}>
                <div className="tcar-proj [color:var(--gold)] [font-size:clamp(26px,3.2vw,36px)] [font-weight:700] [line-height:1.1]">Email Automation</div>
                <div className="tcar-meta uppercase [color:var(--muted)] [font-size:11px] [font-weight:600] [letter-spacing:.1em]">Verified Upwork review · 5.0 ★</div>
                <div className="tcar-stars [color:var(--gold)] [font-size:15px] [letter-spacing:4px] [text-shadow:0_0_14px_rgba(255,184,28,.45)]">★★★★★</div>
                <blockquote className="tcar-quote italic [color:var(--offwhite)] [font-size:clamp(20px,2.5vw,27px)] [font-weight:500] [line-height:1.55]">"Amazing experience working with Diamond! He built a smart email automation system that completely transformed my workflow and saved me so much time. Everything was incredibly well organised and professional. I'd highly recommend him to anyone looking for top-quality work."</blockquote>
              </figure>
              <figure className={["tcar-slide [grid-area:1/1]", (activeTab0 === 1) && "active"].filter(Boolean).join(" ")} role="tabpanel" aria-hidden={activeTab0 !== 1}>
                <div className="tcar-proj [color:var(--gold)] [font-size:clamp(26px,3.2vw,36px)] [font-weight:700] [line-height:1.1]">HubSpot Automation</div>
                <div className="tcar-meta uppercase [color:var(--muted)] [font-size:11px] [font-weight:600] [letter-spacing:.1em]">Verified Upwork review · 5.0 ★ · Endorsed by client</div>
                <div className="tcar-stars [color:var(--gold)] [font-size:15px] [letter-spacing:4px] [text-shadow:0_0_14px_rgba(255,184,28,.45)]">★★★★★</div>
                <blockquote className="tcar-quote italic [color:var(--offwhite)] [font-size:clamp(20px,2.5vw,27px)] [font-weight:500] [line-height:1.55]">"Very skilled and reliable email marketing expert. Successfully optimised our HubSpot automation workflows, improved segmentation, and created effective lead nurturing sequences. Great experience overall."</blockquote>
              </figure>
              <figure className={["tcar-slide [grid-area:1/1]", (activeTab0 === 2) && "active"].filter(Boolean).join(" ")} role="tabpanel" aria-hidden={activeTab0 !== 2}>
                <div className="tcar-proj [color:var(--gold)] [font-size:clamp(26px,3.2vw,36px)] [font-weight:700] [line-height:1.1]">HubSpot Email Setup</div>
                <div className="tcar-meta uppercase [color:var(--muted)] [font-size:11px] [font-weight:600] [letter-spacing:.1em]">Verified Upwork review · 5.0 ★</div>
                <div className="tcar-stars [color:var(--gold)] [font-size:15px] [letter-spacing:4px] [text-shadow:0_0_14px_rgba(255,184,28,.45)]">★★★★★</div>
                <blockquote className="tcar-quote italic [color:var(--offwhite)] [font-size:clamp(20px,2.5vw,27px)] [font-weight:500] [line-height:1.55]">"It was a pleasure working with Diamond. He developed a highly effective email automation setup in HubSpot that made our processes smoother and more efficient. Everything was delivered in a clear and professional manner. I'd definitely recommend him for quality email marketing work."</blockquote>
              </figure>
            </div>
            <div className="tcar-controls items-center flex gap-[18px] justify-center">
              <button className="tcar-arrow [cursor:pointer] [font-size:24px] [line-height:1]" id="tcarPrev" aria-label="Previous review" onClick={() => goReview(activeTab0 - 1)}>‹</button>
              <div className="tcar-track rounded-[2px] h-[2px] [background:rgba(255,255,255,.1)] [overflow:hidden]">
                <span className="block [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" key={activeTab0} style={reduceMotion ? undefined : ({ animation: "tcarFill 7000ms linear forwards" } as CSSProperties)} id="tcarBar" onAnimationEnd={() => goReview(activeTab0 + 1)} />
              </div>
              <button className="tcar-arrow [cursor:pointer] [font-size:24px] [line-height:1]" id="tcarNext" aria-label="Next review" onClick={() => goReview(activeTab0 + 1)}>›</button>
            </div>
          </div>
        </div>
      </section>
      <ImportedSectionQuestionsAnswered />
      <ImportedSectionReadyToAutomateYourGrowth />
      <ImportedFooter />
      <div className={["items-center hidden justify-center [animation:fadeIn_.3s_ease] [backdrop-filter:blur(20px)] [background:rgba(0,0,0,.92)] [cursor:zoom-out]", lightboxSrc && "open"].filter(Boolean).join(" ")} id="lightbox" role="dialog" aria-modal="true" aria-label="Photo" aria-hidden={!lightboxSrc} onClick={closeLightbox}><button ref={lightboxCloseRef} type="button" aria-label="Close photo" onClick={closeLightbox} className="items-center flex justify-center right-[28px] [cursor:pointer] [font-size:20px]" id="lb-close">✕</button>{lightboxSrc && <img className="rounded-[16px] max-h-[90vh] max-w-[90vw] object-contain [animation:scaleIn_.35s_cubic-bezier(.34,1.56,.64,1)] [border:1px_solid_var(--border)] [box-shadow:0_40px_120px_rgba(0,0,0,.8)]" id="lb-img" alt="Diamond Azoro" src={lightboxSrc} />}</div>
    </>
  );
}

function ImportedSectionHubSpotCRMEmailMarketingSpecialist() {
  return (
    <section className="[background:radial-gradient(ellipse_70%_60%_at_80%_40%,rgba(130,28,70,.4)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(110,22,60,.3)_0%,transparent_60%),var(--black)] [overflow:hidden] [scroll-margin-top:68px]" id="hero">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className="hero-inner items-center grid gap-[60px]">
          <div>
            <div className="hero-badge items-center rounded-[100px] inline-flex gap-[8px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:12px] [font-weight:600] [letter-spacing:.06em]"><div className="hero-badge-dot rounded-[50%] h-[7px] [animation:pulse_2s_infinite] [background:#4ADE80] [box-shadow:0_0_6px_#4ADE80]" />
              Open to New Projects
            </div>
            <h1 className="hero-title [color:var(--white)] [font-size:clamp(38px,5.5vw,68px)] [font-weight:700] [line-height:1.08]">
              CRM &amp;<br /><span className="italic [color:var(--gold)]">Email Marketing</span><br />Specialist
            </h1>
            <p className="hero-sub max-w-[480px]">I help businesses automate lead generation, customer nurturing, and sales processes through HubSpot, Email Marketing, and Marketing Automation.</p>
            <div className="flex flex-wrap gap-[14px]"><a className={"btn btn-gold items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:14px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#portfolio">
                ✦ View Portfolio
              </a><a className="btn btn-outline items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:14px] [font-weight:600]" href="#contact">
                Book a Consultation
              </a></div>
            <div className="hero-stats flex [border-top:1px_solid_var(--border2)]">
              <div>
                <div className="hero-stat-val [color:var(--gold)] [font-size:34px] [font-weight:700] [line-height:1]">6</div>
                <div className="hero-stat-label [color:var(--muted)] [font-size:12px] [letter-spacing:.04em]">Jobs Completed</div>
              </div>
              <div>
                <div className="hero-stat-val [color:var(--gold)] [font-size:34px] [font-weight:700] [line-height:1]">5.0</div>
                <div className="hero-stat-label [color:var(--muted)] [font-size:12px] [letter-spacing:.04em]">Upwork Rating</div>
              </div>
              <div>
                <div className="hero-stat-val [color:var(--gold)] [font-size:34px] [font-weight:700] [line-height:1]">100%</div>
                <div className="hero-stat-label [color:var(--muted)] [font-size:12px] [letter-spacing:.04em]">Job Success</div>
              </div>
            </div>
          </div>
          <div className="hero-visual items-center justify-center">
            <div className="pipeline-card rounded-[20px] max-w-[460px] [background:var(--dark2)] [border:1px_solid_var(--border)] [box-shadow:0_24px_80px_rgba(0,0,0,.6),0_0_0_1px_rgba(255,184,28,.05)]">
              <div className="pipeline-header items-center flex justify-between">
                <div className="pipeline-header-title [color:var(--gold)] [font-size:12px] [font-weight:700] [letter-spacing:.05em]">✦ CRM AUTOMATION PIPELINE</div>
                <div className="pipeline-dots flex gap-[5px]">
                  <span className="rounded-[50%] h-[10px] [background:#FF5F57]" />
                  <span className="rounded-[50%] h-[10px] [background:#FFBD2E]" />
                  <span className="rounded-[50%] h-[10px] [background:#28CA42]" />
                </div>
              </div>
              <div className="flex flex-col gap-[9px]">
                <div className="p-stage items-center rounded-[10px] flex gap-[12px] [animation:slideIn_.5s_.1s_both] [background:var(--dark3)] [border-left:2px_solid_transparent] [border-left-color:#FFB81C] [transition:all_.3s]" style={{ transform: "translateX(0px)", opacity: "1" }} data-site-import-responsive="46">
                  <div className="stage-icon items-center rounded-[8px] flex h-[32px] justify-center [background:var(--dark4)] [flex-shrink:0] [font-size:15px]">📥</div>
                  <div className="flex-1">
                    <div className="[color:var(--offwhite)] [font-size:11px] [font-weight:600]">Lead Capture</div>
                    <div className="stage-count [color:var(--muted)] [font-size:10px]">48 new leads this week</div>
                  </div>
                  <div className="stage-bar-wrap">
                    <div className="rounded-[100px] h-[4px] [background:rgba(255,255,255,.07)] [overflow:hidden]">
                      <div className="rounded-[100px] [animation:fillBar_1.4s_ease_both] [height:100%] [background:linear-gradient(90deg,_rgb(255,_184,_28),_rgb(255,_203,_82))]" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>
                <div className="p-stage items-center rounded-[10px] flex gap-[12px] [animation:slideIn_.5s_.2s_both] [background:var(--dark3)] [border-left:2px_solid_transparent] [border-left-color:#E0A010] [transition:all_.3s]" style={{ transform: "translateX(0px)", opacity: "1" }} data-site-import-responsive="54">
                  <div className="stage-icon items-center rounded-[8px] flex h-[32px] justify-center [background:var(--dark4)] [flex-shrink:0] [font-size:15px]">🔔</div>
                  <div className="flex-1">
                    <div className="[color:var(--offwhite)] [font-size:11px] [font-weight:600]">Email Nurture</div>
                    <div className="stage-count [color:var(--muted)] [font-size:10px]">Sequences active: 5</div>
                  </div>
                  <div className="stage-bar-wrap">
                    <div className="rounded-[100px] h-[4px] [background:rgba(255,255,255,.07)] [overflow:hidden]">
                      <div className="rounded-[100px] [animation:fillBar_1.4s_ease_both] [height:100%] [background:linear-gradient(90deg,_rgb(224,_160,_16),_rgb(255,_184,_28))]" style={{ width: "74%" }} />
                    </div>
                  </div>
                </div>
                <div className="p-stage items-center rounded-[10px] flex gap-[12px] [animation:slideIn_.5s_.3s_both] [background:var(--dark3)] [border-left:2px_solid_transparent] [border-left-color:#FFC03A] [transition:all_.3s]" style={{ transform: "translateX(0px)", opacity: "1" }} data-site-import-responsive="62">
                  <div className="stage-icon items-center rounded-[8px] flex h-[32px] justify-center [background:var(--dark4)] [flex-shrink:0] [font-size:15px]">🎯</div>
                  <div className="flex-1">
                    <div className="[color:var(--offwhite)] [font-size:11px] [font-weight:600]">Segmentation</div>
                    <div className="stage-count [color:var(--muted)] [font-size:10px]">12 smart lists synced</div>
                  </div>
                  <div className="stage-bar-wrap">
                    <div className="rounded-[100px] h-[4px] [background:rgba(255,255,255,.07)] [overflow:hidden]">
                      <div className="rounded-[100px] [animation:fillBar_1.4s_ease_both] [height:100%] [background:linear-gradient(90deg,_rgb(255,_192,_58),_rgb(255,_203,_82))]" style={{ width: "60%" }} />
                    </div>
                  </div>
                </div>
                <div className="p-stage items-center rounded-[10px] flex gap-[12px] [animation:slideIn_.5s_.4s_both] [background:var(--dark3)] [border-left:2px_solid_transparent] [border-left-color:#4ADE80] [transition:all_.3s]" style={{ transform: "translateX(0px)", opacity: "1" }} data-site-import-responsive="70">
                  <div className="stage-icon items-center rounded-[8px] flex h-[32px] justify-center [background:var(--dark4)] [flex-shrink:0] [font-size:15px]">✅</div>
                  <div className="flex-1">
                    <div className="[color:var(--offwhite)] [font-size:11px] [font-weight:600]">Deal Closed</div>
                    <div className="stage-count [color:var(--muted)] [font-size:10px]">+23% vs last month</div>
                  </div>
                  <div className="stage-bar-wrap">
                    <div className="rounded-[100px] h-[4px] [background:rgba(255,255,255,.07)] [overflow:hidden]">
                      <div className="rounded-[100px] [animation:fillBar_1.4s_ease_both] [height:100%] [background:linear-gradient(90deg,_rgb(16,_185,_129),_rgb(52,_211,_153))]" style={{ width: "45%" }} />
                    </div>
                  </div>
                </div>
                <div className="p-stage items-center rounded-[10px] flex gap-[12px] [animation:slideIn_.5s_.5s_both] [background:var(--dark3)] [border-left:2px_solid_transparent] [border-left-color:#FFCB52] [transition:all_.3s]" style={{ transform: "translateX(0px)", opacity: "1" }} data-site-import-responsive="78">
                  <div className="stage-icon items-center rounded-[8px] flex h-[32px] justify-center [background:var(--dark4)] [flex-shrink:0] [font-size:15px]">♻️</div>
                  <div className="flex-1">
                    <div className="[color:var(--offwhite)] [font-size:11px] [font-weight:600]">Re-engagement</div>
                    <div className="stage-count [color:var(--muted)] [font-size:10px]">Workflow running: 3</div>
                  </div>
                  <div className="stage-bar-wrap">
                    <div className="rounded-[100px] h-[4px] [background:rgba(255,255,255,.07)] [overflow:hidden]">
                      <div className="rounded-[100px] [animation:fillBar_1.4s_ease_both] [height:100%] [background:linear-gradient(90deg,_rgb(255,_203,_82),_rgb(255,_229,_160))]" style={{ width: "32%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="metric-row grid gap-[10px] grid-cols-[1fr_1fr_1fr]">
                <div className="metric-box rounded-[10px] text-center [animation:fadeUp_.5s_.9s_both] [background:var(--dark3)] [border:1px_solid_var(--border2)]" style={{ transform: "translateY(1.77636e-15px)", opacity: "1" }} data-site-import-responsive="87">
                  <div className="val [color:var(--gold)] [font-size:20px] [font-weight:700]">64%</div>
                  <div className="lbl [color:var(--muted)] [font-size:10px]">Open Rate</div>
                </div>
                <div className="metric-box rounded-[10px] text-center [animation:fadeUp_.5s_.9s_both] [background:var(--dark3)] [border:1px_solid_var(--border2)]" style={{ transform: "translateY(1.77636e-15px)", opacity: "1" }} data-site-import-responsive="90">
                  <div className="val [color:var(--gold)] [font-size:20px] [font-weight:700]">18%</div>
                  <div className="lbl [color:var(--muted)] [font-size:10px]">Click Rate</div>
                </div>
                <div className="metric-box rounded-[10px] text-center [animation:fadeUp_.5s_.9s_both] [background:var(--dark3)] [border:1px_solid_var(--border2)]" style={{ transform: "translateY(1.77636e-15px)", opacity: "1" }} data-site-import-responsive="93">
                  <div className="val [color:var(--gold)] [font-size:20px] [font-weight:700]">4.2x</div>
                  <div className="lbl [color:var(--muted)] [font-size:10px]">ROI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSection() {
  return (
    <section className="[background:var(--dark2)] [border-bottom:1px_solid_var(--border2)] [border-top:1px_solid_var(--border2)] [scroll-margin-top:68px]" id="logos">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <p className="logos-label text-center uppercase [font-weight:600] [letter-spacing:.12em]">Platforms &amp; Tools I Work With</p>
        <div className="items-center flex flex-wrap gap-[8px] justify-center">
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(255,_122,_89)]" />HubSpot</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(255,_184,_28)]" />GoHighLevel</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(0,_112,_243)]" />Brevo</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(0,_161,_201)]" />Mailchimp</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(43,_138,_62)]" />Klaviyo</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(150,_191,_72)]" />Shopify</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(255,_74,_0)]" />Zapier</div>
          <div className="logo-chip items-center flex gap-[8px] [background:var(--dark3)] [font-size:12px] [font-weight:600] [transition:all_.2s]"><div className="dot rounded-[50%] h-[7px] [background:rgb(123,_94,_167)]" />ActiveCampaign</div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionBuildingSystemsThatGenerate({ onOpenLightbox }: { onOpenLightbox: (src: string, from: HTMLElement) => void }) {
  return (
    <section className="[scroll-margin-top:68px]" id="about">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className="about-inner items-center grid gap-[80px]">
          <div className={"reveal \x76isible flex-col flex self-stretch [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="about-photo-frame flex-1 flex-col flex max-md:max-w-[340px] max-md:self-center">
              <div className="about-avatar-bg flex-1 rounded-[24px] min-h-[420px] [border:1px_solid_var(--border)] [box-shadow:var(--shadow-gold)] [font-size:110px] [overflow:hidden]" style={{ padding: "0px", background: "var(--dark3)" }}>
                <div className="img-zoom-wrap [cursor:zoom-in] [overflow:hidden]" style={{ position: "absolute", inset: 0 }} role="button" tabIndex={0} aria-label="Enlarge photo" onClick={(e) => { const img = e.currentTarget.querySelector("img"); if (img) onOpenLightbox(img.src, e.currentTarget); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); const img = e.currentTarget.querySelector("img"); if (img) onOpenLightbox(img.src, e.currentTarget); } }}>
                  <img className="[transition:transform_.4s_ease] object-cover [object-position:center_top] [border-radius:24px] block" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} src={portraitMain.url} alt="Diamond Azoro — CRM and Email Marketing Expert" />
                </div>
              </div>
              <div className="about-tag-luxury rounded-[16px] min-w-[140px] text-center [backdrop-filter:blur(10px)] [background:var(--dark2)] [border:1px_solid_var(--border)] [box-shadow:0_8px_40px_rgba(0,0,0,.5),0_0_0_1px_rgba(255,184,28,.15)]">
                <div className="atl-label items-center flex gap-[5px] justify-center uppercase [color:var(--muted)] [font-size:11px] [font-weight:700] [letter-spacing:.14em]">Verified on Upwork</div>
              </div>
            </div>
          </div>
          <div className={"reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">About Me</div>
            <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Building Systems That <span className="[color:var(--gold)]">Generate Real Revenue</span></h2>
            <p className="about-text [font-size:16px] [color:var(--text)] [line-height:1.82]" style={{ marginBottom: "14px" }}>
              Hi, I'm <strong className="[color:var(--white)]">Diamond</strong> — a CRM and email marketing expert who turns disorganised contact lists and manual processes into clean, automated revenue machines.
            </p>
            <p className="about-text [font-size:16px] [color:var(--text)] [line-height:1.82]" style={{ marginBottom: "14px" }}>
              I specialise in HubSpot CRM setup, marketing workflow automation, customer journey mapping, lead nurturing sequences, and advanced email segmentation. My work bridges the gap between your strategy and the technical systems that make it run.
            </p>
            <p className="about-text [font-size:16px] [color:var(--text)] [line-height:1.82]" style={{ marginBottom: "24px" }}>
              Whether you're a startup building your first CRM, an agency onboarding clients, or an e-commerce brand scaling your email revenue — I'll design and implement the system that moves your numbers.
            </p>
            <div className="about-skills flex flex-wrap gap-[8px]"><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">HubSpot CRM</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">Marketing Automation</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">Email Marketing</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">Customer Journey Mapping</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">Lead Nurturing</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">Workflow Automation</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">CRM Strategy</span><span className="skill-tag [background:var(--dark3)] [font-size:12px] [font-weight:500] [transition:all_.2s]">Segmentation</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionServicesDesignedToGrowYour() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const [pe, setPe] = useState(0);
  const [trackH, setTrackH] = useState<number | null>(null);
  const N = 9, NAV = 68, GAP = 104;
  useEffect(() => {
    const ease = (f: number) => { const g = Math.min(1, Math.max(0, (f - 0.25) / 0.5)); return g * g * (3 - 2 * g); };
    const measure = () => { const H = stageRef.current?.offsetHeight ?? 0; stepRef.current = H * 0.9; setTrackH(H + (N - 1) * stepRef.current); };
    const update = () => {
      const track = trackRef.current; if (!track || !stepRef.current) return;
      const sc = Math.max(0, NAV - track.getBoundingClientRect().top);
      const p = Math.min(N - 1, sc / stepRef.current);
      const k = Math.floor(p), f = p - k;
      setPe(k >= N - 1 ? N - 1 : k + ease(f));
    };
    let tick = false;
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; update(); }); } };
    const onResize = () => { measure(); update(); };
    measure(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);
  const cur = Math.round(pe);
  const card = (i: number) => ({ transform: `translate3d(${(i - pe) * GAP}%,0,0)`, visibility: Math.abs(i - pe) < 1 ? "visible" : "hidden" } as CSSProperties);
  const jump = (i: number) => {
    const track = trackRef.current; if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top - NAV + i * stepRef.current;
    window.scrollTo({ top: top + 1, behavior: "smooth" });
  };
  return (
    <section className="[background:var(--dark2)] [scroll-margin-top:68px]" id="services">
      <div ref={trackRef} className="svc-track min-h-[300vh]" style={trackH ? { height: `${trackH}px` } : undefined} id="svcTrack" data-site-import-responsive="144">
        <div ref={stageRef} className="svc-stage flex h-[calc(100svh_-_68px)]">
          <div className={"\x63ontainer svc-grid items-center grid max-w-[1160px]"}>
            <div className="svc-side">
              <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">What I Do</div>
              <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Services Designed to<br /><span className="[color:var(--gold)]">Grow Your Pipeline</span></h2>
              <p className="section-sub svc-sub max-w-[560px]">Scroll to move through each service.</p>
              <div className="svc-index flex-col gap-[2px]">
                <button className={[cur === 0 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="0" onClick={() => jump(0)}>
                  <span>HubSpot CRM Setup</span>
                </button>
                <button className={[cur === 1 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="1" onClick={() => jump(1)}>
                  <span>HubSpot Workflow Automation</span>
                </button>
                <button className={[cur === 2 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="2" onClick={() => jump(2)}>
                  <span>Email Marketing Campaigns</span>
                </button>
                <button className={[cur === 3 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="3" onClick={() => jump(3)}>
                  <span>Lead Nurturing Systems</span>
                </button>
                <button className={[cur === 4 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="4" onClick={() => jump(4)}>
                  <span>Customer Segmentation</span>
                </button>
                <button className={[cur === 5 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="5" onClick={() => jump(5)}>
                  <span>Klaviyo Email Marketing</span>
                </button>
                <button className={[cur === 6 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="6" onClick={() => jump(6)}>
                  <span>Mailchimp Automation</span>
                </button>
                <button className={[cur === 7 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="7" onClick={() => jump(7)}>
                  <span>Brevo Email Marketing</span>
                </button>
                <button className={[cur === 8 && "active", "items-center flex gap-[12px] text-left [cursor:pointer] [font-size:13px] [font-weight:500]"].filter(Boolean).join(" ")} type="button" data-i="8" onClick={() => jump(8)}>
                  <span>Zapier &amp; Shopify Integrations</span>
                </button>
              </div>
            </div>
            <div className="svc-main [min-width:0]">
              <div className="svc-meta">
                <div className="svc-progress rounded-[2px] h-[2px] [background:rgba(255,255,255,.1)] [overflow:hidden]">
                  <span className="[background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%] [left:0]" style={{ width: `${(pe / (N - 1)) * 100}%` }} />
                </div>
              </div>
              <div className="svc-cards rounded-[20px] grid [overflow:hidden]">
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(0)} aria-label="HubSpot CRM Setup" aria-hidden={Math.abs(0 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">🔧</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">HubSpot CRM Setup</h3>
                  <p className="svc-desc max-w-[520px]">Full HubSpot portal configuration — pipelines, properties, contact records, deal stages, and team roles — built to match your exact sales process.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Pipelines &amp; deal stages</li>
                    <li className="[font-weight:600]">Custom properties &amp; contact records</li>
                    <li className="[font-weight:600]">Team roles &amp; data import</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(1)} aria-label="HubSpot Workflow Automation" aria-hidden={Math.abs(1 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">⚡</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">HubSpot Workflow Automation</h3>
                  <p className="svc-desc max-w-[520px]">Custom enrollment-based and property-based workflows for lead routing, task creation, deal progression, and internal notifications.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Lead routing &amp; task creation</li>
                    <li className="[font-weight:600]">Deal progression triggers</li>
                    <li className="[font-weight:600]">Internal notifications</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(2)} aria-label="Email Marketing Campaigns" aria-hidden={Math.abs(2 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">📧</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Email Marketing Campaigns</h3>
                  <p className="svc-desc max-w-[520px]">Strategy, design, and deployment of high-converting email campaigns — newsletters, promotions, drip series — with A/B testing and reporting.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Campaign strategy &amp; copy</li>
                    <li className="[font-weight:600]">Responsive email builds</li>
                    <li className="[font-weight:600]">A/B testing &amp; reporting</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(3)} aria-label="Lead Nurturing Systems" aria-hidden={Math.abs(3 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">🌱</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Lead Nurturing Systems</h3>
                  <p className="svc-desc max-w-[520px]">Multi-touch nurture sequences that move prospects from awareness to decision-ready — delivered at the right time through the right channel.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Multi-touch email sequences</li>
                    <li className="[font-weight:600]">Lead scoring</li>
                    <li className="[font-weight:600]">Sales handoff triggers</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(4)} aria-label="Customer Segmentation" aria-hidden={Math.abs(4 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">🎯</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Customer Segmentation</h3>
                  <p className="svc-desc max-w-[520px]">Smart list architecture and behavioural segmentation ensuring every message reaches the right audience and drives measurable engagement.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Smart list architecture</li>
                    <li className="[font-weight:600]">Behavioural segments</li>
                    <li className="[font-weight:600]">Targeted messaging</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(5)} aria-label="Klaviyo Email Marketing" aria-hidden={Math.abs(5 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">💜</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Klaviyo Email Marketing</h3>
                  <p className="svc-desc max-w-[520px]">Klaviyo setup, flow automation, and campaign management for e-commerce brands — from welcome series to post-purchase and win-back flows.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Welcome &amp; abandoned-cart flows</li>
                    <li className="[font-weight:600]">Post-purchase &amp; win-back</li>
                    <li className="[font-weight:600]">Campaign management</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(6)} aria-label="Mailchimp Automation" aria-hidden={Math.abs(6 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">🐒</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Mailchimp Automation</h3>
                  <p className="svc-desc max-w-[520px]">Mailchimp account configuration, audience management, automation journeys, and campaign optimisation for growing businesses.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Audience setup &amp; cleanup</li>
                    <li className="[font-weight:600]">Automation journeys</li>
                    <li className="[font-weight:600]">Campaign optimisation</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(7)} aria-label="Brevo Email Marketing" aria-hidden={Math.abs(7 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">📮</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Brevo Email Marketing</h3>
                  <p className="svc-desc max-w-[520px]">Brevo setup and automation for transactional emails, marketing campaigns, and contact pipeline management at scale.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Marketing campaigns</li>
                    <li className="[font-weight:600]">Transactional emails</li>
                    <li className="[font-weight:600]">Contact management</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
                <article className="svc-card rounded-[20px] will-change-transform [background:var(--dark3)] [border:1px_solid_var(--border)] [grid-area:1/1]" style={card(8)} aria-label={"Zapier & Shopify Integrations"} aria-hidden={Math.abs(8 - pe) >= 0.5}>
                  <div className="svc-icon items-center rounded-[14px] flex justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)]">🔗</div>
                  <h3 className="svc-name [color:var(--white)] [font-weight:700] [line-height:1.1]">Zapier &amp; Shopify Integrations</h3>
                  <p className="svc-desc max-w-[520px]">Cross-platform automation connecting your CRM, e-commerce store, forms, and communication tools into one seamless operating system.</p>
                  <ul className="svc-list flex flex-col list-none">
                    <li className="[font-weight:600]">Connect CRM, store &amp; forms</li>
                    <li className="[font-weight:600]">Order &amp; customer data sync</li>
                    <li className="[font-weight:600]">Automated hand-offs</li>
                  </ul>
                  <a className={"btn btn-gold svc-cta items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:13px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} href="#contact">Discuss this service</a>
                </article>
              </div>
              <div className="svc-dots gap-[8px] justify-center">
                <button className={[cur === 0 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="0" onClick={() => jump(0)} aria-label="Go to HubSpot CRM Setup" />
                <button className={[cur === 1 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="1" onClick={() => jump(1)} aria-label="Go to HubSpot Workflow Automation" />
                <button className={[cur === 2 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="2" onClick={() => jump(2)} aria-label="Go to Email Marketing Campaigns" />
                <button className={[cur === 3 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="3" onClick={() => jump(3)} aria-label="Go to Lead Nurturing Systems" />
                <button className={[cur === 4 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="4" onClick={() => jump(4)} aria-label="Go to Customer Segmentation" />
                <button className={[cur === 5 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="5" onClick={() => jump(5)} aria-label="Go to Klaviyo Email Marketing" />
                <button className={[cur === 6 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="6" onClick={() => jump(6)} aria-label="Go to Mailchimp Automation" />
                <button className={[cur === 7 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="7" onClick={() => jump(7)} aria-label="Go to Brevo Email Marketing" />
                <button className={[cur === 8 && "active", "[cursor:pointer]"].filter(Boolean).join(" ")} type="button" data-i="8" onClick={() => jump(8)} aria-label={"Go to Zapier & Shopify Integrations"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionRecentProjectsCaseStudies({ onOpenLightbox }: { onOpenLightbox: (src: string, from: HTMLElement) => void }) {
  const shot = (src: string, alt: string, primary: boolean) => (
    <button
      type="button"
      aria-label={`View ${alt} full size`}
      onClick={(e) => onOpenLightbox(src, e.currentTarget)}
      className={primary
        ? "portfolio-img block h-[210px] w-full [border-bottom:1px_solid_var(--border2)] [cursor:zoom-in] [overflow:hidden] [padding:0]"
        : "block h-[64px] w-[calc(50%-4px)] rounded-[8px] [border:1px_solid_var(--border2)] [cursor:zoom-in] [overflow:hidden] [padding:0]"}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
    </button>
  );
  const [filter, setFilter] = useState("all");
  const tab = (cat: string, label: string) => (
    <button className={["\x66ilter-tab [cursor:pointer] [font-size:12px] [font-weight:600]", filter === cat && "active"].filter(Boolean).join(" ")} aria-pressed={filter === cat} onClick={() => setFilter(cat)}>{label}</button>
  );
  const show = (cats: string) => (filter === "all" || cats.split(" ").includes(filter) ? undefined : ({ display: "none" } as CSSProperties));
  return (
    <section className="[scroll-margin-top:68px]" id="portfolio">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className={"portfolio-head reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"}>
          <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">Portfolio</div>
          <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Recent Projects &amp;<br /><span className="[color:var(--gold)]">Case Studies</span></h2>
          <p className="section-sub max-w-[560px]">A selection of CRM builds, automation systems, and email marketing projects delivered for real clients.</p>
        </div>
        <div className={"\x66ilter-tabs flex flex-wrap gap-[8px]"}>{tab("all", "All Projects")}{tab("crm", "CRM Setup")}{tab("email", "Email Marketing")}{tab("automation", "Automation")}</div>
        <div className="portfolio-grid grid gap-[24px]">
          <div className={"portfolio-card reveal \x76isible [background:var(--dark2)] [overflow:hidden] [transition:opacity_.65s_ease,transform_.65s_ease] [&:hover]:[box-shadow:var(--shadow-gold)]"} data-cat="crm" style={show("crm")}>
            {shot(portCrmDupes.url, "HubSpot duplicate contact management", true)}
            <div className="flex flex-wrap gap-[8px] px-[16px] pt-[12px]">{shot(portDealTest.url, "HubSpot deal workflow test run", false)}</div>
            <div className="portfolio-body">
              <div className="portfolio-title [color:var(--white)] [font-size:20px] [font-weight:700]">HubSpot CRM Setup &amp; Pipeline Architecture</div>
              <div className="portfolio-meta-grid grid gap-[12px] grid-cols-[1fr_1fr]">
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Client Goal</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Replace spreadsheet-based tracking with a scalable CRM</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Challenge</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Disorganised contacts, no deal tracking, zero pipeline visibility</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Solution</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Full HubSpot build: 5 deal stages, custom properties, team roles, automated task creation</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Timeline</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">2 weeks</div>
                </div>
              </div>
              <div className="portfolio-tools flex flex-wrap gap-[6px]">
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">HubSpot CRM</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Workflows</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">HubSpot Forms</span>
              </div>
              <div className="portfolio-result [background:rgba(255,184,28,.06)] [border-left:2px_solid_var(--gold)] [border-radius:0_8px_8px_0] [color:var(--offwhite)] [font-size:12px] [font-weight:500]">📈 Result: <strong className="[color:var(--gold)]">40% reduction in lead response time</strong> and full pipeline visibility within 30 days</div>
            </div>
          </div>
          <div className={"portfolio-card reveal \x76isible [background:var(--dark2)] [overflow:hidden] [transition:opacity_.65s_ease,transform_.65s_ease] [&:hover]:[box-shadow:var(--shadow-gold)]"} data-cat="email automation" style={show("email automation")}>
            {shot(portDealTracking.url, "Deal tracking email automation workflow", true)}
            <div className="flex flex-wrap gap-[8px] px-[16px] pt-[12px]">{shot(portAsspDrip.url, "Post-event email drip sequence", false)}</div>
            <div className="portfolio-body">
              <div className="portfolio-title [color:var(--white)] [font-size:20px] [font-weight:700]">E-commerce Email Automation Suite</div>
              <div className="portfolio-meta-grid grid gap-[12px] grid-cols-[1fr_1fr]">
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Client Goal</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Recover abandoned carts and increase repeat purchase rate</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Challenge</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">No automation in place; 9K+ contacts with zero segmentation</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Solution</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Built welcome flow, abandoned cart (3-touch), browse abandonment, post-purchase, and win-back in Brevo</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Timeline</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">3 weeks</div>
                </div>
              </div>
              <div className="portfolio-tools flex flex-wrap gap-[6px]">
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Brevo</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Shopify</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Zapier</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Segmentation</span>
              </div>
              <div className="portfolio-result [background:rgba(255,184,28,.06)] [border-left:2px_solid_var(--gold)] [border-radius:0_8px_8px_0] [color:var(--offwhite)] [font-size:12px] [font-weight:500]">📈 Result: <strong className="[color:var(--gold)]">22% abandoned cart recovery rate</strong> and 3.1x email-attributed revenue in 60 days</div>
            </div>
          </div>
          <div className={"portfolio-card reveal \x76isible [background:var(--dark2)] [overflow:hidden] [transition:opacity_.65s_ease,transform_.65s_ease] [&:hover]:[box-shadow:var(--shadow-gold)]"} data-cat="automation" style={show("automation")}>
            {shot(portB2bDrip.url, "B2B lead nurturing drip workflow", true)}
            <div className="flex flex-wrap gap-[8px] px-[16px] pt-[12px]">{shot(portLifecycle.url, "Meeting booked lifecycle automation", false)}</div>
            <div className="portfolio-body">
              <div className="portfolio-title [color:var(--white)] [font-size:20px] [font-weight:700]">B2B Lead Nurturing Workflow</div>
              <div className="portfolio-meta-grid grid gap-[12px] grid-cols-[1fr_1fr]">
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Client Goal</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Convert cold inbound leads into sales-qualified opportunities</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Challenge</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Sales team wasting time on unqualified leads; long follow-up lag</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Solution</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">7-touch HubSpot nurture sequence with lead scoring, behavioural triggers, and automatic sales handoff</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Timeline</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">10 days</div>
                </div>
              </div>
              <div className="portfolio-tools flex flex-wrap gap-[6px]">
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">HubSpot</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Lead Scoring</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Sequences</span>
              </div>
              <div className="portfolio-result [background:rgba(255,184,28,.06)] [border-left:2px_solid_var(--gold)] [border-radius:0_8px_8px_0] [color:var(--offwhite)] [font-size:12px] [font-weight:500]">📈 Result: <strong className="[color:var(--gold)]">Sales-ready leads up 55%</strong>; time-to-qualify dropped from 14 days to 4</div>
            </div>
          </div>
          <div className={"portfolio-card reveal \x76isible [background:var(--dark2)] [overflow:hidden] [transition:opacity_.65s_ease,transform_.65s_ease] [&:hover]:[box-shadow:var(--shadow-gold)]"} data-cat="crm email" style={show("crm email")}>
            {shot(portNoShow.url, "No-show follow-up workflow automation", true)}
            <div className="portfolio-body">
              <div className="portfolio-title [color:var(--white)] [font-size:20px] [font-weight:700]">Customer Segmentation &amp; Lifecycle Strategy</div>
              <div className="portfolio-meta-grid grid gap-[12px] grid-cols-[1fr_1fr]">
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Client Goal</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Send the right message at each stage of the customer lifecycle</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Challenge</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">Entire list receiving one-size-fits-all blasts; high unsubscribe rate</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Solution</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">RFM-based segmentation across 8 lifecycle stages with tailored email content and re-engagement logic</div>
                </div>
                <div>
                  <div className="portfolio-meta-key uppercase [color:var(--gold)] [font-size:9px] [font-weight:700] [letter-spacing:.12em]">Timeline</div>
                  <div className="[color:var(--text)] [font-size:12px] [line-height:1.55]">2 weeks</div>
                </div>
              </div>
              <div className="portfolio-tools flex flex-wrap gap-[6px]">
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Klaviyo</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">Shopify</span>
                <span className="tool-badge rounded-[100px] [background:var(--gold-dim)] [border:1px_solid_var(--border)] [color:var(--gold)] [font-size:11px] [font-weight:600]">RFM Model</span>
              </div>
              <div className="portfolio-result [background:rgba(255,184,28,.06)] [border-left:2px_solid_var(--gold)] [border-radius:0_8px_8px_0] [color:var(--offwhite)] [font-size:12px] [font-weight:500]">📈 Result: <strong className="[color:var(--gold)]">Unsubscribe rate down 68%</strong>; open rate improved from 14% → 41%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionToolsTechnologies() {
  return (
    <section className="[background:var(--dark2)] [scroll-margin-top:68px]" id="skills">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className="skills-inner items-start grid gap-[80px]">
          <div className={"reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">Skills</div>
            <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Tools &amp;<br /><span className="[color:var(--gold)]">Technologies</span></h2>
            <p className="section-sub max-w-[560px]" style={{ marginBottom: "36px" }}>My technical stack spans the entire CRM, automation, and email marketing ecosystem.</p>
            <div className="flex flex-wrap gap-[10px]">
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🔧</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">HubSpot</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">📧</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Email Marketing</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">⚡</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Marketing Automation</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🗂️</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">CRM Management</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">💜</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Klaviyo</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🐒</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Mailchimp</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">📮</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Brevo</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🔗</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Zapier</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🛍️</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Shopify</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🎯</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Lead Generation</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">📊</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">GoHighLevel</span>
              </div>
              <div className={"skill-badge items-center flex gap-[10px] [background:var(--dark3)] [transition:all_.22s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.12)]"}>
                <span className="[font-size:18px]">🗺️</span>
                <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Customer Journey</span>
              </div>
            </div>
          </div>
          <div className={"reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="flex flex-col gap-[18px]">
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">HubSpot CRM &amp; Automation</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">95%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "95%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Email Marketing Strategy</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">92%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "92%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Klaviyo &amp; E-commerce Flows</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">88%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "88%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Marketing Workflow Automation</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">90%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "90%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">GoHighLevel Configuration</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">85%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Zapier &amp; API Integrations</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">80%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "80%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Customer Segmentation</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">93%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "93%" }} />
                </div>
              </div>
              <div>
                <div className="skill-bar-meta flex justify-between">
                  <span className="[color:var(--offwhite)] [font-size:13px] [font-weight:600]">Brevo / Shopify Automation</span>
                  <span className="[color:var(--gold)] [font-size:13px] [font-weight:700]">87%</span>
                </div>
                <div className="rounded-[100px] h-[5px] [background:rgba(255,255,255,.06)] [overflow:hidden]">
                  <div className="rounded-[100px] [animation:fillBar_1.6s_ease_both] [background:linear-gradient(90deg,var(--gold),var(--gold2))] [height:100%]" style={{ width: "87%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionTheExpertDifference() {
  return (
    <section className="[scroll-margin-top:68px]" id="whyme">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className="whyme-inner items-center grid gap-[80px]">
          <div className={"reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">Why Work With Me</div>
            <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">The Expert<br /><span className="[color:var(--gold)]">Difference</span></h2>
            <p className="section-sub max-w-[560px]">You won't get a generalist. You'll get someone who has spent years inside these exact systems, solving these exact problems — for clients like you.</p>
            <a className={"btn btn-gold items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:14px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} style={{ marginTop: "36px" }} href="#contact">✦ Let's Work Together</a>
          </div>
          <div className={"whyme-grid reveal \x76isible grid gap-[16px] [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className={"whyme-card [background:var(--dark2)] [transition:all_.22s] [&:hover]:[box-shadow:var(--shadow-gold)]"}>
              <div className="whyme-icon [font-size:26px]">🔍</div>
              <div className="whyme-title [color:var(--white)] [font-size:14px] [font-weight:700]">Attention to Detail</div>
              <div className="[color:var(--text)] [font-size:12px] [line-height:1.65]">Every property, every trigger condition, every enrollment filter — built precisely so your system behaves exactly as designed.</div>
            </div>
            <div className={"whyme-card [background:var(--dark2)] [transition:all_.22s] [&:hover]:[box-shadow:var(--shadow-gold)]"}>
              <div className="whyme-icon [font-size:26px]">⚡</div>
              <div className="whyme-title [color:var(--white)] [font-size:14px] [font-weight:700]">Fast Communication</div>
              <div className="[color:var(--text)] [font-size:12px] [line-height:1.65]">You'll always know where your project stands. I reply promptly and proactively flag blockers before they become delays.</div>
            </div>
            <div className={"whyme-card [background:var(--dark2)] [transition:all_.22s] [&:hover]:[box-shadow:var(--shadow-gold)]"}>
              <div className="whyme-icon [font-size:26px]">🛡️</div>
              <div className="whyme-title [color:var(--white)] [font-size:14px] [font-weight:700]">Reliable Delivery</div>
              <div className="[color:var(--text)] [font-size:12px] [line-height:1.65]">Timelines are commitments. I build realistic scopes and deliver what was promised — no scope creep, no surprises.</div>
            </div>
            <div className={"whyme-card [background:var(--dark2)] [transition:all_.22s] [&:hover]:[box-shadow:var(--shadow-gold)]"}>
              <div className="whyme-icon [font-size:26px]">🧠</div>
              <div className="whyme-title [color:var(--white)] [font-size:14px] [font-weight:700]">Strategic Thinking</div>
              <div className="[color:var(--text)] [font-size:12px] [line-height:1.65]">I don't just configure tools — I help you think through the right automation logic for your specific business model and goals.</div>
            </div>
            <div className={"whyme-card [background:var(--dark2)] [transition:all_.22s] [&:hover]:[box-shadow:var(--shadow-gold)]"}>
              <div className="whyme-icon [font-size:26px]">📈</div>
              <div className="whyme-title [color:var(--white)] [font-size:14px] [font-weight:700]">Results-Focused</div>
              <div className="[color:var(--text)] [font-size:12px] [line-height:1.65]">Every system I build has a clear KPI attached. If it doesn't move a number that matters to you, it doesn't belong in the build.</div>
            </div>
            <div className={"whyme-card [background:var(--dark2)] [transition:all_.22s] [&:hover]:[box-shadow:var(--shadow-gold)]"}>
              <div className="whyme-icon [font-size:26px]">🤝</div>
              <div className="whyme-title [color:var(--white)] [font-size:14px] [font-weight:700]">Long-Term Partnership</div>
              <div className="[color:var(--text)] [font-size:12px] [line-height:1.65]">Many clients return for ongoing optimisation. I become a trusted partner, not just a one-time contractor.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionQuestionsAnswered() {
  const [open, setOpen] = useState<number | null>(0);
  const item = (i: number) => ["faq-item [background:var(--dark2)] [transition:border-color_.3s,box-shadow_.3s]", open === i && "open [box-shadow:0_8px_36px_rgba(255,184,28,.10)]"].filter(Boolean).join(" ");
  const icon = (i: number) => ["faq-icon rounded-[50%] [border:1px_solid_var(--border)] [flex-shrink:0]", open === i && "[border-color:var(--gold)]! [box-shadow:0_4px_18px_rgba(255,184,28,.4)]"].filter(Boolean).join(" ");
  const answer = (i: number) => ["faq-a grid", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"].join(" ");
  return (
    <section className="[background:var(--dark)] [border-top:1px_solid_var(--border2)] [scroll-margin-top:68px]" id="faq">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className="faq-inner items-start grid">
          <div className={"reveal faq-side \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">FAQ</div>
            <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Questions<br /><span className="[color:var(--gold)]">Answered</span></h2>
            <p className="section-sub max-w-[560px]">Everything you might want to know before we work together.</p>
            <a className={"btn btn-gold items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:14px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} style={{ marginTop: "30px" }} href="#contact">✦ Ask Me Anything</a>
          </div>
          <div className={"reveal \x76isible flex flex-col gap-[12px] [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className={item(0)}>
              <button className={"faq-q items-center flex gap-[20px] justify-between text-left [cursor:pointer] [font-weight:600] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:-2px]"} aria-expanded={open === 0} aria-controls="faq-a0" id="faq-q0" onClick={() => setOpen(open === 0 ? null : 0)}>
                <span>Which platforms and tools do you work with?</span>
                <i className={icon(0)} aria-hidden="true" />
              </button>
              <div className={answer(0)} id="faq-a0" role="region" aria-labelledby="faq-q0">
                <div className="[overflow:hidden]">
                  <p className="max-w-[640px]">HubSpot is my core platform. I also build in Klaviyo, Mailchimp, Brevo and GoHighLevel, and connect everything with Zapier and Shopify integrations, so your CRM, store and email tools work as one system.</p>
                </div>
              </div>
            </div>
            <div className={item(1)}>
              <button className={"faq-q items-center flex gap-[20px] justify-between text-left [cursor:pointer] [font-weight:600] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:-2px]"} aria-expanded={open === 1} aria-controls="faq-a1" id="faq-q1" onClick={() => setOpen(open === 1 ? null : 1)}>
                <span>Can you work with my existing setup, or do you build from scratch?</span>
                <i className={icon(1)} aria-hidden="true" />
              </button>
              <div className={answer(1)} id="faq-a1" role="region" aria-labelledby="faq-q1">
                <div className="[overflow:hidden]">
                  <p className="max-w-[640px]">Both. If you already have a HubSpot portal or email account, I'll audit it first and fix or optimise what's there. If you're starting fresh, I'll design and build the whole system around how your business actually sells.</p>
                </div>
              </div>
            </div>
            <div className={item(2)}>
              <button className={"faq-q items-center flex gap-[20px] justify-between text-left [cursor:pointer] [font-weight:600] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:-2px]"} aria-expanded={open === 2} aria-controls="faq-a2" id="faq-q2" onClick={() => setOpen(open === 2 ? null : 2)}>
                <span>What does a typical project look like?</span>
                <i className={icon(2)} aria-hidden="true" />
              </button>
              <div className={answer(2)} id="faq-a2" role="region" aria-labelledby="faq-q2">
                <div className="[overflow:hidden]">
                  <p className="max-w-[640px]">It starts with a short consultation to understand your goals and current process. Then I map the customer journey, build the workflows, segments and emails, test everything, and hand it over with a clear walkthrough so your team knows how it runs.</p>
                </div>
              </div>
            </div>
            <div className={item(3)}>
              <button className={"faq-q items-center flex gap-[20px] justify-between text-left [cursor:pointer] [font-weight:600] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:-2px]"} aria-expanded={open === 3} aria-controls="faq-a3" id="faq-q3" onClick={() => setOpen(open === 3 ? null : 3)}>
                <span>How long does a project take?</span>
                <i className={icon(3)} aria-hidden="true" />
              </button>
              <div className={answer(3)} id="faq-a3" role="region" aria-labelledby="faq-q3">
                <div className="[overflow:hidden]">
                  <p className="max-w-[640px]">It depends on scope. A single automation can be quick, while a full CRM setup with nurture sequences takes longer. After the consultation you'll get a clear timeline before any work begins.</p>
                </div>
              </div>
            </div>
            <div className={item(4)}>
              <button className={"faq-q items-center flex gap-[20px] justify-between text-left [cursor:pointer] [font-weight:600] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:-2px]"} aria-expanded={open === 4} aria-controls="faq-a4" id="faq-q4" onClick={() => setOpen(open === 4 ? null : 4)}>
                <span>How much do you charge?</span>
                <i className={icon(4)} aria-hidden="true" />
              </button>
              <div className={answer(4)} id="faq-a4" role="region" aria-labelledby="faq-q4">
                <div className="[overflow:hidden]">
                  <p className="max-w-[640px]">Pricing depends on the size and complexity of the project. Once I understand what you need, I'll send a clear quote so there are no surprises.</p>
                </div>
              </div>
            </div>
            <div className={item(5)}>
              <button className={"faq-q items-center flex gap-[20px] justify-between text-left [cursor:pointer] [font-weight:600] [&:focus-visible]:[outline:2px_solid_var(--gold)] [&:focus-visible]:[outline-offset:-2px]"} aria-expanded={open === 5} aria-controls="faq-a5" id="faq-q5" onClick={() => setOpen(open === 5 ? null : 5)}>
                <span>How do I get started?</span>
                <i className={icon(5)} aria-hidden="true" />
              </button>
              <div className={answer(5)} id="faq-a5" role="region" aria-labelledby="faq-q5">
                <div className="[overflow:hidden]">
                  <p className="max-w-[640px]">Use the contact form below or message me by email, and tell me a little about your business and what you want to automate. I'll reply to book a consultation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact form messages are delivered to the owner's inbox by FormSubmit (no sender domain needed).
const CONTACT_INBOX = "diamondazoro21@gmail.com";
const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be under 100 characters."),
  email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address.").max(255, "Email must be under 255 characters."),
  company: z.string().trim().max(200, "Company / website must be under 200 characters."),
  service: z.string().trim().max(100),
  details: z.string().trim().min(1, "Please tell me a little about your project.").max(3000, "Project details must be under 3000 characters."),
});
type ContactForm = z.infer<typeof contactSchema>;
const emptyContact: ContactForm = { name: "", email: "", company: "", service: "", details: "" };

function ImportedSectionReadyToAutomateYourGrowth() {
  const [form, setForm] = useState<ContactForm>(emptyContact);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const sent = status === "sent";
  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(t);
  }, [sent]);
  const field = (key: keyof ContactForm) => ({
    id: `contact-${key}`,
    name: key,
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });
  const submit = async () => {
    if (status === "sending") return;
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form."); return; }
    if (honey) { setStatus("sent"); setForm(emptyContact); return; }
    setError("");
    setStatus("sending");
    try {
      const d = parsed.data;
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New portfolio enquiry from ${d.name}`,
          _replyto: d.email,
          _template: "table",
          _captcha: "false",
          Name: d.name,
          Email: d.email,
          "Company / Website": d.company || "—",
          "Service Needed": d.service || "—",
          "Project Details": d.details,
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      if (!res.ok || !json || String(json.success) !== "true") throw new Error(json?.message || "send failed");
      setForm(emptyContact);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError(`Sorry, your message couldn't be sent. Please try again or email me at ${CONTACT_INBOX}.`);
    }
  };
  return (
    <section className="[scroll-margin-top:68px]" id="contact">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className={"reveal \x76isible [transition:opacity_.65s_ease,transform_.65s_ease]"} style={{ marginBottom: "56px" }}>
          <div className="section-label items-center gap-[8px] uppercase [color:var(--gold)] [font-size:10px] [font-weight:700] [letter-spacing:.18em]">Get In Touch</div>
          <h2 className="section-title [color:var(--white)] [font-weight:600] [line-height:1.15]">Ready to Automate<br /><span className="[color:var(--gold)]">Your Growth?</span></h2>
          <p className="section-sub max-w-[560px]">Let's discuss your CRM and automation needs. I typically respond within 24 hours.</p>
        </div>
        <div className="contact-inner grid gap-[72px]">
          <div className={"reveal \x76isible flex flex-col gap-[16px] [transition:opacity_.65s_ease,transform_.65s_ease]"}><a className={"contact-link items-center flex gap-[14px] no-underline [background:var(--dark2)] [transition:all_.2s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.1)]"} href="mailto:diamondazoro21@gmail.com">{"\n          "}<div className="contact-link-icon items-center rounded-[10px] flex h-[42px] justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)] [flex-shrink:0] [font-size:18px]">✉️</div>{"\n          "}<div><div className="uppercase [color:var(--muted)] [font-size:10px] [font-weight:600] [letter-spacing:.1em]">Email</div><div className="contact-link-val [color:var(--white)] [font-size:14px] [font-weight:600]">diamondazoro21@gmail.com</div></div>{"\n        "}</a><a className={"contact-link items-center flex gap-[14px] no-underline [background:var(--dark2)] [transition:all_.2s] [&:hover]:[box-shadow:0_4px_20px_rgba(255,184,28,.1)]"} href="https://www.upwork.com/freelancers/~01423abf8a680c1e3a" target="_blank">{"\n          "}<div className="contact-link-icon items-center rounded-[10px] flex h-[42px] justify-center [background:var(--gold-dim)] [border:1px_solid_var(--border)] [flex-shrink:0] [font-size:18px]">🟢</div>{"\n          "}<div><div className="uppercase [color:var(--muted)] [font-size:10px] [font-weight:600] [letter-spacing:.1em]">Upwork Profile</div><div className="contact-link-val [color:var(--white)] [font-size:14px] [font-weight:600]">View My Upwork Profile →</div></div>{"\n        "}</a><div className="[background:var(--dark2)]" style={{ border: "1px solid var(--border2)", borderRadius: "var(--radius-sm)", padding: "20px", marginTop: "4px" } as CSSProperties}><div className="[font-size:10px] [font-weight:700] [color:var(--gold)] uppercase [letter-spacing:0.12em]" style={{ marginBottom: "12px" }}>Certifications</div><div className="flex flex-col [gap:12px]"><div className="flex items-start [gap:10px]"><div className="items-center flex h-[22px] justify-center [flex-shrink:0] [font-size:16px] [line-height:1.2]">🏅</div><div className="flex flex-col [gap:3px]"><div className="[color:var(--white)] [font-size:13px] [font-weight:600]">Email Marketing Certified</div><div className="[color:var(--muted)] [font-size:11px]">HubSpot Academy · Valid Jul 2026 – Aug 2028</div><div className="[color:var(--muted)] [font-size:10px] [letter-spacing:.04em] [opacity:.9]">Credential d47317f90f104ab79df1689617eb5f1c</div></div></div></div></div></div>
          <div className={"contact-form reveal \x76isible [background:var(--dark2)] [border:1px_solid_var(--border)] [border-radius:var(--radius)] [box-shadow:var(--shadow-gold)] [transition:opacity_.65s_ease,transform_.65s_ease]"}>
            <div className="form-title [color:var(--white)] [font-size:24px] [font-weight:700]">Send Me a Message</div>
            <div className="form-row grid gap-[14px]">
              <div className="form-group">
                <label className="block uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.08em]" htmlFor="contact-name">Your Name</label>
                <input {...field("name")} autoComplete="name" maxLength={100} className={"[background:var(--dark3)] [font-size:14px] [outline:none] [transition:border-color_.2s] [&:focus]:[box-shadow:0_0_0_3px_rgba(255,184,28,.08)]"} type="text" placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label className="block uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.08em]" htmlFor="contact-email">Email Address</label>
                <input {...field("email")} autoComplete="email" maxLength={255} className={"[background:var(--dark3)] [font-size:14px] [outline:none] [transition:border-color_.2s] [&:focus]:[box-shadow:0_0_0_3px_rgba(255,184,28,.08)]"} type="email" placeholder="jane@company.com" />
              </div>
            </div>
            <div className="form-group">
              <label className="block uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.08em]" htmlFor="contact-company">Company / Website</label>
              <input {...field("company")} maxLength={200} className={"[background:var(--dark3)] [font-size:14px] [outline:none] [transition:border-color_.2s] [&:focus]:[box-shadow:0_0_0_3px_rgba(255,184,28,.08)]"} type="text" placeholder="your-company.com" />
            </div>
            <div className="form-group">
              <label className="block uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.08em]" htmlFor="contact-service">Service Needed</label>
              <select className={"[background:var(--dark3)] [font-size:14px] [outline:none] [transition:border-color_.2s] [&:focus]:[box-shadow:0_0_0_3px_rgba(255,184,28,.08)]"} {...field("service")}>
                  <option className="[background:var(--dark3)] [color:var(--white)]" value="">Select a service...</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">HubSpot CRM Setup</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">HubSpot Workflow Automation</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Email Marketing Campaigns</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Lead Nurturing System</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Customer Segmentation</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Klaviyo Email Marketing</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Mailchimp Automation</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Brevo Email Marketing</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Zapier / Shopify Integration</option>
                  <option className="[background:var(--dark3)] [color:var(--white)]">Other / Let's Discuss</option>
                </select>
            </div>
            <div className="form-group">
              <label className="block uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.08em]" htmlFor="contact-details">Project Details</label>
              <textarea {...field("details")} maxLength={3000} className={"min-h-[108px] resize-y [background:var(--dark3)] [font-size:14px] [outline:none] [transition:border-color_.2s] [&:focus]:[box-shadow:0_0_0_3px_rgba(255,184,28,.08)]"} placeholder="Tell me about your business, what you're trying to achieve, and any tools you're already using..." />
            </div>
            <button className={"btn btn-gold form-submit items-center inline-flex gap-[8px] no-underline [cursor:pointer] [font-size:15px] [font-weight:600] [&:hover]:[filter:brightness(1.08)]"} type="button" disabled={status !== "idle"} style={sent ? { background: "linear-gradient(135deg,#10B981,#34D399)" } : undefined} onClick={submit}>{sent ? "✓ Message Sent!" : status === "sending" ? "Sending…" : "✦ Send Message"}</button>
            <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px [opacity:0]" />
            {error && <p role="alert" className="mt-[14px] [color:#F87171] [font-size:13px] [line-height:1.6]">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedFooter() {
  return (
    <footer className="[background:var(--black)] [border-top:1px_solid_var(--border2)]">
      <div className={"\x63ontainer max-w-[1160px]"}>
        <div className="footer-inner grid gap-[40px]">
          <div>
            <div className="footer-brand-name [color:var(--white)] [font-size:24px] [font-weight:700]">Diamond<span className="[color:var(--gold)]">Azoro</span></div>
            <p className="footer-brand-desc max-w-[240px]">CRM &amp; Email Marketing Specialist helping businesses automate their way to consistent, scalable growth.</p>
          </div>
          <div>
            <div className="footer-col-title uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.1em]">Services</div>
            <ul className="footer-links flex flex-col gap-[10px] list-none">
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#services">HubSpot CRM Setup</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#services">Workflow Automation</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#services">Email Marketing</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#services">Lead Nurturing</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#services">Klaviyo &amp; Brevo</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.1em]">Navigate</div>
            <ul className="footer-links flex flex-col gap-[10px] list-none">
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#about">About</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#skills">Skills</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#testimonials">Reviews</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#faq">FAQ</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title uppercase [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.1em]">Connect</div>
            <ul className="footer-links flex flex-col gap-[10px] list-none">
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="mailto:diamondazoro21@gmail.com">Email Me</a>
              </li>
              <li>
                <a className="no-underline [font-size:13px] [transition:color_.2s]" href="https://www.upwork.com/freelancers/~01423abf8a680c1e3a" target="_blank">Upwork Profile</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom flex flex-wrap gap-[12px] justify-between [border-top:1px_solid_var(--border2)] [@media(max-width:480px)]:flex-col">
          <span className="[color:var(--muted)] [font-size:12px]">© 2026 Diamond Azoro. All rights reserved.</span>
          <div className="flex gap-[10px]"><a className="social-btn items-center flex h-[36px] justify-center no-underline [cursor:pointer] [font-size:15px] [transition:all_.2s]" href="https://www.upwork.com/freelancers/~01423abf8a680c1e3a" target="_blank" title="Upwork">🟢</a><a className="social-btn items-center flex h-[36px] justify-center no-underline [cursor:pointer] [font-size:15px] [transition:all_.2s]" href="mailto:diamondazoro21@gmail.com" title="Email">✉️</a></div>
        </div>
      </div>
    </footer>
  );
}

const greetingPhrases = [
  { words: ["Hello,", "I'm", "Diamond."], hl: 2 },
  { words: ["Let's", "get", "to", "work."], hl: 3 },
];

function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const [gone, setGone] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [greet, setGreet] = useState<{ idx: number; phase: "pre" | "in" | "out" }>({ idx: 0, phase: "pre" });

  // Rotating greeting: words slide in, hold, slide out, next phrase
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    if (greet.phase === "pre") raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => setGreet((g) => ({ ...g, phase: "in" }))); });
    else if (greet.phase === "in" && !reduce) t = setTimeout(() => setGreet((g) => ({ ...g, phase: "out" })), 2800);
    else if (greet.phase === "out") t = setTimeout(() => setGreet((g) => ({ idx: g.idx + 1, phase: "pre" })), 700);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [greet]);

  // One-time welcome screen: fades while scrolling away, removed once out of view
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const NAV = 68;
    let done = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const remove = () => {
      const el = ref.current; if (done || !el) return; done = true;
      const hgt = el.offsetHeight;
      window.removeEventListener("scroll", check);
      flushSync(() => setGone(true));
      window.scrollTo({ top: Math.max(0, window.scrollY - hgt), left: 0, behavior: "instant" as ScrollBehavior });
      // A menu link clicked while the welcome screen was showing: finish the trip to its section
      const target = Date.now() - hashAt < 2500 ? document.getElementById(location.hash.slice(1)) : null;
      target?.scrollIntoView({ behavior: "smooth" });
    };
    let hashAt = 0;
    const onHash = () => { hashAt = Date.now(); };
    window.addEventListener("hashchange", onHash);
    function check() {
      const el = ref.current; if (!el || done) return;
      const r = el.getBoundingClientRect();
      const hgt = el.offsetHeight || 1;
      setOpacity(1 - Math.min(1, Math.max(0, (NAV - r.top) / (hgt * 0.85))));
      if (r.bottom > NAV) { clearTimeout(idle); return; }
      if (r.bottom < -window.innerHeight * 0.5) { remove(); return; }
      clearTimeout(idle); idle = setTimeout(remove, 120);
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("hashchange", onHash); clearTimeout(idle); };
  }, []);

  const phrase = greetingPhrases[greet.idx % greetingPhrases.length] ?? greetingPhrases[0]!;
  return (
      <section className="items-center justify-center min-h-[calc(100svh_-_68px)] text-center [overflow:hidden] [scroll-margin-top:68px]" ref={ref} style={gone ? { display: "none" } : { opacity }} id="intro">
        <div className={"\x63ontainer max-w-[1160px]"}>
          <div className="intro-eyebrow uppercase [animation:introFade_.9s_.2s_forwards] [color:var(--gold)] [font-size:11px] [font-weight:700] [letter-spacing:.3em]">Welcome</div>
          <div className="intro-title items-center flex flex-wrap justify-center max-w-[1100px] min-h-[2.1em] [color:var(--white)] [font-size:clamp(46px,9.5vw,132px)] [font-weight:700] [letter-spacing:-.01em] [line-height:1.02]" id="heroGreeting" aria-hidden="true">
            {phrase.words.map((w, i) => (
              <span key={`${greet.idx}-${i}`} className={["hg-word inline-block align-bottom [overflow:hidden]", greet.phase !== "pre" && greet.phase].filter(Boolean).join(" ")}>
                <span className={i === phrase.hl ? "bg-clip-text bg-clip-text! inline-block italic [background:linear-gradient(135deg,var(--gold),var(--gold3))] [color:transparent]" : "inline-block"} style={{ "--i": String(i) } as CSSProperties}>{w}</span>
              </span>
            ))}
          </div>
          <p className="intro-sub uppercase [animation:introFade_1s_1.1s_forwards] [font-weight:500] [letter-spacing:.18em]">CRM &amp; Email Marketing <b className="[color:var(--gold)] [font-weight:600]">Expert</b></p>
        </div>
        <a className={"\x73croll-cue items-center bottom-[34px] flex flex-col gap-[10px] no-underline uppercase [animation:introFade_1s_1.8s_forwards] [font-size:10px] [font-weight:700] [left:50%] [letter-spacing:.28em] [transition:color_.2s]"} aria-label="Scroll to introduction" href="#hero">
          <span>Scroll</span>
          <i className="block [overflow:hidden]" />
        </a>
      </section>
  );
}
