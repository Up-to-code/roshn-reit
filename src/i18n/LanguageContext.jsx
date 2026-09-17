import { createContext, useContext, useEffect, useState } from 'react'

const translations = {
  ar: {
    language: { label: 'English', toggle: 'Switch language' },
    nav: { projects: 'العقارات', whyUs: 'لماذا روشن', about: 'من نحن', contact: 'تواصل معنا' },
    common: { home: 'الرئيسية', backToProjects: 'العودة للعقارات', price: 'السعر', area: 'المساحة', year: 'السنة', sar: 'ريال', contactUs: 'تواصل معنا' },
    projects: { eyebrow: 'العقارات', title: 'جميع مشاريعنا', subtitle: 'تصفح مجموعتنا الكاملة من المشاريع السكنية الفاخرة في جدة', all: 'الكل', apartment: 'شقة', penthouse: 'بنتهاوس', duplex: 'دوبلكس', studio: 'استوديو', villa: 'فيلا', new: 'جديد', exclusive: 'حصري', featured: 'مميز', available: 'متاح' },
    about: { eyebrow: 'من نحن', title: 'نبني أحلامك', intro: 'روشن العقارية هي شركة رائدة في قطاع العقارات بالمملكة العربية السعودية، نلتزم بتقديم أعلى معايير الجودة والابتكار في كل مشروع نقوم به', story: 'قصتنا', storyOne: 'تأسست روشن العقارية عام 2009 بهدف تقديم مشاريع سكنية فاخرة تلبي تطلعات العملاء في المملكة العربية السعودية. منذ تأسيسنا، نمونا لنصبح واحدة من أبرز الشركات العقارية في المنطقة.', storyTwo: 'نؤمن بأن كل منزل هو أكثر من مجرد مبنى — إنه مكان تتشكل فيه الذكريات وتنمو فيه العائلات. لهذا نحرص على تقديم مشاريع تجمع بين الجمال والعملية والجودة.', mission: 'مهمتنا', missionText: 'نسعى لأن نكون الخيار الأول للعقارات الفاخرة في المملكة من خلال تقديم مشاريع استثنائية تتجاوز توقعات عملائنا، مع الحفاظ على أعلى معايير الجودة والاستدامة والابتكار في كل ما نفعله.', team: 'فريقنا', teamIntro: 'الخبراء الذين يقودون رؤيتنا' },
    whyUs: { eyebrow: 'لماذا روشن', title: 'لماذا تختارنا؟', intro: 'نقدم لك مزايا فريدة تجعل تجربتك معنا استثنائية من البداية إلى النهاية', testimonials: 'ماذا يقول عملاؤنا', testimonialsIntro: 'تجارب حقيقية من عملاء راضين', ctaTitle: 'جاهز لبدء رحلتك العقارية؟', ctaText: 'تواصل معنا اليوم ودعنا نساعدك في إيجاد المنزل المثالي' },
    contact: { title: 'أرسل لنا رسالة', subtitle: 'أكمل النموذج أدناه وسنرد عليك في أقرب وقت', name: 'الاسم الكامل *', namePlaceholder: 'أدخل اسمك', email: 'البريد الإلكتروني', phone: 'رقم الجوال *', propertyType: 'نوع العقار', budget: 'الميزانية المتوقعة', message: 'رسالتك (اختياري)', send: 'إرسال الطلب' },
    notFound: { title: 'الصفحة غير موجودة', back: 'العودة للرئيسية' },
  },
  en: {
    language: { label: 'العربية', toggle: 'تغيير اللغة' },
    nav: { projects: 'Properties', whyUs: 'Why ROSHN', about: 'About Us', contact: 'Contact' },
    common: { home: 'Home', backToProjects: 'Back to properties', price: 'Price', area: 'Area', year: 'Year', sar: 'SAR', contactUs: 'Contact us' },
    projects: { eyebrow: 'PROPERTIES', title: 'Our Projects', subtitle: 'Explore our complete collection of premium residential projects in Jeddah', all: 'All', apartment: 'Apartment', penthouse: 'Penthouse', duplex: 'Duplex', studio: 'Studio', villa: 'Villa', new: 'New', exclusive: 'Exclusive', featured: 'Featured', available: 'Available' },
    about: { eyebrow: 'ABOUT US', title: 'Building your dreams', intro: 'ROSHN is a leading real estate company in Saudi Arabia, committed to delivering the highest standards of quality and innovation in every project we create.', story: 'Our story', storyOne: 'ROSHN was founded in 2009 to create premium residential projects that meet the aspirations of people across Saudi Arabia. Since then, we have grown into one of the region’s leading real estate companies.', storyTwo: 'We believe every home is more than a building. It is where memories take shape and families grow. That is why we create projects that bring together beauty, practicality, and quality.', mission: 'Our mission', missionText: 'We aim to be the first choice for premium real estate in the Kingdom by creating exceptional projects that exceed expectations while maintaining the highest standards of quality, sustainability, and innovation.', team: 'Our team', teamIntro: 'The experts shaping our vision' },
    whyUs: { eyebrow: 'WHY ROSHN', title: 'Why choose us?', intro: 'Unique advantages that make your experience exceptional from beginning to end', testimonials: 'What our clients say', testimonialsIntro: 'Real experiences from happy clients', ctaTitle: 'Ready to begin your real estate journey?', ctaText: 'Contact us today and let us help you find the perfect home' },
    contact: { title: 'Send us a message', subtitle: 'Complete the form and we will get back to you shortly', name: 'Full name *', namePlaceholder: 'Enter your name', email: 'Email address', phone: 'Phone number *', propertyType: 'Property type', budget: 'Expected budget', message: 'Your message (optional)', send: 'Send request' },
    notFound: { title: 'Page not found', back: 'Back to home' },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('roshn-language') || 'ar')
  const isArabic = language === 'ar'

  useEffect(() => {
    window.localStorage.setItem('roshn-language', language)
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [language, isArabic])

  const value = {
    language,
    isArabic,
    toggleLanguage: () => setLanguage((current) => current === 'ar' ? 'en' : 'ar'),
    t: (section, key) => translations[language][section][key],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
