import React from "react";
import { IconType } from "react-icons";

interface ReactIconProps {
    IconComponent: IconType;
    className?: string;
}

const ReactIcon: React.FC<ReactIconProps> = ({ IconComponent, className }) => {
    return <>{IconComponent({ className }) as React.ReactElement}</>;
};

export default ReactIcon;
