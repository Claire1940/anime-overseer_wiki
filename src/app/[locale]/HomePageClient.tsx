"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  Award,
  Bell,
  Check,
  ChevronDown,
  Clock,
  Coins,
  Compass,
  Copy,
  Diamond,
  Disc,
  Gem,
  Gift,
  ListOrdered,
  Medal,
  RefreshCw,
  RotateCw,
  ShieldAlert,
  Sparkles,
  Star,
  Swords,
  Target,
  Ticket,
  Timer,
  Trophy,
  Wand2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
// import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// 复制兑换码卡片（带复制反馈）
function CodeCard({
  code,
  status,
  rewards,
  bestFor,
}: {
  code: string;
  status: string;
  rewards: string[];
  bestFor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // 剪贴板不可用时静默失败，按钮仍提供视觉反馈
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
      <div className="flex items-center justify-between gap-2 mb-3">
        <code className="px-3 py-1.5 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm font-mono font-semibold text-[hsl(var(--nav-theme-light))] break-all">
          {code}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy code ${code}`}
          className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      <span className="self-start inline-flex items-center gap-1.5 mb-3 text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--nav-theme-light))]" />
        {status}
      </span>

      <ul className="space-y-1.5 mb-3 flex-1">
        {rewards.map((reward: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Gift className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{reward}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground/80 border-t border-border pt-3">
        {bestFor}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.anime-overseer.wiki";

  const robloxUrl = "https://www.roblox.com/games/119710171449943/Anime-Overseer";
  const discordUrl =
    "https://discord.com/servers/anime-overseer-1172499446836236318";
  const youtubeUrl = "https://www.youtube.com/watch?v=9GNQQ3yoJTM";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Anime Overseer Wiki",
        description:
          "Complete Anime Overseer Wiki covering codes, units, tier list, evolution, resources, waves, and best teams for the Roblox anime tower defense game.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Anime Overseer - Roblox Anime Tower Defense",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Anime Overseer Wiki",
        alternateName: "Anime Overseer",
        url: siteUrl,
        description:
          "Complete Anime Overseer Wiki resource hub for codes, units, tier list, evolution, waves, and best team guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Anime Overseer Wiki - Roblox Anime Tower Defense",
        },
        sameAs: [robloxUrl, discordUrl, youtubeUrl],
      },
      {
        "@type": "VideoGame",
        name: "Anime Overseer",
        gamePlatform: ["Roblox"],
        applicationCategory: "Game",
        genre: ["Tower Defense", "Strategy", "Anime"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 4,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: robloxUrl,
        },
      },
      {
        "@type": "VideoObject",
        name: "Anime Overseer - Early Access Gameplay (Roblox)",
        description:
          "Anime Overseer Early Access gameplay preview for the Roblox anime tower defense game.",
        uploadDate: "2026-07-08",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/9GNQQ3yoJTM",
        contentUrl: youtubeUrl,
      },
    ],
  };

  // Module 7 (Game Modes) accordion state
  const [modesExpanded, setModesExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // 模块导航锚点（与下方 8 个 section 一一对应）
  const sectionIds = [
    "codes",
    "beginner-guide",
    "units-tier-list",
    "traits-guide",
    "evolution-guide",
    "gems-and-gold-farming",
    "game-modes-and-waves",
    "updates-and-discord",
  ];

  // tier list 每行图标
  const tierIcons = [Trophy, Medal, Award, Star, Target];
  // traits 每张卡图标
  const traitIcons = [Disc, RefreshCw, RotateCw, Gem, Diamond, Timer, ShieldAlert];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Ticket className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href={robloxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后（容器上限 max-w-5xl，避免挤压广告） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="9GNQQ3yoJTM"
              title="Anime Overseer - Early Access Gameplay (Roblox)"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（视频区之后、Latest Updates 之前） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* Module 1: Anime Overseer Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Ticket className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerCodes.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerCodes.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerCodes.intro}
            </p>
          </div>

          {/* Code Cards */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {t.modules.animeOverseerCodes.codes.map((c: any, index: number) => (
              <CodeCard
                key={index}
                code={c.code}
                status={c.status}
                rewards={c.rewards}
                bestFor={c.bestFor}
              />
            ))}
          </div>

          {/* Expired notice */}
          <div className="scroll-reveal mb-8 p-5 bg-white/5 border border-border rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              {t.modules.animeOverseerCodes.expired}
            </p>
          </div>

          {/* How to redeem */}
          <div className="scroll-reveal p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <h3 className="font-bold text-base md:text-lg mb-4 text-center">
              {t.modules.animeOverseerCodes.howToTitle}
            </h3>
            <ol className="space-y-2.5 max-w-2xl mx-auto">
              {t.modules.animeOverseerCodes.howToSteps.map(
                (step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Anime Overseer Beginner Guide */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Compass className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerBeginnerGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerBeginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerBeginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.animeOverseerBeginnerGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <p className="text-sm text-[hsl(var(--nav-theme-light))] flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {step.tip}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Check className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.animeOverseerBeginnerGuide.quickTips.map(
                (tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: Anime Overseer Units Tier List */}
      <section
        id="units-tier-list"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <ListOrdered className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerUnitsTierList.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerUnitsTierList.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerUnitsTierList.intro}
            </p>
          </div>

          {/* Tier Rows */}
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.animeOverseerUnitsTierList.tiers.map(
              (tier: any, index: number) => {
                const TierIcon = tierIcons[index] || Star;
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                  >
                    <div className="flex items-center gap-3 md:flex-col md:items-center md:justify-center md:w-28 md:flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.4)]">
                        <TierIcon className="w-7 h-7 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div className="md:text-center">
                        <div className="text-2xl font-bold text-[hsl(var(--nav-theme-light))]">
                          {tier.tier}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tier.priority}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{tier.label}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                          {tier.role}
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                        {tier.basis.map((b: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-muted-foreground border-t border-border pt-3">
                        {tier.useWhen}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* 广告位 5: 中部原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* Module 4: Anime Overseer Traits Guide */}
      <section
        id="traits-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Wand2 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerTraitsGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerTraitsGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerTraitsGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.animeOverseerTraitsGuide.cards.map(
              (card: any, index: number) => {
                const CardIcon = traitIcons[index] || Disc;
                return (
                  <div
                    key={index}
                    className="flex flex-col p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                        <CardIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div>
                        <h3 className="font-bold leading-tight">{card.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {card.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {card.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {card.sources.map((s: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-border font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground/80 border-t border-border pt-3 mt-auto">
                      {card.bestUse}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Module 5: Anime Overseer Evolution Guide */}
      <section
        id="evolution-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Zap className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerEvolutionGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerEvolutionGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerEvolutionGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8">
            {t.modules.animeOverseerEvolutionGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-lg md:text-xl font-bold">
                        {step.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                        {step.focus}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Checklist */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Check className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">
                Evolve a unit when
              </h3>
            </div>
            <ul className="space-y-2">
              {t.modules.animeOverseerEvolutionGuide.checklist.map(
                (item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 6: 中后部停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 6: Anime Overseer Gems and Gold Farming Guide */}
      <section
        id="gems-and-gold-farming"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Coins className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerGemsAndGoldFarming.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerGemsAndGoldFarming.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerGemsAndGoldFarming.intro}
            </p>
          </div>

          {/* Resource Table */}
          <div className="scroll-reveal overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)] border-b border-border text-left">
                  <th className="p-3 md:p-4 font-semibold">Resource</th>
                  <th className="p-3 md:p-4 font-semibold">Best Use</th>
                  <th className="p-3 md:p-4 font-semibold">Priority</th>
                  <th className="p-3 md:p-4 font-semibold hidden md:table-cell">
                    Player Tip
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.modules.animeOverseerGemsAndGoldFarming.resources.map(
                  (r: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-border last:border-0 align-top"
                    >
                      <td className="p-3 md:p-4 font-semibold text-[hsl(var(--nav-theme-light))]">
                        {r.resource}
                      </td>
                      <td className="p-3 md:p-4 text-muted-foreground">
                        {r.bestUse}
                      </td>
                      <td className="p-3 md:p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${r.priority === "High" ? "bg-[hsl(var(--nav-theme)/0.15)] border-[hsl(var(--nav-theme)/0.4)] text-[hsl(var(--nav-theme-light))]" : r.priority === "Save" ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"}`}
                        >
                          {r.priority}
                        </span>
                      </td>
                      <td className="p-3 md:p-4 text-muted-foreground hidden md:table-cell">
                        {r.tip}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {/* 移动端 tip 卡片（桌面端已含在表格里） */}
          <div className="md:hidden mt-4 space-y-2">
            {t.modules.animeOverseerGemsAndGoldFarming.resources.map(
              (r: any, index: number) => (
                <p key={index} className="text-xs text-muted-foreground">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                    {r.resource}:
                  </span>{" "}
                  {r.tip}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 7: Anime Overseer Game Modes and Waves Guide */}
      <section
        id="game-modes-and-waves"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Swords className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerGameModesAndWaves.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerGameModesAndWaves.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerGameModesAndWaves.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-2">
            {t.modules.animeOverseerGameModesAndWaves.faqs.map(
              (faq: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setModesExpanded(modesExpanded === index ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${modesExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {modesExpanded === index && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm mb-2">
                        {faq.answer}
                      </p>
                      <span className="inline-flex text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                        {faq.bestFor}
                      </span>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 7: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 8: Anime Overseer Updates and Discord Guide */}
      <section
        id="updates-and-discord"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Bell className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                {t.modules.animeOverseerUpdatesAndDiscord.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.animeOverseerUpdatesAndDiscord.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.modules.animeOverseerUpdatesAndDiscord.intro}
            </p>
          </div>

          {/* Timeline */}
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 mb-8">
            {t.modules.animeOverseerUpdatesAndDiscord.entries.map(
              (entry: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                  <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                        {entry.label}
                      </span>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold mb-1">{entry.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {entry.description}
                    </p>
                    <p className="text-sm text-[hsl(var(--nav-theme-light))] flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {entry.action}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Community links */}
          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white text-sm font-semibold transition-colors"
            >
              {t.cta.joinCommunity}
            </a>
            <a
              href={robloxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-white/10 text-sm font-semibold transition-colors"
            >
              {t.cta.joinGame}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={robloxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.roblox}
                  </a>
                </li>
                <li>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={locale === "en" ? "/about" : `/${locale}/about`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/privacy-policy"
                        : `/${locale}/privacy-policy`
                    }
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/terms-of-service"
                        : `/${locale}/terms-of-service`
                    }
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en" ? "/copyright" : `/${locale}/copyright`
                    }
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
