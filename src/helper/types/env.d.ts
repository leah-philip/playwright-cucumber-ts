export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER : "chrome"|"firefox"|"webkit",
            ENV : "stage"|"prod"|"test",
            BASEURL : string,
            HEAD : "true"|"false"
        }
    }

}