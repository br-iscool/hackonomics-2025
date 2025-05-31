import ActionButton from "@/app/components/ActionButton"
import AgeUp from "@/app/components/AgeUp"
import ProfileIcon from "@/app/components/ProfileIcon"

export default function Game() {
    return (
        <>
            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen">
                <div className="p-5">
                    <ProfileIcon name="John Doe" stress={10} money={250}/>
                </div>
                
                <AgeUp />

                <div className="flex">
                    <ul>
                        <li><ActionButton text="Education" /></li>
                        <li><ActionButton text="Job" /></li>
                        <li><ActionButton text="Assets" /></li>
                    </ul>
                </div>
            </div>
        </>
    )
}