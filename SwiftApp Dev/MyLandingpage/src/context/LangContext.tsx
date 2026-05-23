"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = 'en' | 'bm';

interface LangContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>('en');
    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);
