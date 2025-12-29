import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lightbulb, Zap, Mail, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type ModalContentKey = 'none' | 'guide' | 'features' | 'legal';

interface ModalContentItem {
    title: string;
    icon: LucideIcon;
    color: string;
    body: ReactNode;
}

const MODAL_CONTENT: Record<Exclude<ModalContentKey, 'none'>, ModalContentItem> = {
    guide: {
        title: "How It Works",
        icon: Lightbulb,
        color: 'text-[#81b64c]',
        body: (
            <div className="space-y-4">
                <p>1. Type your chess.com username.</p>
                <p>2. Click START! or press Enter.</p>
                <p>3. Don't have an account? bro just make one :b</p>
            </div>
        )
    },
    features: {
        title: "Key Features",
        icon: Zap,
        color: 'text-[#ffc800]',
        body: (
            <div className="space-y-4">
                <p>It's a year wrap for chess (inspired by Spotify Wrapped). It showcases your chess journey in 2025</p>
                <p className="font-bold text-[#ffc800]">NO SPOILERS HERE {'>'}:)</p>
            </div>
        )
    },
    legal: {
        title: "Legal & Contact",
        icon: Shield,
        color: 'text-white',
        body: (
            <div className="space-y-6 text-sm">
                <div className="bg-[#3e3c39] p-4 rounded-xl border border-white/10">
                    <h4 className="text-[#81b64c] font-bold text-lg mb-2 flex items-center gap-2">
                        <Mail size={16} /> Contact Us
                    </h4>
                    <p className="mb-2">For support, bug reports, or inquiries, please contact me:</p>
                    <a href="mailto:huynhmaithienan.2005@gmail.com" className="text-[#ffc800] hover:underline font-bold break-all">
                        huynhmaithienan.2005@gmail.com
                    </a>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-2 border-b border-white/20 pb-1">1. Terms of Service</h4>
                    <p className="mb-2 text-justify">
                        <strong>Disclaimer:</strong> ChessWrapped is an independent, open-source hobby project and is <span className="text-[#ffc800]">not affiliated, endorsed, or sponsored by Chess.com</span>.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-2 border-b border-white/20 pb-1">2. Privacy Policy</h4>
                    <ul className="list-disc list-inside space-y-2 text-[#c3c2c1]">
                        <li><strong>No Data Storage:</strong> We do not store your passwords.</li>
                        <li><strong>Public Data Only:</strong> We only access public API data.</li>
                    </ul>
                </div>
                <div className="pt-4 border-t border-white/10 text-center text-xs text-[#989795]">
                    © 2025 ChessWrapped. All rights reserved.
                </div>
            </div>
        ),
    },
};

interface HeaderModalProps {
    contentKey: ModalContentKey;
    onClose: () => void;
}

const HeaderModal = ({ contentKey, onClose }: HeaderModalProps) => {
    if (contentKey === 'none') return null;
    const content = MODAL_CONTENT[contentKey as Exclude<ModalContentKey, 'none'>];
    const Icon = content.icon;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center font-bubbly p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-[#262421] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-white/20 flex flex-col max-h-[85vh]"
                    initial={{ scale: 0.8, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -50 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <Icon size={28} className={`${content.color} drop-shadow-md`} />
                            <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                        </div>
                        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="text-left text-[#c3c2c1] overflow-y-auto pr-2 custom-scrollbar">
                        {content.body}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default HeaderModal;
