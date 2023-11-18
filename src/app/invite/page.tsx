import {redirect} from "next/navigation";

export default async function Invite() {
    redirect('https://discord.com/api/oauth2/authorize?client_id=1173284134945308742&permissions=1099780418630&scope=applications.commands%20bot')
}