export default function ({ store, route, redirect }: any) {
  if (!store.state.user.user || !store.state.user.user.uid) {
    if (route.path !== "/login" && route.path !== "/register") {
      return redirect("/login");
    }
  }
}
