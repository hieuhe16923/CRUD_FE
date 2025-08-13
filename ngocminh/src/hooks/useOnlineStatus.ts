// hooks/useOnlineStatus.ts
import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const checkInternetAndAPI = async () => {
            if (!navigator.onLine) {
                setIsOnline(false);
                return;
            }

            try {
                const controller = new AbortController();
                const timeoutId = window.setTimeout(() => controller.abort(), 8000);

                const internetCheck = fetch("https://www.gstatic.com/generate_204", {
                    method: "GET",
                    mode: "no-cors",
                    cache: "no-cache",
                    signal: controller.signal
                });

                const backendCheck = fetch(
                    "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
                    {
                        method: "GET",
                        cache: "no-cache",
                        headers: { "Content-Type": "application/json" },
                        signal: controller.signal
                    }
                );

                const [internetRes, backendRes] = await Promise.allSettled([
                    internetCheck,
                    backendCheck
                ]);

                clearTimeout(timeoutId);

                const internetOK = internetRes.status === "fulfilled";
                const backendOK =
                    backendRes.status === "fulfilled" &&
                    (backendRes.value as Response).ok;

                setIsOnline(internetOK && backendOK);
            } catch {
                setIsOnline(false);
            }
        };

        const handleOnline = () => {
            setIsOnline(true);
            checkInternetAndAPI();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        checkInternetAndAPI();

        const intervalId: ReturnType<typeof setInterval> = setInterval(checkInternetAndAPI, 8000);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            clearInterval(intervalId);
        };
    }, []);

    return isOnline;
};
