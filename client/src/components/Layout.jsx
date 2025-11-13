import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top area: navbar stretches from the left up to the header-image on the right */}
            <header className="w-full">
                <div className="flex items-center justify-between w-full">
                    {/* Navbar takes the remaining space on the left */}
                    <div className="flex-1">
                        <NavBar />
                    </div>

                    {/* Header (image) placed on the right with fixed width */}
                    <div className="w-40 md:w-56 lg:w-72 flex-shrink-0">
                        <Header />
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}