declare global {
    interface Window {
        dataLayer: unknown[]
    }
}

// export is required to make sure TS picks up this declaration https://www.jamestharpe.com/typescript-extend-window/
export default global
