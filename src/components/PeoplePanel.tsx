import { Person } from '../App';

interface PeoplePanelProps {
  people: Person[];
}

export default function PeoplePanel({ people }: PeoplePanelProps) {
  return (
    <div className="border-b border-[#0f3460] bg-[#1a1a2e]/50">
      <div className="p-3 space-y-2">
        {people.map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: person.avatarColor }}
              >
                {person.avatar}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1a1a2e]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-200 truncate">
                  {person.name}
                </span>
                {person.isHost && (
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-medium">
                    HOST
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-500">Watching</span>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white rounded transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
