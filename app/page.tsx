"use client"

import React, { useState, useMemo, ReactNode, ForwardedRef, useEffect } from "react"
import {
    Download,
    Eye,
    Settings,
    Monitor,
    Smartphone,
    Copy,
    Check,
    Plus,
    Trash2,
    Globe,
    Palette,
    Layout,
    FileText,
    Building2,
    Package,
    Navigation,
    Info,
    MessageSquare,
    Star,
    Mail,
    ShoppingCart,
    CheckCircle,
    FileSignature,
} from "lucide-react"

// Mock ShadCN UI Components for this self-contained example
// Button Props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
}
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const sizeClasses: Record<string, string> = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };
    const variantClasses: Record<string, string> = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };
    return <button className={`${baseClasses} ${sizeClasses[size] ?? ''} ${variantClasses[variant] ?? ''} ${className}`} {...props}>{children}</button>;
};

interface CardProps {
    children: ReactNode;
    className?: string;
}
const Card = ({ children, className = '' }: CardProps) => <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }: CardProps) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }: CardProps) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className = '' }: CardProps) => <div className={`p-4 pt-0 ${className}`}>{children}</div>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => <input className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    className?: string;
}
const Label = ({ children, className = '', ...props }: LabelProps) => <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => <textarea className={`flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />);

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: 'sm' | 'md';
}
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ className = '', checked, onCheckedChange, ...rest }, ref) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange && onCheckedChange(!checked)}
        className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-primary' : 'bg-input'} ${className}`}
        ref={ref}
        {...rest}
    >
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
));

const ScrollArea = ({ children, className = '' }: CardProps) => <div className={`relative overflow-hidden ${className}`}><div className="h-full w-full rounded-[inherit] overflow-y-auto">{children}</div></div>;

interface Toast {
    id: number;
    title: string;
    description: string;
}
const Toaster = ({ toasts }: { toasts: Toast[] }) => (
    <div className="fixed top-0 right-0 z-[100] p-4 space-y-2">
        {toasts.map(toast => (
            <div key={toast.id} className="w-80 bg-background border rounded-xl shadow-lg p-4">
                <h3 className="font-semibold">{toast.title}</h3>
                <p className="text-sm text-muted-foreground">{toast.description}</p>
            </div>
        ))}
    </div>
);
let toastId = 0;
const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const toast = (newToast: Omit<Toast, 'id'>) => {
        const id = toastId++;
        setToasts(prev => [...prev, { ...newToast, id }]);
        setTimeout(() => {
            setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
        }, 3000);
    };
    return { toast, toasts };
};

// Utility types for dynamic access

type ArrayKeys = 'specifications' | 'navigationLinks' | 'infoBoxes' | 'tabContents';
type ColorKeys = 'primaryColor' | 'secondaryColor' | 'accentColor';

