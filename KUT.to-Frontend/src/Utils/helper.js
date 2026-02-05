import React from "react";
import { subDomainList } from "./constant";

export const getApps = () => {
    const subdomain = getSubDomain(window.location.hostname);

    const mainApp = subDomainList.find((app) => app.main);
    if (subdomain === "") return React.createElement(mainApp.app);

    const apps = subDomainList.find((app) => subdomain === app.subdomain);

    const SelectedApp = apps ? apps.app : mainApp.app;
    return React.createElement(SelectedApp);
}

// url.localhost
// url.urlbestshort.com
export const getSubDomain = (location) => {
    const locationParts = location.split(".");
    const isLocalhost = locationParts.slice(-1)[0] === "localhost";
    const sliceTill = isLocalhost ? -1 : -2;
    return locationParts.slice(0, sliceTill).join("");
}; 
