export const getColor = (colorCode: string) => {
	const colors: Record<string, string> = {
		'mark 2': 'bg-zinc-300 border-red-600',
		'pine green': 'bg-green-700 border-green-700',
		'ventura blue': 'bg-cyan-500 border-cyan-500',
		'downtown drag': 'bg-zinc-700 border-green-500',
		'mister clean': 'bg-zinc-200 border-zinc-200',
		'ventura storm': 'bg-cyan-500 border-zinc-700',
		'british racing green': 'bg-green-700 border-zinc-300',
		'fireball red': 'bg-red-800 border-red-800',
	};
	return colors[colorCode.toLowerCase()] || 'bg-gray-200 border-gray-200';
};
