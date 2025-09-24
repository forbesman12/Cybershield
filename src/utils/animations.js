// // ========================================
// // HOTEL ANIMATION UTILITIES & HOOKS
// // ========================================

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// // ========================================
// // ANIMATION INITIALIZATION
// // ========================================

// export const initializeAnimations = () => {
//   AOS.init({
//     duration: 600,
//     easing: 'ease-out-cubic',
//     once: true,
//     offset: 100,
//     delay: 0,
//   });
// };

// // ========================================
// // GSAP ANIMATION HOOKS
// // ========================================

// // Hero section background zoom animation
// export const useHeroAnimation = () => {
//   const heroRef = useRef(null);
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     if (!heroRef.current) return;

//     const tl = gsap.timeline();
    
//     // Background zoom effect
//     tl.from(heroRef.current, {
//       scale: 1.2,
//       duration: 8,
//       ease: 'power2.out'
//     })
//     // Title animation
//     .from(titleRef.current, {
//       opacity: 0,
//       y: 50,
//       duration: 1,
//       ease: 'power3.out'
//     }, '-=7')
//     // Subtitle animation
//     .from(subtitleRef.current, {
//       opacity: 0,
//       y: 30,
//       duration: 0.8,
//       ease: 'power3.out'
//     }, '-=0.5')
//     // Button animation
//     .from(buttonRef.current, {
//       opacity: 0,
//       scale: 0.8,
//       duration: 0.6,
//       ease: 'back.out(1.7)'
//     }, '-=0.3');

//   }, []);

//   return { heroRef, titleRef, subtitleRef, buttonRef };
// };

// // Image hover zoom animation
// export const useImageHover = () => {
//   const imageRef = useRef(null);

