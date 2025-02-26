export default function StarBackground() {
    return (
        <div className="fixed h-screen w-full bg-black overflow-hidden">
            <div className="absolute inset-0">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-twinkle"
                        style={{
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random(),
                        }}
                    />
                ))}
            </div>
        </div>
    );
}