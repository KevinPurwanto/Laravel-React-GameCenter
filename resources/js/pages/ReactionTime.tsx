import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'LeaderBoard', href: '/dashboard' },
    { title: 'Reaction Time', href: '/reactionTime' },
];

export default function ReactionTime() {
    const [status, setStatus] = useState<'waiting' | 'ready' | 'click'>('waiting');
    const [message, setMessage] = useState('Klik untuk mulai');
    const [time, setTime] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const handleClick = () => {
        if (status === 'waiting') {
            setMessage('Tunggu warna berubah...');
            setStatus('ready');
            const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 detik
            timeoutRef.current = setTimeout(() => {
                setStatus('click');
                setMessage('Klik sekarang!');
                startTimeRef.current = Date.now();
            }, delay);
        } else if (status === 'ready') {
            // klik terlalu cepat
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setStatus('waiting');
            setMessage('Terlalu cepat! Klik untuk coba lagi');
        } else if (status === 'click') {
            const reaction = Date.now() - (startTimeRef.current ?? Date.now());
            setTime(reaction);
            setMessage(`Waktu reaksi: ${reaction} ms`);
            
            setStatus('waiting');
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

            // TODO: kirim skor ke API backend
            fetch('/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    '_token': csrfToken,
                },
                body: JSON.stringify({
                    player_name: 'Kevin', // ini bisa nanti pakai nama dari login
                    game: 'reaction_time',
                    score: reaction
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Score saved:', data);
            })
            .catch(err => {
                console.error('Error saving score:', err);
            });

        }
    };

    const getBackgroundColor = () => {
        if (status === 'ready') return 'bg-red-500';
        if (status === 'click') return 'bg-green-500';
        return 'bg-blue-500';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reaction Time Test" />
            <div className="flex h-full flex-col items-center justify-center p-4">
                <div
                    onClick={handleClick}
                    className={`flex items-center justify-center w-full max-w-2xl h-96 rounded-xl text-white text-2xl font-bold cursor-pointer select-none transition-colors ${getBackgroundColor()}`}
                >
                    {message}
                </div>
                {time !== null && (
                    <div className="mt-4 text-lg font-semibold">
                        Skor terakhir: {time} ms
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
