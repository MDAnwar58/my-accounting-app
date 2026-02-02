import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import WelcomeHeader from "./Components/WelcomeHeader";
import WelcomeHeroMoneyDropCard from "./Components/WelcomeHeroMoneyDropCard";
import MoneyTobe from "@/Assets/images/money-tobe.png";
import WelcomeAboutCard from "./Components/WelcomeAboutCard";
import WelcomeExpenseCard from "./Components/WelcomeExpenseCard";
import ExpenseAndMoneyComingCard from "./Components/ExpenseAndMoneyComingCard";
import WelcomeGetStartButton from "./Components/WelcomeGetStartButton";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    const counter = () => {
        console.log("counter");
    }

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="absolute -left-20 top-0 h-screen md:blur-[100px] blur-[200px]">
                    <div className="h-full w-full bg-gradient-to-r from-green-400 to-pink-600 relative">
                        <div className="bg-green-400 h-96 w-96 rounded-full absolute md:top-0 top-[110%] md:-left-28 left-[90%] md:transform md:translate-x-0 translate-x-[50%] md:translate-y-0 translate-y-[50%]"></div>
                    </div>
                </div>
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <WelcomeHeader auth={auth} />

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <WelcomeHeroMoneyDropCard />

                                <WelcomeAboutCard />

                                <WelcomeExpenseCard />

                                <ExpenseAndMoneyComingCard />
                            </div>

                            <WelcomeGetStartButton />

                            <div className="pt-24 pb-12">
                                <img
                                    src={MoneyTobe}
                                    alt="Laravel screenshot"
                                    className="h-52 w-auto mx-auto object-cover"
                                />
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            আয় ও খরচের ভিত্তিতে সরাসরি লাভের হিসাব।
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
