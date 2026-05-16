const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center gap-8">
                <div className="relative w-20 h-20">
                    <svg
                        className="absolute inset-0 w-20 h-20 animate-spin"
                        style={{ animationDuration: "1.1s" }}
                        viewBox="0 0 80 80"
                        fill="none"
                    >
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="#86efac"
                            strokeWidth="2"
                            strokeOpacity="0.15"
                        />
                        <path
                            d="M40 4 A36 36 0 0 1 76 40"
                            stroke="#86efac"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </svg>

                    <svg
                        className="absolute inset-2 w-16 h-16"
                        style={{
                            animation: "counter-spin 1.7s linear infinite",
                        }}
                        viewBox="0 0 64 64"
                        fill="none"
                    >
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#f9a8d4"
                            strokeWidth="1.5"
                            strokeOpacity="0.15"
                        />
                        <path
                            d="M32 4 A28 28 0 0 1 55.7 18.3"
                            stroke="#f9a8d4"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #86efac, #f9a8d4)",
                                animation:
                                    "bloom-pulse 2s ease-in-out infinite",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M8 2C5 2 2 5 2 9c0 2.5 1.5 4 4 4 1 0 2-.3 2.8-.8C10.2 11 11 9.5 11 8V5l-3 3"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11 5c1.5 0 3 1.2 3 3.5 0 1.5-.8 2.8-2 3.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                    <p className="text-slate-100 text-[15px] font-medium tracking-wide">
                        Loading
                    </p>
                    <div className="flex gap-1.5 items-center">
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-300"
                            style={{
                                animation:
                                    "dot-bounce 1.2s ease-in-out infinite 0s",
                            }}
                        />
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-300 opacity-70"
                            style={{
                                animation:
                                    "dot-bounce 1.2s ease-in-out infinite 0.2s",
                            }}
                        />
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-pink-300 opacity-60"
                            style={{
                                animation:
                                    "dot-bounce 1.2s ease-in-out infinite 0.4s",
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes counter-spin { to { transform: rotate(-360deg); } }
        @keyframes bloom-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.85; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default LoadingSpinner;
