package com.springblog.controllers;

import com.google.gson.Gson;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.springblog.services.daos.UserDAO;
import com.springblog.services.functions.ValidationData;
import com.springblog.models.UserSys;
import com.springblog.services.functions.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private Alert alert;

    @Autowired
    private ValidationData validationData;

    @Autowired
    private UserSys usersys;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody
    String Authenticate(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password, HttpSession session, @RequestParam("token") String token) {
        Map<String, Object> datas = new HashMap<>();
        Gson gson = new Gson();
        if (session.getAttribute("token").toString().equals(token)) {
            try {
                usersys.setUsername(username);
                usersys.setPassword(password);
                List<String> errors = validationData.ValidationUser(usersys);
                if (errors.isEmpty()) {
                    UserSys usersys_return = userDAO.Login(usersys);
                    if (usersys_return != null) {
                        session.setAttribute("id", usersys_return.getAuthor().getId());
                        session.setAttribute("name", usersys_return.getAuthor().getName());
                        datas.put("alert", alert.GetAlert(4, 1));
                        datas.put("page", "index");
                    } else {
                        datas.put("alert", alert.GetAlert(3, 3));
                    }
                } else {
                    datas.put("errors", errors);
                }
            } catch (Exception e) {
                datas.put("alert", alert.GetAlert(5, 5));
                datas.put("page", "errors/505");
            }
        } else {
            datas.put("alert", alert.GetAlert(5, 5));
            datas.put("page", "errors/505");
        }
        return gson.toJson(datas);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public @ResponseBody
    String Logout(HttpSession session) {
        Gson gson = new Gson();
        Map<String, Object> datas = new HashMap<>();
        try {
            session.invalidate();
            datas.put("alert", alert.GetAlert(5, 1));
            datas.put("page", "/index");
        } catch (Exception e) {
            datas.put("alert", alert.GetAlert(4, 4));
            datas.put("page", "/errors/505");
        }
        return gson.toJson(datas);
    }

    @RequestMapping(value = "/logged", method = RequestMethod.GET)
    public @ResponseBody
    String Logged(HttpSession session) {
        Gson gson = new Gson();
        Map<String, Object> datas = new HashMap<>();
        try {
            datas.put("status", !(session.getAttribute("name").toString() == null));
        } catch (Exception e) {
            datas.put("status", false);
        }
        return gson.toJson(datas);
    }
}
