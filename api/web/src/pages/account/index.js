import { useCurrentUser } from "../../hooks/use-current-user.hook";
import { Redirect, useHistory } from "react-router-dom";

export function Page() {
    const history = useHistory();

    const [user] = useCurrentUser();

    // if (user.addr == null) return <Redirect to={"/"} />

    const handlePublish = () => {
        history.push("/dd");
        console.log("Publish NFT");
    };

    const handleList = () => {};

    return (
        <div>
            <button onClick={handlePublish}>Publish</button>
            <button onClick={handleList}>List</button>
        </div>
    );
}
