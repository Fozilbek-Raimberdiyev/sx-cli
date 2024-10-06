import { useToast as usePrimeToast } from 'primevue/usetoast'
export function useToast() {
    const toast = usePrimeToast()
    function showSuccess(
        headTitle: '',
        toastContent: string,
        duration: number = 3000
    ) {
        toast.add({
            severity: 'success',
            summary: headTitle,
            detail: toastContent,
            life: duration,
        })
    }

    function showError(
        headTitle: '',
        toastContent: string,
        duration: number = 3000
    ) {
        toast.add({
            severity: 'error',
            summary: headTitle,
            detail: toastContent,
            life: duration,
        })
    }

    function showInfo(
        headTitle: '',
        toastContent: string,
        duration: number = 3000
    ) {
        toast.add({
            severity: 'info',
            summary: headTitle,
            detail: toastContent,
            life: duration,
        })
    }

    function showWarn( headTitle: '', toastContent: string, duration: number = 3000) {
        toast.add({
            severity: 'warn',
            summary: headTitle,
            detail: toastContent,
            life: duration,
        })
    }

    
    return {
        showSuccess,
        showError,
        showInfo,
        showWarn,
    }
}