// Language translations
const translations: Record<'de' | 'ar' | 'bs', any> = {
    de: {
        title: "eBay Template Editor Pro",
        subtitle: "Erstellen Sie professionelle, responsive eBay-Vorlagen",
        templateSettings: "Vorlagen-Editor",
        preview: "Live-Vorschau",
        copyCode: "Code kopieren",
        downloadHTML: "HTML herunterladen",
        copied: "Kopiert!",
        downloaded: "Heruntergeladen!",
        copyError: "Fehler beim Kopieren",
        copyErrorDesc: "Code konnte nicht kopiert werden.",
        downloadSuccess: "Download erfolgreich",
        downloadSuccessDesc: "Die HTML-Datei wurde heruntergeladen.",
        company: "Unternehmen",
        product: "Produkt",
        content: "Inhalt",
        layout: "Layout",
        companyInfo: "Firmeninformationen",
        companyName: "Firmenname",
        companyTagline: "Firmen-Slogan",
        companyLogo: "Firmenlogo URL",
        address: "Adresse",
        workingHours: "Öffnungszeiten",
        productInfo: "Produktinformationen",
        productTitle: "Produkttitel",
        productImage: "Produktbild URL",
        condition: "Zustand",
        specifications: "Spezifikationen",
        addSpec: "Spezifikation hinzufügen",
        specLabel: "Merkmal",
        specValue: "Wert",
        colors: "Farbschema",
        primaryColor: "Hauptfarbe",
        secondaryColor: "Sekundärfarbe",
        accentColor: "Akzentfarbe",
        navigationLinks: "Navigationslinks",
        addNavLink: "Link hinzufügen",
        navText: "Text",
        navURL: "URL",
        navIcon: "Icon",
        infoBoxes: "Info-Boxen",
        addInfoBox: "Info-Box hinzufügen",
        boxTitle: "Titel",
        boxDescription: "Beschreibung",
        boxIcon: "Icon",
        tabContents: "Tab-Inhalte",
        addTab: "Tab hinzufügen",
        tabLabel: "Tab-Beschriftung",
        tabTitle: "Tab-Titel",
        tabContent: "Tab-Inhalt",
        footer: "Fußzeile",
        footerText: "Fußzeilentext",
        visibility: "Sichtbarkeit der Abschnitte",
        visibilityPerDevice: "Sichtbarkeit pro Gerät",
        showOnDesktop: "Desktop",
        showOnMobile: "Mobile",
        navigation: "Navigation",
        signature: "Erstellt mit dem Pro-Editor von Adel",
    },
    ar: {
        title: "محرر قوالب eBay المحترف",
        subtitle: "أنشئ قوالب eBay احترافية ومتجاوبة",
        templateSettings: "محرر القالب",
        preview: "معاينة حية",
        copyCode: "نسخ الكود",
        downloadHTML: "تحميل HTML",
        copied: "تم النسخ!",
        downloaded: "تم التحميل!",
        copyError: "خطأ في النسخ",
        copyErrorDesc: "لم يتمكن من نسخ الكود.",
        downloadSuccess: "اكتمل التحميل",
        downloadSuccessDesc: "تم تحميل ملف HTML.",
        company: "الشركة",
        product: "المنتج",
        content: "المحتوى",
        layout: "التخطيط",
        companyInfo: "معلومات الشركة",
        companyName: "اسم الشركة",
        companyTagline: "شعار الشركة",
        companyLogo: "رابط شعار الشركة",
        address: "العنوان",
        workingHours: "ساعات العمل",
        productInfo: "معلومات المنتج",
        productTitle: "عنوان المنتج",
        productImage: "رابط صورة المنتج",
        condition: "الحالة",
        specifications: "المواصفات",
        addSpec: "إضافة مواصفة",
        specLabel: "الميزة",
        specValue: "القيمة",
        colors: "نظام الألوان",
        primaryColor: "اللون الأساسي",
        secondaryColor: "اللون الثانوي",
        accentColor: "لون التمييز",
        navigationLinks: "روابط التنقل",
        addNavLink: "إضافة رابط",
        navText: "النص",
        navURL: "الرابط",
        navIcon: "أيقونة",
        infoBoxes: "صناديق المعلومات",
        addInfoBox: "إضافة صندوق معلومات",
        boxTitle: "العنوان",
        boxDescription: "الوصف",
        boxIcon: "أيقونة",
        tabContents: "محتويات التبويبات",
        addTab: "إضافة تبويب",
        tabLabel: "عنوان التبويب",
        tabTitle: "عنوان المحتوى",
        tabContent: "محتوى التبويب",
        footer: "التذييل",
        footerText: "نص التذييل",
        visibility: "رؤية الأقسام",
        visibilityPerDevice: "الرؤية حسب الجهاز",
        showOnDesktop: "سطح المكتب",
        showOnMobile: "الجوال",
        navigation: "التنقل",
        signature: "صُنع بواسطة محرر Adel الاحترافي",
    },
    bs: {
        title: "eBay Template Editor Pro",
        subtitle: "Kreirajte profesionalne, responzivne eBay šablone",
        templateSettings: "Uređivač šablona",
        preview: "Pregled uživo",
        copyCode: "Kopiraj kod",
        downloadHTML: "Preuzmi HTML",
        copied: "Kopirano!",
        downloaded: "Preuzeto!",
        copyError: "Greška pri kopiranju",
        copyErrorDesc: "Kod nije moguće kopirati.",
        downloadSuccess: "Preuzimanje uspješno",
        downloadSuccessDesc: "HTML datoteka je preuzeta.",
        company: "Kompanija",
        product: "Proizvod",
        content: "Sadržaj",
        layout: "Izgled",
        companyInfo: "Informacije o kompaniji",
        companyName: "Naziv kompanije",
        companyTagline: "Slogan kompanije",
        companyLogo: "URL logotipa kompanije",
        address: "Adresa",
        workingHours: "Radno vrijeme",
        productInfo: "Informacije o proizvodu",
        productTitle: "Naslov proizvoda",
        productImage: "URL slike proizvoda",
        condition: "Stanje",
        specifications: "Specifikacije",
        addSpec: "Dodaj specifikaciju",
        specLabel: "Karakteristika",
        specValue: "Vrijednost",
        colors: "Šema boja",
        primaryColor: "Primarna boja",
        secondaryColor: "Sekundarna boja",
        accentColor: "Akcent boja",
        navigationLinks: "Navigacijski linkovi",
        addNavLink: "Dodaj link",
        navText: "Tekst",
        navURL: "URL",
        navIcon: "Ikona",
        infoBoxes: "Info kutije",
        addInfoBox: "Dodaj info kutiju",
        boxTitle: "Naslov",
        boxDescription: "Opis",
        boxIcon: "Ikona",
        tabContents: "Sadržaj tabova",
        addTab: "Dodaj tab",
        tabLabel: "Oznaka taba",
        tabTitle: "Naslov taba",
        tabContent: "Sadržaj taba",
        footer: "Podnožje",
        footerText: "Tekst podnožja",
        visibility: "Vidljivost sekcija",
        visibilityPerDevice: "Vidljivost po uređaju",
        showOnDesktop: "Desktop",
        showOnMobile: "Mobilni",
        navigation: "Navigacija",
        signature: "Izradio Adel Pro Editor",
    },
};

