import CategoryItem from "../components/CategoryItem";

const categories = [
    {
        href: "/asters",
        name: "Asters",
        imageUrl: "/asters.png",
        tagline: "Easy to grow from seed",
    },
    {
        href: "/poppies",
        name: "Poppies",
        imageUrl: "/poppies.png",
        tagline: "Self-sowing & low maintenance",
    },
    {
        href: "/hydrangeas",
        name: "Hydrangeas",
        imageUrl: "/hydrangeas.png",
        tagline: "Hardy shrub seedlings",
    },
    {
        href: "/delphiniums",
        name: "Delphiniums",
        imageUrl: "/delphiniums.png",
        tagline: "Direct-sow in spring",
    },
    {
        href: "/peonies",
        name: "Peonies",
        imageUrl: "/peonies.png",
        tagline: "Long-lived garden perennials",
    },
    {
        href: "/geraniums",
        name: "Geraniums",
        imageUrl: "/geraniums.png",
        tagline: "Starter plants, ready to pot",
    },
];

const HomePage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
                <div className="text-center mb-12">
                    <div className="flex justify-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300 animate-pulse delay-300" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse delay-700" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-emerald-600 to-pink-600 bg-clip-text text-transparent pb-3 mb-3">
                        Grow Something Beautiful
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Premium seeds & young seedlings for your garden
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <CategoryItem category={category} key={category.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
