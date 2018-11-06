package com.springblog.services.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AuthorizerInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object controller) throws Exception {
        String uri = request.getRequestURI();
        if (uri.startsWith("/errors") || uri.startsWith("/token") || uri.startsWith("/getsession") || uri.startsWith("/resources") || uri.startsWith("/index") || uri.startsWith("/login") || uri.startsWith("/show")) {
            return true;
        }

        if (request.getSession().getAttribute("name") != null) {
            return true;
        }
        response.sendRedirect("/login");
        return false;
    }
}
