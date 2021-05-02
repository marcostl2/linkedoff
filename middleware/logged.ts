export default function ({ store, route, redirect }: any) {
    console.log(route.path)
    if (store.state.user.user && store.state.user.user.logged) {
        if (route.path === "/login" && route.path === "/register") {
            return redirect("/");
        }
    }
}
