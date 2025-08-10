// src/hooks/useAppSelector.ts
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppRootState } from "../app/store";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
