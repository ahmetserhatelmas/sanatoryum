 "use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type GalleryTab = "ekipman" | "kabin" | "kontrolOdasi";
type LightboxState = { tab: GalleryTab; index: number } | null;

export default function Home() {
  const galleryByCategory = {
    ekipman: [
      "/assets/ekipman/1.jpeg",
      "/assets/ekipman/2.jpeg",
      "/assets/ekipman/3.jpeg",
      "/assets/ekipman/4.jpeg",
      "/assets/ekipman/5.jpg",
      "/assets/ekipman/6.jpeg",
      "/assets/ekipman/7.jpg",
      "/assets/ekipman/8.jpeg",
    ],
    kabin: [
      "/assets/kabin/1.jpeg",
      "/assets/kabin/2.jpeg",
      "/assets/kabin/3.jpeg",
      "/assets/kabin/4.jpeg",
      "/assets/kabin/5.jpeg",
    ],
    kontrolOdasi: [
      "/assets/kontrol-odasi/1.jpeg",
      "/assets/kontrol-odasi/2.jpeg",
      "/assets/kontrol-odasi/3.jpeg",
    ],
  } as const;

  const [activeGalleryTab, setActiveGalleryTab] =
    useState<keyof typeof galleryByCategory>("ekipman");

  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const openLightbox = useCallback((tab: GalleryTab, index: number) => {
    setLightbox({ tab, index });
  }, []);

  const lightboxSrc =
    lightbox && galleryByCategory[lightbox.tab].length > 0
      ? galleryByCategory[lightbox.tab][lightbox.index]!
      : null;
  const lightboxCount = lightbox
    ? galleryByCategory[lightbox.tab].length
    : 0;

  const goLightboxPrev = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return prev;
      const imgs = galleryByCategory[prev.tab];
      if (imgs.length < 2) return prev;
      return {
        ...prev,
        index: (prev.index - 1 + imgs.length) % imgs.length,
      };
    });
  }, []);

  const goLightboxNext = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return prev;
      const imgs = galleryByCategory[prev.tab];
      if (imgs.length < 2) return prev;
      return {
        ...prev,
        index: (prev.index + 1) % imgs.length,
      };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goLightboxPrev();
      if (e.key === "ArrowRight") goLightboxNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, goLightboxPrev, goLightboxNext]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <main className="bg-[#06050b] text-white">
      <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-40 flex flex-col gap-4 sm:right-5">
        <a
          href="https://www.instagram.com/sanatoryumstudyo/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/25 bg-black/70 shadow-lg backdrop-blur-md transition hover:border-violet-300 hover:bg-violet-600/35 sm:h-16 sm:w-16"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 fill-white transition group-hover:scale-110 sm:h-7 sm:w-7"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.9 1.2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
          </svg>
        </a>
        <a
          href="https://wa.me/905455471235"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/25 bg-black/70 shadow-lg backdrop-blur-md transition hover:border-green-300 hover:bg-green-500/30 sm:h-16 sm:w-16"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 fill-white transition group-hover:scale-110 sm:h-7 sm:w-7"
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.17 1.6 6L0 24l6.31-1.66a11.87 11.87 0 0 0 5.75 1.46h.01c6.56 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.15-3.44-8.42Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.75.98 1-3.65-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.9-9.89 9.9Zm5.42-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.65.15-.2.3-.75.97-.92 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.2 0-.5.07-.76.37-.26.3-1 1-.98 2.43.02 1.43 1.03 2.8 1.18 2.99.15.2 2.03 3.1 4.92 4.35.69.3 1.24.47 1.66.6.7.22 1.35.19 1.86.11.57-.09 1.76-.72 2-1.42.25-.7.25-1.31.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </a>
      </div>

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <Image
          src="/assets/ekipman/10.jpeg"
          alt="Sanatoryum Stüdyo arka plan"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.28),transparent_45%),linear-gradient(to_bottom,rgba(7,4,16,0.62),rgba(4,3,12,0.95))]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-5 md:pb-24 md:pt-8">
          <header className="rounded-2xl border border-white/10 bg-black/30 px-3 py-4 backdrop-blur-md sm:px-5 sm:py-5 md:py-6">
            <div className="flex items-start gap-3 sm:gap-5 md:items-center md:gap-8">
              <div className="relative isolate h-44 w-44 shrink-0 sm:h-44 sm:w-44 md:h-48 md:w-48">
                <Image
                  src="/assets/logo-transparent.png"
                  alt="Sanatoryum Stüdyo logosu"
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 192px"
                  className="relative z-10 object-contain object-left brightness-[1.12] contrast-105 drop-shadow-[0_0_36px_rgba(196,181,253,0.7)]"
                />
                <div
                  className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-lg"
                  aria-hidden
                >
                  <div className="logo-shine-layer absolute -top-px bottom-0 left-0 w-[45%] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[0.5px] mix-blend-screen" />
                </div>
              </div>
              <div className="min-w-0 flex-1 pt-0.5 sm:pt-1 md:pt-0">
                <p className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-2xl md:text-4xl">
                  Sanatoryum Stüdyo
                </p>
                <p className="mt-1 max-w-md text-[9px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-violet-100/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-[10px] sm:tracking-[0.22em] md:text-xs md:tracking-[0.3em]">
                  Music &amp; Video Productions
                </p>
              </div>
            </div>
          </header>

          <nav
            className="mt-3 grid w-full min-w-0 grid-cols-4 gap-2 sm:mt-4 sm:gap-3"
            aria-label="Ana menü"
          >
            <a
              href="#hizmetler"
              className="flex min-h-[3.75rem] w-full min-w-0 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 px-1.5 text-center text-[11px] font-semibold leading-tight text-white shadow-sm transition hover:bg-white/20 sm:min-h-[4.25rem] sm:px-2 sm:text-sm md:text-base"
            >
              Hizmetler
            </a>
            <a
              href="#surec"
              className="flex min-h-[3.75rem] w-full min-w-0 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 px-1.5 text-center text-[11px] font-semibold leading-tight text-white shadow-sm transition hover:bg-white/20 sm:min-h-[4.25rem] sm:px-2 sm:text-sm md:text-base"
            >
              Süreç
            </a>
            <a
              href="#galeri"
              className="flex min-h-[3.75rem] w-full min-w-0 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 px-1.5 text-center text-[11px] font-semibold leading-tight text-white shadow-sm transition hover:bg-white/20 sm:min-h-[4.25rem] sm:px-2 sm:text-sm md:text-base"
            >
              Galeri
            </a>
            <a
              href="#iletisim"
              className="flex min-h-[3.75rem] w-full min-w-0 items-center justify-center rounded-2xl border-2 border-violet-400/60 bg-violet-600 px-1.5 text-center text-[11px] font-semibold leading-tight text-white shadow-md transition hover:bg-violet-500 sm:min-h-[4.25rem] sm:px-2 sm:text-sm md:text-base"
            >
              Ön Görüşme
            </a>
          </nav>

          <div className="mt-12 max-w-3xl md:mt-16">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/75">
              Sanatoryum Ses Kayıt ve Prodüksiyon Stüdyosu
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Şarkını profesyonel kayıt ve prodüksiyonla yayına hazır hale
              getir.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
              Kayıt, aranje, mix & mastering ve klip sürecini aynı ekipte,
              tek bir yaratıcı akışta yönetiyoruz.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#hizmetler"
                className="rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-violet-500"
              >
                Prodüksiyon Paketleri
              </a>
              <a
                href="https://www.instagram.com/sanatoryumstudyo/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="mx-auto w-full max-w-6xl px-5 py-16">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
          Hizmetler
        </p>
        <h2 className="mt-2 text-center text-3xl font-semibold md:text-4xl">
          Projen için doğru süreci birlikte belirleyelim
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Single Proje",
              details:
                "Kişiye özel aranje, canlı enstrüman ve hibrit prodüksiyon.",
            },
            {
              title: "Vokal Kayıt & Mix",
              details:
                "Hazır altyapı üzerine vokal kayıt, temiz edit ve mix/master.",
            },
            {
              title: "Klip Çekimi",
              details:
                "Konsept geliştirme, çekim, kurgu, renk ve yayına hazır teslim.",
            },
          ].map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-white/15 bg-white/[0.03] p-6"
            >
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="mt-4 text-white/80">{service.details}</p>
              <a
                href="#iletisim"
                className="mt-6 inline-flex rounded-full bg-violet-100 px-5 py-2.5 text-sm font-semibold text-violet-950 transition hover:bg-violet-200"
              >
                Ön Görüşme Planla
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="surec" className="relative isolate overflow-hidden py-16">
        <Image
          src="/assets/kontrol-odasi/2.jpeg"
          alt="Ses kayıt masası"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-5 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Şarkını nasıl çıkarıyoruz?
            </h2>
            <p className="mt-4 text-white/85">
              Fikrinden yayına kadar tüm süreci birlikte planlıyor, her adımı
              teknik ve yaratıcı olarak seninle yönetiyoruz.
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <p className="font-semibold text-violet-300">Müzik Prodüksiyonu</p>
                <p className="text-white/80">
                  Kayıt, aranje, mix ve mastering süreçlerini stüdyo ortamında
                  tek çizgide birleştiriyoruz.
                </p>
              </li>
              <li>
                <p className="font-semibold text-violet-300">Klip Prodüksiyonu</p>
                <p className="text-white/80">
                  İç/dış mekan çekimlerini planlayıp çekim ve kurgu sürecini
                  baştan sona yürütüyoruz.
                </p>
              </li>
              <li>
                <p className="font-semibold text-violet-300">Dijital Dağıtım</p>
                <p className="text-white/80">
                  İçeriğini dijital platformlara yayına hazır hale getiriyor,
                  yayın planını birlikte hazırlıyoruz.
                </p>
              </li>
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/15 bg-black/30 p-5 backdrop-blur">
            <video
              className="w-full rounded-2xl border border-white/10 bg-black"
              src="/assets/reklam-videosu.mp4"
              controls
              preload="metadata"
            />
          </div>
        </div>
      </section>

      <section id="galeri" className="mx-auto w-full max-w-6xl px-5 pb-16">
        <h2 className="mb-5 text-2xl font-semibold md:text-3xl">
          Stüdyo Galerisi
        </h2>
        <div className="mb-5 grid w-full grid-cols-3 gap-1.5 sm:gap-2 md:flex md:w-auto md:flex-wrap md:gap-2">
          <button
            type="button"
            onClick={() => setActiveGalleryTab("ekipman")}
            className={`flex min-h-[44px] items-center justify-center rounded-full border px-2 py-2 text-center text-[11px] font-semibold leading-tight transition sm:text-xs md:min-h-0 md:px-4 md:py-2 md:text-sm ${
              activeGalleryTab === "ekipman"
                ? "border-violet-400 bg-violet-600 text-white"
                : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            EKİPMAN
          </button>
          <button
            type="button"
            onClick={() => setActiveGalleryTab("kabin")}
            className={`flex min-h-[44px] items-center justify-center rounded-full border px-2 py-2 text-center text-[11px] font-semibold leading-tight transition sm:text-xs md:min-h-0 md:px-4 md:py-2 md:text-sm ${
              activeGalleryTab === "kabin"
                ? "border-violet-400 bg-violet-600 text-white"
                : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            KABİN
          </button>
          <button
            type="button"
            onClick={() => setActiveGalleryTab("kontrolOdasi")}
            className={`flex min-h-[44px] flex-col items-center justify-center rounded-full border px-1.5 py-1.5 text-center text-[10px] font-semibold leading-tight transition sm:text-xs md:min-h-0 md:flex-row md:px-4 md:py-2 md:text-sm ${
              activeGalleryTab === "kontrolOdasi"
                ? "border-violet-400 bg-violet-600 text-white"
                : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            <span className="md:hidden">
              KONTROL
              <br />
              ODASI
            </span>
            <span className="hidden md:inline">KONTROL ODASI</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryByCategory[activeGalleryTab].map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => openLightbox(activeGalleryTab, index)}
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-0 text-left outline-none transition hover:border-violet-400/50 focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Image
                src={src}
                alt={`Stüdyo görseli ${index + 1}, büyütmek için tıkla`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
            </button>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-center text-white/80">
          Sanatoryum Stüdyo, müzik üretiminin farklı aşamalarında yer alan bir
          prodüksiyon yapısı olarak çalışır. Kayıtla başlayan süreci, doğru
          performans, teknik kalite ve güçlü bir estetikle tamamlarız.
        </p>
      </section>

      <section id="iletisim" className="mx-auto w-full max-w-6xl px-5 pb-20">
        <div className="rounded-3xl border border-violet-300/30 bg-gradient-to-b from-violet-500/15 to-white/5 p-8 text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">
            Projenizi birlikte hayata geçirelim
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Projeni kısaca yaz, ön görüşmeni planlayalım. Tüm üretim sürecini
            markana ve hedef kitlene göre birlikte netleştirelim.
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-xs flex-col gap-3 sm:max-w-sm md:max-w-md">
            <a
              href="https://wa.me/905455471235"
              target="_blank"
              rel="noreferrer"
              className="flex h-[5.5rem] w-full flex-col items-center justify-center gap-1 rounded-full border-2 border-green-500/55 bg-green-500/15 px-5 text-lg font-semibold text-white shadow-sm transition hover:bg-green-500/30"
            >
              <span>WhatsApp</span>
              <span className="text-sm font-medium leading-tight text-white/90">
                +90 545 547 12 35
              </span>
            </a>
            <a
              href="https://www.instagram.com/sanatoryumstudyo/"
              target="_blank"
              rel="noreferrer"
              className="flex h-[5.5rem] w-full items-center justify-center rounded-full border-2 border-red-400/50 bg-red-500/10 px-5 text-lg font-semibold text-white shadow-sm transition hover:bg-red-500/25"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {lightbox && lightboxSrc ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/93 p-3 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Galeri — tam boyut"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
            const dx = endX - touchStartX.current;
            touchStartX.current = null;
            if (dx > 60) goLightboxPrev();
            else if (dx < -60) goLightboxNext();
          }}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-3 top-3 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl leading-none text-white backdrop-blur transition hover:bg-white/15 md:right-6 md:top-6"
            aria-label="Kapat"
          >
            ×
          </button>

          {lightboxCount > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxPrev();
                }}
                className="absolute left-2 top-1/2 z-[60] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-white backdrop-blur transition hover:bg-white/15 md:left-6 md:h-12 md:w-12"
                aria-label="Önceki fotoğraf"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxNext();
                }}
                className="absolute right-2 top-1/2 z-[60] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-2xl text-white backdrop-blur transition hover:bg-white/15 md:right-6 md:h-12 md:w-12"
                aria-label="Sonraki fotoğraf"
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative mt-10 h-[min(82vh,920px)] w-full max-w-6xl flex-1 md:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={lightboxSrc}
              src={lightboxSrc}
              alt={`Galeri — ${lightbox.index + 1} / ${lightboxCount}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <p className="mt-3 text-center text-sm text-white/70">
            {lightbox.index + 1} / {lightboxCount} · Esc ile kapat · ← → ile
            gez
          </p>
        </div>
      ) : null}
    </main>
  );
}
