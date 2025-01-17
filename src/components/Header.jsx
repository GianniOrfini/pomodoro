import DarkModeToggle from "./DarkModeToggle"
import date from 'date-and-time';
export default function Header() {
    const now = new Date();
    const headerText = () => {
        const hour = date.format(now, 'H')
        if (hour >= 0 && hour <= 5) {
        return " Good madrugada!"
        } else if (hour >= 6 && hour <= 11) {
        return " Good morning!"
        } else if (hour >= 12 && hour <= 17) {
        return " Good afternoon!"
        } else if (hour >= 18 && hour <= 23) {
        return " Good night!"
        }
    }

    return (
        <header>
            <p>{date.format(now, 'dddd, D MMM hh:mm A.') + headerText()}</p>
            <DarkModeToggle />
        </header>
    )
}