// Data Structure
interface TemplateConfig {
    companyName: string;
    companyTagline: string;
    companyLogo: string;
    address: string;
    workingHours: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    productTitle: string;
    productImage: string;
    condition: string;
    specifications: { label: string; value: string }[];
    navigationLinks: { text: string; url: string; icon: string }[];
    infoBoxes: { title: string; description: string; icon: string; showOnDesktop: boolean; showOnMobile: boolean }[];
    tabContents: { label: string; title: string; content: string; showOnDesktop: boolean; showOnMobile: boolean }[];
    footerText: string;
    showNavigation: boolean;
    showNavigationOnMobile: boolean;
    showInfoBoxes: boolean;
    showInfoBoxesOnMobile: boolean;
    showTabs: boolean;
    showTabsOnMobile: boolean;
    showFooter: boolean;
    showFooterOnMobile: boolean;
}

// Default Configuration
const defaultConfig: TemplateConfig = {
    companyName: "AH Autoteile",
    companyTagline: "Qualität • Zuverlässigkeit • Service",
    companyLogo: "https://i.postimg.cc/pVC7m4jh/Chat-GPT-Image-Jul-7-2025-09-29-41-PM.png",
    address: "Hochofenstraße 21, 45888 Gelsenkirchen",
    workingHours: "Mo-Fr: 09:00-18:00",
    primaryColor: "#005EB8",
    secondaryColor: "#1a202c",
    accentColor: "#f39c12",
    productTitle: "VW Arteon Frontscheinwerfer Rechts LED Scheinwerfer Original",
    productImage: "https://i.ebayimg.com/images/g/8b4AAOSw4fVoLKO0/s-l1600.webp",
    condition: "Gebraucht, geprüft & voll funktionsfähig",
    specifications: [
        { label: "Hersteller", value: "Volkswagen" },
        { label: "Modell", value: "Arteon (3H7, 3H8)" },
        { label: "Teilenummer", value: "3G8941082D" },
        { label: "Einbauseite", value: "Vorne rechts" },
        { label: "Zustand", value: "Gebraucht" },
    ],
    navigationLinks: [
        { text: "eBay Shop", url: "#", icon: "ShoppingCart" },
        { text: "Bewertungen", url: "#", icon: "Star" },
        { text: "Kontakt", url: "#", icon: "Mail" },
    ],
    infoBoxes: [
        { title: "Zustand & Qualität", description: "Alle Teile werden professionell geprüft und gereinigt.", icon: "Star", showOnDesktop: true, showOnMobile: true },
        { title: "100% Kompatibilität", description: "Prüfen Sie die Teilenummer für garantierte Passgenauigkeit.", icon: "CheckCircle", showOnDesktop: true, showOnMobile: true },
        { title: "Schneller Versand", description: "Versand innerhalb von 1-2 Werktagen mit Sendungsverfolgung.", icon: "Package", showOnDesktop: true, showOnMobile: false },
    ],
    tabContents: [
        { label: "Beschreibung", title: "📋 Produktbeschreibung", content: "Original VW LED-Scheinwerfer (rechte Seite) aus einem Arteon. Das Teil wurde professionell ausgebaut, gründlich auf Funktion geprüft und befindet sich in einem sehr guten Zustand – sofort einbaufertig.", showOnDesktop: true, showOnMobile: true },
        { label: "Rückgabe", title: "↩️ Rückgabe & Gewährleistung", content: "Wir gewähren Ihnen 14 Tage Rückgaberecht ab Erhalt der Ware. Das Teil muss sich im ursprünglichen Zustand befinden.", showOnDesktop: true, showOnMobile: true },
        { label: "Sicherheit", title: "⚠️ Wichtiger Hinweis", content: "Bitte beachten Sie, dass der Einbau von sicherheitsrelevanten Teilen wie Scheinwerfern nur durch qualifiziertes Fachpersonal erfolgen sollte.", showOnDesktop: true, showOnMobile: true },
    ],
    footerText: "Ihr vertrauensvoller Partner für hochwertige Original-Autoteile. Alle Teile werden sorgfältig geprüft und sind sofort einbaufertig.",
    showNavigation: true,
    showNavigationOnMobile: true,
    showInfoBoxes: true,
    showInfoBoxesOnMobile: true,
    showTabs: true,
    showTabsOnMobile: true,
    showFooter: true,
    showFooterOnMobile: true,
};

// Reusable Icon Component
interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}
const Icon = ({ name, ...props }: IconProps) => {
    const LucideIcon = {
        Download, Eye, Settings, Monitor, Smartphone, Copy, Check, Plus, Trash2, Globe, Palette, Layout, FileText, Building2, Package, Navigation, Info, MessageSquare, Star, Mail, ShoppingCart, CheckCircle, FileSignature,
    } as Record<string, React.ComponentType<any>>;
    const Comp = LucideIcon[name];
    return Comp ? <Comp {...props} /> : null;
};

