import Logo from "./Logo";
import Navigation from "./Navigation";


export default function Header() {
  return (
    <header className="border-b border-gray-700 p-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Logo />
            <Navigation />
        </div>
    </header>
  )
}
