package com.springblog.controllers;

import com.google.gson.Gson;
import com.springblog.services.functions.ErrorClass;
import com.springblog.services.security.Token;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class AppController {
    
    @Autowired
    private Token token;
    
    @RequestMapping(value = "/token", method = RequestMethod.PUT)
    public @ResponseBody
    String GetToken(HttpSession session) {
        Gson gson = new Gson();
        String _token = token.GenerateToken();
        session.setAttribute("token", _token);
        return gson.toJson(_token);
    }
    
    @RequestMapping(value = "/getsession", method = RequestMethod.GET)
    public @ResponseBody
    String GetSession(HttpSession session) {
        Gson gson = new Gson();
        try {
            return gson.toJson(session.getAttribute("name"));
        } catch (Exception e) {
            return gson.toJson(null);
        }
    }
    
    @RequestMapping(value = "/errors/404", method = RequestMethod.GET)
    public String Show404(HttpSession session) {
        return "errors/404";
    }
    
    @RequestMapping(value = "/errors/505", method = RequestMethod.GET)
    public String Show505(HttpSession session) {
        return "errors/505";
    }
    
    @ExceptionHandler(ErrorClass.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFound() {
        return "errors/404";
    }
    
    @ExceptionHandler(ErrorClass.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleInternalError() {
        return "errors/505";
    }
}