// HTML Generation
const generateHTML = (config: TemplateConfig, t: any, currentYear: number) => `<!DOCTYPE html>
<html lang="${t.code}" dir="${t.dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.companyName} - ${config.productTitle}</title>
    <style>
        :root {
            --primary-color: ${config.primaryColor};
            --secondary-color: ${config.secondaryColor};
            --accent-color: ${config.accentColor};
            --text-light: #F7FAFC;
            --text-dark: #2D3748;
            --bg-light: #FFFFFF;
            --bg-medium: #F7FAFC;
            --bg-dark: #EDF2F7;
            --border-color: #E2E8F0;
            --radius-md: 8px;
            --radius-lg: 16px;
            --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: var(--bg-dark); color: var(--text-dark); line-height: 1.6; font-size: 16px; }
        .ebay-container { max-width: 1200px; margin: 0 auto; background-color: var(--bg-light); box-shadow: var(--shadow-lg); }
        .p-section { padding: 48px; }
        .grid { display: grid; gap: 32px; }
        
        /* Header */
        .header { background-color: var(--secondary-color); color: var(--text-light); padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; }
        .header-brand { display: flex; align-items: center; gap: 20px; }
        .header-logo { width: 80px; height: 80px; background-color: var(--bg-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 4px solid var(--primary-color); box-shadow: var(--shadow-md); }
        .header-logo img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }
        .header-title h1 { font-size: 2.25rem; font-weight: 800; line-height: 1.2; }
        .header-title span { color: var(--primary-color); }
        .header-title p { font-size: 1rem; opacity: 0.8; }
        .header-info { text-align: right; }
        .header-info div { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-bottom: 8px; }
        .header-info svg { width: 16px; height: 16px; fill: var(--primary-color); }
        
        /* Navigation */
        .nav-bar { background-color: var(--bg-light); padding: 0 48px; box-shadow: var(--shadow-sm); display: flex; justify-content: center; gap: 16px; }
        .nav-link { color: var(--text-dark); text-decoration: none; font-weight: 600; padding: 20px 16px; border-bottom: 3px solid transparent; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px; }
        .nav-link:hover { color: var(--primary-color); border-bottom-color: var(--primary-color); }
        .nav-link svg { width: 18px; height: 18px; fill: currentColor; }

        /* Product Section */
        .product-main { grid-template-columns: 1fr 1fr; align-items: start; }
        .product-gallery { /* Removed sticky position */ }
        .product-image { width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); aspect-ratio: 4/3; object-fit: cover; }
        .product-details h2 { font-size: 2rem; font-weight: 800; line-height: 1.3; margin-bottom: 24px; }
        .product-condition { background-color: var(--bg-dark); border-left: 4px solid var(--primary-color); padding: 16px; border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 24px; font-weight: 600; }
        .specs-card { background-color: var(--bg-light); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); }
        .specs-header { background-color: var(--secondary-color); color: var(--text-light); padding: 16px; font-size: 1.1rem; font-weight: 700; text-align: center; }
        .specs-table { width: 100%; border-collapse: collapse; }
        .specs-table tr:nth-child(even) { background-color: var(--bg-medium); }
        .specs-table td { padding: 12px 16px; border-bottom: 1px solid var(--border-color); }
        .specs-table td:first-child { font-weight: 600; width: 40%; }
        .specs-table tr:last-child td { border-bottom: none; }

        /* Info Boxes */
        .info-section { background-color: var(--bg-medium); }
        .info-boxes-grid { grid-template-columns: repeat(3, 1fr); }
        .info-box { background-color: var(--bg-light); padding: 24px; border-radius: var(--radius-md); text-align: center; box-shadow: var(--shadow-md); transition: all 0.2s ease; border-top: 4px solid var(--primary-color); }
        .info-box:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
        .info-box svg { width: 40px; height: 40px; color: var(--primary-color); margin: 0 auto 16px; }
        .info-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
        .info-box p { font-size: 0.9rem; opacity: 0.8; }
        
        /* Tabs Section */
        .tabs-section { background-color: var(--bg-dark); }
        .tabs-container { max-width: 900px; margin: 0 auto; }
        .tab-radios { display: none; }
        .tab-labels { display: flex; background-color: var(--bg-light); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); padding: 6px; gap: 6px; flex-wrap: wrap;}
        .tab-label { flex: 1; padding: 12px; text-align: center; font-weight: 600; cursor: pointer; border-radius: 6px; transition: all 0.2s ease; }
        .tab-content-wrapper { background-color: var(--bg-light); padding: 32px; margin-top: -10px; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); min-height: 250px; }
        .tab-pane { display: none; animation: fadeIn 0.5s; }
        .tab-pane h4 { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; border-bottom: 2px solid var(--border-color); padding-bottom: 8px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        ${config.tabContents.map((tab: any, i: number) => `
            #tab-${i}:checked ~ .tab-labels label[for="tab-${i}"] { background-color: var(--primary-color); color: var(--text-light); }
            #tab-${i}:checked ~ .tab-content-wrapper .tab-pane[data-pane="${i}"] { display: block; }
        `).join('')}

        /* Footer */
        .footer { background-color: var(--secondary-color); color: var(--text-light); text-align: center; }
        .footer h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
        .footer h2 span { color: var(--primary-color); }
        .footer p { max-width: 600px; margin: 0 auto 24px; opacity: 0.8; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.2); padding-top: 24px; font-size: 0.9rem; opacity: 0.6; }
        .adel-signature { font-family: 'Brush Script MT', cursive; font-size: 12px; opacity: 0.4; margin-top: 8px; }

        /* Desktop-only visibility */
        ${!config.showNavigation ? ".nav-bar { display: none; }" : ""}
        ${!config.showInfoBoxes ? ".info-section { display: none; }" : ""}
        ${config.infoBoxes.map((box: any, i: number) => !box.showOnDesktop ? `.info-boxes-grid .info-box:nth-of-type(${i + 1}) { display: none; }` : '').join('')}
        ${!config.showTabs ? ".tabs-section { display: none; }" : ""}
        ${config.tabContents.map((tab: any, i: number) => !tab.showOnDesktop ? `.tab-labels label[for="tab-${i}"] { display: none; }` : '').join('')}
        ${!config.showFooter ? ".footer { display: none; }" : ""}

        /* Responsive */
        @media (max-width: 1024px) {
            .p-section { padding: 32px; }
            .header { padding: 24px 32px; flex-direction: column; gap: 24px; text-align: center; }
            .header-info { text-align: center; }
            .header-info div { justify-content: center; }
            .product-main { grid-template-columns: 1fr; }
            .info-boxes-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
            .p-section { padding: 24px; }
            .header { padding: 24px; }
            .header-brand { flex-direction: column; gap: 16px; }
            .header-title h1 { font-size: 1.75rem; }
            .nav-bar { padding: 0 16px; overflow-x: auto; justify-content: flex-start; -ms-overflow-style: none; scrollbar-width: none; }
            .nav-bar::-webkit-scrollbar { display: none; }
            .nav-link { white-space: nowrap; }
            .product-details h2 { font-size: 1.5rem; }
            .tab-labels { flex-direction: column; }
            
            /* Overwrite desktop styles for mobile */
            .nav-bar, .info-section, .tabs-section, .footer { display: block !important; }
            .info-boxes-grid .info-box, .tab-labels label { display: flex !important; flex: 1; }

            /* Mobile-only visibility */
            ${!config.showNavigationOnMobile ? ".nav-bar { display: none !important; }" : ""}
            ${!config.showInfoBoxesOnMobile ? ".info-section { display: none !important; }" : ""}
            ${config.infoBoxes.map((box: any, i: number) => !box.showOnMobile ? `.info-boxes-grid .info-box:nth-of-type(${i + 1}) { display: none !important; }` : '').join('')}
            ${!config.showTabsOnMobile ? ".tabs-section { display: none !important; }" : ""}
            ${config.tabContents.map((tab: any, i: number) => !tab.showOnMobile ? `.tab-labels label[for="tab-${i}"] { display: none !important; }` : '').join('')}
            ${!config.showFooterOnMobile ? ".footer { display: none !important; }" : ""}
        }
    </style>
</head>
<body>
    <div class="ebay-container">
        <header class="header">
            <div class="header-brand">
                <div class="header-logo"><img src="${config.companyLogo}" alt="Logo" onerror="this.style.display='none'"/></div>
                <div class="header-title">
                    <h1>${config.companyName.split(" ")[0]} <span>${config.companyName.split(" ").slice(1).join(" ")}</span></h1>
                    <p>${config.companyTagline}</p>
                </div>
            </div>
            <div class="header-info">
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> ${config.address}</div>
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg> ${config.workingHours}</div>
            </div>
        </header>
        <nav class="nav-bar">
            ${config.navigationLinks.map((link: any) => `<a href="${link.url}" class="nav-link" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${({ShoppingCart: 'M17 18c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zM7 18c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89-2-2-.89-2-2-2zM16 13l-4 4h3v2h2V17h3l-4-4zM8.58 4l2.82 2.82c.43.43.6.96.6 1.52V14H10V8.34L6.18 4.52c-.75-.75-1.87-1.17-3-1.17C2 3.35 1.18 4.17 1.18 5.34c0 .48.16.92.44 1.3L4.5 10H1V8H0v4c0 1.1.9 2 2 2h6v2H6v2h4v2h2v-2.52c0-.56.17-1.09.6-1.52L16 8h5V6h-6.58l-1.6-1.6L15.18 2H8.82l-.24 2z', Star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z', Mail: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'} as Record<string, string>)[link.icon] || ''}"/></svg>${link.text}</a>`).join('')}
        </nav>
        <main>
            <section class="p-section product-main grid">
                <div class="product-gallery"><img src="${config.productImage}" alt="${config.productTitle}" class="product-image" onerror="this.style.display='none'"/></div>
                <div class="product-details">
                    <h2>${config.productTitle}</h2>
                    <div class="product-condition"><strong>${t.condition}:</strong> ${config.condition}</div>
                    <div class="specs-card">
                        <div class="specs-header">${t.specifications}</div>
                        <table class="specs-table"><tbody>${config.specifications.map((spec: any) => `<tr><td>${spec.label}</td><td>${spec.value}</td></tr>`).join('')}</tbody></table>
                    </div>
                </div>
            </section>
            <section class="p-section info-section"><div class="info-boxes-grid grid">${config.infoBoxes.map((box: any) => `<div class="info-box"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${({Star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', CheckCircle: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3', Package: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12'} as Record<string, string>)[box.icon] || ''}"/></svg><h3>${box.title}</h3><p>${box.description}</p></div>`).join('')}</div></section>
            <section class="p-section tabs-section">
                <div class="tabs-container">
                    ${config.tabContents.map((_: any, i: number) => `<input type="radio" name="tabs" id="tab-${i}" class="tab-radios" ${i === 0 ? 'checked' : ''}>`).join('')}
                    <div class="tab-labels">${config.tabContents.map((tab: any, i: number) => `<label for="tab-${i}" class="tab-label">${tab.label}</label>`).join('')}</div>
                    <div class="tab-content-wrapper">${config.tabContents.map((tab: any, i: number) => `<div class="tab-pane" data-pane="${i}"><h4>${tab.title}</h4><p>${tab.content.replace(/\n/g, '<br/>')}</p></div>`).join('')}</div>
                </div>
            </section>
        </main>
        <footer class="p-section footer">
            <h2>${config.companyName.split(" ")[0]} <span>${config.companyName.split(" ").slice(1).join(" ")}</span></h2>
            <p>${config.footerText}</p>
            <div class="footer-bottom">© ${currentYear} ${config.companyName} - Alle Rechte vorbehalten.<div class="adel-signature">${t.signature}</div></div>
        </footer>
    </div>
