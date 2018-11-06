package com.springblog.dtos;
import java.util.Date;

public class PostDTO {
    
    private int id;
    private String title;
    private String briefing;
    private String text;
    private Date datepost;
    private Date dateupdate;
    private String name;
    
    public PostDTO(){}
    
    public PostDTO(int id, String title, String briefing, String text, Date datepost, Date dateupdate, String name) {
        this.id = id;
        this.title = title;
        this.briefing = briefing;
        this.text = text;
        this.datepost = datepost;
        this.dateupdate = dateupdate;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBriefing() {
        return briefing;
    }

    public void setBriefing(String briefing) {
        this.briefing = briefing;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDatepost() {
        return datepost;
    }

    public void setDatepost(Date datepost) {
        this.datepost = datepost;
    }

    public Date getDateupdate() {
        return dateupdate;
    }

    public void setDateupdate(Date dateupdate) {
        this.dateupdate = dateupdate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
