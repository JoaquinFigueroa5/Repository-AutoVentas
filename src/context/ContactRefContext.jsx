import { createContext, useRef, useContext } from 'react';

const ContactRefContext = createContext(null);

export function ContactRefProvider({ children }) {
    const contactRef = useRef(null);
    return (
        <ContactRefContext.Provider value={contactRef}>
            {children}
        </ContactRefContext.Provider>
    );
}

export function useContactRef() {
    return useContext(ContactRefContext);
}