</body>
</html>`;

// Reusable Editor Components
interface SectionCardProps {
    title: string;
    icon: string;
    children: ReactNode;
    [key: string]: any;
}
const SectionCard = ({ title, icon, children, ...props }: SectionCardProps) => (
    <Card className="overflow-hidden" {...props}>
        <CardHeader className="flex-row items-center gap-3 bg-slate-100/80 border-b p-3">
            <Icon name={icon} className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-semibold m-0">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">{children}</CardContent>
    </Card>
);

interface SectionVisibilityControlProps {
    t: any;
    sectionName: 'Navigation' | 'InfoBoxes' | 'Tabs' | 'Footer';
    config: TemplateConfig;
    updateConfig: (key: keyof TemplateConfig, value: any) => void;
}
const SectionVisibilityControl = ({ t, sectionName, config, updateConfig }: SectionVisibilityControlProps) => {
    const desktopKey = `show${sectionName}` as keyof TemplateConfig;
    const mobileKey = `show${sectionName}OnMobile` as keyof TemplateConfig;
    return (
        <SectionCard title={t[sectionName.toLowerCase()]} icon="Layout">
            <div className="flex items-center justify-between p-2 bg-slate-100 rounded-lg">
                <div className="flex items-center gap-2 font-medium text-sm"><Monitor className="h-4 w-4" /> {t.showOnDesktop}</div>
                <Switch checked={config[desktopKey] as boolean} onCheckedChange={c => updateConfig(desktopKey, c)} />
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-100 rounded-lg">
                <div className="flex items-center gap-2 font-medium text-sm"><Smartphone className="h-4 w-4" /> {t.showOnMobile}</div>
                <Switch checked={config[mobileKey] as boolean} onCheckedChange={c => updateConfig(mobileKey, c)} />
            </div>
        </SectionCard>
    );
};

export default function ProfessionalEbayTemplateEditor() {
    const [config, setConfig] = useState<TemplateConfig>(defaultConfig);
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
    const [copied, setCopied] = useState(false);
    const [language, setLanguage] = useState<"de" | "ar" | "bs">("de");
    const [activeEditorTab, setActiveEditorTab] = useState("company");
    const { toast, toasts } = useToast();
    const [isClient, setIsClient] = useState(false);
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => {
        setIsClient(true);
        setCurrentYear(new Date().getFullYear());
    }, []);

    const t = useMemo(() => ({ ...translations[language], code: language, dir: language === 'ar' ? 'rtl' : 'ltr' }), [language]);
    const isRTL = language === 'ar';

    const updateConfig = (key: keyof TemplateConfig, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };
    const handleArrayChange = (key: ArrayKeys, index: number, field: string, value: any) => {
        const newArray = [...(config[key] as any[])];
        newArray[index] = { ...newArray[index], [field]: value };
        updateConfig(key, newArray);
    };
    const addArrayItem = (key: ArrayKeys, newItem: any) => {
        updateConfig(key, [...(config[key] as any[]), newItem]);
    };
    const removeArrayItem = (key: ArrayKeys, index: number) => {
        updateConfig(key, (config[key] as any[]).filter((_: any, i: number) => i !== index));
    };

    const copyToClipboard = () => {
        if (!currentYear) return;
        const html = generateHTML(config, t, currentYear);
        navigator.clipboard.writeText(html).then(() => {
            setCopied(true);
            toast({ title: t.copied, description: t.copySuccessDesc });
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            toast({ title: t.copyError, description: t.copyErrorDesc });
        });
    };

    const downloadHTML = () => {
        if (!currentYear) return;
        const html = generateHTML(config, t, currentYear);
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ebay-template-${config.companyName.toLowerCase().replace(/\s/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: t.downloaded, description: t.downloadSuccessDesc });
    };
    
    const editorTabs = [
        { id: "company", label: t.company, icon: "Building2" },
        { id: "product", label: t.product, icon: "Package" },
        { id: "content", label: t.content, icon: "FileText" },
        { id: "layout", label: t.layout, icon: "Layout" },
    ];

    if (!isClient || !currentYear) {
        // لا تعرض أي شيء حتى يتم التأكد من أن الكود يعمل على العميل والسنة متوفرة
        return null;
    }

    return (
        <div className={`min-h-screen bg-slate-50 text-slate-900 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
            <Toaster toasts={toasts} />
            <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary rounded-lg text-white"><Settings className="h-6 w-6" /></div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">{t.title}</h1>
                            <p className="text-sm text-slate-500">{t.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-slate-400" />
                        <select value={language} onChange={e => setLanguage(e.target.value as 'de' | 'ar' | 'bs')} className="bg-slate-100 border-slate-200 rounded-md px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none">
                            <option value="de">🇩🇪 Deutsch</option>
                            <option value="ar">🇸🇦 العربية</option>
                            <option value="bs">🇧🇦 Bosanski</option>
                        </select>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 items-start">
                <div className="sticky top-[85px]">
                    <Card className="shadow-lg">
                        <CardHeader className="p-4 border-b"><CardTitle className="text-lg flex items-center gap-2">{t.templateSettings}</CardTitle></CardHeader>
                        <CardContent className="p-0 flex">
                            <nav className="w-48 border-r border-slate-200 p-2">
                                {editorTabs.map(tab => (
                                    <button key={tab.id} onClick={() => setActiveEditorTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeEditorTab === tab.id ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'}`}>
                                        <Icon name={tab.icon} className="h-5 w-5" /><span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                            <ScrollArea className="flex-1 h-[calc(100vh-180px)]"><div className="p-4 space-y-6">
                                {activeEditorTab === 'company' && (
                                    <SectionCard title={t.companyInfo} icon="Building2">
                                        <Input placeholder={t.companyName} value={config.companyName} onChange={e => updateConfig('companyName', e.target.value)} />
                                        <Input placeholder={t.companyTagline} value={config.companyTagline} onChange={e => updateConfig('companyTagline', e.target.value)} />
                                        <Input placeholder={t.companyLogo} value={config.companyLogo} onChange={e => updateConfig('companyLogo', e.target.value)} />
                                        <Input placeholder={t.address} value={config.address} onChange={e => updateConfig('address', e.target.value)} />
                                        <Input placeholder={t.workingHours} value={config.workingHours} onChange={e => updateConfig('workingHours', e.target.value)} />
                                    </SectionCard>
                                )}
                                {activeEditorTab === 'product' && (
                                    <>
                                        <SectionCard title={t.productInfo} icon="Package">
                                            <Textarea placeholder={t.productTitle} value={config.productTitle} onChange={e => updateConfig('productTitle', e.target.value)} rows={3} />
                                            <Input placeholder={t.productImage} value={config.productImage} onChange={e => updateConfig('productImage', e.target.value)} />
                                            <Input placeholder={t.condition} value={config.condition} onChange={e => updateConfig('condition', e.target.value)} />
                                        </SectionCard>
                                        <SectionCard title={t.specifications} icon="FileText">
                                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                                {config.specifications.map((spec, index) => (
                                                    <div className="flex gap-2 items-center">
                                                        <Input placeholder={t.specLabel} value={spec.label} onChange={e => handleArrayChange('specifications', index, 'label', e.target.value)} />
                                                        <Input placeholder={t.specValue} value={spec.value} onChange={e => handleArrayChange('specifications', index, 'value', e.target.value)} />
                                                        <Button variant="ghost" size="icon" className="text-destructive flex-shrink-0" onClick={() => removeArrayItem('specifications', index)}><Trash2 className="h-4 w-4" /></Button>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="outline" className="w-full mt-2" onClick={() => addArrayItem('specifications', { label: '', value: '' })}><Plus className="h-4 w-4 me-2" /> {t.addSpec}</Button>
                                        </SectionCard>
                                    </>
                                )}
                                {activeEditorTab === 'content' && (
                                    <>
                                        <SectionCard title={t.colors} icon="Palette">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {(['primaryColor', 'secondaryColor', 'accentColor'] as ColorKeys[]).map((colorKey: ColorKeys) => (
    <div key={colorKey}>
        <Label className="text-xs font-medium">{t[colorKey]}</Label>
        <div className="flex items-center mt-1">
            <Input type="color" value={config[colorKey]} onChange={e => updateConfig(colorKey, e.target.value)} className="p-1 h-9 w-10" />
            <Input value={config[colorKey]} onChange={e => updateConfig(colorKey, e.target.value)} className="h-9" />
        </div>
    </div>
))}

                                            </div>
                                        </SectionCard>
                                        <SectionCard title={t.infoBoxes} icon="Info">
                                            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                                                {config.infoBoxes.map((box, index) => (
                                                    <div className="p-3 bg-slate-100 rounded-lg space-y-3">
                                                        <div className="flex gap-2"><Input placeholder={t.boxTitle} value={box.title} onChange={e => handleArrayChange('infoBoxes', index, 'title', e.target.value)} /><Input placeholder={t.boxIcon} value={box.icon} onChange={e => handleArrayChange('infoBoxes', index, 'icon', e.target.value)} /><Button variant="ghost" size="icon" className="text-destructive flex-shrink-0" onClick={() => removeArrayItem('infoBoxes', index)}><Trash2 className="h-4 w-4" /></Button></div>
                                                        <Textarea placeholder={t.boxDescription} value={box.description} onChange={e => handleArrayChange('infoBoxes', index, 'description', e.target.value)} rows={2} />
                                                        <div className="flex gap-4"><div className="flex items-center gap-2"><Switch size="sm" checked={box.showOnDesktop} onCheckedChange={c => handleArrayChange('infoBoxes', index, 'showOnDesktop', c)} /><Label className="text-xs">{t.showOnDesktop}</Label></div><div className="flex items-center gap-2"><Switch size="sm" checked={box.showOnMobile} onCheckedChange={c => handleArrayChange('infoBoxes', index, 'showOnMobile', c)} /><Label className="text-xs">{t.showOnMobile}</Label></div></div>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="outline" className="w-full mt-2" onClick={() => addArrayItem('infoBoxes', { title: '', description: '', icon: 'Star', showOnDesktop: true, showOnMobile: true })}><Plus className="h-4 w-4 me-2" /> {t.addInfoBox}</Button>
                                        </SectionCard>
                                        <SectionCard title={t.tabContents} icon="MessageSquare">
                                            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                                                {config.tabContents.map((tab, index) => (
                                                     <div className="p-3 bg-slate-100 rounded-lg space-y-3">
                                                        <div className="flex gap-2"><Input placeholder={t.tabLabel} value={tab.label} onChange={e => handleArrayChange('tabContents', index, 'label', e.target.value)} /><Button variant="ghost" size="icon" className="text-destructive flex-shrink-0" onClick={() => removeArrayItem('tabContents', index)}><Trash2 className="h-4 w-4" /></Button></div>
                                                        <Input placeholder={t.tabTitle} value={tab.title} onChange={e => handleArrayChange('tabContents', index, 'title', e.target.value)} />
                                                        <Textarea placeholder={t.tabContent} value={tab.content} onChange={e => handleArrayChange('tabContents', index, 'content', e.target.value)} rows={3} />
                                                        <div className="flex gap-4"><div className="flex items-center gap-2"><Switch size="sm" checked={tab.showOnDesktop} onCheckedChange={c => handleArrayChange('tabContents', index, 'showOnDesktop', c)} /><Label className="text-xs">{t.showOnDesktop}</Label></div><div className="flex items-center gap-2"><Switch size="sm" checked={tab.showOnMobile} onCheckedChange={c => handleArrayChange('tabContents', index, 'showOnMobile', c)} /><Label className="text-xs">{t.showOnMobile}</Label></div></div>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="outline" className="w-full mt-2" onClick={() => addArrayItem('tabContents', { label: '', title: '', content: '', showOnDesktop: true, showOnMobile: true })}><Plus className="h-4 w-4 me-2" /> {t.addTab}</Button>
                                        </SectionCard>
                                        <SectionCard title={t.footer} icon="FileSignature"><Textarea placeholder={t.footerText} value={config.footerText} onChange={e => updateConfig('footerText', e.target.value)} rows={3} /></SectionCard>
                                    </>
                                )}
                                {activeEditorTab === 'layout' && (
                                    <div className="space-y-4">
                                        <SectionVisibilityControl t={t} sectionName="Navigation" config={config} updateConfig={updateConfig} />
                                        <SectionVisibilityControl t={t} sectionName="InfoBoxes" config={config} updateConfig={updateConfig} />
                                        <SectionVisibilityControl t={t} sectionName="Tabs" config={config} updateConfig={updateConfig} />
                                        <SectionVisibilityControl t={t} sectionName="Footer" config={config} updateConfig={updateConfig} />
                                    </div>
                                )}
                            </div></ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-1"><Card className="shadow-lg sticky top-[85px]">
                    <CardHeader className="p-4 flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">{t.preview}</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                <Button variant={previewMode === "desktop" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewMode("desktop")}>{<Monitor className="h-4 w-4" />}</Button>
                                <Button variant={previewMode === "mobile" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewMode("mobile")}>{<Smartphone className="h-4 w-4" />}</Button>
                            </div>
                            <Button onClick={copyToClipboard} variant="outline" size="sm" className="gap-1.5">{copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />} {copied ? t.copied : t.copyCode}</Button>
                            <Button onClick={downloadHTML} size="sm" className="gap-1.5"><Download className="h-4 w-4" /> {t.downloadHTML}</Button>
                            {/* زر إعادة تعيين القالب */}
                            <Button onClick={() => setConfig(defaultConfig)} variant="destructive" size="sm" className="gap-1.5"><Trash2 className="h-4 w-4" /> إعادة تعيين القالب</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-2"><div className={`mx-auto transition-all duration-300 ease-in-out ${previewMode === 'mobile' ? 'w-[375px]' : 'w-full'}`}><div className={previewMode === 'mobile' ? 'border-8 border-slate-800 rounded-[2.5rem] shadow-2xl' : ''}>
                        <div className="bg-slate-800 h-6 rounded-t-[2rem] flex items-center justify-center" style={{ display: previewMode === 'mobile' ? 'flex' : 'none' }}><div className="w-16 h-1 bg-slate-600 rounded-full"></div></div>
                        {currentYear && <iframe srcDoc={generateHTML(config, t, currentYear)} className={`w-full border-0 bg-white ${previewMode === 'mobile' ? 'h-[667px] rounded-b-[2rem]' : 'h-[calc(100vh-230px)] rounded-b-xl'}`} title="Template Preview"/>}
                    </div></div></CardContent>
                </Card></div>
            </main>
        </div>
    );
}
