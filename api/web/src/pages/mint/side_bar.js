import React from "react";

export function SideBar() {
    return (
        <div className="f3-left">
            <h2>Mint Panel</h2>
            <ul>
                <li>
                    <a href="/mintpanel/collections">Series</a>
                </li>
                <li>
                    <a href="/mintpanel/mintnft">Mint NFTs</a>
                </li>
                <li>
                    <a href="/mintpanel/assets">Assets</a>
                </li>
                <li>
                    <a href="/mintpanel/settings">Settings</a>
                </li>
            </ul>
        </div>
    );
}
