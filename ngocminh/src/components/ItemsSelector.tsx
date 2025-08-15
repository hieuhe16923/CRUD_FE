// components/filters/ItemsSelector.tsx
import React from 'react';
import type { ItemsPerPage } from '../types';

/**
 * Items Selector Props DTO - Type cho props của component
 */
type ItemsSelectorPropsDto = {
    readonly value: ItemsPerPage;
    readonly onChange: (value: ItemsPerPage) => void;
    readonly disabled?: boolean;
};

const ItemsSelector: React.FC<ItemsSelectorPropsDto> = ({
                                                            value,
                                                            onChange,
                                                            disabled = false
                                                        }) => {
    return (
        <div
            className="position-relative"
            style={{
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                backgroundColor: 'white',
                flexShrink: 0,
                opacity: disabled ? 0.6 : 1
            }}
        >
            <select
                className="form-select border-0"
                value={value}
                onChange={(e) =>
                    onChange(Number(e.target.value) as ItemsPerPage)
                }
                disabled={disabled}
                style={{
                    background: 'transparent',
                    fontSize: '0.75rem',
                    minWidth: '50px',
                    padding: '4px 20px 4px 8px',
                    appearance: 'none',
                    outline: 'none',
                    cursor: disabled ? 'not-allowed' : 'pointer'
                }}
            >
                <option value={3}>3 mục</option>
                <option value={6}>6 mục</option>
                <option value={9}>9 mục</option>
                <option value={20}>20 mục</option>
            </select>

            {/* Custom dropdown arrow */}
            <div style={{
                position: 'absolute',
                right: '6px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '0.6rem',
                color: disabled ? '#adb5bd' : '#6c757d'
            }}>
                ▼
            </div>
        </div>
    );
};

export default ItemsSelector;