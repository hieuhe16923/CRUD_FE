import React from 'react';
import classnames from 'classnames';

interface PaginationButtonProps {
    iconName: string;
    disabled: boolean;
    onClick?: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ iconName, disabled, onClick }) => {
    return (
        <button
            className={classnames('pagination-item', { disabled })}
            onClick={disabled ? undefined : onClick}
        >
            <i className={iconName}></i>
        </button>
    );
};
export default PaginationButton;