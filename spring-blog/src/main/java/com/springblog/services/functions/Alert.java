package com.springblog.services.functions;

import org.springframework.stereotype.Service;

@Service
public class Alert {

    public String GetAlert(int method, int result) {
        String text = "";
        String title = "";

        if (result == 1) {
            title = "Information";
            text = "Successfully ";
            if (method == 1) {
                text = text + "created.";
            }
            if (method == 2) {
                text = text + "edited.";
            }
            if (method == 3) {
                text = text + "deleted.";
            }
            if (method == 4) {
                text = text + "logged.";
            }
            if (method == 5) {
                text = text + "logged out.";
            }
        }

        if (result != 1) {
            title = "Error";
            if (method == 1) {
                text = "Author not found.";
            }
            if (method == 2) {
                text = "This post can only be edited or deleted by the author.";
            }
            if (method == 3) {
                text = "Invalid username and password.";
            }
            if (method == 4) {
                text = "Error logout.";
            }
            if (method == 5) {
                text = "Error logging in.";
            }
            if (method == 6) {
                text = "Error listing posts.";
            }
            if (method == 7) {
                text = "Post not found.";
            }
            if (method == 8) {
                text = "Error showing post.";
            }
        }

        return text;
    }
}
