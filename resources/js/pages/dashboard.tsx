import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'LeaderBoard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [reactionTime, setReactionTime] = useState<any[]>([]);
    const [flappyBird, setFlappyBird] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            fetch('/api/leaderboard/reaction_time').then(res => res.json()),
            fetch('/api/leaderboard/flappy_bird').then(res => res.json()),
        ])
        .then(([reactionData, flappyData]) => {
            setReactionTime(reactionData);
            setFlappyBird(flappyData);
            setError(null);
        })
        .catch((err) => {
            console.error(err);
            setError('Gagal memuat leaderboard');
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const formatScore = (game: string, score: any) => {
        const num = Number(score) || 0;
        if (game === 'reaction_time') {
            return `${num.toFixed(3)} ms`;
        }
        return Math.round(num);
    };

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-yellow-300 dark:bg-yellow-600 font-bold";
            case 2:
                return "bg-gray-300 dark:bg-gray-500 font-bold";
            case 3:
                return "bg-amber-600 dark:bg-amber-800 font-bold text-white";
            default:
                return "";
        }
    };

    const renderTable = (title: string, data: any[], game: string) => (
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-4 border border-sidebar-border/70">
            <h2 className="text-lg font-bold mb-3">{title}</h2>
            {loading ? (
                <div className="text-center text-neutral-500 py-4">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-4">{error}</div>
            ) : (
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-neutral-300 dark:border-neutral-700">
                            <th className="text-left py-1 px-2">#</th>
                            <th className="text-left py-1 px-2">Player</th>
                            <th className="text-left py-1 px-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b border-neutral-200 dark:border-neutral-800 ${getRankStyle(index + 1)}`}
                            >
                                <td className="py-1 px-2">{index + 1}</td>
                                <td className="py-1 px-2">{item.player_name}</td>
                                <td className="py-1 px-2">{formatScore(game, item.score)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="LeaderBoard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    {renderTable('Reaction Time Leaderboard', reactionTime, 'reaction_time')}
                    {renderTable('Flappy Bird Leaderboard', flappyBird, 'flappy_bird')}
                </div>
            </div>
        </AppLayout>
    );
}
