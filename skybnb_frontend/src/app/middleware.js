import Cookies from "js-cookie"
export function middleware(request) {
    const currentUser = Cookies.get('token')

    // if (currentUser?.token && !request.nextUrl.pathname.startsWith('/login')) {
    //     return Response.redirect(new URL('/', request.url))
    // }
    console.log(request)
    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }
}