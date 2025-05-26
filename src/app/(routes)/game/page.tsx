import ActionButton from "@/app/components/ActionButton"
import ProfileIcon from "@/app/components/ProfileIcon"

export default function Game() {
    return (
        <>
            <div className="flex">
                <ul>
                    <li><ActionButton text="Education" /></li>
                    <li><ActionButton text="Job" /></li>
                    <li><ActionButton text="Assets" /></li>
                </ul>
            </div>
            <ProfileIcon />


        </>
    )
}