//   const handleMouseEnter = () => {
//     gsap.to(imageRef.current, {
//       scale: 1.1,
//       duration: 0.6,
//       ease: 'power2.out'
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(imageRef.current, {
//       scale: 1,
//       duration: 0.6,
//       ease: 'power2.out'
//     });
//   };

//   return { imageRef, handleMouseEnter, handleMouseLeave };
// };

// // Card lift animation
// export const useCardHover = () => {
//   const cardRef = useRef(null);

//   const handleMouseEnter = () => {
//     gsap.to(cardRef.current, {
//       y: -8,
//       boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
//       duration: 0.3,
//       ease: 'power2.out'
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(cardRef.current, {
//       y: 0,
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//       duration: 0.3,
//       ease: 'power2.out'
//     });
//   };

//   return { cardRef, handleMouseEnter, handleMouseLeave };
// };

// // ========================================
// // RIPPLE EFFECT UTILITY
// // ========================================

// export const createRipple = (event) => {
//   const button = event.currentTarget;
//   const rect = button.getBoundingClientRect();
//   const size = Math.max(rect.width, rect.height);
//   const x = event.clientX - rect.left - size / 2;
//   const y = event.clientY - rect.top - size / 2;
  
//   const ripple = document.createElement('span');
//   ripple.className = 'ripple';
//   ripple.style.width = ripple.style.height = size + 'px';
//   ripple.style.left = x + 'px';
//   ripple.style.top = y + 'px';
  
//   button.appendChild(ripple);
  
//   setTimeout(() => {
//     ripple.remove();
//   }, 600);
// };

// // ========================================
// // SCROLL REVEAL ANIMATIONS
// // ========================================

// export const useScrollReveal = (trigger = 'bottom-bottom') => {
//   const ref = useRef(null);

//   useEffect(() => {
//     if (!ref.current) return;

//     gsap.fromTo(ref.current, 
//       {
//         opacity: 0,
//         y: 50
//       },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: ref.current,
//           start: 'top 80%',
//           toggleActions: 'play none none reverse'
//         }
//       }
//     );
//   }, [trigger]);

//   return ref;
// };

// // ========================================
// // STAGGER ANIMATIONS
// // ========================================

// export const useStaggerAnimation = (selector = '.stagger-item') => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const items = containerRef.current.querySelectorAll(selector);
    
//     gsap.from(items, {
//       opacity: 0,
//       y: 30,
//       duration: 0.6,
//       stagger: 0.1,
//       ease: 'power3.out',
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top 80%',
//         toggleActions: 'play none none reverse'
//       }
//     });
//   }, [selector]);

//   return containerRef;
// };

// // ========================================
// // LOADING ANIMATIONS
// // ========================================

// export const useLoadingAnimation = (isLoading) => {
//   const loaderRef = useRef(null);

//   useEffect(() => {
//     if (!loaderRef.current) return;

//     if (isLoading) {
//       gsap.to(loaderRef.current, {
//         rotation: 360,
//         duration: 1,
//         repeat: -1,
//         ease: 'linear'
//       });
//     } else {
//       gsap.killTweensOf(loaderRef.current);
//     }
//   }, [isLoading]);

//   return loaderRef;
// };

// // ========================================
// // SUCCESS ANIMATION
// // ========================================

// export const triggerSuccessAnimation = (container) => {
//   // Create success check animation
//   const checkElement = container.querySelector('.success-check');
//   if (checkElement) {
//     gsap.fromTo(checkElement,
//       { scale: 0, rotation: -180 },
//       { 
//         scale: 1, 
//         rotation: 0, 
//         duration: 0.6, 
//         ease: 'back.out(1.7)' 
//       }
//     );
//   }

//   // Create confetti effect
//   createConfetti(container);
// };

// const createConfetti = (container) => {
//   const colors = ['#d4af37', '#f4e7a1', '#ffffff'];
//   const confettiCount = 50;

//   for (let i = 0; i < confettiCount; i++) {
//     const confetti = document.createElement('div');
//     confetti.className = 'confetti-piece';
//     confetti.style.left = Math.random() * 100 + '%';
//     confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
//     confetti.style.animationDelay = Math.random() * 2 + 's';
    
//     container.appendChild(confetti);
    
//     setTimeout(() => {
//       confetti.remove();
//     }, 3000);
//   }
// };

// // ========================================
// // CAROUSEL ANIMATIONS
// // ========================================

// export const useCarouselAnimation = () => {
//   const containerRef = useRef(null);
//   const currentIndex = useRef(0);

//   const slideNext = () => {
//     if (!containerRef.current) return;
    
//     const slides = containerRef.current.children;
//     const nextIndex = (currentIndex.current + 1) % slides.length;
    
//     gsap.to(slides[currentIndex.current], {
//       x: '-100%',
//       opacity: 0,
//       duration: 0.5,
//       ease: 'power2.inOut'
//     });
    
//     gsap.fromTo(slides[nextIndex], 
//       { x: '100%', opacity: 0 },
//       { 
//         x: '0%', 
//         opacity: 1, 
//         duration: 0.5, 
//         ease: 'power2.inOut' 
//       }
//     );
    
//     currentIndex.current = nextIndex;
//   };

//   const slidePrev = () => {
//     if (!containerRef.current) return;
    
//     const slides = containerRef.current.children;
//     const prevIndex = currentIndex.current === 0 ? slides.length - 1 : currentIndex.current - 1;
    
//     gsap.to(slides[currentIndex.current], {
//       x: '100%',
//       opacity: 0,
//       duration: 0.5,
//       ease: 'power2.inOut'
//     });
    
//     gsap.fromTo(slides[prevIndex], 
//       { x: '-100%', opacity: 0 },
//       { 
//         x: '0%', 
//         opacity: 1, 
//         duration: 0.5, 
//         ease: 'power2.inOut' 
//       }
//     );
    
//     currentIndex.current = prevIndex;
//   };

//   return { containerRef, slideNext, slidePrev };
// };

// // ========================================
// // LIGHTBOX ANIMATIONS
// // ========================================

// export const useLightbox = () => {
//   const overlayRef = useRef(null);
//   const imageRef = useRef(null);

//   const openLightbox = (imageSrc) => {
//     if (!overlayRef.current || !imageRef.current) return;

//     imageRef.current.src = imageSrc;
//     overlayRef.current.style.display = 'flex';
    
//     gsap.fromTo(overlayRef.current, 
//       { opacity: 0 },
//       { opacity: 1, duration: 0.3, ease: 'power2.out' }
//     );
    
//     gsap.fromTo(imageRef.current, 
//       { scale: 0.5, opacity: 0 },
//       { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
//     );
//   };

//   const closeLightbox = () => {
//     if (!overlayRef.current) return;
    
//     gsap.to(overlayRef.current, {
//       opacity: 0,
//       duration: 0.3,
//       ease: 'power2.in',
//       onComplete: () => {
//         overlayRef.current.style.display = 'none';
//       }
//     });
//   };

//   return { overlayRef, imageRef, openLightbox, closeLightbox };
// };

// // ========================================
// // MOBILE MENU ANIMATIONS
// // ========================================

// export const useMobileMenu = () => {
//   const menuRef = useRef(null);
//   const hamburgerRef = useRef(null);
  
//   const toggleMenu = (isOpen) => {
//     if (!menuRef.current || !hamburgerRef.current) return;

//     if (isOpen) {
//       gsap.to(menuRef.current, {
//         x: 0,
//         duration: 0.4,
//         ease: 'power3.out'
//       });
      
//       // Animate hamburger to X
//       gsap.to(hamburgerRef.current.children[0], { rotation: 45, y: 6 });
//       gsap.to(hamburgerRef.current.children[1], { opacity: 0 });
//       gsap.to(hamburgerRef.current.children[2], { rotation: -45, y: -6 });
//     } else {
//       gsap.to(menuRef.current, {
//         x: '-100%',
//         duration: 0.4,
//         ease: 'power3.in'
//       });
      
//       // Reset hamburger
//       gsap.to(hamburgerRef.current.children[0], { rotation: 0, y: 0 });
//       gsap.to(hamburgerRef.current.children[1], { opacity: 1 });
//       gsap.to(hamburgerRef.current.children[2], { rotation: 0, y: 0 });
//     }
//   };

//   return { menuRef, hamburgerRef, toggleMenu };
// };

// // ========================================
// // FORM VALIDATION ANIMATIONS
// // ========================================

// export const animateFormValidation = (input, isValid) => {
//   if (isValid) {
//     gsap.to(input, {
//       borderColor: '#10b981',
//       duration: 0.3,
//       ease: 'power2.out'
//     });
//   } else {
//     gsap.to(input, {
//       borderColor: '#ef4444',
//       duration: 0.3,
//       ease: 'power2.out'
//     });
    
//     // Shake animation for error
//     gsap.to(input, {
//       x: [-5, 5, -3, 3, 0],
//       duration: 0.4,
//       ease: 'power2.out'
//     });
//   }
// };

// // ========================================
// // PAGE TRANSITION UTILITIES
// // ========================================

// export const pageTransition = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 },
//   transition: { duration: 0.6, ease: 'easeOut' }
// };

// // ========================================
// // PERFORMANCE OPTIMIZED ANIMATIONS
// // ========================================

// export const optimizeAnimation = () => {
//   // Enable hardware acceleration for GSAP
//   gsap.config({
//     force3D: true,
//     autoSleep: 60
//   });
  
//   // Reduce animations on low-end devices
//   const isLowEndDevice = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
//   if (isLowEndDevice) {
//     gsap.globalTimeline.timeScale(0.5);
//   }
// };
