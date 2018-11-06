package com.springblog.services.functions;

import java.util.ArrayList;
import java.util.List;
import com.springblog.models.Post;
import com.springblog.models.UserSys;
import org.springframework.stereotype.Service;

@Service
public class ValidationData {

    private List<String> list_errors;

    public List<String> ValidationPost(Post post) {
        this.list_errors = new ArrayList<>();
        this.ValidationTitle(post.getTitle());
        this.ValidationBriefing(post.getBriefing());
        this.ValidationText(post.getText());
        this.ValidationPicture(post.getPicture());
        return this.list_errors;
    }

    private void ValidationTitle(String title) {
        if (title == null || title.equals("")) {
            this.list_errors.add("Title is empty.");
        } else {
            if (title.length() < 10) {
                this.list_errors.add("Title with invalid character quantity.");
            }
        }
    }

    private void ValidationBriefing(String briefing) {
        if (briefing == null || briefing.equals("")) {
            this.list_errors.add("Briefing is empty.");
        } else {
            if (briefing.length() < 15) {
                this.list_errors.add("Briefing with invalid character quantity.");
            }
        }
    }

    private void ValidationText(String text) {
        if (text == null || text.equals("")) {
            this.list_errors.add("Text is empty.");
        } else {
            if (text.length() < 50) {
                this.list_errors.add("Text with invalid character quantity.");
            }
        }
    }

    private void ValidationPicture(byte[] picture) {
        if (picture != null) {
            if (picture.length == 0) {
                list_errors.add("Picture is empty.");
            }
        } else {
            list_errors.add("Picture is empty.");
        }
    }

    public List<String> ValidationUser(UserSys usersys) {
        this.list_errors = new ArrayList<>();
        this.ValidationUsername(usersys.getUsername());
        this.ValidationPassword(usersys.getPassword());
        return list_errors;
    }

    private void ValidationUsername(String username) {
        if (username == null || username.equals("")) {
            this.list_errors.add("Username is empty.");
        }
    }

    private void ValidationPassword(String userpass) {
        if (userpass == null || userpass.equals("")) {
            this.list_errors.add("Password is empty.");
        }
    }
}
