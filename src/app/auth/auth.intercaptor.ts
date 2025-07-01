import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "./auth";
import { catchError, throwError } from "rxjs";
import { Expansion } from "@angular/compiler";

export const authTokenInterceptor:HttpInterceptorFn = ( req,next)=>{

const authService = inject(Auth)
const token = authService.token;

if(!token) return next(req)

req  = req.clone({
    setHeaders:{
        Authorization:`Bearer ${token}`
    }
})
return next(req).pipe(
    catchError(error=>{
        if(error.status === 403){
            return refreshAndProcced(authService,req,next)
        }
        return throwError(error)
    }

    )
)

}
const refreshAndProcced = (authService:Auth,req:HttpRequest<any>,next:HttpHandlerFn)=>{
return
}
