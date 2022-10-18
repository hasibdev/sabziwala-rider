import store from "../store"

export default async function () {
    store.dispatch("config/setConfig", { url: "/config" })
}